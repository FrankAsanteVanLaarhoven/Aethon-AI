from fastapi import APIRouter
from app.services.simulation_service import run_minimax_simulation
import asyncio


router = APIRouter()


@router.post("/run")
async def run_simulation(payload: dict):
    prompt = payload.get("prompt", "Simulate aggressive market entry in chess game theory.")
    result = await run_minimax_simulation(prompt)
    return {"status": "completed", "result": result}

