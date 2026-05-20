from models import Base
from db import engine, SessionLocal

def seed():
    """Seed database with demo data.
    
    PAM Advisor Platform does not require seed data.
    Database tables are created but left empty.
    """
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    db.close()
    print("Database initialized (no seed data required for PAM Advisor)")

if __name__ == "__main__":
    seed()

# Made with Bob