# file: schemas.py
from typing import Optional, List
from datetime import date
from pydantic import BaseModel, Field
import uuid
from enum import Enum

class SkillTypeEnum(str, Enum):
    Hard = "Hard"
    Soft = "Soft"

# ---------- Employee ----------
class EmployeeBase(BaseModel):
    employee_id: str = Field(..., description="Primary HRMS employee id")
    manager_id: Optional[str] = None
    first_name: str
    last_name: str
    department: Optional[str] = None
    job_title: Optional[str] = None
    hire_date: Optional[date] = None
    latest_rating: Optional[float] = None

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    manager_id: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    department: Optional[str] = None
    job_title: Optional[str] = None
    hire_date: Optional[date] = None
    latest_rating: Optional[float] = None
    attrition_risk_score: Optional[float] = None
    nine_box_x: Optional[str] = None
    nine_box_y: Optional[str] = None

class EmployeeOut(EmployeeBase):
    attrition_risk_score: Optional[float] = None
    nine_box_x: Optional[str] = None
    nine_box_y: Optional[str] = None

    class Config:
        orm_mode = True

# ---------- Skill ----------
class SkillBase(BaseModel):
    name: str
    type: SkillTypeEnum

class SkillCreate(SkillBase):
    pass

class SkillUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[SkillTypeEnum] = None

class SkillOut(SkillBase):
    skill_id: uuid.UUID

    class Config:
        orm_mode = True

# ---------- Role ----------
class RoleBase(BaseModel):
    title: str

class RoleCreate(RoleBase):
    pass

class RoleUpdate(BaseModel):
    title: Optional[str] = None

class RoleOut(RoleBase):
    role_id: uuid.UUID

    class Config:
        orm_mode = True

# ---------- RoleSkill ----------
class RoleSkillBase(BaseModel):
    role_id: uuid.UUID
    skill_id: uuid.UUID
    target_proficiency: int = 3

class RoleSkillCreate(RoleSkillBase):
    pass

class RoleSkillUpdate(BaseModel):
    target_proficiency: Optional[int] = None

class RoleSkillOut(RoleSkillBase):
    role_skill_id: uuid.UUID

    class Config:
        orm_mode = True

# ---------- EmployeeSkill ----------
class EmployeeSkillBase(BaseModel):
    employee_id: str
    skill_id: uuid.UUID
    current_proficiency: int = 1
    date_measured: Optional[date] = None

class EmployeeSkillCreate(EmployeeSkillBase):
    pass

class EmployeeSkillUpdate(BaseModel):
    current_proficiency: Optional[int] = None
    date_measured: Optional[date] = None

class EmployeeSkillOut(EmployeeSkillBase):
    emp_skill_id: uuid.UUID

    class Config:
        orm_mode = True

# ---------- LearningEvent ----------
class LearningEventBase(BaseModel):
    employee_id: str
    skill_id: Optional[uuid.UUID] = None
    date_completed: date
    source: Optional[str] = None

class LearningEventCreate(LearningEventBase):
    pass

class LearningEventUpdate(BaseModel):
    date_completed: Optional[date] = None
    source: Optional[str] = None

class LearningEventOut(LearningEventBase):
    event_id: uuid.UUID

    class Config:
        orm_mode = True