"""
StrategicAI Platform - MLflow Tracking
MLOps infrastructure for model tracking, versioning, and deployment
"""

import mlflow
import mlflow.sklearn
import mlflow.pytorch
import mlflow.tensorflow
import mlflow.pyfunc
import logging
import os
import json
from typing import Dict, Any, Optional, List
from datetime import datetime
import numpy as np
import pandas as pd
from pathlib import Path

logger = logging.getLogger(__name__)

class StrategicAIMLflowTracker:
    """
    MLflow tracking for StrategicAI Platform navigation intelligence models
    """
    
    def __init__(self, 
                 tracking_uri: str = "http://mlflow:5000",
                 experiment_name: str = "strategic-ai-navigation"):
        
        self.tracking_uri = tracking_uri
        self.experiment_name = experiment_name
        
        # Set MLflow tracking URI
        mlflow.set_tracking_uri(tracking_uri)
        
        # Create or get experiment
        self.experiment_id = self._setup_experiment()
        
        # Model registry
        self.model_registry = {}
        
    def _setup_experiment(self) -> str:
        """Setup MLflow experiment"""
        try:
            experiment = mlflow.get_experiment_by_name(self.experiment_name)
            if experiment is None:
                experiment_id = mlflow.create_experiment(
                    name=self.experiment_name,
                    tags={
                        "platform": "strategic-ai",
                        "environment": "production",
                        "created_at": datetime.now().isoformat()
                    }
                )
            else:
                experiment_id = experiment.experiment_id
            
            mlflow.set_experiment(self.experiment_name)
            return experiment_id
            
        except Exception as e:
            logger.error(f"Error setting up MLflow experiment: {e}")
            return "0"
    
    def track_business_intelligence_model(self, 
                                        model: Any,
                                        model_name: str,
                                        training_data: pd.DataFrame,
                                        test_data: pd.DataFrame,
                                        metrics: Dict[str, float],
                                        parameters: Dict[str, Any],
                                        tags: Dict[str, str] = None) -> str:
        """Track business intelligence model"""
        try:
            with mlflow.start_run(run_name=f"bi_model_{model_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"):
                # Log parameters
                mlflow.log_params(parameters)
                
                # Log metrics
                mlflow.log_metrics(metrics)
                
                # Log tags
                if tags:
                    mlflow.set_tags(tags)
                
                # Log training data info
                mlflow.log_param("training_samples", len(training_data))
                mlflow.log_param("test_samples", len(test_data))
                mlflow.log_param("features", len(training_data.columns))
                
                # Log model
                if hasattr(model, 'predict'):
                    mlflow.sklearn.log_model(
                        model, 
                        "model",
                        registered_model_name=f"business_intelligence_{model_name}"
                    )
                
                # Log model performance
                if 'accuracy' in metrics:
                    mlflow.log_metric("model_accuracy", metrics['accuracy'])
                if 'precision' in metrics:
                    mlflow.log_metric("model_precision", metrics['precision'])
                if 'recall' in metrics:
                    mlflow.log_metric("model_recall", metrics['recall'])
                if 'f1_score' in metrics:
                    mlflow.log_metric("model_f1_score", metrics['f1_score'])
                
                # Log business metrics
                if 'market_prediction_accuracy' in metrics:
                    mlflow.log_metric("market_prediction_accuracy", metrics['market_prediction_accuracy'])
                if 'competitive_analysis_accuracy' in metrics:
                    mlflow.log_metric("competitive_analysis_accuracy", metrics['competitive_analysis_accuracy'])
                
                run_id = mlflow.active_run().info.run_id
                logger.info(f"Business intelligence model tracked with run_id: {run_id}")
                return run_id
                
        except Exception as e:
            logger.error(f"Error tracking business intelligence model: {e}")
            return None
    
    def track_competitive_intelligence_model(self, 
                                           model: Any,
                                           model_name: str,
                                           training_data: pd.DataFrame,
                                           test_data: pd.DataFrame,
                                           metrics: Dict[str, float],
                                           parameters: Dict[str, Any],
                                           tags: Dict[str, str] = None) -> str:
        """Track competitive intelligence model"""
        try:
            with mlflow.start_run(run_name=f"ci_model_{model_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"):
                # Log parameters
                mlflow.log_params(parameters)
                
                # Log metrics
                mlflow.log_metrics(metrics)
                
                # Log tags
                if tags:
                    mlflow.set_tags(tags)
                
                # Log training data info
                mlflow.log_param("training_samples", len(training_data))
                mlflow.log_param("test_samples", len(test_data))
                mlflow.log_param("features", len(training_data.columns))
                
                # Log model
                if hasattr(model, 'predict'):
                    mlflow.sklearn.log_model(
                        model, 
                        "model",
                        registered_model_name=f"competitive_intelligence_{model_name}"
                    )
                
                # Log competitive intelligence specific metrics
                if 'patent_prediction_accuracy' in metrics:
                    mlflow.log_metric("patent_prediction_accuracy", metrics['patent_prediction_accuracy'])
                if 'competitor_move_prediction_accuracy' in metrics:
                    mlflow.log_metric("competitor_move_prediction_accuracy", metrics['competitor_move_prediction_accuracy'])
                if 'ip_strategy_effectiveness' in metrics:
                    mlflow.log_metric("ip_strategy_effectiveness", metrics['ip_strategy_effectiveness'])
                
                run_id = mlflow.active_run().info.run_id
                logger.info(f"Competitive intelligence model tracked with run_id: {run_id}")
                return run_id
                
        except Exception as e:
            logger.error(f"Error tracking competitive intelligence model: {e}")
            return None
    
    def track_multi_agent_model(self, 
                               model: Any,
                               model_name: str,
                               training_data: pd.DataFrame,
                               test_data: pd.DataFrame,
                               metrics: Dict[str, float],
                               parameters: Dict[str, Any],
                               tags: Dict[str, str] = None) -> str:
        """Track multi-agent orchestration model"""
        try:
            with mlflow.start_run(run_name=f"ma_model_{model_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"):
                # Log parameters
                mlflow.log_params(parameters)
                
                # Log metrics
                mlflow.log_metrics(metrics)
                
                # Log tags
                if tags:
                    mlflow.set_tags(tags)
                
                # Log training data info
                mlflow.log_param("training_samples", len(training_data))
                mlflow.log_param("test_samples", len(test_data))
                mlflow.log_param("features", len(training_data.columns))
                
                # Log model
                if hasattr(model, 'predict'):
                    mlflow.sklearn.log_model(
                        model, 
                        "model",
                        registered_model_name=f"multi_agent_{model_name}"
                    )
                
                # Log multi-agent specific metrics
                if 'task_allocation_accuracy' in metrics:
                    mlflow.log_metric("task_allocation_accuracy", metrics['task_allocation_accuracy'])
                if 'coordination_efficiency' in metrics:
                    mlflow.log_metric("coordination_efficiency", metrics['coordination_efficiency'])
                if 'consensus_quality' in metrics:
                    mlflow.log_metric("consensus_quality", metrics['consensus_quality'])
                if 'agent_utilization' in metrics:
                    mlflow.log_metric("agent_utilization", metrics['agent_utilization'])
                
                run_id = mlflow.active_run().info.run_id
                logger.info(f"Multi-agent model tracked with run_id: {run_id}")
                return run_id
                
        except Exception as e:
            logger.error(f"Error tracking multi-agent model: {e}")
            return None
    
    def track_strategic_simulation_model(self, 
                                       model: Any,
                                       model_name: str,
                                       training_data: pd.DataFrame,
                                       test_data: pd.DataFrame,
                                       metrics: Dict[str, float],
                                       parameters: Dict[str, Any],
                                       tags: Dict[str, str] = None) -> str:
        """Track strategic simulation model"""
        try:
            with mlflow.start_run(run_name=f"ss_model_{model_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"):
                # Log parameters
                mlflow.log_params(parameters)
                
                # Log metrics
                mlflow.log_metrics(metrics)
                
                # Log tags
                if tags:
                    mlflow.set_tags(tags)
                
                # Log training data info
                mlflow.log_param("training_samples", len(training_data))
                mlflow.log_param("test_samples", len(test_data))
                mlflow.log_param("features", len(training_data.columns))
                
                # Log model
                if hasattr(model, 'predict'):
                    mlflow.sklearn.log_model(
                        model, 
                        "model",
                        registered_model_name=f"strategic_simulation_{model_name}"
                    )
                
                # Log strategic simulation specific metrics
                if 'scenario_prediction_accuracy' in metrics:
                    mlflow.log_metric("scenario_prediction_accuracy", metrics['scenario_prediction_accuracy'])
                if 'npv_prediction_accuracy' in metrics:
                    mlflow.log_metric("npv_prediction_accuracy", metrics['npv_prediction_accuracy'])
                if 'risk_assessment_accuracy' in metrics:
                    mlflow.log_metric("risk_assessment_accuracy", metrics['risk_assessment_accuracy'])
                if 'monte_carlo_convergence' in metrics:
                    mlflow.log_metric("monte_carlo_convergence", metrics['monte_carlo_convergence'])
                
                run_id = mlflow.active_run().info.run_id
                logger.info(f"Strategic simulation model tracked with run_id: {run_id}")
                return run_id
                
        except Exception as e:
            logger.error(f"Error tracking strategic simulation model: {e}")
            return None
    
    def track_unified_navigation_model(self, 
                                     model: Any,
                                     model_name: str,
                                     training_data: pd.DataFrame,
                                     test_data: pd.DataFrame,
                                     metrics: Dict[str, float],
                                     parameters: Dict[str, Any],
                                     tags: Dict[str, str] = None) -> str:
        """Track unified navigation intelligence model"""
        try:
            with mlflow.start_run(run_name=f"uni_model_{model_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"):
                # Log parameters
                mlflow.log_params(parameters)
                
                # Log metrics
                mlflow.log_metrics(metrics)
                
                # Log tags
                if tags:
                    mlflow.set_tags(tags)
                
                # Log training data info
                mlflow.log_param("training_samples", len(training_data))
                mlflow.log_param("test_samples", len(test_data))
                mlflow.log_param("features", len(training_data.columns))
                
                # Log model
                if hasattr(model, 'predict'):
                    mlflow.sklearn.log_model(
                        model, 
                        "model",
                        registered_model_name=f"unified_navigation_{model_name}"
                    )
                
                # Log unified navigation specific metrics
                if 'cross_system_coordination_accuracy' in metrics:
                    mlflow.log_metric("cross_system_coordination_accuracy", metrics['cross_system_coordination_accuracy'])
                if 'unified_optimization_effectiveness' in metrics:
                    mlflow.log_metric("unified_optimization_effectiveness", metrics['unified_optimization_effectiveness'])
                if 'execution_plan_accuracy' in metrics:
                    mlflow.log_metric("execution_plan_accuracy", metrics['execution_plan_accuracy'])
                if 'navigation_confidence' in metrics:
                    mlflow.log_metric("navigation_confidence", metrics['navigation_confidence'])
                
                run_id = mlflow.active_run().info.run_id
                logger.info(f"Unified navigation model tracked with run_id: {run_id}")
                return run_id
                
        except Exception as e:
            logger.error(f"Error tracking unified navigation model: {e}")
            return None
    
    def track_navigation_performance(self, 
                                   navigation_type: str,
                                   performance_metrics: Dict[str, float],
                                   execution_time: float,
                                   confidence_score: float,
                                   additional_metrics: Dict[str, Any] = None) -> str:
        """Track navigation performance metrics"""
        try:
            with mlflow.start_run(run_name=f"navigation_performance_{navigation_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"):
                # Log performance metrics
                mlflow.log_metrics(performance_metrics)
                
                # Log execution metrics
                mlflow.log_metric("execution_time", execution_time)
                mlflow.log_metric("confidence_score", confidence_score)
                
                # Log navigation type
                mlflow.log_param("navigation_type", navigation_type)
                
                # Log additional metrics
                if additional_metrics:
                    for key, value in additional_metrics.items():
                        if isinstance(value, (int, float)):
                            mlflow.log_metric(key, value)
                        else:
                            mlflow.log_param(key, str(value))
                
                # Log tags
                mlflow.set_tags({
                    "navigation_type": navigation_type,
                    "tracking_type": "performance",
                    "timestamp": datetime.now().isoformat()
                })
                
                run_id = mlflow.active_run().info.run_id
                logger.info(f"Navigation performance tracked with run_id: {run_id}")
                return run_id
                
        except Exception as e:
            logger.error(f"Error tracking navigation performance: {e}")
            return None
    
    def get_model_versions(self, model_name: str) -> List[Dict[str, Any]]:
        """Get all versions of a registered model"""
        try:
            client = mlflow.tracking.MlflowClient()
            versions = client.get_latest_versions(model_name)
            
            model_versions = []
            for version in versions:
                model_versions.append({
                    "version": version.version,
                    "stage": version.current_stage,
                    "creation_timestamp": version.creation_timestamp,
                    "last_updated_timestamp": version.last_updated_timestamp,
                    "description": version.description,
                    "user_id": version.user_id
                })
            
            return model_versions
            
        except Exception as e:
            logger.error(f"Error getting model versions: {e}")
            return []
    
    def promote_model_to_staging(self, model_name: str, version: str) -> bool:
        """Promote model to staging"""
        try:
            client = mlflow.tracking.MlflowClient()
            client.transition_model_version_stage(
                name=model_name,
                version=version,
                stage="Staging"
            )
            logger.info(f"Model {model_name} version {version} promoted to staging")
            return True
            
        except Exception as e:
            logger.error(f"Error promoting model to staging: {e}")
            return False
    
    def promote_model_to_production(self, model_name: str, version: str) -> bool:
        """Promote model to production"""
        try:
            client = mlflow.tracking.MlflowClient()
            client.transition_model_version_stage(
                name=model_name,
                version=version,
                stage="Production"
            )
            logger.info(f"Model {model_name} version {version} promoted to production")
            return True
            
        except Exception as e:
            logger.error(f"Error promoting model to production: {e}")
            return False
    
    def load_model(self, model_name: str, stage: str = "Production") -> Any:
        """Load model from MLflow registry"""
        try:
            model_uri = f"models:/{model_name}/{stage}"
            model = mlflow.sklearn.load_model(model_uri)
            logger.info(f"Model {model_name} loaded from {stage} stage")
            return model
            
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            return None
    
    def compare_models(self, model_name: str, versions: List[str]) -> Dict[str, Any]:
        """Compare different versions of a model"""
        try:
            comparison_results = {}
            
            for version in versions:
                try:
                    model_uri = f"models:/{model_name}/{version}"
                    run_id = mlflow.models.get_model_info(model_uri).run_id
                    
                    # Get run details
                    run = mlflow.get_run(run_id)
                    
                    comparison_results[version] = {
                        "metrics": run.data.metrics,
                        "params": run.data.params,
                        "tags": run.data.tags,
                        "start_time": run.info.start_time,
                        "end_time": run.info.end_time
                    }
                    
                except Exception as e:
                    logger.error(f"Error comparing model version {version}: {e}")
                    comparison_results[version] = {"error": str(e)}
            
            return comparison_results
            
        except Exception as e:
            logger.error(f"Error comparing models: {e}")
            return {}
    
    def create_model_signature(self, input_data: pd.DataFrame, output_data: pd.DataFrame) -> Any:
        """Create model signature for input/output validation"""
        try:
            from mlflow.types.schema import Schema, ColSpec
            from mlflow.models.signature import ModelSignature
            
            # Create input schema
            input_schema = Schema([
                ColSpec(type="double", name=col) for col in input_data.columns
            ])
            
            # Create output schema
            output_schema = Schema([
                ColSpec(type="double", name=col) for col in output_data.columns
            ])
            
            # Create model signature
            signature = ModelSignature(inputs=input_schema, outputs=output_schema)
            
            return signature
            
        except Exception as e:
            logger.error(f"Error creating model signature: {e}")
            return None

# Create global MLflow tracker instance
mlflow_tracker = StrategicAIMLflowTracker()
