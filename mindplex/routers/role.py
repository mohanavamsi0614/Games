# file: routers/role.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db
import uuid

router = APIRouter(prefix="/roles", tags=["roles"])

@router.post("/", response_model=schemas.RoleOut, status_code=status.HTTP_201_CREATED)
def create_role(role_in: schemas.RoleCreate, db: Session = Depends(get_db)):
    return crud.create_role(db, role_in)

@router.get("/", response_model=List[schemas.RoleOut])
def list_roles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_roles(db, skip=skip, limit=limit)

@router.get("/{role_id}", response_model=schemas.RoleOut)
def get_role(role_id: uuid.UUID, db: Session = Depends(get_db)):
    r = crud.get_role(db, role_id)
    if not r:
        raise HTTPException(status_code=404, detail="Role not found")
    return r

@router.put("/{role_id}", response_model=schemas.RoleOut)
def update_role(role_id: uuid.UUID, role_in: schemas.RoleUpdate, db: Session = Depends(get_db)):
    r = crud.update_role(db, role_id, role_in)
    if not r:
        raise HTTPException(status_code=404, detail="Role not found")
    return r

@router.delete("/{role_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_role(role_id: uuid.UUID, db: Session = Depends(get_db)):
    ok = crud.delete_role(db, role_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Role not found")
    return None
