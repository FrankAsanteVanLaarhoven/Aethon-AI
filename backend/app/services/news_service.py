from newsapi import NewsApiClient
from app.core.config import settings


def get_headlines(query: str = "AI", language: str = "en") -> dict:
    client = NewsApiClient(api_key=settings.newsapi_key)  # use NEWSAPI_KEY
    return client.get_top_headlines(q=query, language=language)

