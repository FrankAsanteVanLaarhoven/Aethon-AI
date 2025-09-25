"""
Chess-like Business Intelligence API endpoints
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from typing import Dict, List, Any, Optional
import logging
from datetime import datetime

from app.services.chess_bi_engine import ChessBIEngine, GameState, Move, BusinessPiece, PieceType, Player, Position

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chess-bi", tags=["Chess Business Intelligence"])

# Initialize the chess BI engine
chess_engine = ChessBIEngine(depth=4)

class MarketData(BaseModel):
    """Market data for chess BI analysis"""
    conditions: Dict[str, float] = Field(..., description="Market conditions")
    landscape: Dict[str, Any] = Field(..., description="Competitive landscape")
    competitors: List[Dict[str, Any]] = Field(..., description="Competitor information")
    market_segments: List[str] = Field(default=[], description="Market segments")
    geographic_regions: List[str] = Field(default=[], description="Geographic regions")

class MoveAnalysis(BaseModel):
    """Move analysis result"""
    piece: str
    from_position: Dict[str, int]
    to_position: Dict[str, int]
    strategic_value: float
    risk_score: float
    expected_return: float
    confidence: float

class CompetitiveAnalysis(BaseModel):
    """Competitive analysis result"""
    best_move: MoveAnalysis
    top_moves: List[MoveAnalysis]
    position_evaluation: float
    market_control: float
    competitive_position: float
    total_moves_available: int
    analysis_timestamp: str
    recommendations: List[str]

class GameStateResponse(BaseModel):
    """Game state response"""
    board: List[List[Optional[Dict[str, Any]]]]
    pieces: List[Dict[str, Any]]
    current_player: str
    move_count: int
    market_conditions: Dict[str, float]
    competitive_landscape: Dict[str, Any]

@router.post("/analyze", response_model=CompetitiveAnalysis)
async def analyze_competitive_landscape(market_data: MarketData):
    """
    Analyze competitive landscape using chess-like strategic thinking
    """
    try:
        logger.info("Starting competitive landscape analysis")
        
        # Convert market data to dict
        market_dict = market_data.dict()
        
        # Perform analysis
        analysis_result = await chess_engine.analyze_competitive_landscape(market_dict)
        
        # Convert to response format
        best_move = MoveAnalysis(
            piece=analysis_result['best_move']['piece'],
            from_position=analysis_result['best_move']['from'],
            to_position=analysis_result['best_move']['to'],
            strategic_value=analysis_result['best_move']['strategic_value'],
            risk_score=analysis_result['best_move']['risk_score'],
            expected_return=analysis_result['best_move']['expected_return'],
            confidence=0.85  # Placeholder confidence score
        )
        
        top_moves = [
            MoveAnalysis(
                piece=move['piece'],
                from_position=move['from'],
                to_position=move['to'],
                strategic_value=move['strategic_value'],
                risk_score=move['risk_score'],
                expected_return=move['expected_return'],
                confidence=0.8 - (i * 0.1)  # Decreasing confidence
            )
            for i, move in enumerate(analysis_result['top_moves'])
        ]
        
        # Generate recommendations
        recommendations = generate_recommendations(analysis_result)
        
        response = CompetitiveAnalysis(
            best_move=best_move,
            top_moves=top_moves,
            position_evaluation=analysis_result['position_evaluation'],
            market_control=analysis_result['market_control'],
            competitive_position=analysis_result['competitive_position'],
            total_moves_available=analysis_result['total_moves_available'],
            analysis_timestamp=analysis_result['analysis_timestamp'],
            recommendations=recommendations
        )
        
        logger.info("Competitive landscape analysis completed")
        return response
        
    except Exception as e:
        logger.error(f"Error in competitive landscape analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/game-state", response_model=GameStateResponse)
async def get_game_state(market_data: MarketData):
    """
    Get current game state for visualization
    """
    try:
        logger.info("Generating game state")
        
        # Convert market data to dict
        market_dict = market_data.dict()
        
        # Initialize game state
        game_state = chess_engine.initialize_board(market_dict)
        
        # Convert board to response format
        board_response = []
        for row in game_state.board:
            board_row = []
            for cell in row:
                if cell is None:
                    board_row.append(None)
                else:
                    board_row.append({
                        'piece_type': cell.piece_type.value,
                        'player': cell.player.value,
                        'position': {'x': cell.position.x, 'y': cell.position.y},
                        'value': cell.value,
                        'influence_radius': cell.influence_radius,
                        'strategic_weight': cell.strategic_weight
                    })
            board_response.append(board_row)
        
        # Convert pieces to response format
        pieces_response = []
        for piece in game_state.pieces:
            pieces_response.append({
                'piece_type': piece.piece_type.value,
                'player': piece.player.value,
                'position': {'x': piece.position.x, 'y': piece.position.y},
                'value': piece.value,
                'influence_radius': piece.influence_radius,
                'strategic_weight': piece.strategic_weight
            })
        
        response = GameStateResponse(
            board=board_response,
            pieces=pieces_response,
            current_player=game_state.current_player.value,
            move_count=game_state.move_count,
            market_conditions=game_state.market_conditions,
            competitive_landscape=game_state.competitive_landscape
        )
        
        logger.info("Game state generated successfully")
        return response
        
    except Exception as e:
        logger.error(f"Error generating game state: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Game state generation failed: {str(e)}")

@router.post("/simulate-move")
async def simulate_move(
    market_data: MarketData,
    piece_type: str,
    from_x: int,
    from_y: int,
    to_x: int,
    to_y: int
):
    """
    Simulate a move and analyze its consequences
    """
    try:
        logger.info(f"Simulating move: {piece_type} from ({from_x}, {from_y}) to ({to_x}, {to_y})")
        
        # Convert market data to dict
        market_dict = market_data.dict()
        
        # Initialize game state
        game_state = chess_engine.initialize_board(market_dict)
        
        # Find the piece to move
        piece_to_move = None
        for piece in game_state.pieces:
            if (piece.piece_type.value == piece_type and 
                piece.position.x == from_x and 
                piece.position.y == from_y and
                piece.player == Player.COMPANY):
                piece_to_move = piece
                break
        
        if piece_to_move is None:
            raise HTTPException(status_code=400, detail="Piece not found or invalid move")
        
        # Create move
        move = Move(
            piece=piece_to_move,
            from_pos=Position(from_x, from_y),
            to_pos=Position(to_x, to_y),
            strategic_value=chess_engine._calculate_strategic_value(piece_to_move, Position(to_x, to_y), game_state),
            risk_score=chess_engine._calculate_risk_score(piece_to_move, Position(to_x, to_y), game_state),
            expected_return=chess_engine._calculate_expected_return(piece_to_move, Position(to_x, to_y), game_state)
        )
        
        # Simulate the move
        new_game_state = chess_engine._make_move(game_state, move)
        
        # Analyze the new position
        new_evaluation = chess_engine._evaluate_position(new_game_state)
        old_evaluation = chess_engine._evaluate_position(game_state)
        
        # Calculate impact
        impact = new_evaluation - old_evaluation
        
        # Get possible counter-moves
        counter_moves = chess_engine.get_possible_moves(new_game_state, Player.COMPETITOR)
        
        response = {
            'move': {
                'piece': piece_type,
                'from': {'x': from_x, 'y': from_y},
                'to': {'x': to_x, 'y': to_y},
                'strategic_value': move.strategic_value,
                'risk_score': move.risk_score,
                'expected_return': move.expected_return
            },
            'impact': {
                'position_change': impact,
                'old_evaluation': old_evaluation,
                'new_evaluation': new_evaluation
            },
            'counter_moves_available': len(counter_moves),
            'recommendation': 'GOOD' if impact > 0 else 'RISKY' if impact < -10 else 'NEUTRAL',
            'simulation_timestamp': datetime.now().isoformat()
        }
        
        logger.info(f"Move simulation completed with impact: {impact}")
        return response
        
    except Exception as e:
        logger.error(f"Error simulating move: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Move simulation failed: {str(e)}")

@router.get("/strategic-insights")
async def get_strategic_insights():
    """
    Get strategic insights and recommendations
    """
    try:
        insights = {
            'chess_principles': [
                'Control the center of the market',
                'Develop your pieces (resources) before attacking',
                'Protect your king (CEO) at all costs',
                'Use tactical combinations to gain advantage',
                'Think multiple moves ahead',
                'Sacrifice material for positional advantage when necessary'
            ],
            'business_applications': [
                'Market positioning is like controlling key squares',
                'Resource allocation is like piece development',
                'Risk management is like king safety',
                'Strategic partnerships are like tactical combinations',
                'Long-term planning is like thinking ahead',
                'Strategic investments are like positional sacrifices'
            ],
            'competitive_advantages': [
                'First-mover advantage in new markets',
                'Superior resource positioning',
                'Better risk management',
                'More effective strategic partnerships',
                'Longer-term strategic thinking',
                'Willingness to make strategic investments'
            ],
            'risk_factors': [
                'Overextending in multiple markets',
                'Leaving key positions undefended',
                'Failing to anticipate competitor moves',
                'Poor resource allocation',
                'Inadequate risk management',
                'Short-term thinking over long-term strategy'
            ]
        }
        
        return insights
        
    except Exception as e:
        logger.error(f"Error getting strategic insights: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get strategic insights: {str(e)}")

def generate_recommendations(analysis_result: Dict[str, Any]) -> List[str]:
    """Generate strategic recommendations based on analysis"""
    recommendations = []
    
    # Based on position evaluation
    position_eval = analysis_result['position_evaluation']
    if position_eval > 50:
        recommendations.append("Strong market position - consider aggressive expansion")
    elif position_eval < -50:
        recommendations.append("Weak market position - focus on defensive strategies")
    else:
        recommendations.append("Balanced position - maintain current strategy while seeking opportunities")
    
    # Based on market control
    market_control = analysis_result['market_control']
    if market_control < 2.0:
        recommendations.append("Low market control - increase market presence and influence")
    elif market_control > 5.0:
        recommendations.append("High market control - leverage position for competitive advantage")
    
    # Based on competitive position
    competitive_pos = analysis_result['competitive_position']
    if competitive_pos > 1.0:
        recommendations.append("Strong competitive positioning - maintain and build on advantages")
    else:
        recommendations.append("Improve competitive positioning through strategic moves")
    
    # Based on best move
    best_move = analysis_result['best_move']
    if best_move['risk_score'] > 0.5:
        recommendations.append("High-risk move identified - consider risk mitigation strategies")
    
    if best_move['expected_return'] > 10:
        recommendations.append("High-return opportunity identified - prioritize execution")
    
    return recommendations
