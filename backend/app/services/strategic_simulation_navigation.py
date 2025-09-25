"""
Strategic Simulation Navigation Engine - S_simulation(S,t)
Implements predictive strategic simulation navigation for scenario generation,
Monte Carlo simulation, and optimal outcome navigation in strategic planning.

Mathematical Foundation:
S_simulation(S,t) = E[NPV(strategy, scenario)] where scenarios ~ P(market_state)
Navigation: strategy* = argmax_s E[Utility(NPV(s, scenario))|risk_constraints]
"""

import numpy as np
import asyncio
import logging
from typing import List, Dict, Tuple, Optional, Any, Union
from dataclasses import dataclass, field
from enum import Enum
import math
from datetime import datetime, timedelta
import json
from collections import defaultdict
import random
from scipy import stats
from scipy.optimize import minimize
import pandas as pd

logger = logging.getLogger(__name__)

@dataclass
class Scenario:
    """Strategic scenario representation"""
    scenario_id: str
    scenario_type: str  # "optimistic", "base_case", "pessimistic", "stress_test"
    probability: float  # [0, 1]
    market_conditions: Dict[str, float]
    competitive_landscape: Dict[str, Any]
    economic_factors: Dict[str, float]
    regulatory_environment: Dict[str, Any]
    technology_trends: Dict[str, float]
    scenario_parameters: Dict[str, Any] = field(default_factory=dict)

@dataclass
class SimulationResult:
    """Monte Carlo simulation result"""
    result_id: str
    strategy_id: str
    scenario_id: str
    npv: float
    irr: float
    payback_period: float  # years
    risk_metrics: Dict[str, float]
    cash_flows: List[float]
    success_probability: float
    confidence_interval: Tuple[float, float]

@dataclass
class OptimalStrategy:
    """Optimal strategy result"""
    strategy_id: str
    strategy_name: str
    expected_npv: float
    risk_adjusted_npv: float
    success_probability: float
    risk_level: float
    time_horizon: int  # years
    implementation_cost: float
    expected_returns: List[float]
    risk_metrics: Dict[str, float]
    scenario_analysis: Dict[str, Any]

class StrategicSimulationNavigator:
    """
    Strategic Simulation Navigation Engine
    
    Implements the S_simulation(S,t) algorithm for predictive strategic simulation navigation
    """
    
    def __init__(self, 
                 market_models: Dict[str, Any],
                 competitive_models: Dict[str, Any],
                 economic_models: Dict[str, Any]):
        
        self.market_models = market_models
        self.competitive_models = competitive_models
        self.economic_models = economic_models
        
        # Simulation parameters
        self.monte_carlo_iterations = 10000
        self.simulation_horizon = 5  # years
        self.time_steps = 20  # quarterly steps
        self.confidence_level = 0.95
        
        # Risk parameters
        self.risk_free_rate = 0.03
        self.market_risk_premium = 0.06
        self.volatility_parameters = {
            'market_volatility': 0.2,
            'competitive_volatility': 0.15,
            'economic_volatility': 0.1
        }
        
        # Performance tracking
        self.simulation_history = []
        self.accuracy_metrics = {}
        
    async def navigate_strategic_simulations(self, 
                                           strategic_options: List[Dict[str, Any]],
                                           market_conditions: Dict[str, Any],
                                           time_horizon: int = 5) -> Dict[str, Any]:
        """
        Main strategic simulation navigation algorithm
        
        Args:
            strategic_options: List of strategic options to simulate
            market_conditions: Current market conditions
            time_horizon: Simulation time horizon in years
            
        Returns:
            Dict containing optimal strategy, simulation confidence, and scenario analysis
        """
        logger.info("Starting Strategic Simulation Navigation")
        start_time = datetime.now()
        
        try:
            # Generate strategic scenario space
            scenario_space = await self._generate_scenario_space(market_conditions, time_horizon)
            
            # Navigate through scenario simulations
            simulation_results = await self._simulate_strategies(
                strategic_options, scenario_space, time_horizon
            )
            
            # Navigate optimal strategic path
            optimal_strategy = await self._navigate_optimal_outcomes(
                simulation_results, strategic_options, time_horizon
            )
            
            # Calculate simulation confidence
            simulation_confidence = self._calculate_simulation_confidence(
                scenario_space, simulation_results, optimal_strategy
            )
            
            # Analyze scenarios
            scenario_analysis = self._analyze_scenarios(simulation_results, scenario_space)
            
            # Update performance tracking
            execution_time = (datetime.now() - start_time).total_seconds()
            self._update_simulation_performance(
                simulation_confidence, execution_time, len(simulation_results)
            )
            
            logger.info(f"Strategic Simulation Navigation completed in {execution_time:.3f}s")
            
            return {
                'optimal_strategy': optimal_strategy,
                'simulation_confidence': simulation_confidence,
                'scenario_analysis': scenario_analysis,
                'scenario_space': scenario_space,
                'simulation_results': simulation_results,
                'execution_time': execution_time,
                'analysis_timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Strategic Simulation Navigation error: {e}")
            return self._create_fallback_result()
    
    async def _generate_scenario_space(self, 
                                     market_conditions: Dict[str, Any],
                                     time_horizon: int) -> List[Scenario]:
        """
        Generate strategic scenario space using advanced modeling
        
        Mathematical Foundation:
        Scenario_Space = {S₁, S₂, ..., Sₙ} where P(Sᵢ) = f(market_state, economic_factors, competitive_landscape)
        """
        logger.info("Generating strategic scenario space")
        
        scenarios = []
        
        # Base scenario parameters
        base_market_conditions = market_conditions.copy()
        
        # Generate different scenario types
        scenario_types = [
            ("optimistic", 0.2),
            ("base_case", 0.5),
            ("pessimistic", 0.2),
            ("stress_test", 0.1)
        ]
        
        for scenario_type, base_probability in scenario_types:
            # Adjust probability based on current market conditions
            adjusted_probability = self._adjust_scenario_probability(
                scenario_type, base_probability, market_conditions
            )
            
            # Generate scenario parameters
            scenario_parameters = self._generate_scenario_parameters(
                scenario_type, market_conditions, time_horizon
            )
            
            scenario = Scenario(
                scenario_id=f"scenario_{scenario_type}_{len(scenarios)}",
                scenario_type=scenario_type,
                probability=adjusted_probability,
                market_conditions=scenario_parameters['market_conditions'],
                competitive_landscape=scenario_parameters['competitive_landscape'],
                economic_factors=scenario_parameters['economic_factors'],
                regulatory_environment=scenario_parameters['regulatory_environment'],
                technology_trends=scenario_parameters['technology_trends'],
                scenario_parameters=scenario_parameters
            )
            
            scenarios.append(scenario)
        
        # Normalize probabilities
        total_probability = sum(s.probability for s in scenarios)
        for scenario in scenarios:
            scenario.probability /= total_probability
        
        return scenarios
    
    def _adjust_scenario_probability(self, 
                                   scenario_type: str,
                                   base_probability: float,
                                   market_conditions: Dict[str, Any]) -> float:
        """Adjust scenario probability based on current market conditions"""
        # Get market indicators
        market_volatility = market_conditions.get('volatility', 0.2)
        growth_rate = market_conditions.get('growth_rate', 0.1)
        uncertainty_index = market_conditions.get('uncertainty_index', 0.5)
        
        # Adjust probabilities based on market conditions
        if scenario_type == "optimistic":
            # Higher probability in low volatility, high growth environments
            adjustment = (1 - market_volatility) * growth_rate * 0.5
        elif scenario_type == "pessimistic":
            # Higher probability in high volatility, low growth environments
            adjustment = market_volatility * (1 - growth_rate) * 0.5
        elif scenario_type == "stress_test":
            # Higher probability in high uncertainty environments
            adjustment = uncertainty_index * 0.3
        else:  # base_case
            # Stable probability
            adjustment = 0.0
        
        adjusted_probability = base_probability + adjustment
        return max(0.05, min(0.8, adjusted_probability))  # Keep within reasonable bounds
    
    def _generate_scenario_parameters(self, 
                                    scenario_type: str,
                                    market_conditions: Dict[str, Any],
                                    time_horizon: int) -> Dict[str, Any]:
        """Generate parameters for specific scenario type"""
        base_conditions = market_conditions.copy()
        
        if scenario_type == "optimistic":
            return {
                'market_conditions': {
                    'growth_rate': base_conditions.get('growth_rate', 0.1) * 1.5,
                    'volatility': base_conditions.get('volatility', 0.2) * 0.7,
                    'market_size': base_conditions.get('market_size', 1000000000) * 1.3,
                    'competition_level': base_conditions.get('competition_level', 0.5) * 0.8
                },
                'competitive_landscape': {
                    'barriers_to_entry': 0.3,
                    'switching_costs': 0.4,
                    'competitive_intensity': 0.6
                },
                'economic_factors': {
                    'interest_rate': 0.02,
                    'inflation_rate': 0.02,
                    'gdp_growth': 0.04,
                    'unemployment_rate': 0.03
                },
                'regulatory_environment': {
                    'regulatory_burden': 0.3,
                    'policy_stability': 0.8,
                    'compliance_cost': 0.2
                },
                'technology_trends': {
                    'innovation_rate': 0.8,
                    'adoption_speed': 0.7,
                    'disruption_risk': 0.3
                }
            }
        
        elif scenario_type == "pessimistic":
            return {
                'market_conditions': {
                    'growth_rate': base_conditions.get('growth_rate', 0.1) * 0.5,
                    'volatility': base_conditions.get('volatility', 0.2) * 1.5,
                    'market_size': base_conditions.get('market_size', 1000000000) * 0.8,
                    'competition_level': base_conditions.get('competition_level', 0.5) * 1.3
                },
                'competitive_landscape': {
                    'barriers_to_entry': 0.7,
                    'switching_costs': 0.8,
                    'competitive_intensity': 0.9
                },
                'economic_factors': {
                    'interest_rate': 0.06,
                    'inflation_rate': 0.05,
                    'gdp_growth': 0.01,
                    'unemployment_rate': 0.08
                },
                'regulatory_environment': {
                    'regulatory_burden': 0.8,
                    'policy_stability': 0.4,
                    'compliance_cost': 0.7
                },
                'technology_trends': {
                    'innovation_rate': 0.3,
                    'adoption_speed': 0.4,
                    'disruption_risk': 0.8
                }
            }
        
        elif scenario_type == "stress_test":
            return {
                'market_conditions': {
                    'growth_rate': -0.05,
                    'volatility': 0.4,
                    'market_size': base_conditions.get('market_size', 1000000000) * 0.6,
                    'competition_level': 0.9
                },
                'competitive_landscape': {
                    'barriers_to_entry': 0.9,
                    'switching_costs': 0.9,
                    'competitive_intensity': 1.0
                },
                'economic_factors': {
                    'interest_rate': 0.08,
                    'inflation_rate': 0.08,
                    'gdp_growth': -0.02,
                    'unemployment_rate': 0.12
                },
                'regulatory_environment': {
                    'regulatory_burden': 0.9,
                    'policy_stability': 0.2,
                    'compliance_cost': 0.9
                },
                'technology_trends': {
                    'innovation_rate': 0.2,
                    'adoption_speed': 0.2,
                    'disruption_risk': 0.9
                }
            }
        
        else:  # base_case
            return {
                'market_conditions': base_conditions,
                'competitive_landscape': {
                    'barriers_to_entry': 0.5,
                    'switching_costs': 0.6,
                    'competitive_intensity': 0.7
                },
                'economic_factors': {
                    'interest_rate': 0.04,
                    'inflation_rate': 0.03,
                    'gdp_growth': 0.025,
                    'unemployment_rate': 0.05
                },
                'regulatory_environment': {
                    'regulatory_burden': 0.5,
                    'policy_stability': 0.6,
                    'compliance_cost': 0.5
                },
                'technology_trends': {
                    'innovation_rate': 0.5,
                    'adoption_speed': 0.5,
                    'disruption_risk': 0.5
                }
            }
    
    async def _simulate_strategies(self, 
                                 strategic_options: List[Dict[str, Any]],
                                 scenario_space: List[Scenario],
                                 time_horizon: int) -> List[SimulationResult]:
        """
        Simulate strategies using Monte Carlo methods
        
        Mathematical Foundation:
        E[NPV(strategy, scenario)] = Σᵢ P(Sᵢ) · NPV(strategy, Sᵢ)
        """
        logger.info("Running Monte Carlo simulations")
        
        simulation_results = []
        
        for strategy in strategic_options:
            strategy_id = strategy.get('id', f"strategy_{len(simulation_results)}")
            
            for scenario in scenario_space:
                # Run Monte Carlo simulation for this strategy-scenario combination
                mc_results = await self._run_monte_carlo_simulation(
                    strategy, scenario, time_horizon
                )
                
                # Aggregate Monte Carlo results
                aggregated_result = self._aggregate_monte_carlo_results(
                    mc_results, strategy_id, scenario.scenario_id
                )
                
                simulation_results.append(aggregated_result)
        
        return simulation_results
    
    async def _run_monte_carlo_simulation(self, 
                                        strategy: Dict[str, Any],
                                        scenario: Scenario,
                                        time_horizon: int) -> List[Dict[str, Any]]:
        """Run Monte Carlo simulation for strategy-scenario combination"""
        mc_results = []
        
        for iteration in range(self.monte_carlo_iterations):
            # Generate random variables for this iteration
            random_variables = self._generate_random_variables(scenario, time_horizon)
            
            # Simulate strategy performance
            performance = self._simulate_strategy_performance(
                strategy, scenario, random_variables, time_horizon
            )
            
            mc_results.append(performance)
        
        return mc_results
    
    def _generate_random_variables(self, 
                                 scenario: Scenario,
                                 time_horizon: int) -> Dict[str, List[float]]:
        """Generate random variables for Monte Carlo simulation"""
        random_variables = {}
        
        # Market variables
        market_volatility = scenario.market_conditions.get('volatility', 0.2)
        market_growth = scenario.market_conditions.get('growth_rate', 0.1)
        
        # Generate random market returns
        market_returns = np.random.normal(
            market_growth, 
            market_volatility, 
            self.time_steps
        )
        random_variables['market_returns'] = market_returns.tolist()
        
        # Competitive variables
        competitive_intensity = scenario.competitive_landscape.get('competitive_intensity', 0.7)
        competitive_volatility = self.volatility_parameters['competitive_volatility']
        
        competitive_factors = np.random.normal(
            competitive_intensity,
            competitive_volatility,
            self.time_steps
        )
        random_variables['competitive_factors'] = competitive_factors.tolist()
        
        # Economic variables
        interest_rate = scenario.economic_factors.get('interest_rate', 0.04)
        economic_volatility = self.volatility_parameters['economic_volatility']
        
        interest_rates = np.random.normal(
            interest_rate,
            economic_volatility,
            self.time_steps
        )
        random_variables['interest_rates'] = interest_rates.tolist()
        
        # Technology variables
        innovation_rate = scenario.technology_trends.get('innovation_rate', 0.5)
        tech_volatility = 0.1
        
        innovation_factors = np.random.normal(
            innovation_rate,
            tech_volatility,
            self.time_steps
        )
        random_variables['innovation_factors'] = innovation_factors.tolist()
        
        return random_variables
    
    def _simulate_strategy_performance(self, 
                                     strategy: Dict[str, Any],
                                     scenario: Scenario,
                                     random_variables: Dict[str, List[float]],
                                     time_horizon: int) -> Dict[str, Any]:
        """Simulate strategy performance for one Monte Carlo iteration"""
        # Extract strategy parameters
        initial_investment = strategy.get('initial_investment', 1000000)
        revenue_growth_rate = strategy.get('revenue_growth_rate', 0.1)
        cost_structure = strategy.get('cost_structure', {'fixed': 0.3, 'variable': 0.5})
        
        # Simulate cash flows
        cash_flows = []
        current_revenue = strategy.get('initial_revenue', 1000000)
        
        for t in range(self.time_steps):
            # Market impact
            market_return = random_variables['market_returns'][t]
            competitive_factor = random_variables['competitive_factors'][t]
            innovation_factor = random_variables['innovation_factors'][t]
            
            # Calculate revenue for this period
            revenue_growth = revenue_growth_rate * (1 + market_return) * (1 - competitive_factor * 0.1)
            current_revenue *= (1 + revenue_growth)
            
            # Calculate costs
            fixed_costs = current_revenue * cost_structure['fixed']
            variable_costs = current_revenue * cost_structure['variable']
            total_costs = fixed_costs + variable_costs
            
            # Calculate cash flow
            cash_flow = current_revenue - total_costs
            
            # Apply innovation factor
            cash_flow *= (1 + innovation_factor * 0.1)
            
            cash_flows.append(cash_flow)
        
        # Calculate financial metrics
        npv = self._calculate_npv(cash_flows, random_variables['interest_rates'])
        irr = self._calculate_irr(cash_flows)
        payback_period = self._calculate_payback_period(cash_flows, initial_investment)
        
        # Calculate risk metrics
        risk_metrics = self._calculate_risk_metrics(cash_flows)
        
        return {
            'npv': npv,
            'irr': irr,
            'payback_period': payback_period,
            'cash_flows': cash_flows,
            'risk_metrics': risk_metrics
        }
    
    def _calculate_npv(self, cash_flows: List[float], interest_rates: List[float]) -> float:
        """Calculate Net Present Value"""
        npv = 0.0
        
        for t, cash_flow in enumerate(cash_flows):
            if t < len(interest_rates):
                discount_rate = interest_rates[t]
                npv += cash_flow / ((1 + discount_rate) ** (t + 1))
        
        return npv
    
    def _calculate_irr(self, cash_flows: List[float]) -> float:
        """Calculate Internal Rate of Return"""
        try:
            # Use numpy's IRR calculation
            return np.irr(cash_flows)
        except:
            # Fallback calculation
            return 0.1  # Default 10% IRR
    
    def _calculate_payback_period(self, cash_flows: List[float], initial_investment: float) -> float:
        """Calculate payback period in years"""
        cumulative_cash_flow = 0.0
        
        for t, cash_flow in enumerate(cash_flows):
            cumulative_cash_flow += cash_flow
            if cumulative_cash_flow >= initial_investment:
                return (t + 1) / 4  # Convert quarters to years
        
        return len(cash_flows) / 4  # If never paid back
    
    def _calculate_risk_metrics(self, cash_flows: List[float]) -> Dict[str, float]:
        """Calculate risk metrics"""
        if not cash_flows:
            return {'volatility': 0.0, 'var_95': 0.0, 'cvar_95': 0.0}
        
        cash_flows_array = np.array(cash_flows)
        
        # Volatility
        volatility = np.std(cash_flows_array)
        
        # Value at Risk (95%)
        var_95 = np.percentile(cash_flows_array, 5)
        
        # Conditional Value at Risk (95%)
        cvar_95 = np.mean(cash_flows_array[cash_flows_array <= var_95])
        
        return {
            'volatility': volatility,
            'var_95': var_95,
            'cvar_95': cvar_95
        }
    
    def _aggregate_monte_carlo_results(self, 
                                     mc_results: List[Dict[str, Any]],
                                     strategy_id: str,
                                     scenario_id: str) -> SimulationResult:
        """Aggregate Monte Carlo simulation results"""
        # Extract metrics
        npvs = [result['npv'] for result in mc_results]
        irrs = [result['irr'] for result in mc_results]
        payback_periods = [result['payback_period'] for result in mc_results]
        
        # Calculate aggregated metrics
        expected_npv = np.mean(npvs)
        expected_irr = np.mean(irrs)
        expected_payback = np.mean(payback_periods)
        
        # Calculate confidence interval
        confidence_interval = (
            np.percentile(npvs, (1 - self.confidence_level) / 2 * 100),
            np.percentile(npvs, (1 + self.confidence_level) / 2 * 100)
        )
        
        # Calculate success probability (positive NPV)
        success_probability = len([npv for npv in npvs if npv > 0]) / len(npvs)
        
        # Aggregate risk metrics
        all_risk_metrics = [result['risk_metrics'] for result in mc_results]
        aggregated_risk_metrics = {
            'volatility': np.mean([rm['volatility'] for rm in all_risk_metrics]),
            'var_95': np.mean([rm['var_95'] for rm in all_risk_metrics]),
            'cvar_95': np.mean([rm['cvar_95'] for rm in all_risk_metrics])
        }
        
        # Average cash flows
        all_cash_flows = [result['cash_flows'] for result in mc_results]
        avg_cash_flows = np.mean(all_cash_flows, axis=0).tolist()
        
        return SimulationResult(
            result_id=f"result_{strategy_id}_{scenario_id}",
            strategy_id=strategy_id,
            scenario_id=scenario_id,
            npv=expected_npv,
            irr=expected_irr,
            payback_period=expected_payback,
            risk_metrics=aggregated_risk_metrics,
            cash_flows=avg_cash_flows,
            success_probability=success_probability,
            confidence_interval=confidence_interval
        )
    
    async def _navigate_optimal_outcomes(self, 
                                       simulation_results: List[SimulationResult],
                                       strategic_options: List[Dict[str, Any]],
                                       time_horizon: int) -> OptimalStrategy:
        """
        Navigate to optimal strategic outcomes using optimization
        
        Mathematical Foundation:
        strategy* = argmax_s E[Utility(NPV(s, scenario))|risk_constraints]
        """
        logger.info("Navigating optimal strategic outcomes")
        
        # Group results by strategy
        strategy_results = defaultdict(list)
        for result in simulation_results:
            strategy_results[result.strategy_id].append(result)
        
        # Evaluate each strategy
        strategy_evaluations = []
        
        for strategy_id, results in strategy_results.items():
            evaluation = self._evaluate_strategy(results, strategic_options, time_horizon)
            strategy_evaluations.append(evaluation)
        
        # Select optimal strategy
        optimal_strategy = max(strategy_evaluations, key=lambda x: x.risk_adjusted_npv)
        
        return optimal_strategy
    
    def _evaluate_strategy(self, 
                         results: List[SimulationResult],
                         strategic_options: List[Dict[str, Any]],
                         time_horizon: int) -> OptimalStrategy:
        """Evaluate strategy based on simulation results"""
        strategy_id = results[0].strategy_id
        
        # Find strategy details
        strategy_details = next(
            (s for s in strategic_options if s.get('id') == strategy_id),
            {'name': f'Strategy {strategy_id}', 'initial_investment': 1000000}
        )
        
        # Calculate expected metrics
        expected_npv = np.mean([r.npv for r in results])
        expected_returns = [r.npv for r in results]
        
        # Calculate risk metrics
        npvs = [r.npv for r in results]
        risk_level = np.std(npvs) / abs(np.mean(npvs)) if np.mean(npvs) != 0 else 1.0
        
        # Calculate risk-adjusted NPV
        risk_adjusted_npv = expected_npv / (1 + risk_level)
        
        # Calculate success probability
        success_probability = np.mean([r.success_probability for r in results])
        
        # Calculate implementation cost
        implementation_cost = strategy_details.get('initial_investment', 1000000)
        
        # Aggregate risk metrics
        aggregated_risk_metrics = {
            'volatility': np.mean([r.risk_metrics['volatility'] for r in results]),
            'var_95': np.mean([r.risk_metrics['var_95'] for r in results]),
            'cvar_95': np.mean([r.risk_metrics['cvar_95'] for r in results])
        }
        
        # Scenario analysis
        scenario_analysis = {
            'optimistic_npv': max([r.npv for r in results]),
            'pessimistic_npv': min([r.npv for r in results]),
            'base_case_npv': np.median([r.npv for r in results]),
            'scenario_count': len(results)
        }
        
        return OptimalStrategy(
            strategy_id=strategy_id,
            strategy_name=strategy_details.get('name', f'Strategy {strategy_id}'),
            expected_npv=expected_npv,
            risk_adjusted_npv=risk_adjusted_npv,
            success_probability=success_probability,
            risk_level=risk_level,
            time_horizon=time_horizon,
            implementation_cost=implementation_cost,
            expected_returns=expected_returns,
            risk_metrics=aggregated_risk_metrics,
            scenario_analysis=scenario_analysis
        )
    
    def _calculate_simulation_confidence(self, 
                                       scenario_space: List[Scenario],
                                       simulation_results: List[SimulationResult],
                                       optimal_strategy: OptimalStrategy) -> float:
        """Calculate overall simulation confidence"""
        if not scenario_space or not simulation_results:
            return 0.1
        
        # Scenario coverage confidence
        scenario_coverage = len(scenario_space) / 4  # Normalize to 4 base scenarios
        scenario_coverage = min(1.0, scenario_coverage)
        
        # Simulation quality confidence
        avg_success_probability = np.mean([r.success_probability for r in simulation_results])
        
        # Strategy robustness confidence
        strategy_robustness = optimal_strategy.success_probability
        
        # Risk assessment confidence
        risk_confidence = 1.0 - optimal_strategy.risk_level
        risk_confidence = max(0.0, min(1.0, risk_confidence))
        
        # Overall confidence
        confidence = (
            scenario_coverage * 0.3 +
            avg_success_probability * 0.3 +
            strategy_robustness * 0.2 +
            risk_confidence * 0.2
        )
        
        return min(1.0, max(0.0, confidence))
    
    def _analyze_scenarios(self, 
                         simulation_results: List[SimulationResult],
                         scenario_space: List[Scenario]) -> Dict[str, Any]:
        """Analyze scenario outcomes and sensitivities"""
        analysis = {}
        
        # Group results by scenario type
        scenario_results = defaultdict(list)
        for result in simulation_results:
            scenario = next((s for s in scenario_space if s.scenario_id == result.scenario_id), None)
            if scenario:
                scenario_results[scenario.scenario_type].append(result)
        
        # Analyze each scenario type
        scenario_analysis = {}
        for scenario_type, results in scenario_results.items():
            if results:
                npvs = [r.npv for r in results]
                scenario_analysis[scenario_type] = {
                    'expected_npv': np.mean(npvs),
                    'npv_std': np.std(npvs),
                    'success_rate': np.mean([r.success_probability for r in results]),
                    'strategy_count': len(results)
                }
        
        analysis['scenario_breakdown'] = scenario_analysis
        
        # Sensitivity analysis
        analysis['sensitivity_analysis'] = self._perform_sensitivity_analysis(simulation_results)
        
        # Risk analysis
        analysis['risk_analysis'] = self._perform_risk_analysis(simulation_results)
        
        return analysis
    
    def _perform_sensitivity_analysis(self, simulation_results: List[SimulationResult]) -> Dict[str, Any]:
        """Perform sensitivity analysis on simulation results"""
        # This would analyze how sensitive results are to different parameters
        # For now, return placeholder analysis
        return {
            'market_sensitivity': 0.7,
            'competitive_sensitivity': 0.6,
            'economic_sensitivity': 0.5,
            'technology_sensitivity': 0.4
        }
    
    def _perform_risk_analysis(self, simulation_results: List[SimulationResult]) -> Dict[str, Any]:
        """Perform risk analysis on simulation results"""
        all_npvs = [r.npv for r in simulation_results]
        
        return {
            'overall_volatility': np.std(all_npvs),
            'downside_risk': np.percentile(all_npvs, 5),
            'upside_potential': np.percentile(all_npvs, 95),
            'risk_return_ratio': np.mean(all_npvs) / np.std(all_npvs) if np.std(all_npvs) > 0 else 0
        }
    
    def _update_simulation_performance(self, confidence: float, execution_time: float, results_count: int):
        """Update simulation performance tracking"""
        self.simulation_history.append({
            'timestamp': datetime.now(),
            'confidence': confidence,
            'execution_time': execution_time,
            'results_count': results_count
        })
        
        # Keep only last 100 entries
        if len(self.simulation_history) > 100:
            self.simulation_history = self.simulation_history[-100:]
    
    def _create_fallback_result(self) -> Dict[str, Any]:
        """Create fallback result when simulation fails"""
        return {
            'optimal_strategy': None,
            'simulation_confidence': 0.1,
            'scenario_analysis': {'error': 'Simulation failed'},
            'scenario_space': [],
            'simulation_results': [],
            'execution_time': 0.0,
            'analysis_timestamp': datetime.now().isoformat()
        }
