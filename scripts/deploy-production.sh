#!/bin/bash

# Strategic AI Platform - Production Deployment Script
# This script deploys the complete platform to production infrastructure

set -e

# Configuration
ENVIRONMENT=${1:-production}
REGION=${2:-us-east-1}
CLUSTER_NAME="strategic-ai-cluster"
NAMESPACE="strategic-ai"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if required tools are installed
    command -v docker >/dev/null 2>&1 || { log_error "Docker is required but not installed. Aborting."; exit 1; }
    command -v kubectl >/dev/null 2>&1 || { log_error "kubectl is required but not installed. Aborting."; exit 1; }
    command -v helm >/dev/null 2>&1 || { log_error "Helm is required but not installed. Aborting."; exit 1; }
    command -v aws >/dev/null 2>&1 || { log_error "AWS CLI is required but not installed. Aborting."; exit 1; }
    
    # Check if environment variables are set
    if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
        log_error "AWS credentials not set. Please configure AWS CLI."
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Build and push Docker images
build_and_push_images() {
    log_info "Building and pushing Docker images..."
    
    # Get AWS account ID
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com"
    
    # Create ECR repositories if they don't exist
    aws ecr describe-repositories --repository-names strategic-ai-frontend --region $REGION || \
        aws ecr create-repository --repository-name strategic-ai-frontend --region $REGION
    
    aws ecr describe-repositories --repository-names strategic-ai-backend --region $REGION || \
        aws ecr create-repository --repository-name strategic-ai-backend --region $REGION
    
    # Login to ECR
    aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
    
    # Build and push frontend image
    log_info "Building frontend image..."
    docker build -f frontend/Dockerfile.production -t strategic-ai-frontend:latest frontend/
    docker tag strategic-ai-frontend:latest $ECR_REGISTRY/strategic-ai-frontend:latest
    docker push $ECR_REGISTRY/strategic-ai-frontend:latest
    
    # Build and push backend image
    log_info "Building backend image..."
    docker build -f backend/Dockerfile.production -t strategic-ai-backend:latest backend/
    docker tag strategic-ai-backend:latest $ECR_REGISTRY/strategic-ai-backend:latest
    docker push $ECR_REGISTRY/strategic-ai-backend:latest
    
    log_success "Images built and pushed successfully"
}

# Setup Kubernetes cluster
setup_kubernetes_cluster() {
    log_info "Setting up Kubernetes cluster..."
    
    # Create EKS cluster if it doesn't exist
    if ! aws eks describe-cluster --name $CLUSTER_NAME --region $REGION >/dev/null 2>&1; then
        log_info "Creating EKS cluster..."
        
        # Create cluster configuration
        cat > cluster-config.yaml << EOF
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: $CLUSTER_NAME
  region: $REGION
  version: "1.28"

nodeGroups:
  - name: strategic-ai-nodes
    instanceType: t3.large
    desiredCapacity: 3
    minSize: 2
    maxSize: 10
    ssh:
      allow: true
    iam:
      withAddonPolicies:
        imageBuilder: true
        autoScaler: true
        externalDNS: true
        certManager: true
        appMesh: true
        ebs: true
        fsx: true
        efs: true
        awsLoadBalancerController: true

addons:
  - name: vpc-cni
  - name: coredns
  - name: kube-proxy
  - name: aws-ebs-csi-driver
EOF
        
        eksctl create cluster -f cluster-config.yaml
    else
        log_info "EKS cluster already exists"
    fi
    
    # Update kubeconfig
    aws eks update-kubeconfig --region $REGION --name $CLUSTER_NAME
    
    # Create namespace
    kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -
    
    log_success "Kubernetes cluster setup completed"
}

# Deploy infrastructure components
deploy_infrastructure() {
    log_info "Deploying infrastructure components..."
    
    # Install Helm repositories
    helm repo add bitnami https://charts.bitnami.com/bitnami
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo add grafana https://grafana.github.io/helm-charts
    helm repo add elastic https://helm.elastic.co
    helm repo update
    
    # Deploy PostgreSQL
    log_info "Deploying PostgreSQL..."
    helm upgrade --install postgres bitnami/postgresql \
        --namespace $NAMESPACE \
        --set auth.postgresPassword=strategicai123 \
        --set auth.database=strategicai \
        --set primary.persistence.size=100Gi \
        --set metrics.enabled=true
    
    # Deploy Redis
    log_info "Deploying Redis..."
    helm upgrade --install redis bitnami/redis \
        --namespace $NAMESPACE \
        --set auth.password=strategicai123 \
        --set master.persistence.size=50Gi \
        --set metrics.enabled=true
    
    # Deploy MongoDB
    log_info "Deploying MongoDB..."
    helm upgrade --install mongodb bitnami/mongodb \
        --namespace $NAMESPACE \
        --set auth.rootPassword=strategicai123 \
        --set auth.database=strategicai \
        --set persistence.size=100Gi \
        --set metrics.enabled=true
    
    # Deploy Prometheus
    log_info "Deploying Prometheus..."
    helm upgrade --install prometheus prometheus-community/kube-prometheus-stack \
        --namespace $NAMESPACE \
        --set grafana.adminPassword=strategicai123 \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=50Gi
    
    # Deploy Elasticsearch
    log_info "Deploying Elasticsearch..."
    helm upgrade --install elasticsearch elastic/elasticsearch \
        --namespace $NAMESPACE \
        --set replicas=1 \
        --set volumeClaimTemplate.resources.requests.storage=100Gi \
        --set esJavaOpts="-Xms512m -Xmx512m"
    
    # Deploy Kibana
    log_info "Deploying Kibana..."
    helm upgrade --install kibana elastic/kibana \
        --namespace $NAMESPACE \
        --set elasticsearchHosts="http://elasticsearch-master:9200"
    
    log_success "Infrastructure components deployed"
}

# Deploy application
deploy_application() {
    log_info "Deploying Strategic AI Platform application..."
    
    # Get ECR registry URL
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com"
    
    # Create ConfigMap for environment variables
    kubectl create configmap strategic-ai-config \
        --namespace $NAMESPACE \
        --from-literal=ENVIRONMENT=production \
        --from-literal=DATABASE_URL="postgresql://strategicai:strategicai123@postgres:5432/strategicai" \
        --from-literal=REDIS_URL="redis://redis:6379" \
        --from-literal=SECRET_KEY="your-secret-key-change-in-production" \
        --from-literal=JWT_SECRET="your-jwt-secret-change-in-production" \
        --dry-run=client -o yaml | kubectl apply -f -
    
    # Deploy backend
    log_info "Deploying backend service..."
    cat > backend-deployment.yaml << EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: strategic-ai-backend
  namespace: $NAMESPACE
spec:
  replicas: 3
  selector:
    matchLabels:
      app: strategic-ai-backend
  template:
    metadata:
      labels:
        app: strategic-ai-backend
    spec:
      containers:
      - name: backend
        image: $ECR_REGISTRY/strategic-ai-backend:latest
        ports:
        - containerPort: 8000
        envFrom:
        - configMapRef:
            name: strategic-ai-config
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: strategic-ai-backend
  namespace: $NAMESPACE
spec:
  selector:
    app: strategic-ai-backend
  ports:
  - port: 8000
    targetPort: 8000
  type: ClusterIP
EOF
    
    kubectl apply -f backend-deployment.yaml
    
    # Deploy frontend
    log_info "Deploying frontend service..."
    cat > frontend-deployment.yaml << EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: strategic-ai-frontend
  namespace: $NAMESPACE
spec:
  replicas: 3
  selector:
    matchLabels:
      app: strategic-ai-frontend
  template:
    metadata:
      labels:
        app: strategic-ai-frontend
    spec:
      containers:
      - name: frontend
        image: $ECR_REGISTRY/strategic-ai-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: NEXT_PUBLIC_API_URL
          value: "https://api.strategicai.com"
        - name: NEXT_PUBLIC_SOCKET_URL
          value: "wss://api.strategicai.com"
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "250m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: strategic-ai-frontend
  namespace: $NAMESPACE
spec:
  selector:
    app: strategic-ai-frontend
  ports:
  - port: 3000
    targetPort: 3000
  type: ClusterIP
EOF
    
    kubectl apply -f frontend-deployment.yaml
    
    log_success "Application deployed successfully"
}

# Setup load balancer and ingress
setup_load_balancer() {
    log_info "Setting up load balancer and ingress..."
    
    # Install AWS Load Balancer Controller
    helm repo add eks https://aws.github.io/eks-charts
    helm repo update
    
    helm upgrade --install aws-load-balancer-controller eks/aws-load-balancer-controller \
        --namespace kube-system \
        --set clusterName=$CLUSTER_NAME \
        --set serviceAccount.create=false \
        --set region=$REGION \
        --set vpcId=$(aws eks describe-cluster --name $CLUSTER_NAME --region $REGION --query "cluster.resourcesVpcConfig.vpcId" --output text)
    
    # Create ingress
    cat > ingress.yaml << EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: strategic-ai-ingress
  namespace: $NAMESPACE
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/ssl-redirect: '443'
    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERT_ID
spec:
  rules:
  - host: strategicai.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: strategic-ai-frontend
            port:
              number: 3000
  - host: api.strategicai.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: strategic-ai-backend
            port:
              number: 8000
EOF
    
    kubectl apply -f ingress.yaml
    
    log_success "Load balancer and ingress configured"
}

# Run health checks
run_health_checks() {
    log_info "Running health checks..."
    
    # Wait for deployments to be ready
    kubectl wait --for=condition=available --timeout=300s deployment/strategic-ai-backend -n $NAMESPACE
    kubectl wait --for=condition=available --timeout=300s deployment/strategic-ai-frontend -n $NAMESPACE
    
    # Check pod status
    kubectl get pods -n $NAMESPACE
    
    # Check service status
    kubectl get services -n $NAMESPACE
    
    # Check ingress status
    kubectl get ingress -n $NAMESPACE
    
    log_success "Health checks completed"
}

# Main deployment function
main() {
    log_info "Starting Strategic AI Platform production deployment..."
    log_info "Environment: $ENVIRONMENT"
    log_info "Region: $REGION"
    log_info "Cluster: $CLUSTER_NAME"
    
    check_prerequisites
    build_and_push_images
    setup_kubernetes_cluster
    deploy_infrastructure
    deploy_application
    setup_load_balancer
    run_health_checks
    
    log_success "Strategic AI Platform deployed successfully!"
    log_info "Access the platform at: https://strategicai.com"
    log_info "API endpoint: https://api.strategicai.com"
    log_info "Monitoring: https://grafana.strategicai.com"
    log_info "Logs: https://kibana.strategicai.com"
}

# Run main function
main "$@"
