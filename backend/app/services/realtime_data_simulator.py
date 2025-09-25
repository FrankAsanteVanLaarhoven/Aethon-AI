"""
Real-time Data Simulator for Production Testing
Simulates live market data, threat alerts, and regulatory updates
"""

import asyncio
import random
import json
from datetime import datetime, timedelta
from typing import Dict, List, Any
import logging
from dataclasses import dataclass
from enum import Enum

logger = logging.getLogger(__name__)

class DataType(Enum):
    MARKET_DATA = "market_data"
    THREAT_ALERT = "threat_alert"
    REGULATORY_UPDATE = "regulatory_update"
    ECONOMIC_INDICATOR = "economic_indicator"
    GEOPOLITICAL_EVENT = "geopolitical_event"

@dataclass
class MarketData:
    symbol: str
    price: float
    volume: int
    change_percent: float
    bid: float
    ask: float
    timestamp: datetime

@dataclass
class ThreatAlert:
    threat_id: str
    domain: str
    severity: str
    source: str
    confidence: float
    description: str
    timestamp: datetime

@dataclass
class RegulatoryUpdate:
    regulation_id: str
    jurisdiction: str
    industry: str
    change_type: str
    impact_level: str
    effective_date: datetime
    description: str
    timestamp: datetime

class RealtimeDataSimulator:
    """Simulates real-time data streams for testing"""
    
    def __init__(self):
        self.running = False
        self.subscribers = {}
        self.market_symbols = [
            "AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "META", "NVDA", "JPM", 
            "BAC", "WMT", "JNJ", "V", "PG", "UNH", "HD", "MA", "DIS", "NFLX"
        ]
        self.threat_domains = ["cyber", "economic", "military", "political", "hybrid"]
        self.jurisdictions = ["US", "EU", "UK", "CN", "JP", "SG", "AU", "CA"]
        self.industries = ["financial_services", "healthcare", "technology", "manufacturing", "energy"]
        
        # Initialize base prices
        self.current_prices = {
            symbol: random.uniform(50, 500) for symbol in self.market_symbols
        }
        
        logger.info("Realtime data simulator initialized")
    
    async def start(self):
        """Start the data simulation"""
        self.running = True
        logger.info("Starting realtime data simulation...")
        
        # Start multiple data generation tasks
        tasks = [
            asyncio.create_task(self._generate_market_data()),
            asyncio.create_task(self._generate_threat_alerts()),
            asyncio.create_task(self._generate_regulatory_updates()),
            asyncio.create_task(self._generate_economic_indicators()),
            asyncio.create_task(self._generate_geopolitical_events())
        ]
        
        try:
            await asyncio.gather(*tasks)
        except asyncio.CancelledError:
            logger.info("Data simulation stopped")
    
    async def stop(self):
        """Stop the data simulation"""
        self.running = False
        logger.info("Stopping realtime data simulation...")
    
    def subscribe(self, client_id: str, data_types: List[DataType]):
        """Subscribe a client to specific data types"""
        self.subscribers[client_id] = {
            "data_types": data_types,
            "queue": asyncio.Queue()
        }
        logger.info(f"Client {client_id} subscribed to {[dt.value for dt in data_types]}")
    
    def unsubscribe(self, client_id: str):
        """Unsubscribe a client"""
        if client_id in self.subscribers:
            del self.subscribers[client_id]
            logger.info(f"Client {client_id} unsubscribed")
    
    async def get_data(self, client_id: str) -> Dict[str, Any]:
        """Get next data item for a client"""
        if client_id not in self.subscribers:
            return None
        
        queue = self.subscribers[client_id]["queue"]
        return await queue.get()
    
    async def _broadcast_data(self, data_type: DataType, data: Any):
        """Broadcast data to all subscribed clients"""
        message = {
            "type": data_type.value,
            "data": data,
            "timestamp": datetime.now().isoformat()
        }
        
        for client_id, subscriber in self.subscribers.items():
            if data_type in subscriber["data_types"]:
                await subscriber["queue"].put(message)
    
    async def _generate_market_data(self):
        """Generate realistic market data"""
        while self.running:
            try:
                # Update multiple symbols per cycle
                symbols_to_update = random.sample(self.market_symbols, k=random.randint(3, 8))
                
                for symbol in symbols_to_update:
                    # Simulate price movement
                    current_price = self.current_prices[symbol]
                    change_percent = random.gauss(0, 0.02)  # 2% standard deviation
                    new_price = current_price * (1 + change_percent)
                    self.current_prices[symbol] = new_price
                    
                    # Generate market data
                    spread = new_price * random.uniform(0.0001, 0.001)  # 0.01% to 0.1% spread
                    
                    market_data = {
                        "symbol": symbol,
                        "price": round(new_price, 2),
                        "volume": random.randint(1000000, 50000000),
                        "change_percent": round(change_percent * 100, 2),
                        "bid": round(new_price - spread/2, 2),
                        "ask": round(new_price + spread/2, 2),
                        "high": round(new_price * random.uniform(1.0, 1.02), 2),
                        "low": round(new_price * random.uniform(0.98, 1.0), 2),
                        "market_cap": round(new_price * random.uniform(1e9, 1e12), 0),
                        "pe_ratio": round(random.uniform(10, 40), 2)
                    }
                    
                    await self._broadcast_data(DataType.MARKET_DATA, market_data)
                
                # Market data updates every 100-500ms
                await asyncio.sleep(random.uniform(0.1, 0.5))
                
            except Exception as e:
                logger.error(f"Error generating market data: {e}")
                await asyncio.sleep(1)
    
    async def _generate_threat_alerts(self):
        """Generate security threat alerts"""
        threat_id_counter = 1
        
        while self.running:
            try:
                # Threat alerts are less frequent
                await asyncio.sleep(random.uniform(5, 15))
                
                # Generate threat alert
                domain = random.choice(self.threat_domains)
                severity = random.choices(
                    ["low", "medium", "high", "critical"],
                    weights=[40, 30, 20, 10]
                )[0]
                
                threat_scenarios = {
                    "cyber": [
                        "Advanced persistent threat detected in network segment",
                        "Suspicious data exfiltration attempt blocked",
                        "Zero-day vulnerability exploitation attempt",
                        "Ransomware campaign targeting infrastructure"
                    ],
                    "economic": [
                        "Coordinated currency manipulation detected",
                        "Anomalous trading patterns indicating market manipulation",
                        "Supply chain disruption risk identified",
                        "Economic sanctions probability increased"
                    ],
                    "military": [
                        "Unusual military asset movements detected",
                        "Cyber reconnaissance on defense systems",
                        "Strategic resource accumulation patterns",
                        "Allied communication intercept attempts"
                    ],
                    "political": [
                        "Social media influence campaign detected",
                        "Diplomatic relations deterioration indicators",
                        "Political instability markers rising",
                        "Election interference attempts identified"
                    ],
                    "hybrid": [
                        "Multi-domain coordinated threat activity",
                        "Combined cyber-economic warfare indicators",
                        "Integrated disinformation and market manipulation",
                        "Cross-domain strategic operation detected"
                    ]
                }
                
                threat_alert = {
                    "threat_id": f"THREAT-{threat_id_counter:06d}",
                    "domain": domain,
                    "severity": severity,
                    "source": random.choice(["SIGINT", "HUMINT", "OSINT", "CYBINT", "FININT"]),
                    "confidence": round(random.uniform(0.6, 0.98), 2),
                    "description": random.choice(threat_scenarios[domain]),
                    "affected_assets": random.sample(
                        ["critical_infrastructure", "financial_systems", "government_networks", 
                         "defense_systems", "communication_networks", "energy_grid"],
                        k=random.randint(1, 3)
                    ),
                    "recommended_actions": [
                        "Activate enhanced monitoring protocols",
                        "Implement defensive countermeasures",
                        "Coordinate with allied intelligence"
                    ],
                    "time_to_impact": f"{random.randint(1, 72)} hours"
                }
                
                await self._broadcast_data(DataType.THREAT_ALERT, threat_alert)
                threat_id_counter += 1
                
            except Exception as e:
                logger.error(f"Error generating threat alerts: {e}")
                await asyncio.sleep(5)
    
    async def _generate_regulatory_updates(self):
        """Generate regulatory update notifications"""
        regulation_id_counter = 1
        
        while self.running:
            try:
                # Regulatory updates every 10-30 seconds
                await asyncio.sleep(random.uniform(10, 30))
                
                jurisdiction = random.choice(self.jurisdictions)
                industry = random.choice(self.industries)
                
                change_types = ["new_regulation", "amendment", "guidance_update", "enforcement_action"]
                change_type = random.choice(change_types)
                
                regulatory_scenarios = {
                    "new_regulation": [
                        "New data privacy requirements for AI systems",
                        "Enhanced cybersecurity standards for critical infrastructure",
                        "Mandatory ESG reporting requirements",
                        "Quantum computing export controls"
                    ],
                    "amendment": [
                        "Updated financial reporting standards",
                        "Revised anti-money laundering requirements",
                        "Modified cross-border data transfer rules",
                        "Amended algorithmic trading regulations"
                    ],
                    "guidance_update": [
                        "Clarification on AI ethics compliance",
                        "Updated cryptocurrency taxation guidance",
                        "New interpretation of competition law for tech platforms",
                        "Revised guidelines for autonomous systems"
                    ],
                    "enforcement_action": [
                        "Increased penalties for data breaches",
                        "Stricter enforcement of market manipulation rules",
                        "Enhanced scrutiny of M&A activities",
                        "New sanctions compliance requirements"
                    ]
                }
                
                regulatory_update = {
                    "regulation_id": f"REG-{jurisdiction}-{regulation_id_counter:05d}",
                    "jurisdiction": jurisdiction,
                    "industry": industry,
                    "change_type": change_type,
                    "impact_level": random.choice(["low", "medium", "high", "critical"]),
                    "effective_date": (datetime.now() + timedelta(days=random.randint(30, 180))).isoformat(),
                    "description": random.choice(regulatory_scenarios[change_type]),
                    "compliance_requirements": [
                        "Update internal policies and procedures",
                        "Implement new technical controls",
                        "Conduct compliance assessment",
                        "Train relevant personnel"
                    ],
                    "estimated_cost": f"${random.randint(100, 5000)}K",
                    "penalty_risk": f"${random.randint(1, 100)}M"
                }
                
                await self._broadcast_data(DataType.REGULATORY_UPDATE, regulatory_update)
                regulation_id_counter += 1
                
            except Exception as e:
                logger.error(f"Error generating regulatory updates: {e}")
                await asyncio.sleep(10)
    
    async def _generate_economic_indicators(self):
        """Generate economic indicator updates"""
        while self.running:
            try:
                # Economic indicators every 5-10 seconds
                await asyncio.sleep(random.uniform(5, 10))
                
                indicators = [
                    {
                        "indicator": "GDP Growth",
                        "region": random.choice(["US", "EU", "China", "Global"]),
                        "value": round(random.uniform(-2, 5), 1),
                        "unit": "percent",
                        "trend": random.choice(["rising", "falling", "stable"]),
                        "forecast": round(random.uniform(-1, 4), 1)
                    },
                    {
                        "indicator": "Inflation Rate",
                        "region": random.choice(["US", "EU", "UK", "Japan"]),
                        "value": round(random.uniform(0, 6), 1),
                        "unit": "percent",
                        "trend": random.choice(["rising", "falling", "stable"]),
                        "target": 2.0
                    },
                    {
                        "indicator": "Unemployment Rate",
                        "region": random.choice(["US", "EU", "UK", "Canada"]),
                        "value": round(random.uniform(3, 8), 1),
                        "unit": "percent",
                        "trend": random.choice(["improving", "worsening", "stable"]),
                        "historical_avg": 5.5
                    },
                    {
                        "indicator": "Interest Rate",
                        "region": random.choice(["Fed", "ECB", "BoE", "BoJ"]),
                        "value": round(random.uniform(0, 5), 2),
                        "unit": "percent",
                        "next_meeting": (datetime.now() + timedelta(days=random.randint(10, 45))).isoformat(),
                        "market_expectation": random.choice(["hike", "cut", "hold"])
                    }
                ]
                
                economic_data = random.choice(indicators)
                economic_data["impact_assessment"] = random.choice([
                    "Positive for equity markets",
                    "Negative for bond yields",
                    "Neutral impact expected",
                    "Mixed market reaction likely"
                ])
                
                await self._broadcast_data(DataType.ECONOMIC_INDICATOR, economic_data)
                
            except Exception as e:
                logger.error(f"Error generating economic indicators: {e}")
                await asyncio.sleep(5)
    
    async def _generate_geopolitical_events(self):
        """Generate geopolitical event notifications"""
        event_id_counter = 1
        
        while self.running:
            try:
                # Geopolitical events every 15-30 seconds
                await asyncio.sleep(random.uniform(15, 30))
                
                event_types = [
                    "diplomatic_development",
                    "trade_agreement",
                    "sanctions_update",
                    "military_exercise",
                    "election_update",
                    "policy_announcement"
                ]
                
                event_scenarios = {
                    "diplomatic_development": [
                        "High-level diplomatic talks scheduled",
                        "Embassy recall announced",
                        "New strategic partnership formed",
                        "Diplomatic relations normalized"
                    ],
                    "trade_agreement": [
                        "New bilateral trade deal signed",
                        "Trade restrictions lifted",
                        "Tariff negotiations commenced",
                        "Supply chain agreement reached"
                    ],
                    "sanctions_update": [
                        "New sanctions package announced",
                        "Sanctions relief negotiations",
                        "Secondary sanctions warning issued",
                        "Asset freeze implemented"
                    ],
                    "military_exercise": [
                        "Joint military exercises announced",
                        "Naval operations in strategic waters",
                        "Air defense systems deployment",
                        "Peacekeeping mission launched"
                    ],
                    "election_update": [
                        "Election results impact assessment",
                        "Policy shift expected post-election",
                        "Coalition government formed",
                        "Referendum announced"
                    ],
                    "policy_announcement": [
                        "Major economic policy shift",
                        "Climate policy update",
                        "Technology regulation announced",
                        "Immigration policy changes"
                    ]
                }
                
                event_type = random.choice(event_types)
                regions = random.sample(self.jurisdictions, k=random.randint(1, 3))
                
                geopolitical_event = {
                    "event_id": f"GEO-{event_id_counter:06d}",
                    "event_type": event_type,
                    "description": random.choice(event_scenarios[event_type]),
                    "regions_affected": regions,
                    "impact_level": random.choice(["low", "medium", "high", "critical"]),
                    "market_impact": {
                        "currencies": random.choice(["volatile", "stable", "strengthening", "weakening"]),
                        "commodities": random.choice(["rising", "falling", "volatile", "stable"]),
                        "equities": random.choice(["positive", "negative", "mixed", "neutral"])
                    },
                    "risk_assessment": random.choice([
                        "Heightened geopolitical risk",
                        "Reduced regional tensions",
                        "Increased economic uncertainty",
                        "Improved stability outlook"
                    ]),
                    "monitoring_recommendation": "Enhanced surveillance recommended"
                }
                
                await self._broadcast_data(DataType.GEOPOLITICAL_EVENT, geopolitical_event)
                event_id_counter += 1
                
            except Exception as e:
                logger.error(f"Error generating geopolitical events: {e}")
                await asyncio.sleep(15)

# Global instance
realtime_simulator = RealtimeDataSimulator()
