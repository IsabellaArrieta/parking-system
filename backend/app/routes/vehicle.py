from fastapi import APIRouter

router = APIRouter()

@router.get("/vehicles")
def list_vehicles():
    return {"vehicles": []}
