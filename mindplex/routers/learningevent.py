# file: routers/learningevent.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db
import uuid

router = APIRouter(prefix="/learning-events", tags=["learning-events"])

@router.post("/", response_model=schemas.LearningEventOut, status_code=status.HTTP_201_CREATED)
def create_learning_event(le_in: schemas.LearningEventCreate, db: Session = Depends(get_db)):
    return crud.create_learning_event(db, le_in)

@router.get("/", response_model=List[schemas.LearningEventOut])
def list_learning_events(employee_id: Optional[str] = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_learning_events(db, employee_id=employee_id, skip=skip, limit=limit)

@router.get("/{event_id}", response_model=schemas.LearningEventOut)
def get_learning_event(event_id: uuid.UUID, db: Session = Depends(get_db)):
    ev = crud.get_learning_event(db, event_id)
    if not ev:
        raise HTTPException(status_code=404, detail="LearningEvent not found")
    return ev

@router.put("/{event_id}", response_model=schemas.LearningEventOut)
def update_learning_event(event_id: uuid.UUID, le_in: schemas.LearningEventUpdate, db: Session = Depends(get_db)):
    ev = crud.update_learning_event(db, event_id, le_in)
    if not ev:
        raise HTTPException(status_code=404, detail="LearningEvent not found")
    return ev

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_learning_event(event_id: uuid.UUID, db: Session = Depends(get_db)):
    ok = crud.delete_learning_event(db, event_id)
    if not ok:
        raise HTTPException(status_code=404, detail="LearningEvent not found")
    return None
