from fastapi import APIRouter


router = APIRouter()


@router.get("/agents/{agent_id}/status")
def agent_status(agent_id: str):
    return {"agent_id": agent_id, "status": "idle"}

