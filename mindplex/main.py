from fastapi import FastAPI
from database import engine, Base
from routers import employee, skill, role, roleskill, employeeskill, learningevent

app = FastAPI(title="MindPex Core API - Models & CRUD")

Base.metadata.create_all(bind=engine)

app.include_router(employee.router)
app.include_router(skill.router)
app.include_router(role.router)
app.include_router(roleskill.router)
app.include_router(employeeskill.router)
app.include_router(learningevent.router)

@app.get("/")
def root():
    return {"status": "ok", "service": "mindpex-core"}
