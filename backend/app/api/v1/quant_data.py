"""
Quantitative Data API Endpoints
Real-time market data, government data, and quantitative analytics
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks, Query
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import asyncio
import logging

from app.services.data_acquisition import data_service, MarketData, TradeData, GovernmentData
from app.services.quant_models import quant_service, QuantMetrics, RiskAssessment, SectorAnalysis, PortfolioOptimization

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/market/quotes")
async def get_real_time_quotes(
    symbols: str = Query(..., description="Comma-separated list of symbols"),
    sources: Optional[str] = Query(None, description="Data sources to use")
) -> Dict[str, Any]:
    """Get real-time market quotes from multiple sources"""
    try:
        symbol_list = [s.strip().upper() for s in symbols.split(",")]
        quotes = await data_service.get_real_time_quotes(symbol_list)
        
        return {
            "status": "success",
            "timestamp": datetime.now(),
            "symbols": symbol_list,
            "quotes": {
                symbol: {
                    "price": quote.price,
                    "change": quote.change,
                    "change_percent": quote.change_percent,
                    "volume": quote.volume,
                    "source": quote.source.value,
                    "timestamp": quote.timestamp
                } for symbol, quote in quotes.items()
            },
            "sources_used": list(set([quote.source.value for quote in quotes.values()]))
        }
    except Exception as e:
        logger.error(f"Error fetching real-time quotes: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/market/historical")
async def get_historical_data(
    symbol: str = Query(..., description="Stock symbol"),
    period: str = Query("1y", description="Time period (1d, 1w, 1m, 3m, 1y, 5y)"),
    interval: str = Query("1d", description="Data interval (1m, 5m, 15m, 1h, 1d)")
) -> Dict[str, Any]:
    """Get historical market data"""
    try:
        # Placeholder implementation - would integrate with actual data sources
        historical_data = {
            "symbol": symbol,
            "period": period,
            "interval": interval,
            "data": [
                {
                    "timestamp": (datetime.now() - timedelta(days=i)).isoformat(),
                    "open": 100 + i * 0.5,
                    "high": 102 + i * 0.5,
                    "low": 98 + i * 0.5,
                    "close": 101 + i * 0.5,
                    "volume": 1000000 + i * 10000
                } for i in range(30)
            ]
        }
        
        return {
            "status": "success",
            "data": historical_data
        }
    except Exception as e:
        logger.error(f"Error fetching historical data: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/trade/tariffs")
async def get_trade_tariff_data(
    country: Optional[str] = Query(None, description="Country code"),
    commodity_code: Optional[str] = Query(None, description="Commodity code"),
    source: Optional[str] = Query(None, description="Data source")
) -> Dict[str, Any]:
    """Get trade and tariff data from government sources"""
    try:
        trade_data = await data_service.get_trade_data(country, commodity_code)
        
        return {
            "status": "success",
            "timestamp": datetime.now(),
            "filters": {
                "country": country,
                "commodity_code": commodity_code,
                "source": source
            },
            "data": [
                {
                    "country": data.country,
                    "commodity_code": data.commodity_code,
                    "tariff_rate": data.tariff_rate,
                    "quota": data.quota,
                    "effective_date": data.effective_date.isoformat(),
                    "source": data.source.value,
                    "description": data.description
                } for data in trade_data
            ],
            "total_records": len(trade_data)
        }
    except Exception as e:
        logger.error(f"Error fetching trade data: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/government/policies")
async def get_government_policy_data(
    country: Optional[str] = Query(None, description="Country code"),
    policy_type: Optional[str] = Query(None, description="Policy type"),
    impact_threshold: Optional[float] = Query(0.5, description="Minimum impact score")
) -> Dict[str, Any]:
    """Get government policy and regulatory data"""
    try:
        gov_data = await data_service.get_government_data(country, policy_type)
        
        # Filter by impact threshold
        filtered_data = [
            data for data in gov_data 
            if data.impact_score >= impact_threshold
        ]
        
        return {
            "status": "success",
            "timestamp": datetime.now(),
            "filters": {
                "country": country,
                "policy_type": policy_type,
                "impact_threshold": impact_threshold
            },
            "data": [
                {
                    "country": data.country,
                    "policy_type": data.policy_type,
                    "title": data.title,
                    "description": data.description,
                    "effective_date": data.effective_date.isoformat(),
                    "impact_score": data.impact_score,
                    "source": data.source.value,
                    "url": data.url
                } for data in filtered_data
            ],
            "total_records": len(filtered_data)
        }
    except Exception as e:
        logger.error(f"Error fetching government data: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/quant/analyze")
async def analyze_quantitative_metrics(
    symbols: List[str],
    analysis_type: str = Query("comprehensive", description="Type of analysis")
) -> Dict[str, Any]:
    """Perform comprehensive quantitative analysis"""
    try:
        # Mock market data for analysis
        market_data = {}
        for symbol in symbols:
            market_data[symbol] = {
                "market_cap": 1000000000,  # 1B
                "pe_ratio": 15.5,
                "pb_ratio": 2.1,
                "debt_to_equity": 0.3,
                "roe": 0.12,
                "roa": 0.08,
                "current_ratio": 1.5,
                "quick_ratio": 1.2,
                "gross_margin": 0.35,
                "operating_margin": 0.15,
                "net_margin": 0.10,
                "revenue_growth": 0.08,
                "earnings_growth": 0.12
            }
        
        # Generate comprehensive quant report
        report = await quant_service.generate_quant_report(symbols, market_data)
        
        return {
            "status": "success",
            "analysis_type": analysis_type,
            "symbols": symbols,
            "report": report
        }
    except Exception as e:
        logger.error(f"Error performing quantitative analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/quant/risk-assessment/{symbol}")
async def get_risk_assessment(symbol: str) -> Dict[str, Any]:
    """Get detailed risk assessment for a specific symbol"""
    try:
        # Mock data for risk assessment
        price_data = [100, 102, 98, 105, 103, 107, 104, 109, 106, 111]
        financial_data = {
            "market_cap": 1000000000,
            "pe_ratio": 15.5,
            "pb_ratio": 2.1,
            "debt_to_equity": 0.3,
            "roe": 0.12,
            "roa": 0.08,
            "current_ratio": 1.5,
            "quick_ratio": 1.2,
            "gross_margin": 0.35,
            "operating_margin": 0.15,
            "net_margin": 0.10,
            "revenue_growth": 0.08,
            "earnings_growth": 0.12
        }
        
        # Calculate quant metrics
        quant_metrics = await quant_service.calculate_quant_metrics(
            symbol, price_data, financial_data
        )
        
        if not quant_metrics:
            raise HTTPException(status_code=404, detail="Unable to calculate metrics")
        
        # Assess risk
        risk_assessment = await quant_service.assess_risk(
            symbol, quant_metrics, {symbol: financial_data}
        )
        
        return {
            "status": "success",
            "symbol": symbol,
            "quant_metrics": {
                "market_cap": quant_metrics.market_cap,
                "pe_ratio": quant_metrics.pe_ratio,
                "pb_ratio": quant_metrics.pb_ratio,
                "debt_to_equity": quant_metrics.debt_to_equity,
                "roe": quant_metrics.roe,
                "roa": quant_metrics.roa,
                "current_ratio": quant_metrics.current_ratio,
                "quick_ratio": quant_metrics.quick_ratio,
                "gross_margin": quant_metrics.gross_margin,
                "operating_margin": quant_metrics.operating_margin,
                "net_margin": quant_metrics.net_margin,
                "revenue_growth": quant_metrics.revenue_growth,
                "earnings_growth": quant_metrics.earnings_growth,
                "beta": quant_metrics.beta,
                "sharpe_ratio": quant_metrics.sharpe_ratio,
                "max_drawdown": quant_metrics.max_drawdown,
                "var_95": quant_metrics.var_95,
                "var_99": quant_metrics.var_99,
                "expected_shortfall": quant_metrics.expected_shortfall
            },
            "risk_assessment": {
                "overall_risk": risk_assessment.overall_risk.value,
                "market_risk": risk_assessment.market_risk,
                "credit_risk": risk_assessment.credit_risk,
                "liquidity_risk": risk_assessment.liquidity_risk,
                "operational_risk": risk_assessment.operational_risk,
                "regulatory_risk": risk_assessment.regulatory_risk,
                "risk_score": risk_assessment.risk_score,
                "risk_factors": risk_assessment.risk_factors,
                "recommendations": risk_assessment.recommendations
            },
            "timestamp": datetime.now()
        }
    except Exception as e:
        logger.error(f"Error assessing risk for {symbol}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/quant/sector-analysis/{sector}")
async def get_sector_analysis(sector: str) -> Dict[str, Any]:
    """Get comprehensive sector analysis"""
    try:
        # Mock symbols for sector
        symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "META"]
        market_data = {}
        
        for symbol in symbols:
            market_data[symbol] = {
                "market_cap": 1000000000,
                "pe_ratio": 15.5,
                "pb_ratio": 2.1,
                "debt_to_equity": 0.3,
                "roe": 0.12,
                "roa": 0.08,
                "current_ratio": 1.5,
                "quick_ratio": 1.2,
                "gross_margin": 0.35,
                "operating_margin": 0.15,
                "net_margin": 0.10,
                "revenue_growth": 0.08,
                "earnings_growth": 0.12,
                "beta": 1.2,
                "sharpe_ratio": 0.8,
                "max_drawdown": -0.15,
                "var_95": -0.05,
                "var_99": -0.08,
                "expected_shortfall": -0.06
            }
        
        sector_analysis = await quant_service.analyze_sector(sector, symbols, market_data)
        
        if not sector_analysis:
            raise HTTPException(status_code=404, detail="Unable to analyze sector")
        
        return {
            "status": "success",
            "sector": sector,
            "analysis": {
                "market_cap_weight": sector_analysis.market_cap_weight,
                "avg_pe_ratio": sector_analysis.avg_pe_ratio,
                "avg_pb_ratio": sector_analysis.avg_pb_ratio,
                "avg_roe": sector_analysis.avg_roe,
                "avg_roa": sector_analysis.avg_roa,
                "sector_beta": sector_analysis.sector_beta,
                "correlation_matrix": sector_analysis.correlation_matrix,
                "top_performers": sector_analysis.top_performers,
                "underperformers": sector_analysis.underperformers,
                "outlook": sector_analysis.outlook
            },
            "timestamp": datetime.now()
        }
    except Exception as e:
        logger.error(f"Error analyzing sector {sector}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/quant/portfolio-optimize")
async def optimize_portfolio(
    symbols: List[str],
    risk_tolerance: float = Query(0.1, description="Risk tolerance level"),
    target_return: Optional[float] = Query(None, description="Target return")
) -> Dict[str, Any]:
    """Optimize portfolio using Modern Portfolio Theory"""
    try:
        # Mock expected returns
        expected_returns = {symbol: 0.1 for symbol in symbols}
        
        portfolio_optimization = await quant_service.optimize_portfolio(
            symbols, expected_returns, risk_tolerance
        )
        
        if not portfolio_optimization:
            raise HTTPException(status_code=500, detail="Unable to optimize portfolio")
        
        return {
            "status": "success",
            "portfolio_id": portfolio_optimization.portfolio_id,
            "optimization": {
                "expected_return": portfolio_optimization.expected_return,
                "volatility": portfolio_optimization.volatility,
                "sharpe_ratio": portfolio_optimization.sharpe_ratio,
                "max_drawdown": portfolio_optimization.max_drawdown,
                "var_95": portfolio_optimization.var_95,
                "optimal_weights": portfolio_optimization.optimal_weights,
                "efficient_frontier": portfolio_optimization.efficient_frontier,
                "risk_contribution": portfolio_optimization.risk_contribution,
                "rebalancing_schedule": [
                    date.isoformat() for date in portfolio_optimization.rebalancing_schedule
                ]
            },
            "timestamp": datetime.now()
        }
    except Exception as e:
        logger.error(f"Error optimizing portfolio: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/data/sources")
async def get_data_sources() -> Dict[str, Any]:
    """Get information about available data sources"""
    return {
        "status": "success",
        "market_data_sources": [
            {
                "name": "Finage",
                "type": "Real-time & Historical",
                "coverage": "55+ global markets",
                "features": ["Stocks", "Forex", "Crypto", "Commodities", "Indices"],
                "latency": "Millisecond-level",
                "api_type": "REST & WebSocket"
            },
            {
                "name": "Finnhub",
                "type": "Real-time & Historical",
                "coverage": "Global",
                "features": ["Stocks", "Forex", "Crypto", "News", "Insider Trading"],
                "latency": "Real-time",
                "api_type": "REST & WebSocket"
            },
            {
                "name": "Alpha Vantage",
                "type": "Historical & Real-time",
                "coverage": "Global",
                "features": ["Stocks", "Forex", "Crypto", "Technical Indicators"],
                "latency": "Real-time",
                "api_type": "REST"
            },
            {
                "name": "Marketstack",
                "type": "Historical & Real-time",
                "coverage": "Global",
                "features": ["Stocks", "Indices", "EOD Data"],
                "latency": "Real-time",
                "api_type": "REST"
            }
        ],
        "government_data_sources": [
            {
                "name": "WTO Tariff Data",
                "type": "Trade & Tariff",
                "coverage": "150+ economies",
                "features": ["Customs Duty", "Tariff Rates", "Quotas"],
                "update_frequency": "Daily",
                "api_type": "REST"
            },
            {
                "name": "UK GOV Trade Tariff",
                "type": "Trade & Tariff",
                "coverage": "UK",
                "features": ["Commodity Data", "Customs", "VAT", "Trade Controls"],
                "update_frequency": "Real-time",
                "api_type": "REST"
            },
            {
                "name": "DBT Data API",
                "type": "Business & Trade",
                "coverage": "UK",
                "features": ["Business Data", "Trade Data", "Regulatory Actions"],
                "update_frequency": "Daily",
                "api_type": "REST"
            }
        ],
        "quantitative_features": [
            "Real-time risk assessment",
            "Portfolio optimization",
            "Sector analysis",
            "Value at Risk (VaR)",
            "Expected Shortfall",
            "Sharpe ratio calculation",
            "Beta calculation",
            "Correlation analysis",
            "Efficient frontier",
            "Risk attribution"
        ]
    }

@router.post("/data/initialize")
async def initialize_data_services(background_tasks: BackgroundTasks) -> Dict[str, Any]:
    """Initialize all data acquisition services"""
    try:
        background_tasks.add_task(data_service.initialize)
        
        return {
            "status": "success",
            "message": "Data services initialization started",
            "services": [
                "Real-time market data streams",
                "Government policy monitoring",
                "Trade tariff data collection",
                "Quantitative analytics engine"
            ],
            "timestamp": datetime.now()
        }
    except Exception as e:
        logger.error(f"Error initializing data services: {e}")
        raise HTTPException(status_code=500, detail=str(e))
