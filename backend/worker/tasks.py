from .celery_app import celery


@celery.task(name="tasks.collect_competitive_data")
def collect_competitive_data(company_id: int):
    # Placeholder: perform legal data collection and store results
    return {"company_id": company_id, "collected": True}

