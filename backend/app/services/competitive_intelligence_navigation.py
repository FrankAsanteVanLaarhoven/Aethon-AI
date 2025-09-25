"""
Competitive Intelligence Navigation Engine - I_competitive(I,t)
Implements legal competitive intelligence navigation for patent landscape analysis,
competitor move prediction, and intellectual property strategy optimization.

Mathematical Foundation:
I_competitive(I,t) = P(competitor_action|market_state, patent_filings, financial_data)
Navigation: IP_Strategy = argmax_ip E[Business_Value(ip)|Competitive_Response(ip)]
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
import networkx as nx
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import DBSCAN

logger = logging.getLogger(__name__)

@dataclass
class PatentOpportunity:
    """Patent opportunity representation"""
    opportunity_id: str
    technology_area: str
    patent_gap_type: str  # "white_space", "defensive", "offensive", "licensing"
    market_potential: float  # [0, 1]
    technical_feasibility: float  # [0, 1]
    competitive_threat: float  # [0, 1]
    filing_priority: float  # [0, 1]
    estimated_cost: float
    time_to_filing: int  # months
    ip_strength: float = field(init=False)
    
    def __post_init__(self):
        """Calculate IP strength"""
        self.ip_strength = self._calculate_ip_strength()
    
    def _calculate_ip_strength(self) -> float:
        """Calculate IP strength score"""
        return (
            self.market_potential * 0.3 +
            self.technical_feasibility * 0.25 +
            (1 - self.competitive_threat) * 0.25 +
            self.filing_priority * 0.2
        )

@dataclass
class CompetitorPrediction:
    """Competitor move prediction"""
    competitor_id: str
    competitor_name: str
    predicted_action: str
    action_type: str  # "product_launch", "acquisition", "partnership", "patent_filing", "market_expansion"
    probability: float  # [0, 1]
    timeframe: Tuple[int, int]  # (min_months, max_months)
    impact_on_us: float  # [0, 1] - positive or negative
    confidence: float  # [0, 1]
    supporting_evidence: List[str]
    strategic_response: str

@dataclass
class IPStrategy:
    """Intellectual Property Strategy"""
    strategy_id: str
    strategy_type: str  # "defensive", "offensive", "licensing", "acquisition"
    target_technologies: List[str]
    expected_value: float
    implementation_cost: float
    risk_level: float
    time_horizon: int  # months
    success_probability: float
    competitive_response_probability: float
    roi_estimate: float = field(init=False)
    
    def __post_init__(self):
        """Calculate ROI estimate"""
        if self.implementation_cost > 0:
            self.roi_estimate = (self.expected_value - self.implementation_cost) / self.implementation_cost
        else:
            self.roi_estimate = float('inf')

class CompetitiveIntelligenceNavigator:
    """
    Competitive Intelligence Navigation Engine
    
    Implements the I_competitive(I,t) algorithm for legal competitive intelligence navigation
    """
    
    def __init__(self, 
                 legal_databases: List[str],
                 patent_analytics_config: Dict[str, Any],
                 market_research_sources: List[str]):
        
        self.legal_databases = legal_databases
        self.patent_analytics_config = patent_analytics_config
        self.market_research_sources = market_research_sources
        
        # Navigation parameters
        self.patent_analysis_depth = 5  # years
        self.competitor_monitoring_frequency = 7  # days
        self.prediction_horizon = 24  # months
        
        # Performance tracking
        self.prediction_accuracy = {}
        self.ip_strategy_performance = {}
        
    async def navigate_competitive_intelligence(self, 
                                              competitor_data: Dict[str, Any],
                                              patent_landscape: Dict[str, Any],
                                              market_trends: Dict[str, Any]) -> Dict[str, Any]:
        """
        Main competitive intelligence navigation algorithm
        
        Args:
            competitor_data: Competitor intelligence data
            patent_landscape: Patent landscape data
            market_trends: Market trend data
            
        Returns:
            Dict containing IP strategy, competitive predictions, and patent recommendations
        """
        logger.info("Starting Competitive Intelligence Navigation")
        start_time = datetime.now()
        
        try:
            # Patent landscape navigation
            patent_opportunities = await self._identify_patent_opportunities(
                patent_landscape, competitor_data
            )
            
            # Competitive move prediction
            competitor_predictions = await self._predict_competitor_moves(
                competitor_data, market_trends, patent_landscape
            )
            
            # Strategic IP navigation
            ip_strategy = await self._navigate_ip_strategy(
                patent_opportunities, competitor_predictions, market_trends
            )
            
            # Calculate competitive confidence
            competitive_confidence = self._calculate_competitive_confidence(
                patent_opportunities, competitor_predictions, ip_strategy
            )
            
            # Update performance tracking
            execution_time = (datetime.now() - start_time).total_seconds()
            self._update_performance_tracking(
                competitive_confidence, execution_time, len(competitor_predictions)
            )
            
            logger.info(f"Competitive Intelligence Navigation completed in {execution_time:.3f}s")
            
            return {
                'patent_opportunities': patent_opportunities,
                'competitor_predictions': competitor_predictions,
                'ip_strategy': ip_strategy,
                'competitive_confidence': competitive_confidence,
                'execution_time': execution_time,
                'analysis_timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Competitive Intelligence Navigation error: {e}")
            return self._create_fallback_result()
    
    async def _identify_patent_opportunities(self, 
                                           patent_landscape: Dict[str, Any],
                                           competitor_data: Dict[str, Any]) -> List[PatentOpportunity]:
        """
        Identify patent opportunities using advanced patent landscape analysis
        
        Mathematical Foundation:
        Patent_Opportunity = f(White_Space, Competitive_Threat, Market_Potential, Technical_Feasibility)
        """
        logger.info("Identifying patent opportunities")
        
        opportunities = []
        
        # Analyze patent landscape
        patent_data = patent_landscape.get('patents', [])
        technology_areas = patent_landscape.get('technology_areas', [])
        
        # Create patent network for gap analysis
        patent_network = self._create_patent_network(patent_data)
        
        # Identify white spaces
        white_spaces = self._identify_white_spaces(patent_network, technology_areas)
        
        # Analyze competitive threats
        competitive_threats = self._analyze_competitive_threats(patent_data, competitor_data)
        
        for white_space in white_spaces:
            # Calculate market potential
            market_potential = self._calculate_market_potential(white_space, patent_landscape)
            
            # Calculate technical feasibility
            technical_feasibility = self._calculate_technical_feasibility(white_space, patent_data)
            
            # Calculate competitive threat
            competitive_threat = self._calculate_competitive_threat(white_space, competitive_threats)
            
            # Determine filing priority
            filing_priority = self._calculate_filing_priority(
                market_potential, technical_feasibility, competitive_threat
            )
            
            # Estimate costs and timeline
            estimated_cost = self._estimate_patent_cost(white_space, technical_feasibility)
            time_to_filing = self._estimate_filing_timeline(white_space, technical_feasibility)
            
            opportunity = PatentOpportunity(
                opportunity_id=f"patent_opp_{white_space['id']}",
                technology_area=white_space['technology_area'],
                patent_gap_type=white_space['gap_type'],
                market_potential=market_potential,
                technical_feasibility=technical_feasibility,
                competitive_threat=competitive_threat,
                filing_priority=filing_priority,
                estimated_cost=estimated_cost,
                time_to_filing=time_to_filing
            )
            
            opportunities.append(opportunity)
        
        # Sort by IP strength
        opportunities.sort(key=lambda x: x.ip_strength, reverse=True)
        
        return opportunities
    
    async def _predict_competitor_moves(self, 
                                      competitor_data: Dict[str, Any],
                                      market_trends: Dict[str, Any],
                                      patent_landscape: Dict[str, Any]) -> List[CompetitorPrediction]:
        """
        Predict competitor moves using machine learning and pattern analysis
        
        Mathematical Foundation:
        P(competitor_action|market_state, patent_filings, financial_data)
        """
        logger.info("Predicting competitor moves")
        
        predictions = []
        competitors = competitor_data.get('competitors', [])
        
        for competitor in competitors:
            competitor_id = competitor.get('id', '')
            competitor_name = competitor.get('name', '')
            
            # Analyze competitor behavior patterns
            behavior_patterns = self._analyze_competitor_patterns(competitor, market_trends)
            
            # Predict likely actions
            predicted_actions = self._predict_competitor_actions(
                competitor, behavior_patterns, market_trends, patent_landscape
            )
            
            for action in predicted_actions:
                # Calculate impact on us
                impact_on_us = self._calculate_impact_on_us(action, competitor)
                
                # Generate strategic response
                strategic_response = self._generate_strategic_response(action, impact_on_us)
                
                prediction = CompetitorPrediction(
                    competitor_id=competitor_id,
                    competitor_name=competitor_name,
                    predicted_action=action['action'],
                    action_type=action['type'],
                    probability=action['probability'],
                    timeframe=action['timeframe'],
                    impact_on_us=impact_on_us,
                    confidence=action['confidence'],
                    supporting_evidence=action['evidence'],
                    strategic_response=strategic_response
                )
                
                predictions.append(prediction)
        
        # Sort by probability and impact
        predictions.sort(key=lambda x: x.probability * abs(x.impact_on_us), reverse=True)
        
        return predictions
    
    async def _navigate_ip_strategy(self, 
                                  patent_opportunities: List[PatentOpportunity],
                                  competitor_predictions: List[CompetitorPrediction],
                                  market_trends: Dict[str, Any]) -> IPStrategy:
        """
        Navigate optimal IP strategy using game theory and optimization
        
        Mathematical Foundation:
        IP_Strategy = argmax_ip E[Business_Value(ip)|Competitive_Response(ip)]
        """
        logger.info("Navigating IP strategy")
        
        # Analyze competitive landscape
        competitive_landscape = self._analyze_competitive_landscape(competitor_predictions)
        
        # Identify strategic IP priorities
        ip_priorities = self._identify_ip_priorities(patent_opportunities, competitive_landscape)
        
        # Optimize IP strategy
        optimal_strategy = self._optimize_ip_strategy(
            patent_opportunities, competitor_predictions, ip_priorities, market_trends
        )
        
        return optimal_strategy
    
    def _create_patent_network(self, patent_data: List[Dict[str, Any]]) -> nx.Graph:
        """Create patent citation network for analysis"""
        G = nx.Graph()
        
        for patent in patent_data:
            patent_id = patent.get('id', '')
            technology_areas = patent.get('technology_areas', [])
            citations = patent.get('citations', [])
            
            # Add patent node
            G.add_node(patent_id, technology_areas=technology_areas)
            
            # Add citation edges
            for citation in citations:
                G.add_edge(patent_id, citation)
        
        return G
    
    def _identify_white_spaces(self, patent_network: nx.Graph, technology_areas: List[str]) -> List[Dict[str, Any]]:
        """Identify patent white spaces using network analysis"""
        white_spaces = []
        
        # Analyze network structure
        components = list(nx.connected_components(patent_network))
        
        # Find isolated or weakly connected areas
        for component in components:
            if len(component) < 5:  # Small components might be white spaces
                # Analyze technology areas in this component
                tech_areas = set()
                for node in component:
                    if node in patent_network.nodes:
                        tech_areas.update(patent_network.nodes[node].get('technology_areas', []))
                
                if tech_areas:
                    white_spaces.append({
                        'id': f"ws_{len(white_spaces)}",
                        'technology_area': list(tech_areas)[0],
                        'gap_type': 'white_space',
                        'patent_count': len(component),
                        'isolation_score': 1.0 / len(component)
                    })
        
        # Identify emerging technology areas
        for tech_area in technology_areas:
            tech_patents = [node for node in patent_network.nodes 
                          if tech_area in patent_network.nodes[node].get('technology_areas', [])]
            
            if len(tech_patents) < 10:  # Emerging area
                white_spaces.append({
                    'id': f"ws_{len(white_spaces)}",
                    'technology_area': tech_area,
                    'gap_type': 'emerging',
                    'patent_count': len(tech_patents),
                    'isolation_score': 0.8
                })
        
        return white_spaces
    
    def _analyze_competitive_threats(self, patent_data: List[Dict[str, Any]], 
                                   competitor_data: Dict[str, Any]) -> Dict[str, float]:
        """Analyze competitive threats from patent landscape"""
        threats = {}
        
        competitors = competitor_data.get('competitors', [])
        
        for competitor in competitors:
            competitor_id = competitor.get('id', '')
            competitor_patents = [p for p in patent_data 
                                if p.get('assignee', '') == competitor.get('name', '')]
            
            # Calculate threat level based on patent portfolio
            threat_level = 0.0
            if competitor_patents:
                # Recent patents are more threatening
                recent_patents = [p for p in competitor_patents 
                                if self._is_recent_patent(p)]
                threat_level = len(recent_patents) / len(competitor_patents)
            
            threats[competitor_id] = threat_level
        
        return threats
    
    def _calculate_market_potential(self, white_space: Dict[str, Any], 
                                  patent_landscape: Dict[str, Any]) -> float:
        """Calculate market potential for patent opportunity"""
        tech_area = white_space['technology_area']
        
        # Get market data for technology area
        market_data = patent_landscape.get('market_data', {}).get(tech_area, {})
        
        market_size = market_data.get('size', 1000000000)  # Default 1B
        growth_rate = market_data.get('growth_rate', 0.1)  # Default 10%
        
        # Calculate potential based on market size and growth
        potential = min(1.0, (market_size / 10000000000) * (1 + growth_rate))
        
        return potential
    
    def _calculate_technical_feasibility(self, white_space: Dict[str, Any], 
                                       patent_data: List[Dict[str, Any]]) -> float:
        """Calculate technical feasibility of patent opportunity"""
        tech_area = white_space['technology_area']
        
        # Find related patents in similar technology areas
        related_patents = [p for p in patent_data 
                          if tech_area in p.get('technology_areas', [])]
        
        if not related_patents:
            return 0.3  # Low feasibility if no related patents
        
        # Calculate feasibility based on patent complexity and success rate
        avg_complexity = np.mean([p.get('complexity_score', 0.5) for p in related_patents])
        success_rate = len([p for p in related_patents if p.get('status') == 'granted']) / len(related_patents)
        
        feasibility = (1 - avg_complexity) * success_rate
        
        return min(1.0, max(0.0, feasibility))
    
    def _calculate_competitive_threat(self, white_space: Dict[str, Any], 
                                    competitive_threats: Dict[str, float]) -> float:
        """Calculate competitive threat for patent opportunity"""
        tech_area = white_space['technology_area']
        
        # Find competitors active in this technology area
        relevant_threats = [threat for threat in competitive_threats.values()]
        
        if not relevant_threats:
            return 0.1  # Low threat if no competitors
        
        # Calculate average threat level
        avg_threat = np.mean(relevant_threats)
        
        # Adjust based on white space isolation
        isolation_score = white_space.get('isolation_score', 0.5)
        threat_level = avg_threat * (1 - isolation_score)
        
        return min(1.0, max(0.0, threat_level))
    
    def _calculate_filing_priority(self, market_potential: float, 
                                 technical_feasibility: float, 
                                 competitive_threat: float) -> float:
        """Calculate filing priority score"""
        # Higher priority for high market potential, high feasibility, high threat
        priority = (
            market_potential * 0.4 +
            technical_feasibility * 0.3 +
            competitive_threat * 0.3
        )
        
        return min(1.0, max(0.0, priority))
    
    def _estimate_patent_cost(self, white_space: Dict[str, Any], 
                            technical_feasibility: float) -> float:
        """Estimate patent filing cost"""
        base_cost = 50000  # Base patent filing cost
        
        # Adjust based on technical complexity
        complexity_multiplier = 1 + (1 - technical_feasibility) * 2
        
        # Adjust based on technology area
        tech_area = white_space['technology_area']
        if 'ai' in tech_area.lower() or 'quantum' in tech_area.lower():
            tech_multiplier = 1.5
        else:
            tech_multiplier = 1.0
        
        return base_cost * complexity_multiplier * tech_multiplier
    
    def _estimate_filing_timeline(self, white_space: Dict[str, Any], 
                                technical_feasibility: float) -> int:
        """Estimate patent filing timeline in months"""
        base_timeline = 12  # Base 12 months
        
        # Adjust based on technical feasibility
        feasibility_multiplier = 1 + (1 - technical_feasibility) * 1.5
        
        # Adjust based on technology area complexity
        tech_area = white_space['technology_area']
        if 'ai' in tech_area.lower() or 'quantum' in tech_area.lower():
            tech_multiplier = 1.3
        else:
            tech_multiplier = 1.0
        
        return int(base_timeline * feasibility_multiplier * tech_multiplier)
    
    def _analyze_competitor_patterns(self, competitor: Dict[str, Any], 
                                   market_trends: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze competitor behavior patterns"""
        patterns = {}
        
        # Historical actions
        historical_actions = competitor.get('historical_actions', [])
        
        # Analyze action frequency and types
        action_types = [action.get('type', '') for action in historical_actions]
        action_frequency = defaultdict(int)
        for action_type in action_types:
            action_frequency[action_type] += 1
        
        patterns['action_frequency'] = dict(action_frequency)
        
        # Analyze timing patterns
        action_timings = [action.get('timestamp', '') for action in historical_actions]
        patterns['timing_patterns'] = self._analyze_timing_patterns(action_timings)
        
        # Analyze market response patterns
        patterns['market_response'] = self._analyze_market_response_patterns(
            historical_actions, market_trends
        )
        
        return patterns
    
    def _predict_competitor_actions(self, competitor: Dict[str, Any], 
                                  behavior_patterns: Dict[str, Any],
                                  market_trends: Dict[str, Any],
                                  patent_landscape: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Predict competitor actions based on patterns and market conditions"""
        predictions = []
        
        # Get competitor's current position
        current_position = competitor.get('current_position', {})
        financial_health = competitor.get('financial_health', 0.5)
        
        # Predict based on historical patterns
        action_frequency = behavior_patterns.get('action_frequency', {})
        
        for action_type, frequency in action_frequency.items():
            if frequency > 0:
                # Calculate probability based on frequency and current conditions
                base_probability = min(0.8, frequency / 10)  # Normalize frequency
                
                # Adjust based on financial health
                financial_adjustment = financial_health * 0.2
                
                # Adjust based on market conditions
                market_adjustment = self._calculate_market_adjustment(action_type, market_trends)
                
                probability = base_probability + financial_adjustment + market_adjustment
                probability = min(1.0, max(0.0, probability))
                
                if probability > 0.3:  # Only predict actions with reasonable probability
                    predictions.append({
                        'action': f"{action_type} in {competitor.get('name', 'competitor')}",
                        'type': action_type,
                        'probability': probability,
                        'timeframe': self._estimate_action_timeframe(action_type, behavior_patterns),
                        'confidence': self._calculate_prediction_confidence(probability, behavior_patterns),
                        'evidence': self._gather_supporting_evidence(action_type, competitor, market_trends)
                    })
        
        return predictions
    
    def _calculate_impact_on_us(self, action: Dict[str, Any], competitor: Dict[str, Any]) -> float:
        """Calculate impact of competitor action on our business"""
        action_type = action['type']
        competitor_strength = competitor.get('market_share', 0.1)
        
        # Define impact multipliers for different action types
        impact_multipliers = {
            'product_launch': 0.8,
            'acquisition': 0.6,
            'partnership': 0.4,
            'patent_filing': 0.7,
            'market_expansion': 0.5
        }
        
        base_impact = impact_multipliers.get(action_type, 0.3)
        
        # Adjust based on competitor strength
        impact = base_impact * competitor_strength
        
        # Make impact negative (competitive threat)
        return -impact
    
    def _generate_strategic_response(self, action: Dict[str, Any], impact: float) -> str:
        """Generate strategic response to competitor action"""
        action_type = action['type']
        impact_magnitude = abs(impact)
        
        if impact_magnitude > 0.6:
            if action_type == 'product_launch':
                return "Accelerate our product development and strengthen competitive differentiation"
            elif action_type == 'acquisition':
                return "Evaluate acquisition targets and strengthen our market position"
            elif action_type == 'patent_filing':
                return "File defensive patents and strengthen our IP portfolio"
            else:
                return "Develop comprehensive competitive response strategy"
        elif impact_magnitude > 0.3:
            return "Monitor situation closely and prepare contingency plans"
        else:
            return "Continue current strategy with minor adjustments"
    
    def _analyze_competitive_landscape(self, competitor_predictions: List[CompetitorPrediction]) -> Dict[str, Any]:
        """Analyze overall competitive landscape"""
        landscape = {
            'total_competitors': len(set(p.competitor_id for p in competitor_predictions)),
            'high_impact_actions': len([p for p in competitor_predictions if abs(p.impact_on_us) > 0.5]),
            'action_types': defaultdict(int),
            'timeframe_distribution': defaultdict(int)
        }
        
        for prediction in competitor_predictions:
            landscape['action_types'][prediction.action_type] += 1
            avg_timeframe = (prediction.timeframe[0] + prediction.timeframe[1]) / 2
            timeframe_bucket = int(avg_timeframe / 6) * 6  # 6-month buckets
            landscape['timeframe_distribution'][timeframe_bucket] += 1
        
        return landscape
    
    def _identify_ip_priorities(self, patent_opportunities: List[PatentOpportunity],
                              competitive_landscape: Dict[str, Any]) -> List[str]:
        """Identify IP strategic priorities"""
        priorities = []
        
        # High-priority opportunities
        high_priority_opps = [opp for opp in patent_opportunities if opp.filing_priority > 0.7]
        for opp in high_priority_opps:
            priorities.append(f"File patents in {opp.technology_area}")
        
        # Defensive priorities based on competitive threats
        if competitive_landscape['high_impact_actions'] > 2:
            priorities.append("Strengthen defensive patent portfolio")
        
        # Offensive priorities
        if len(patent_opportunities) > 5:
            priorities.append("Develop offensive IP strategy")
        
        return priorities
    
    def _optimize_ip_strategy(self, patent_opportunities: List[PatentOpportunity],
                            competitor_predictions: List[CompetitorPrediction],
                            ip_priorities: List[str],
                            market_trends: Dict[str, Any]) -> IPStrategy:
        """Optimize IP strategy using game theory"""
        
        # Calculate expected value of different strategies
        defensive_value = self._calculate_defensive_strategy_value(patent_opportunities, competitor_predictions)
        offensive_value = self._calculate_offensive_strategy_value(patent_opportunities, market_trends)
        licensing_value = self._calculate_licensing_strategy_value(patent_opportunities, market_trends)
        
        # Select optimal strategy
        strategies = {
            'defensive': defensive_value,
            'offensive': offensive_value,
            'licensing': licensing_value
        }
        
        optimal_strategy_type = max(strategies, key=strategies.get)
        optimal_value = strategies[optimal_strategy_type]
        
        # Calculate implementation details
        target_technologies = [opp.technology_area for opp in patent_opportunities[:5]]
        implementation_cost = sum(opp.estimated_cost for opp in patent_opportunities[:3])
        
        # Calculate risk and success probability
        risk_level = self._calculate_strategy_risk(optimal_strategy_type, competitor_predictions)
        success_probability = self._calculate_success_probability(optimal_strategy_type, patent_opportunities)
        competitive_response_probability = self._calculate_competitive_response_probability(
            optimal_strategy_type, competitor_predictions
        )
        
        return IPStrategy(
            strategy_id=f"ip_strategy_{optimal_strategy_type}",
            strategy_type=optimal_strategy_type,
            target_technologies=target_technologies,
            expected_value=optimal_value,
            implementation_cost=implementation_cost,
            risk_level=risk_level,
            time_horizon=24,  # 2 years
            success_probability=success_probability,
            competitive_response_probability=competitive_response_probability
        )
    
    def _calculate_competitive_confidence(self, 
                                        patent_opportunities: List[PatentOpportunity],
                                        competitor_predictions: List[CompetitorPrediction],
                                        ip_strategy: IPStrategy) -> float:
        """Calculate overall competitive intelligence confidence"""
        if not patent_opportunities or not competitor_predictions:
            return 0.1
        
        # Data quality confidence
        data_quality = 0.8  # Placeholder
        
        # Prediction confidence
        avg_prediction_confidence = np.mean([p.confidence for p in competitor_predictions])
        
        # IP strategy confidence
        ip_confidence = ip_strategy.success_probability
        
        # Patent opportunity quality
        avg_patent_quality = np.mean([opp.ip_strength for opp in patent_opportunities])
        
        # Overall confidence
        confidence = (
            data_quality * 0.3 +
            avg_prediction_confidence * 0.3 +
            ip_confidence * 0.2 +
            avg_patent_quality * 0.2
        )
        
        return min(1.0, max(0.0, confidence))
    
    # Helper methods
    def _is_recent_patent(self, patent: Dict[str, Any]) -> bool:
        """Check if patent is recent (within last 2 years)"""
        filing_date = patent.get('filing_date', '')
        if filing_date:
            try:
                filing_datetime = datetime.strptime(filing_date, '%Y-%m-%d')
                return (datetime.now() - filing_datetime).days < 730  # 2 years
            except:
                return False
        return False
    
    def _analyze_timing_patterns(self, action_timings: List[str]) -> Dict[str, Any]:
        """Analyze timing patterns in competitor actions"""
        return {'frequency': 'quarterly', 'seasonality': 'low'}  # Placeholder
    
    def _analyze_market_response_patterns(self, historical_actions: List[Dict[str, Any]], 
                                        market_trends: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze market response patterns to competitor actions"""
        return {'response_time': '3_months', 'impact_duration': '12_months'}  # Placeholder
    
    def _calculate_market_adjustment(self, action_type: str, market_trends: Dict[str, Any]) -> float:
        """Calculate market-based adjustment to action probability"""
        return 0.1  # Placeholder
    
    def _estimate_action_timeframe(self, action_type: str, behavior_patterns: Dict[str, Any]) -> Tuple[int, int]:
        """Estimate timeframe for competitor action"""
        timeframes = {
            'product_launch': (6, 18),
            'acquisition': (3, 12),
            'partnership': (1, 6),
            'patent_filing': (1, 3),
            'market_expansion': (6, 24)
        }
        return timeframes.get(action_type, (6, 12))
    
    def _calculate_prediction_confidence(self, probability: float, behavior_patterns: Dict[str, Any]) -> float:
        """Calculate confidence in prediction"""
        return min(1.0, probability * 1.2)  # Placeholder
    
    def _gather_supporting_evidence(self, action_type: str, competitor: Dict[str, Any], 
                                  market_trends: Dict[str, Any]) -> List[str]:
        """Gather supporting evidence for prediction"""
        evidence = []
        
        if competitor.get('financial_health', 0) > 0.7:
            evidence.append("Strong financial position")
        
        if market_trends.get('growth_rate', 0) > 0.1:
            evidence.append("Favorable market conditions")
        
        evidence.append(f"Historical {action_type} activity")
        
        return evidence
    
    def _calculate_defensive_strategy_value(self, patent_opportunities: List[PatentOpportunity],
                                          competitor_predictions: List[CompetitorPrediction]) -> float:
        """Calculate expected value of defensive IP strategy"""
        base_value = 10000000  # Base defensive value
        
        # Adjust based on competitive threats
        high_threat_predictions = [p for p in competitor_predictions if abs(p.impact_on_us) > 0.5]
        threat_multiplier = 1 + len(high_threat_predictions) * 0.2
        
        # Adjust based on patent opportunities
        opportunity_multiplier = 1 + len(patent_opportunities) * 0.1
        
        return base_value * threat_multiplier * opportunity_multiplier
    
    def _calculate_offensive_strategy_value(self, patent_opportunities: List[PatentOpportunity],
                                          market_trends: Dict[str, Any]) -> float:
        """Calculate expected value of offensive IP strategy"""
        base_value = 20000000  # Base offensive value
        
        # Adjust based on market potential
        market_growth = market_trends.get('growth_rate', 0.1)
        growth_multiplier = 1 + market_growth * 2
        
        # Adjust based on patent opportunities
        high_potential_opps = [opp for opp in patent_opportunities if opp.market_potential > 0.7]
        opportunity_multiplier = 1 + len(high_potential_opps) * 0.15
        
        return base_value * growth_multiplier * opportunity_multiplier
    
    def _calculate_licensing_strategy_value(self, patent_opportunities: List[PatentOpportunity],
                                          market_trends: Dict[str, Any]) -> float:
        """Calculate expected value of licensing IP strategy"""
        base_value = 15000000  # Base licensing value
        
        # Adjust based on market size
        market_size = market_trends.get('market_size', 1000000000)
        size_multiplier = min(2.0, market_size / 1000000000)
        
        # Adjust based on patent quality
        avg_patent_quality = np.mean([opp.ip_strength for opp in patent_opportunities])
        quality_multiplier = 1 + avg_patent_quality
        
        return base_value * size_multiplier * quality_multiplier
    
    def _calculate_strategy_risk(self, strategy_type: str, competitor_predictions: List[CompetitorPrediction]) -> float:
        """Calculate risk level for IP strategy"""
        base_risks = {
            'defensive': 0.3,
            'offensive': 0.5,
            'licensing': 0.4
        }
        
        base_risk = base_risks.get(strategy_type, 0.4)
        
        # Adjust based on competitive activity
        competitive_activity = len(competitor_predictions)
        activity_adjustment = min(0.2, competitive_activity * 0.02)
        
        return min(1.0, base_risk + activity_adjustment)
    
    def _calculate_success_probability(self, strategy_type: str, patent_opportunities: List[PatentOpportunity]) -> float:
        """Calculate success probability for IP strategy"""
        base_probabilities = {
            'defensive': 0.8,
            'offensive': 0.6,
            'licensing': 0.7
        }
        
        base_probability = base_probabilities.get(strategy_type, 0.6)
        
        # Adjust based on patent opportunity quality
        if patent_opportunities:
            avg_opportunity_quality = np.mean([opp.ip_strength for opp in patent_opportunities])
            quality_adjustment = avg_opportunity_quality * 0.2
            return min(1.0, base_probability + quality_adjustment)
        
        return base_probability
    
    def _calculate_competitive_response_probability(self, strategy_type: str, 
                                                  competitor_predictions: List[CompetitorPrediction]) -> float:
        """Calculate probability of competitive response"""
        base_responses = {
            'defensive': 0.3,
            'offensive': 0.7,
            'licensing': 0.4
        }
        
        base_response = base_responses.get(strategy_type, 0.4)
        
        # Adjust based on competitor activity
        active_competitors = len(set(p.competitor_id for p in competitor_predictions))
        competitor_adjustment = min(0.3, active_competitors * 0.05)
        
        return min(1.0, base_response + competitor_adjustment)
    
    def _update_performance_tracking(self, confidence: float, execution_time: float, predictions_count: int):
        """Update performance tracking"""
        # This would update prediction accuracy and other metrics
        pass
    
    def _create_fallback_result(self) -> Dict[str, Any]:
        """Create fallback result when analysis fails"""
        return {
            'patent_opportunities': [],
            'competitor_predictions': [],
            'ip_strategy': None,
            'competitive_confidence': 0.1,
            'execution_time': 0.0,
            'analysis_timestamp': datetime.now().isoformat()
        }
