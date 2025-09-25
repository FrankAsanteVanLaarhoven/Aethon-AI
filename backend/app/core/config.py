from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    redis_url: str
    elasticsearch_url: str | None = None
    weaviate_url: str | None = None
    openai_api_key: str | None = None
    anthropic_api_key: str | None = None
    sec_api_key: str | None = None
    newsapi_key: str | None = None
    openrouter_api_key: str | None = None
    jwt_secret: str = "change_me"
    jwt_algorithm: str = "HS256"
    
    # Real-time data acquisition API keys
    finage_api_key: str | None = None
    finnhub_api_key: str | None = None
    alpha_vantage_api_key: str | None = None
    marketstack_api_key: str | None = None
    financial_modeling_prep_api_key: str | None = None
    quiver_quantitative_api_key: str | None = None
    
    # Stream processing configuration
    kafka_bootstrap_servers: str = "localhost:9092"
    kafka_security_protocol: str = "PLAINTEXT"
    kafka_sasl_mechanism: str | None = None
    kafka_sasl_username: str | None = None
    kafka_sasl_password: str | None = None
    
    # Redis configuration
    redis_host: str = "localhost"
    redis_port: int = 6379
    redis_password: str | None = None
    redis_db: int = 0
    
    # WebSocket configuration
    websocket_heartbeat_interval: int = 30
    websocket_reconnect_interval: int = 5
    websocket_max_reconnect_attempts: int = 10
    
    # Data processing configuration
    batch_size: int = 1000
    processing_interval: int = 60  # seconds
    cache_ttl: int = 3600  # seconds
    
    # Risk management
    max_daily_api_calls: int = 100000
    rate_limit_per_minute: int = 1000
    circuit_breaker_threshold: int = 10
    
    # Monitoring and alerting
    enable_metrics: bool = True
    metrics_port: int = 9090
    log_level: str = "INFO"
    
    # Security
    enable_cors: bool = True
    cors_origins: list[str] = ["*"]
    enable_rate_limiting: bool = True
    rate_limit_requests: int = 100
    rate_limit_window: int = 60  # seconds

    class Config:
        env_file = ".env"
        extra = "ignore"  # Allow extra fields in .env


settings = Settings()