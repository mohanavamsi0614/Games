# file: crud.py
from sqlalchemy.orm import Session
from typing import List, Optional
from models import Employee, Skill, Role, RoleSkill, EmployeeSkill, LearningEvent
import schemas
import uuid
from sqlalchemy.exc import NoResultFound

# ----- Employee CRUD -----
def create_employee(db: Session, employee_in: schemas.EmployeeCreate) -> Employee:
    obj = Employee(**employee_in.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_employee(db: Session, employee_id: str) -> Optional[Employee]:
    return db.query(Employee).filter(Employee.employee_id == employee_id).first()

def get_employees(db: Session, skip: int = 0, limit: int = 100) -> List[Employee]:
    return db.query(Employee).offset(skip).limit(limit).all()

def update_employee(db: Session, employee_id: str, employee_in: schemas.EmployeeUpdate) -> Optional[Employee]:
    obj = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not obj:
        return None
    for field, value in employee_in.dict(exclude_unset=True).items():
        setattr(obj, field, value)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def delete_employee(db: Session, employee_id: str) -> bool:
    obj = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True

# ----- Skill CRUD -----
def create_skill(db: Session, skill_in: schemas.SkillCreate) -> Skill:
    obj = Skill(name=skill_in.name, type=skill_in.type)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_skill(db: Session, skill_id: uuid.UUID) -> Optional[Skill]:
    return db.query(Skill).filter(Skill.skill_id == skill_id).first()

def get_skill_by_name(db: Session, name: str) -> Optional[Skill]:
    return db.query(Skill).filter(Skill.name == name).first()

def get_skills(db: Session, skip: int = 0, limit: int = 100) -> List[Skill]:
    return db.query(Skill).offset(skip).limit(limit).all()

def update_skill(db: Session, skill_id: uuid.UUID, skill_in: schemas.SkillUpdate) -> Optional[Skill]:
    obj = db.query(Skill).filter(Skill.skill_id == skill_id).first()
    if not obj:
        return None
    for field, value in skill_in.dict(exclude_unset=True).items():
        setattr(obj, field, value)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def delete_skill(db: Session, skill_id: uuid.UUID) -> bool:
    obj = db.query(Skill).filter(Skill.skill_id == skill_id).first()
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True

# ----- Role CRUD -----
def create_role(db: Session, role_in: schemas.RoleCreate) -> Role:
    obj = Role(title=role_in.title)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_role(db: Session, role_id: uuid.UUID) -> Optional[Role]:
    return db.query(Role).filter(Role.role_id == role_id).first()

def get_roles(db: Session, skip: int = 0, limit: int = 100) -> List[Role]:
    return db.query(Role).offset(skip).limit(limit).all()

def update_role(db: Session, role_id: uuid.UUID, role_in: schemas.RoleUpdate) -> Optional[Role]:
    obj = db.query(Role).filter(Role.role_id == role_id).first()
    if not obj:
        return None
    for field, value in role_in.dict(exclude_unset=True).items():
        setattr(obj, field, value)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def delete_role(db: Session, role_id: uuid.UUID) -> bool:
    obj = db.query(Role).filter(Role.role_id == role_id).first()
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True

# ----- RoleSkill CRUD -----
def create_role_skill(db: Session, rs_in: schemas.RoleSkillCreate) -> RoleSkill:
    obj = RoleSkill(role_id=rs_in.role_id, skill_id=rs_in.skill_id, target_proficiency=rs_in.target_proficiency)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_role_skill(db: Session, role_skill_id: uuid.UUID) -> Optional[RoleSkill]:
    return db.query(RoleSkill).filter(RoleSkill.role_skill_id == role_skill_id).first()

def get_role_skills_for_role(db: Session, role_id: uuid.UUID) -> List[RoleSkill]:
    return db.query(RoleSkill).filter(RoleSkill.role_id == role_id).all()

def update_role_skill(db: Session, role_skill_id: uuid.UUID, rs_in: schemas.RoleSkillUpdate) -> Optional[RoleSkill]:
    obj = db.query(RoleSkill).filter(RoleSkill.role_skill_id == role_skill_id).first()
    if not obj:
        return None
    for field, value in rs_in.dict(exclude_unset=True).items():
        setattr(obj, field, value)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def delete_role_skill(db: Session, role_skill_id: uuid.UUID) -> bool:
    obj = db.query(RoleSkill).filter(RoleSkill.role_skill_id == role_skill_id).first()
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True

# ----- EmployeeSkill CRUD -----
def create_employee_skill(db: Session, es_in: schemas.EmployeeSkillCreate) -> EmployeeSkill:
    obj = EmployeeSkill(employee_id=es_in.employee_id, skill_id=es_in.skill_id,
                        current_proficiency=es_in.current_proficiency, date_measured=es_in.date_measured)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_employee_skill(db: Session, emp_skill_id: uuid.UUID) -> Optional[EmployeeSkill]:
    return db.query(EmployeeSkill).filter(EmployeeSkill.emp_skill_id == emp_skill_id).first()

def get_employee_skills(db: Session, employee_id: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[EmployeeSkill]:
    q = db.query(EmployeeSkill)
    if employee_id:
        q = q.filter(EmployeeSkill.employee_id == employee_id)
    return q.offset(skip).limit(limit).all()

def update_employee_skill(db: Session, emp_skill_id: uuid.UUID, es_in: schemas.EmployeeSkillUpdate) -> Optional[EmployeeSkill]:
    obj = db.query(EmployeeSkill).filter(EmployeeSkill.emp_skill_id == emp_skill_id).first()
    if not obj:
        return None
    for field, value in es_in.dict(exclude_unset=True).items():
        setattr(obj, field, value)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def delete_employee_skill(db: Session, emp_skill_id: uuid.UUID) -> bool:
    obj = db.query(EmployeeSkill).filter(EmployeeSkill.emp_skill_id == emp_skill_id).first()
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True

# ----- LearningEvent CRUD -----
def create_learning_event(db: Session, le_in: schemas.LearningEventCreate) -> LearningEvent:
    obj = LearningEvent(employee_id=le_in.employee_id, skill_id=le_in.skill_id,
                        date_completed=le_in.date_completed, source=le_in.source)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_learning_event(db: Session, event_id: uuid.UUID) -> Optional[LearningEvent]:
    return db.query(LearningEvent).filter(LearningEvent.event_id == event_id).first()

def get_learning_events(db: Session, employee_id: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[LearningEvent]:
    q = db.query(LearningEvent)
    if employee_id:
        q = q.filter(LearningEvent.employee_id == employee_id)
    return q.offset(skip).limit(limit).all()

def update_learning_event(db: Session, event_id: uuid.UUID, le_in: schemas.LearningEventUpdate) -> Optional[LearningEvent]:
    obj = db.query(LearningEvent).filter(LearningEvent.event_id == event_id).first()
    if not obj:
        return None
    for field, value in le_in.dict(exclude_unset=True).items():
        setattr(obj, field, value)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def delete_learning_event(db: Session, event_id: uuid.UUID) -> bool:
    obj = db.query(LearningEvent).filter(LearningEvent.event_id == event_id).first()
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True
