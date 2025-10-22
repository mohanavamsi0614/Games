# file: routers/roleskill.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db
import uuid

router = APIRouter(prefix="/role-skills", tags=["role-skills"])

@router.post("/", response_model=schemas.RoleSkillOut, status_code=status.HTTP_201_CREATED)
def create_role_skill(rs_in: schemas.RoleSkillCreate, db: Session = Depends(get_db)):
    return crud.create_role_skill(db, rs_in)

@router.get("/role/{role_id}", response_model=List[schemas.RoleSkillOut])
def list_role_skills_for_role(role_id: uuid.UUID, db: Session = Depends(get_db)):
    return crud.get_role_skills_for_role(db, role_id)

@router.get("/{role_skill_id}", response_model=schemas.RoleSkillOut)
def get_role_skill(role_skill_id: uuid.UUID, db: Session = Depends(get_db)):
    rs = crud.get_role_skill(db, role_skill_id)
    if not rs:
        raise HTTPException(status_code=404, detail="RoleSkill not found")
    return rs

@router.put("/{role_skill_id}", response_model=schemas.RoleSkillOut)
def update_role_skill(role_skill_id: uuid.UUID, rs_in: schemas.RoleSkillUpdate, db: Session = Depends(get_db)):
    rs = crud.update_role_skill(db, role_skill_id, rs_in)
    if not rs:
        raise HTTPException(status_code=404, detail="RoleSkill not found")
    return rs

@router.delete("/{role_skill_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_role_skill(role_skill_id: uuid.UUID, db: Session = Depends(get_db)):
    ok = crud.delete_role_skill(db, role_skill_id)
    if not ok:
        raise HTTPException(status_code=404, detail="RoleSkill not found")
    return None
