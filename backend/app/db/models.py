from sqlalchemy import Column, Integer, String, Float, Boolean, TIMESTAMP, ForeignKey, text, JSON
from sqlalchemy.orm import relationship
from .session import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    ticker_symbol = Column(String(10))
    industry = Column(String(100))
    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))


class CompetitiveIntelligence(Base):
    __tablename__ = "competitive_intelligence"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), index=True)
    data_type = Column(String(50), index=True)
    source_url = Column(String)
    content = Column(JSON)
    confidence_score = Column(Float)
    collected_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))
    legal_compliance_verified = Column(Boolean, server_default=text("TRUE"))

    company = relationship("Company", backref="intel")


class StrategicSimulation(Base):
    __tablename__ = "strategic_simulations"

    id = Column(Integer, primary_key=True, index=True)
    scenario_name = Column(String(255))
    participants = Column(JSON)
    simulation_parameters = Column(JSON)
    results = Column(JSON)
    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))

