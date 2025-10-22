# file: routers/skill.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db
import uuid

router = APIRouter(prefix="/skills", tags=["skills"])

@router.post("/", response_model=schemas.SkillOut, status_code=status.HTTP_201_CREATED)
def create_skill(skill_in: schemas.SkillCreate, db: Session = Depends(get_db)):
    existing = crud.get_skill_by_name(db, skill_in.name)
    if existing:
        raise HTTPException(status_code=400, detail="Skill with this name already exists")
    return crud.create_skill(db, skill_in)

@router.get("/", response_model=List[schemas.SkillOut])
def list_skills(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_skills(db, skip=skip, limit=limit)

@router.get("/{skill_id}", response_model=schemas.SkillOut)
def get_skill(skill_id: uuid.UUID, db: Session = Depends(get_db)):
    s = crud.get_skill(db, skill_id)
    if not s:
        raise HTTPException(status_code=404, detail="Skill not found")
    return s

@router.put("/{skill_id}", response_model=schemas.SkillOut)
def update_skill(skill_id: uuid.UUID, skill_in: schemas.SkillUpdate, db: Session = Depends(get_db)):
    s = crud.update_skill(db, skill_id, skill_in)
    if not s:
        raise HTTPException(status_code=404, detail="Skill not found")
    return s

@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_skill(skill_id: uuid.UUID, db: Session = Depends(get_db)):
    ok = crud.delete_skill(db, skill_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Skill not found")
    return None
