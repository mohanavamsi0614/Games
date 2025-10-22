# file: routers/employeeskill.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db
import uuid

router = APIRouter(prefix="/employee-skills", tags=["employee-skills"])

@router.post("/", response_model=schemas.EmployeeSkillOut, status_code=status.HTTP_201_CREATED)
def create_employee_skill(es_in: schemas.EmployeeSkillCreate, db: Session = Depends(get_db)):
    # Optionally validate employee and skill existence here
    return crud.create_employee_skill(db, es_in)

@router.get("/", response_model=List[schemas.EmployeeSkillOut])
def list_employee_skills(employee_id: Optional[str] = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_employee_skills(db, employee_id=employee_id, skip=skip, limit=limit)

@router.get("/{emp_skill_id}", response_model=schemas.EmployeeSkillOut)
def get_employee_skill(emp_skill_id: uuid.UUID, db: Session = Depends(get_db)):
    es = crud.get_employee_skill(db, emp_skill_id)
    if not es:
        raise HTTPException(status_code=404, detail="EmployeeSkill not found")
    return es

@router.put("/{emp_skill_id}", response_model=schemas.EmployeeSkillOut)
def update_employee_skill(emp_skill_id: uuid.UUID, es_in: schemas.EmployeeSkillUpdate, db: Session = Depends(get_db)):
    es = crud.update_employee_skill(db, emp_skill_id, es_in)
    if not es:
        raise HTTPException(status_code=404, detail="EmployeeSkill not found")
    return es

@router.delete("/{emp_skill_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee_skill(emp_skill_id: uuid.UUID, db: Session = Depends(get_db)):
    ok = crud.delete_employee_skill(db, emp_skill_id)
    if not ok:
        raise HTTPException(status_code=404, detail="EmployeeSkill not found")
    return None
