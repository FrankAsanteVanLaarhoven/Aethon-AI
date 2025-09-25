from celery import Celery
from app.core.config import settings


celery = Celery(
    "strategic_ai",
    broker=settings.redis_url,
    backend=settings.redis_url,
)
celery.conf.task_routes = {"tasks.*": {"queue": "default"}}

