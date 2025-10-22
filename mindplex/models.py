# file: models.py
import uuid
from sqlalchemy import Column, String, Date, Integer, Float, ForeignKey, Enum, DateTime, func, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base
import enum

class SkillTypeEnum(str, enum.Enum):
    hard = "Hard"
    soft = "Soft"

class Employee(Base):
    __tablename__ = "employees"
    employee_id = Column(String, primary_key=True, index=True) 
    manager_id = Column(String, ForeignKey("employees.employee_id"), nullable=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    department = Column(String, nullable=True)
    job_title = Column(String, nullable=True)
    hire_date = Column(Date, nullable=True)
    latest_rating = Column(Float, nullable=True)
    attrition_risk_score = Column(Float, nullable=True)
    nine_box_x = Column(String, nullable=True)
    nine_box_y = Column(String, nullable=True)

    manager = relationship("Employee", remote_side=[employee_id], backref="direct_reports")
    skills = relationship("EmployeeSkill", back_populates="employee", cascade="all, delete-orphan")
    learning_events = relationship("LearningEvent", back_populates="employee", cascade="all, delete-orphan")

class Skill(Base):
    __tablename__ = "skills"
    skill_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, unique=True, index=True)
    type = Column(Enum(SkillTypeEnum), nullable=False)

    role_mappings = relationship("RoleSkill", back_populates="skill", cascade="all, delete-orphan")
    employee_profiles = relationship("EmployeeSkill", back_populates="skill", cascade="all, delete-orphan")

class Role(Base):
    __tablename__ = "roles"
    role_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False, unique=True, index=True)

    role_skills = relationship("RoleSkill", back_populates="role", cascade="all, delete-orphan")

class RoleSkill(Base):
    __tablename__ = "role_skills"
    role_skill_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    role_id = Column(UUID(as_uuid=True), ForeignKey("roles.role_id"), nullable=False, index=True)
    skill_id = Column(UUID(as_uuid=True), ForeignKey("skills.skill_id"), nullable=False, index=True)
    target_proficiency = Column(Integer, nullable=False, default=3)

    role = relationship("Role", back_populates="role_skills")
    skill = relationship("Skill", back_populates="role_mappings")

    __table_args__ = (UniqueConstraint('role_id', 'skill_id', name='_role_skill_uc'),)

class EmployeeSkill(Base):
    __tablename__ = "employee_skills"
    emp_skill_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_id = Column(String, ForeignKey("employees.employee_id"), nullable=False, index=True)
    skill_id = Column(UUID(as_uuid=True), ForeignKey("skills.skill_id"), nullable=False, index=True)
    current_proficiency = Column(Integer, nullable=False, default=1)
    date_measured = Column(Date, nullable=True)

    employee = relationship("Employee", back_populates="skills")
    skill = relationship("Skill", back_populates="employee_profiles")

    __table_args__ = (UniqueConstraint('employee_id', 'skill_id', name='_emp_skill_uc'),)

class LearningEvent(Base):
    __tablename__ = "learning_events"
    event_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_id = Column(String, ForeignKey("employees.employee_id"), nullable=False, index=True)
    skill_id = Column(UUID(as_uuid=True), ForeignKey("skills.skill_id"), nullable=True)
    date_completed = Column(Date, nullable=False)
    source = Column(String, nullable=True)
    employee = relationship("Employee", back_populates="learning_events")