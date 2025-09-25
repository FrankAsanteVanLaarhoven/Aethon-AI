"""
Real-Time Data Acquisition Service
Aggregates live feeds from multiple industry-standard sources for world-leading quant reports
"""

import asyncio
import aiohttp
import websockets
import json
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import logging
from dataclasses import dataclass
from enum import Enum

logger = logging.getLogger(__name__)

class DataSource(Enum):
    FINAGE = "finage"
    FINNHUB = "finnhub"
    ALPHA_VANTAGE = "alpha_vantage"
    MARKETSTACK = "marketstack"
    FINANCIAL_MODELING_PREP = "financial_modeling_prep"
    WTO_TARIFF = "wto_tariff"
    UK_GOV_TRADE = "uk_gov_trade"
    DBT_DATA = "dbt_data"
    QUIVER_QUANTITATIVE = "quiver_quantitative"

@dataclass
class MarketData:
    symbol: str
    price: float
    change: float
    change_percent: float
    volume: int
    timestamp: datetime
    source: DataSource
    market_cap: Optional[float] = None
    pe_ratio: Optional[float] = None
    dividend_yield: Optional[float] = None

@dataclass
class TradeData:
    country: str
    commodity_code: str
    tariff_rate: float
    quota: Optional[float]
    effective_date: datetime
    source: DataSource
    description: Optional[str] = None

@dataclass
class GovernmentData:
    country: str
    policy_type: str
    title: str
    description: str
    effective_date: datetime
    impact_score: float
    source: DataSource
    url: Optional[str] = None

class DataAcquisitionService:
    """Unified data acquisition service for real-time market and government data"""
    
    def __init__(self):
        self.api_keys = {
            DataSource.FINAGE: "your_finage_api_key",
            DataSource.FINNHUB: "your_finnhub_api_key", 
            DataSource.ALPHA_VANTAGE: "your_alpha_vantage_api_key",
            DataSource.MARKETSTACK: "your_marketstack_api_key",
            DataSource.FINANCIAL_MODELING_PREP: "your_fmp_api_key",
            DataSource.QUIVER_QUANTITATIVE: "your_quiver_api_key"
        }
        self.websocket_connections = {}
        self.data_cache = {}
        self.subscribers = []
        
    async def initialize(self):
        """Initialize all data connections"""
        await self._setup_websocket_connections()
        await self._start_data_streams()
        
    async def _setup_websocket_connections(self):
        """Setup WebSocket connections for real-time data"""
        try:
            # Finage WebSocket for real-time stock data
            finage_ws = await websockets.connect(
                f"wss://api.finage.co.uk/ws?token={self.api_keys[DataSource.FINAGE]}"
            )
            self.websocket_connections[DataSource.FINAGE] = finage_ws
            
            # Finnhub WebSocket for additional market data
            finnhub_ws = await websockets.connect(
                f"wss://ws.finnhub.io?token={self.api_keys[DataSource.FINNHUB]}"
            )
            self.websocket_connections[DataSource.FINNHUB] = finnhub_ws
            
            logger.info("WebSocket connections established")
            
        except Exception as e:
            logger.error(f"Failed to setup WebSocket connections: {e}")
            
    async def _start_data_streams(self):
        """Start background data streaming tasks"""
        asyncio.create_task(self._stream_finage_data())
        asyncio.create_task(self._stream_finnhub_data())
        asyncio.create_task(self._poll_government_data())
        
    async def _stream_finage_data(self):
        """Stream real-time data from Finage"""
        try:
            ws = self.websocket_connections.get(DataSource.FINAGE)
            if not ws:
                return
                
            # Subscribe to major indices and stocks
            subscription = {
                "action": "subscribe",
                "symbols": ["AAPL", "TSLA", "MSFT", "GOOGL", "AMZN", "^GSPC", "^DJI", "^IXIC"]
            }
            await ws.send(json.dumps(subscription))
            
            async for message in ws:
                try:
                    data = json.loads(message)
                    market_data = self._parse_finage_data(data)
                    if market_data:
                        await self._process_market_data(market_data)
                except json.JSONDecodeError:
                    continue
                    
        except Exception as e:
            logger.error(f"Finage stream error: {e}")
            
    async def _stream_finnhub_data(self):
        """Stream additional data from Finnhub"""
        try:
            ws = self.websocket_connections.get(DataSource.FINNHUB)
            if not ws:
                return
                
            # Subscribe to trade data
            subscription = {
                "type": "subscribe",
                "symbol": "AAPL"
            }
            await ws.send(json.dumps(subscription))
            
            async for message in ws:
                try:
                    data = json.loads(message)
                    market_data = self._parse_finnhub_data(data)
                    if market_data:
                        await self._process_market_data(market_data)
                except json.JSONDecodeError:
                    continue
                    
        except Exception as e:
            logger.error(f"Finnhub stream error: {e}")
            
    async def _poll_government_data(self):
        """Poll government APIs for policy and trade data"""
        while True:
            try:
                await self._fetch_wto_tariff_data()
                await self._fetch_uk_trade_data()
                await self._fetch_dbt_data()
                await asyncio.sleep(3600)  # Poll every hour
            except Exception as e:
                logger.error(f"Government data polling error: {e}")
                await asyncio.sleep(300)  # Retry in 5 minutes
                
    async def _fetch_wto_tariff_data(self):
        """Fetch WTO tariff data"""
        try:
            async with aiohttp.ClientSession() as session:
                # WTO Tariff Data API
                url = "https://www.wto.org/english/tratop_e/tariffs_e/tariff_data_e.htm"
                # Note: WTO doesn't have a direct API, would need web scraping or alternative source
                
                # Alternative: Use UN Comtrade API for trade data
                comtrade_url = "https://comtradeapi.un.org/data/v1/get"
                params = {
                    "max": 1000,
                    "type": "C",
                    "freq": "A",
                    "px": "HS",
                    "ps": "2022",
                    "r": "all",
                    "p": "all"
                }
                
                async with session.get(comtrade_url, params=params) as response:
                    if response.status == 200:
                        data = await response.json()
                        trade_data = self._parse_wto_data(data)
                        await self._process_trade_data(trade_data)
                        
        except Exception as e:
            logger.error(f"WTO data fetch error: {e}")
            
    async def _fetch_uk_trade_data(self):
        """Fetch UK Government trade tariff data"""
        try:
            async with aiohttp.ClientSession() as session:
                url = "https://www.trade-tariff.service.gov.uk/uk/api"
                
                async with session.get(url) as response:
                    if response.status == 200:
                        data = await response.json()
                        trade_data = self._parse_uk_trade_data(data)
                        await self._process_trade_data(trade_data)
                        
        except Exception as e:
            logger.error(f"UK trade data fetch error: {e}")
            
    async def _fetch_dbt_data(self):
        """Fetch Department for Business and Trade data"""
        try:
            async with aiohttp.ClientSession() as session:
                url = "https://data.api.trade.gov.uk/datasets"
                
                async with session.get(url) as response:
                    if response.status == 200:
                        data = await response.json()
                        gov_data = self._parse_dbt_data(data)
                        await self._process_government_data(gov_data)
                        
        except Exception as e:
            logger.error(f"DBT data fetch error: {e}")
            
    def _parse_finage_data(self, data: Dict) -> Optional[MarketData]:
        """Parse Finage WebSocket data"""
        try:
            if data.get("type") == "trade":
                return MarketData(
                    symbol=data["symbol"],
                    price=float(data["price"]),
                    change=float(data.get("change", 0)),
                    change_percent=float(data.get("change_percent", 0)),
                    volume=int(data.get("volume", 0)),
                    timestamp=datetime.now(),
                    source=DataSource.FINAGE
                )
        except (KeyError, ValueError, TypeError):
            pass
        return None
        
    def _parse_finnhub_data(self, data: Dict) -> Optional[MarketData]:
        """Parse Finnhub WebSocket data"""
        try:
            if data.get("type") == "trade":
                return MarketData(
                    symbol=data["data"][0]["s"],
                    price=float(data["data"][0]["p"]),
                    change=0,  # Calculate from previous price
                    change_percent=0,
                    volume=int(data["data"][0]["v"]),
                    timestamp=datetime.fromtimestamp(data["data"][0]["t"] / 1000),
                    source=DataSource.FINNHUB
                )
        except (KeyError, ValueError, TypeError):
            pass
        return None
        
    def _parse_wto_data(self, data: Dict) -> List[TradeData]:
        """Parse WTO/UN Comtrade data"""
        trade_data = []
        try:
            for item in data.get("data", []):
                trade_data.append(TradeData(
                    country=item.get("rtTitle", ""),
                    commodity_code=item.get("cmdCode", ""),
                    tariff_rate=float(item.get("TariffRate", 0)),
                    quota=float(item.get("Quota", 0)) if item.get("Quota") else None,
                    effective_date=datetime.now(),
                    source=DataSource.WTO_TARIFF,
                    description=item.get("cmdDescE", "")
                ))
        except (KeyError, ValueError, TypeError):
            pass
        return trade_data
        
    def _parse_uk_trade_data(self, data: Dict) -> List[TradeData]:
        """Parse UK trade tariff data"""
        trade_data = []
        try:
            for item in data.get("data", []):
                trade_data.append(TradeData(
                    country="UK",
                    commodity_code=item.get("commodity_code", ""),
                    tariff_rate=float(item.get("duty_rate", 0)),
                    quota=None,
                    effective_date=datetime.now(),
                    source=DataSource.UK_GOV_TRADE,
                    description=item.get("description", "")
                ))
        except (KeyError, ValueError, TypeError):
            pass
        return trade_data
        
    def _parse_dbt_data(self, data: Dict) -> List[GovernmentData]:
        """Parse DBT government data"""
        gov_data = []
        try:
            for item in data.get("datasets", []):
                gov_data.append(GovernmentData(
                    country="UK",
                    policy_type=item.get("category", ""),
                    title=item.get("title", ""),
                    description=item.get("description", ""),
                    effective_date=datetime.now(),
                    impact_score=float(item.get("impact_score", 0)),
                    source=DataSource.DBT_DATA,
                    url=item.get("url", "")
                ))
        except (KeyError, ValueError, TypeError):
            pass
        return gov_data
        
    async def _process_market_data(self, market_data: MarketData):
        """Process and cache market data"""
        self.data_cache[f"market_{market_data.symbol}"] = market_data
        await self._notify_subscribers("market_data", market_data)
        
    async def _process_trade_data(self, trade_data: List[TradeData]):
        """Process and cache trade data"""
        for data in trade_data:
            key = f"trade_{data.country}_{data.commodity_code}"
            self.data_cache[key] = data
        await self._notify_subscribers("trade_data", trade_data)
        
    async def _process_government_data(self, gov_data: List[GovernmentData]):
        """Process and cache government data"""
        for data in gov_data:
            key = f"gov_{data.country}_{data.policy_type}"
            self.data_cache[key] = data
        await self._notify_subscribers("government_data", gov_data)
        
    async def _notify_subscribers(self, data_type: str, data: Any):
        """Notify all subscribers of new data"""
        for subscriber in self.subscribers:
            try:
                await subscriber(data_type, data)
            except Exception as e:
                logger.error(f"Subscriber notification error: {e}")
                
    async def get_real_time_quotes(self, symbols: List[str]) -> Dict[str, MarketData]:
        """Get real-time quotes for specified symbols"""
        quotes = {}
        for symbol in symbols:
            key = f"market_{symbol}"
            if key in self.data_cache:
                quotes[symbol] = self.data_cache[key]
        return quotes
        
    async def get_trade_data(self, country: str = None, commodity_code: str = None) -> List[TradeData]:
        """Get trade/tariff data"""
        trade_data = []
        for key, value in self.data_cache.items():
            if key.startswith("trade_"):
                if isinstance(value, TradeData):
                    if country and value.country != country:
                        continue
                    if commodity_code and value.commodity_code != commodity_code:
                        continue
                    trade_data.append(value)
        return trade_data
        
    async def get_government_data(self, country: str = None, policy_type: str = None) -> List[GovernmentData]:
        """Get government policy data"""
        gov_data = []
        for key, value in self.data_cache.items():
            if key.startswith("gov_"):
                if isinstance(value, GovernmentData):
                    if country and value.country != country:
                        continue
                    if policy_type and value.policy_type != policy_type:
                        continue
                    gov_data.append(value)
        return gov_data
        
    def subscribe(self, callback):
        """Subscribe to real-time data updates"""
        self.subscribers.append(callback)
        
    async def close(self):
        """Close all connections"""
        for ws in self.websocket_connections.values():
            await ws.close()
        self.websocket_connections.clear()

# Global instance
data_service = DataAcquisitionService()
