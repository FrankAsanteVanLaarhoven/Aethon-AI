from patent_client import Patent


def get_patents_by_applicant(applicant: str):
    try:
        queryset = Patent.objects.filter(applicant=applicant)
        return [p.number for p in queryset[:25]]
    except Exception:
        return []

