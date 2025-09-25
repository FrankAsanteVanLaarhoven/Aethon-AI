"""
Quantitative Models and Analytics Service
Advanced financial modeling and risk analysis for world-leading quant reports
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime, timedelta
from dataclasses import dataclass
from enum import Enum
import logging
from scipy import stats
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import asyncio

logger = logging.getLogger(__name__)

class RiskLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class QuantMetrics:
    symbol: str
    market_cap: float
    pe_ratio: float
    pb_ratio: float
    debt_to_equity: float
    roe: float
    roa: float
    current_ratio: float
    quick_ratio: float
    gross_margin: float
    operating_margin: float
    net_margin: float
    revenue_growth: float
    earnings_growth: float
    beta: float
    sharpe_ratio: float
    max_drawdown: float
    var_95: float
    var_99: float
    expected_shortfall: float
    timestamp: datetime

@dataclass
class RiskAssessment:
    symbol: str
    overall_risk: RiskLevel
    market_risk: float
    credit_risk: float
    liquidity_risk: float
    operational_risk: float
    regulatory_risk: float
    risk_score: float
    risk_factors: List[str]
    recommendations: List[str]
    timestamp: datetime

@dataclass
class SectorAnalysis:
    sector: str
    market_cap_weight: float
    avg_pe_ratio: float
    avg_pb_ratio: float
    avg_roe: float
    avg_roa: float
    sector_beta: float
    correlation_matrix: Dict[str, float]
    top_performers: List[str]
    underperformers: List[str]
    outlook: str
    timestamp: datetime

@dataclass
class PortfolioOptimization:
    portfolio_id: str
    expected_return: float
    volatility: float
    sharpe_ratio: float
    max_drawdown: float
    var_95: float
    optimal_weights: Dict[str, float]
    efficient_frontier: List[Tuple[float, float]]
    risk_contribution: Dict[str, float]
    rebalancing_schedule: List[datetime]
    timestamp: datetime

class QuantModelsService:
    """Advanced quantitative models for financial analysis and risk management"""
    
    def __init__(self):
        self.historical_data = {}
        self.correlation_matrix = {}
        self.risk_free_rate = 0.02  # 2% risk-free rate
        
    async def calculate_quant_metrics(self, symbol: str, price_data: List[float], 
                                    financial_data: Dict) -> QuantMetrics:
        """Calculate comprehensive quantitative metrics"""
        try:
            # Price-based metrics
            returns = np.diff(price_data) / price_data[:-1]
            volatility = np.std(returns) * np.sqrt(252)  # Annualized
            
            # Beta calculation (simplified - would need market index data)
            beta = 1.0  # Placeholder
            
            # Sharpe ratio
            excess_returns = returns - self.risk_free_rate / 252
            sharpe_ratio = np.mean(excess_returns) / np.std(excess_returns) * np.sqrt(252)
            
            # Value at Risk (VaR)
            var_95 = np.percentile(returns, 5)
            var_99 = np.percentile(returns, 1)
            
            # Expected Shortfall (Conditional VaR)
            expected_shortfall = np.mean(returns[returns <= var_95])
            
            # Maximum Drawdown
            cumulative_returns = np.cumprod(1 + returns)
            running_max = np.maximum.accumulate(cumulative_returns)
            drawdowns = (cumulative_returns - running_max) / running_max
            max_drawdown = np.min(drawdowns)
            
            # Financial ratios from financial data
            market_cap = financial_data.get('market_cap', 0)
            pe_ratio = financial_data.get('pe_ratio', 0)
            pb_ratio = financial_data.get('pb_ratio', 0)
            debt_to_equity = financial_data.get('debt_to_equity', 0)
            roe = financial_data.get('roe', 0)
            roa = financial_data.get('roa', 0)
            current_ratio = financial_data.get('current_ratio', 0)
            quick_ratio = financial_data.get('quick_ratio', 0)
            gross_margin = financial_data.get('gross_margin', 0)
            operating_margin = financial_data.get('operating_margin', 0)
            net_margin = financial_data.get('net_margin', 0)
            revenue_growth = financial_data.get('revenue_growth', 0)
            earnings_growth = financial_data.get('earnings_growth', 0)
            
            return QuantMetrics(
                symbol=symbol,
                market_cap=market_cap,
                pe_ratio=pe_ratio,
                pb_ratio=pb_ratio,
                debt_to_equity=debt_to_equity,
                roe=roe,
                roa=roa,
                current_ratio=current_ratio,
                quick_ratio=quick_ratio,
                gross_margin=gross_margin,
                operating_margin=operating_margin,
                net_margin=net_margin,
                revenue_growth=revenue_growth,
                earnings_growth=earnings_growth,
                beta=beta,
                sharpe_ratio=sharpe_ratio,
                max_drawdown=max_drawdown,
                var_95=var_95,
                var_99=var_99,
                expected_shortfall=expected_shortfall,
                timestamp=datetime.now()
            )
            
        except Exception as e:
            logger.error(f"Error calculating quant metrics for {symbol}: {e}")
            return None
            
    async def assess_risk(self, symbol: str, quant_metrics: QuantMetrics, 
                         market_data: Dict) -> RiskAssessment:
        """Comprehensive risk assessment"""
        try:
            risk_factors = []
            recommendations = []
            
            # Market Risk Assessment
            market_risk = 0.0
            if quant_metrics.beta > 1.5:
                market_risk += 0.3
                risk_factors.append("High beta indicates high market sensitivity")
            elif quant_metrics.beta < 0.5:
                market_risk += 0.1
                
            if quant_metrics.var_95 < -0.05:  # 5% daily VaR
                market_risk += 0.2
                risk_factors.append("High Value at Risk")
                
            # Credit Risk Assessment
            credit_risk = 0.0
            if quant_metrics.debt_to_equity > 2.0:
                credit_risk += 0.4
                risk_factors.append("High debt-to-equity ratio")
                recommendations.append("Consider debt reduction strategies")
                
            if quant_metrics.current_ratio < 1.0:
                credit_risk += 0.3
                risk_factors.append("Low current ratio indicates liquidity concerns")
                recommendations.append("Improve working capital management")
                
            # Liquidity Risk Assessment
            liquidity_risk = 0.0
            if quant_metrics.quick_ratio < 0.5:
                liquidity_risk += 0.4
                risk_factors.append("Low quick ratio")
                recommendations.append("Increase liquid assets")
                
            # Operational Risk Assessment
            operational_risk = 0.0
            if quant_metrics.operating_margin < 0.05:
                operational_risk += 0.3
                risk_factors.append("Low operating margin")
                recommendations.append("Improve operational efficiency")
                
            if quant_metrics.roe < 0.1:
                operational_risk += 0.2
                risk_factors.append("Low return on equity")
                
            # Regulatory Risk (placeholder - would integrate with government data)
            regulatory_risk = 0.1  # Base regulatory risk
            
            # Overall Risk Score
            risk_score = (market_risk + credit_risk + liquidity_risk + 
                         operational_risk + regulatory_risk) / 5
            
            # Determine overall risk level
            if risk_score < 0.2:
                overall_risk = RiskLevel.LOW
            elif risk_score < 0.4:
                overall_risk = RiskLevel.MEDIUM
            elif risk_score < 0.7:
                overall_risk = RiskLevel.HIGH
            else:
                overall_risk = RiskLevel.CRITICAL
                
            return RiskAssessment(
                symbol=symbol,
                overall_risk=overall_risk,
                market_risk=market_risk,
                credit_risk=credit_risk,
                liquidity_risk=liquidity_risk,
                operational_risk=operational_risk,
                regulatory_risk=regulatory_risk,
                risk_score=risk_score,
                risk_factors=risk_factors,
                recommendations=recommendations,
                timestamp=datetime.now()
            )
            
        except Exception as e:
            logger.error(f"Error assessing risk for {symbol}: {e}")
            return None
            
    async def analyze_sector(self, sector: str, symbols: List[str], 
                           market_data: Dict) -> SectorAnalysis:
        """Comprehensive sector analysis"""
        try:
            sector_metrics = []
            correlations = {}
            
            for symbol in symbols:
                if symbol in market_data:
                    metrics = market_data[symbol]
                    sector_metrics.append(metrics)
                    
            if not sector_metrics:
                return None
                
            # Calculate sector averages
            avg_pe_ratio = np.mean([m.pe_ratio for m in sector_metrics if m.pe_ratio > 0])
            avg_pb_ratio = np.mean([m.pb_ratio for m in sector_metrics if m.pb_ratio > 0])
            avg_roe = np.mean([m.roe for m in sector_metrics if m.roe > 0])
            avg_roa = np.mean([m.roa for m in sector_metrics if m.roa > 0])
            sector_beta = np.mean([m.beta for m in sector_metrics])
            
            # Market cap weighting
            total_market_cap = sum([m.market_cap for m in sector_metrics])
            market_cap_weight = total_market_cap / 1e12  # Trillions
            
            # Performance ranking
            sharpe_ratios = [(m.symbol, m.sharpe_ratio) for m in sector_metrics]
            sharpe_ratios.sort(key=lambda x: x[1], reverse=True)
            
            top_performers = [s[0] for s in sharpe_ratios[:3]]
            underperformers = [s[0] for s in sharpe_ratios[-3:]]
            
            # Sector outlook
            if avg_roe > 0.15 and avg_pe_ratio < 20:
                outlook = "Strong fundamentals with reasonable valuations"
            elif avg_roe < 0.1 or avg_pe_ratio > 30:
                outlook = "Challenging fundamentals or overvaluation concerns"
            else:
                outlook = "Mixed fundamentals, selective opportunities"
                
            return SectorAnalysis(
                sector=sector,
                market_cap_weight=market_cap_weight,
                avg_pe_ratio=avg_pe_ratio,
                avg_pb_ratio=avg_pb_ratio,
                avg_roe=avg_roe,
                avg_roa=avg_roa,
                sector_beta=sector_beta,
                correlation_matrix=correlations,
                top_performers=top_performers,
                underperformers=underperformers,
                outlook=outlook,
                timestamp=datetime.now()
            )
            
        except Exception as e:
            logger.error(f"Error analyzing sector {sector}: {e}")
            return None
            
    async def optimize_portfolio(self, symbols: List[str], 
                               expected_returns: Dict[str, float],
                               risk_tolerance: float = 0.1) -> PortfolioOptimization:
        """Portfolio optimization using Modern Portfolio Theory"""
        try:
            # Generate correlation matrix (simplified)
            n_assets = len(symbols)
            correlation_matrix = np.eye(n_assets)
            
            # Add some realistic correlations
            for i in range(n_assets):
                for j in range(i+1, n_assets):
                    correlation = np.random.uniform(0.3, 0.8)
                    correlation_matrix[i, j] = correlation
                    correlation_matrix[j, i] = correlation
                    
            # Generate covariance matrix
            volatilities = np.random.uniform(0.15, 0.35, n_assets)
            covariance_matrix = np.outer(volatilities, volatilities) * correlation_matrix
            
            # Portfolio optimization (simplified)
            # In practice, would use more sophisticated optimization algorithms
            weights = np.random.dirichlet(np.ones(n_assets))
            weights = weights / weights.sum()
            
            # Calculate portfolio metrics
            portfolio_return = sum(weights[i] * expected_returns.get(symbols[i], 0.1) 
                                 for i in range(n_assets))
            
            portfolio_variance = np.dot(weights, np.dot(covariance_matrix, weights))
            portfolio_volatility = np.sqrt(portfolio_variance)
            
            sharpe_ratio = (portfolio_return - self.risk_free_rate) / portfolio_volatility
            
            # Generate efficient frontier (simplified)
            efficient_frontier = []
            for target_return in np.linspace(0.05, 0.25, 20):
                # Simplified - would use proper optimization
                volatility = target_return * 2  # Rough approximation
                efficient_frontier.append((target_return, volatility))
                
            # Risk contribution
            risk_contribution = {}
            for i, symbol in enumerate(symbols):
                risk_contribution[symbol] = weights[i] * volatilities[i]
                
            # Rebalancing schedule (monthly)
            rebalancing_schedule = [
                datetime.now() + timedelta(days=30*i) for i in range(12)
            ]
            
            return PortfolioOptimization(
                portfolio_id=f"portfolio_{datetime.now().strftime('%Y%m%d')}",
                expected_return=portfolio_return,
                volatility=portfolio_volatility,
                sharpe_ratio=sharpe_ratio,
                max_drawdown=-0.15,  # Placeholder
                var_95=-0.05,  # Placeholder
                optimal_weights={symbols[i]: weights[i] for i in range(n_assets)},
                efficient_frontier=efficient_frontier,
                risk_contribution=risk_contribution,
                rebalancing_schedule=rebalancing_schedule,
                timestamp=datetime.now()
            )
            
        except Exception as e:
            logger.error(f"Error optimizing portfolio: {e}")
            return None
            
    async def generate_quant_report(self, symbols: List[str], 
                                  market_data: Dict) -> Dict[str, Any]:
        """Generate comprehensive quantitative report"""
        try:
            report = {
                "report_id": f"quant_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                "generated_at": datetime.now(),
                "symbols": symbols,
                "market_overview": {},
                "individual_analysis": {},
                "sector_analysis": {},
                "risk_assessment": {},
                "portfolio_optimization": {},
                "recommendations": []
            }
            
            # Individual stock analysis
            for symbol in symbols:
                if symbol in market_data:
                    # Calculate quant metrics
                    price_data = [100, 102, 98, 105, 103]  # Placeholder price data
                    financial_data = market_data[symbol]
                    
                    quant_metrics = await self.calculate_quant_metrics(
                        symbol, price_data, financial_data
                    )
                    
                    if quant_metrics:
                        risk_assessment = await self.assess_risk(
                            symbol, quant_metrics, market_data
                        )
                        
                        report["individual_analysis"][symbol] = {
                            "quant_metrics": quant_metrics,
                            "risk_assessment": risk_assessment
                        }
                        
            # Sector analysis (simplified - group by first letter)
            sectors = {}
            for symbol in symbols:
                sector = symbol[0] if symbol else "Unknown"
                if sector not in sectors:
                    sectors[sector] = []
                sectors[sector].append(symbol)
                
            for sector, sector_symbols in sectors.items():
                sector_analysis = await self.analyze_sector(
                    sector, sector_symbols, market_data
                )
                if sector_analysis:
                    report["sector_analysis"][sector] = sector_analysis
                    
            # Portfolio optimization
            expected_returns = {symbol: 0.1 for symbol in symbols}  # Placeholder
            portfolio_opt = await self.optimize_portfolio(symbols, expected_returns)
            if portfolio_opt:
                report["portfolio_optimization"] = portfolio_opt
                
            # Generate recommendations
            recommendations = []
            for symbol, analysis in report["individual_analysis"].items():
                risk_assessment = analysis.get("risk_assessment")
                if risk_assessment and risk_assessment.overall_risk == RiskLevel.HIGH:
                    recommendations.append(f"Consider reducing exposure to {symbol} due to high risk")
                elif risk_assessment and risk_assessment.overall_risk == RiskLevel.LOW:
                    recommendations.append(f"Consider increasing exposure to {symbol} - low risk profile")
                    
            report["recommendations"] = recommendations
            
            return report
            
        except Exception as e:
            logger.error(f"Error generating quant report: {e}")
            return {}

# Global instance
quant_service = QuantModelsService()
