from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "ProcureOS API"
    database_url: str = "postgresql+psycopg://procureos:procureos@localhost:5432/procureos"
    cors_origins: str = "http://localhost:3000"
    openai_api_key: str | None = None
    openai_model: str = "gpt-5-mini"
    langfuse_public_key: str | None = None
    langfuse_secret_key: str | None = None
    langfuse_host: str = "https://cloud.langfuse.com"
    otel_service_name: str = "procureos-api"
    otel_exporter_otlp_endpoint: str | None = None

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()
