"""
Chess-like Business Intelligence Engine
Implements minimax algorithm for strategic decision making in business intelligence
"""

import numpy as np
from typing import List, Dict, Tuple, Optional, Any
from dataclasses import dataclass
from enum import Enum
import asyncio
import logging
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class PieceType(Enum):
    """Business intelligence piece types representing different strategic elements"""
    CEO = "CEO"  # King - Most valuable, must be protected
    CFO = "CFO"  # Queen - High value, versatile
    CTO = "CTO"  # Rook - Strategic positioning
    CMO = "CMO"  # Bishop - Market influence
    VP = "VP"    # Knight - Tactical moves
    MANAGER = "MANAGER"  # Pawn - Basic operations

class Player(Enum):
    """Players in the business intelligence game"""
    COMPANY = "COMPANY"  # Our company
    COMPETITOR = "COMPETITOR"  # Competitor companies
    MARKET = "MARKET"  # Market forces
    REGULATOR = "REGULATOR"  # Regulatory bodies

@dataclass
class Position:
    """Position on the business intelligence board"""
    x: int  # Market segment (0-7)
    y: int  # Geographic region (0-7)

@dataclass
class BusinessPiece:
    """A piece in the business intelligence game"""
    piece_type: PieceType
    player: Player
    position: Position
    value: float
    influence_radius: int
    strategic_weight: float

@dataclass
class Move:
    """A move in the business intelligence game"""
    piece: BusinessPiece
    from_pos: Position
    to_pos: Position
    strategic_value: float
    risk_score: float
    expected_return: float

@dataclass
class GameState:
    """Current state of the business intelligence game"""
    board: np.ndarray  # 8x8 board representing market landscape
    pieces: List[BusinessPiece]
    current_player: Player
    move_count: int
    market_conditions: Dict[str, float]
    competitive_landscape: Dict[str, Any]

class ChessBIEngine:
    """
    Chess-like Business Intelligence Engine using Minimax algorithm
    for strategic decision making and competitive analysis
    """
    
    def __init__(self, depth: int = 4):
        self.depth = depth
        self.board_size = 8
        self.piece_values = {
            PieceType.CEO: 1000,
            PieceType.CFO: 90,
            PieceType.CTO: 50,
            PieceType.CMO: 30,
            PieceType.VP: 30,
            PieceType.MANAGER: 10
        }
        self.strategic_weights = {
            PieceType.CEO: 1.0,
            PieceType.CFO: 0.9,
            PieceType.CTO: 0.8,
            PieceType.CMO: 0.7,
            PieceType.VP: 0.6,
            PieceType.MANAGER: 0.3
        }
        
    def initialize_board(self, market_data: Dict[str, Any]) -> GameState:
        """Initialize the business intelligence board with market data"""
        board = np.full((self.board_size, self.board_size), None, dtype=object)
        pieces = []
        
        # Initialize company pieces
        company_pieces = self._create_company_pieces()
        pieces.extend(company_pieces)
        
        # Initialize competitor pieces
        competitor_pieces = self._create_competitor_pieces(market_data)
        pieces.extend(competitor_pieces)
        
        # Place pieces on board
        for piece in pieces:
            board[piece.position.y, piece.position.x] = piece
            
        return GameState(
            board=board,
            pieces=pieces,
            current_player=Player.COMPANY,
            move_count=0,
            market_conditions=market_data.get('conditions', {}),
            competitive_landscape=market_data.get('landscape', {})
        )
    
    def _create_company_pieces(self) -> List[BusinessPiece]:
        """Create our company's strategic pieces"""
        pieces = []
        
        # CEO at center-back
        pieces.append(BusinessPiece(
            piece_type=PieceType.CEO,
            player=Player.COMPANY,
            position=Position(4, 7),
            value=self.piece_values[PieceType.CEO],
            influence_radius=3,
            strategic_weight=self.strategic_weights[PieceType.CEO]
        ))
        
        # CFO and CTO as key strategic pieces
        pieces.append(BusinessPiece(
            piece_type=PieceType.CFO,
            player=Player.COMPANY,
            position=Position(3, 7),
            value=self.piece_values[PieceType.CFO],
            influence_radius=2,
            strategic_weight=self.strategic_weights[PieceType.CFO]
        ))
        
        pieces.append(BusinessPiece(
            piece_type=PieceType.CTO,
            player=Player.COMPANY,
            position=Position(5, 7),
            value=self.piece_values[PieceType.CTO],
            influence_radius=2,
            strategic_weight=self.strategic_weights[PieceType.CTO]
        ))
        
        # CMO and VPs
        pieces.append(BusinessPiece(
            piece_type=PieceType.CMO,
            player=Player.COMPANY,
            position=Position(2, 7),
            value=self.piece_values[PieceType.CMO],
            influence_radius=2,
            strategic_weight=self.strategic_weights[PieceType.CMO]
        ))
        
        pieces.append(BusinessPiece(
            piece_type=PieceType.VP,
            player=Player.COMPANY,
            position=Position(6, 7),
            value=self.piece_values[PieceType.VP],
            influence_radius=1,
            strategic_weight=self.strategic_weights[PieceType.VP]
        ))
        
        # Manager pawns
        for i in range(8):
            pieces.append(BusinessPiece(
                piece_type=PieceType.MANAGER,
                player=Player.COMPANY,
                position=Position(i, 6),
                value=self.piece_values[PieceType.MANAGER],
                influence_radius=1,
                strategic_weight=self.strategic_weights[PieceType.MANAGER]
            ))
            
        return pieces
    
    def _create_competitor_pieces(self, market_data: Dict[str, Any]) -> List[BusinessPiece]:
        """Create competitor pieces based on market data"""
        pieces = []
        competitors = market_data.get('competitors', [])
        
        for i, competitor in enumerate(competitors[:3]):  # Top 3 competitors
            # Competitor CEO
            pieces.append(BusinessPiece(
                piece_type=PieceType.CEO,
                player=Player.COMPETITOR,
                position=Position(i * 2 + 1, 0),
                value=self.piece_values[PieceType.CEO] * 0.8,  # Slightly weaker
                influence_radius=3,
                strategic_weight=self.strategic_weights[PieceType.CEO] * 0.8
            ))
            
            # Competitor key pieces
            pieces.append(BusinessPiece(
                piece_type=PieceType.CFO,
                player=Player.COMPETITOR,
                position=Position(i * 2 + 1, 1),
                value=self.piece_values[PieceType.CFO] * 0.8,
                influence_radius=2,
                strategic_weight=self.strategic_weights[PieceType.CFO] * 0.8
            ))
            
        return pieces
    
    def get_possible_moves(self, game_state: GameState, player: Player) -> List[Move]:
        """Get all possible moves for a player"""
        moves = []
        
        for piece in game_state.pieces:
            if piece.player == player:
                piece_moves = self._get_piece_moves(piece, game_state)
                moves.extend(piece_moves)
                
        return moves
    
    def _get_piece_moves(self, piece: BusinessPiece, game_state: GameState) -> List[Move]:
        """Get possible moves for a specific piece"""
        moves = []
        
        if piece.piece_type == PieceType.CEO:
            moves = self._get_ceo_moves(piece, game_state)
        elif piece.piece_type == PieceType.CFO:
            moves = self._get_cfo_moves(piece, game_state)
        elif piece.piece_type == PieceType.CTO:
            moves = self._get_cto_moves(piece, game_state)
        elif piece.piece_type == PieceType.CMO:
            moves = self._get_cmo_moves(piece, game_state)
        elif piece.piece_type == PieceType.VP:
            moves = self._get_vp_moves(piece, game_state)
        elif piece.piece_type == PieceType.MANAGER:
            moves = self._get_manager_moves(piece, game_state)
            
        return moves
    
    def _get_ceo_moves(self, piece: BusinessPiece, game_state: GameState) -> List[Move]:
        """CEO can move in any direction but conservatively"""
        moves = []
        directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
        
        for dx, dy in directions:
            new_x, new_y = piece.position.x + dx, piece.position.y + dy
            if self._is_valid_position(new_x, new_y):
                if self._is_safe_position(new_x, new_y, game_state, piece.player):
                    move = Move(
                        piece=piece,
                        from_pos=piece.position,
                        to_pos=Position(new_x, new_y),
                        strategic_value=self._calculate_strategic_value(piece, Position(new_x, new_y), game_state),
                        risk_score=self._calculate_risk_score(piece, Position(new_x, new_y), game_state),
                        expected_return=self._calculate_expected_return(piece, Position(new_x, new_y), game_state)
                    )
                    moves.append(move)
                    
        return moves
    
    def _get_cfo_moves(self, piece: BusinessPiece, game_state: GameState) -> List[Move]:
        """CFO can move like a queen - any direction, any distance"""
        moves = []
        directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
        
        for dx, dy in directions:
            for distance in range(1, 8):
                new_x, new_y = piece.position.x + dx * distance, piece.position.y + dy * distance
                if not self._is_valid_position(new_x, new_y):
                    break
                    
                if self._can_capture_at(new_x, new_y, game_state, piece.player):
                    move = Move(
                        piece=piece,
                        from_pos=piece.position,
                        to_pos=Position(new_x, new_y),
                        strategic_value=self._calculate_strategic_value(piece, Position(new_x, new_y), game_state),
                        risk_score=self._calculate_risk_score(piece, Position(new_x, new_y), game_state),
                        expected_return=self._calculate_expected_return(piece, Position(new_x, new_y), game_state)
                    )
                    moves.append(move)
                    break
                elif game_state.board[new_y, new_x] is None:
                    move = Move(
                        piece=piece,
                        from_pos=piece.position,
                        to_pos=Position(new_x, new_y),
                        strategic_value=self._calculate_strategic_value(piece, Position(new_x, new_y), game_state),
                        risk_score=self._calculate_risk_score(piece, Position(new_x, new_y), game_state),
                        expected_return=self._calculate_expected_return(piece, Position(new_x, new_y), game_state)
                    )
                    moves.append(move)
                else:
                    break
                    
        return moves
    
    def _get_cto_moves(self, piece: BusinessPiece, game_state: GameState) -> List[Move]:
        """CTO moves like a rook - horizontal and vertical"""
        moves = []
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        
        for dx, dy in directions:
            for distance in range(1, 8):
                new_x, new_y = piece.position.x + dx * distance, piece.position.y + dy * distance
                if not self._is_valid_position(new_x, new_y):
                    break
                    
                if self._can_capture_at(new_x, new_y, game_state, piece.player):
                    move = Move(
                        piece=piece,
                        from_pos=piece.position,
                        to_pos=Position(new_x, new_y),
                        strategic_value=self._calculate_strategic_value(piece, Position(new_x, new_y), game_state),
                        risk_score=self._calculate_risk_score(piece, Position(new_x, new_y), game_state),
                        expected_return=self._calculate_expected_return(piece, Position(new_x, new_y), game_state)
                    )
                    moves.append(move)
                    break
                elif game_state.board[new_y, new_x] is None:
                    move = Move(
                        piece=piece,
                        from_pos=piece.position,
                        to_pos=Position(new_x, new_y),
                        strategic_value=self._calculate_strategic_value(piece, Position(new_x, new_y), game_state),
                        risk_score=self._calculate_risk_score(piece, Position(new_x, new_y), game_state),
                        expected_return=self._calculate_expected_return(piece, Position(new_x, new_y), game_state)
                    )
                    moves.append(move)
                else:
                    break
                    
        return moves
    
    def _get_cmo_moves(self, piece: BusinessPiece, game_state: GameState) -> List[Move]:
        """CMO moves like a bishop - diagonally"""
        moves = []
        directions = [(-1, -1), (-1, 1), (1, -1), (1, 1)]
        
        for dx, dy in directions:
            for distance in range(1, 8):
                new_x, new_y = piece.position.x + dx * distance, piece.position.y + dy * distance
                if not self._is_valid_position(new_x, new_y):
                    break
                    
                if self._can_capture_at(new_x, new_y, game_state, piece.player):
                    move = Move(
                        piece=piece,
                        from_pos=piece.position,
                        to_pos=Position(new_x, new_y),
                        strategic_value=self._calculate_strategic_value(piece, Position(new_x, new_y), game_state),
                        risk_score=self._calculate_risk_score(piece, Position(new_x, new_y), game_state),
                        expected_return=self._calculate_expected_return(piece, Position(new_x, new_y), game_state)
                    )
                    moves.append(move)
                    break
                elif game_state.board[new_y, new_x] is None:
                    move = Move(
                        piece=piece,
                        from_pos=piece.position,
                        to_pos=Position(new_x, new_y),
                        strategic_value=self._calculate_strategic_value(piece, Position(new_x, new_y), game_state),
                        risk_score=self._calculate_risk_score(piece, Position(new_x, new_y), game_state),
                        expected_return=self._calculate_expected_return(piece, Position(new_x, new_y), game_state)
                    )
                    moves.append(move)
                else:
                    break
                    
        return moves
    
    def _get_vp_moves(self, piece: BusinessPiece, game_state: GameState) -> List[Move]:
        """VP moves like a knight - L-shaped moves"""
        moves = []
        knight_moves = [(-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1)]
        
        for dx, dy in knight_moves:
            new_x, new_y = piece.position.x + dx, piece.position.y + dy
            if self._is_valid_position(new_x, new_y):
                if self._can_capture_at(new_x, new_y, game_state, piece.player) or game_state.board[new_y, new_x] is None:
                    move = Move(
                        piece=piece,
                        from_pos=piece.position,
                        to_pos=Position(new_x, new_y),
                        strategic_value=self._calculate_strategic_value(piece, Position(new_x, new_y), game_state),
                        risk_score=self._calculate_risk_score(piece, Position(new_x, new_y), game_state),
                        expected_return=self._calculate_expected_return(piece, Position(new_x, new_y), game_state)
                    )
                    moves.append(move)
                    
        return moves
    
    def _get_manager_moves(self, piece: BusinessPiece, game_state: GameState) -> List[Move]:
        """Manager moves like a pawn - forward movement with capture diagonally"""
        moves = []
        
        # Forward movement
        direction = -1 if piece.player == Player.COMPANY else 1
        new_y = piece.position.y + direction
        
        if self._is_valid_position(piece.position.x, new_y) and game_state.board[new_y, piece.position.x] is None:
            move = Move(
                piece=piece,
                from_pos=piece.position,
                to_pos=Position(piece.position.x, new_y),
                strategic_value=self._calculate_strategic_value(piece, Position(piece.position.x, new_y), game_state),
                risk_score=self._calculate_risk_score(piece, Position(piece.position.x, new_y), game_state),
                expected_return=self._calculate_expected_return(piece, Position(piece.position.x, new_y), game_state)
            )
            moves.append(move)
            
        # Diagonal captures
        for dx in [-1, 1]:
            new_x, new_y = piece.position.x + dx, piece.position.y + direction
            if self._is_valid_position(new_x, new_y) and self._can_capture_at(new_x, new_y, game_state, piece.player):
                move = Move(
                    piece=piece,
                    from_pos=piece.position,
                    to_pos=Position(new_x, new_y),
                    strategic_value=self._calculate_strategic_value(piece, Position(new_x, new_y), game_state),
                    risk_score=self._calculate_risk_score(piece, Position(new_x, new_y), game_state),
                    expected_return=self._calculate_expected_return(piece, Position(new_x, new_y), game_state)
                )
                moves.append(move)
                
        return moves
    
    def _is_valid_position(self, x: int, y: int) -> bool:
        """Check if position is within board bounds"""
        return 0 <= x < self.board_size and 0 <= y < self.board_size
    
    def _is_safe_position(self, x: int, y: int, game_state: GameState, player: Player) -> bool:
        """Check if position is safe from enemy attacks"""
        for piece in game_state.pieces:
            if piece.player != player:
                if self._can_attack_position(piece, Position(x, y), game_state):
                    return False
        return True
    
    def _can_attack_position(self, piece: BusinessPiece, target_pos: Position, game_state: GameState) -> bool:
        """Check if a piece can attack a specific position"""
        # Simplified attack check - in real implementation, would check all possible moves
        distance = abs(piece.position.x - target_pos.x) + abs(piece.position.y - target_pos.y)
        return distance <= piece.influence_radius
    
    def _can_capture_at(self, x: int, y: int, game_state: GameState, player: Player) -> bool:
        """Check if player can capture at position"""
        target_piece = game_state.board[y, x]
        return target_piece is not None and target_piece.player != player
    
    def _calculate_strategic_value(self, piece: BusinessPiece, target_pos: Position, game_state: GameState) -> float:
        """Calculate strategic value of moving to a position"""
        base_value = piece.strategic_weight
        
        # Market position bonus
        market_bonus = self._get_market_position_bonus(target_pos, game_state)
        
        # Control bonus
        control_bonus = self._get_control_bonus(target_pos, game_state, piece.player)
        
        return base_value + market_bonus + control_bonus
    
    def _calculate_risk_score(self, piece: BusinessPiece, target_pos: Position, game_state: GameState) -> float:
        """Calculate risk score of moving to a position"""
        risk = 0.0
        
        # Check for enemy threats
        for enemy_piece in game_state.pieces:
            if enemy_piece.player != piece.player:
                if self._can_attack_position(enemy_piece, target_pos, game_state):
                    risk += enemy_piece.value / 100.0
                    
        # Position exposure risk
        exposure_risk = self._calculate_exposure_risk(target_pos, game_state)
        
        return risk + exposure_risk
    
    def _calculate_expected_return(self, piece: BusinessPiece, target_pos: Position, game_state: GameState) -> float:
        """Calculate expected return of moving to a position"""
        base_return = piece.value * 0.1
        
        # Market opportunity bonus
        opportunity_bonus = self._get_market_opportunity_bonus(target_pos, game_state)
        
        # Competitive advantage
        competitive_bonus = self._get_competitive_advantage(target_pos, game_state, piece.player)
        
        return base_return + opportunity_bonus + competitive_bonus
    
    def _get_market_position_bonus(self, pos: Position, game_state: GameState) -> float:
        """Get bonus for market position"""
        # Center positions are more valuable
        center_distance = abs(pos.x - 3.5) + abs(pos.y - 3.5)
        return max(0, 0.5 - center_distance * 0.1)
    
    def _get_control_bonus(self, pos: Position, game_state: GameState, player: Player) -> float:
        """Get bonus for controlling key positions"""
        control_bonus = 0.0
        
        # Check surrounding positions
        for dx in [-1, 0, 1]:
            for dy in [-1, 0, 1]:
                if dx == 0 and dy == 0:
                    continue
                check_x, check_y = pos.x + dx, pos.y + dy
                if self._is_valid_position(check_x, check_y):
                    piece = game_state.board[check_y, check_x]
                    if piece is None or piece.player == player:
                        control_bonus += 0.1
                        
        return control_bonus
    
    def _calculate_exposure_risk(self, pos: Position, game_state: GameState) -> float:
        """Calculate exposure risk of a position"""
        exposure = 0.0
        
        # Check how many enemy pieces can attack this position
        for piece in game_state.pieces:
            if piece.player != Player.COMPANY:  # Assuming we're the company
                if self._can_attack_position(piece, pos, game_state):
                    exposure += 0.2
                    
        return exposure
    
    def _get_market_opportunity_bonus(self, pos: Position, game_state: GameState) -> float:
        """Get bonus for market opportunities"""
        # This would be based on real market data
        return 0.1  # Placeholder
    
    def _get_competitive_advantage(self, pos: Position, game_state: GameState, player: Player) -> float:
        """Get competitive advantage bonus"""
        advantage = 0.0
        
        # Check if position gives advantage over competitors
        for piece in game_state.pieces:
            if piece.player != player:
                distance = abs(piece.position.x - pos.x) + abs(piece.position.y - pos.y)
                if distance <= 2:  # Close to competitor
                    advantage += 0.2
                    
        return advantage
    
    def minimax(self, game_state: GameState, depth: int, maximizing_player: bool, alpha: float = float('-inf'), beta: float = float('inf')) -> Tuple[float, Optional[Move]]:
        """
        Minimax algorithm with alpha-beta pruning for optimal move selection
        """
        if depth == 0 or self._is_game_over(game_state):
            return self._evaluate_position(game_state), None
            
        if maximizing_player:
            max_eval = float('-inf')
            best_move = None
            
            moves = self.get_possible_moves(game_state, Player.COMPANY)
            for move in moves:
                new_state = self._make_move(game_state, move)
                eval_score, _ = self.minimax(new_state, depth - 1, False, alpha, beta)
                
                if eval_score > max_eval:
                    max_eval = eval_score
                    best_move = move
                    
                alpha = max(alpha, eval_score)
                if beta <= alpha:
                    break  # Beta cutoff
                    
            return max_eval, best_move
        else:
            min_eval = float('inf')
            best_move = None
            
            moves = self.get_possible_moves(game_state, Player.COMPETITOR)
            for move in moves:
                new_state = self._make_move(game_state, move)
                eval_score, _ = self.minimax(new_state, depth - 1, True, alpha, beta)
                
                if eval_score < min_eval:
                    min_eval = eval_score
                    best_move = move
                    
                beta = min(beta, eval_score)
                if beta <= alpha:
                    break  # Alpha cutoff
                    
            return min_eval, best_move
    
    def _is_game_over(self, game_state: GameState) -> bool:
        """Check if game is over"""
        # Game over if CEO is captured or no valid moves
        company_ceo = None
        for piece in game_state.pieces:
            if piece.player == Player.COMPANY and piece.piece_type == PieceType.CEO:
                company_ceo = piece
                break
                
        if company_ceo is None:
            return True
            
        # Check if no valid moves
        moves = self.get_possible_moves(game_state, game_state.current_player)
        return len(moves) == 0
    
    def _evaluate_position(self, game_state: GameState) -> float:
        """Evaluate the current position"""
        score = 0.0
        
        # Material score
        for piece in game_state.pieces:
            if piece.player == Player.COMPANY:
                score += piece.value
            else:
                score -= piece.value
                
        # Positional score
        positional_score = self._calculate_positional_score(game_state)
        score += positional_score
        
        # Strategic score
        strategic_score = self._calculate_strategic_score(game_state)
        score += strategic_score
        
        return score
    
    def _calculate_positional_score(self, game_state: GameState) -> float:
        """Calculate positional score"""
        score = 0.0
        
        for piece in game_state.pieces:
            if piece.player == Player.COMPANY:
                # Center control bonus
                center_distance = abs(piece.position.x - 3.5) + abs(piece.position.y - 3.5)
                score += (7 - center_distance) * 0.1
                
                # Mobility bonus
                moves = self._get_piece_moves(piece, game_state)
                score += len(moves) * 0.05
                
        return score
    
    def _calculate_strategic_score(self, game_state: GameState) -> float:
        """Calculate strategic score"""
        score = 0.0
        
        # Market control
        market_control = self._calculate_market_control(game_state)
        score += market_control
        
        # Competitive positioning
        competitive_position = self._calculate_competitive_position(game_state)
        score += competitive_position
        
        return score
    
    def _calculate_market_control(self, game_state: GameState) -> float:
        """Calculate market control score"""
        control = 0.0
        
        for piece in game_state.pieces:
            if piece.player == Player.COMPANY:
                # Each piece controls its influence radius
                control += piece.influence_radius * 0.1
                
        return control
    
    def _calculate_competitive_position(self, game_state: GameState) -> float:
        """Calculate competitive positioning score"""
        position_score = 0.0
        
        # Check relative positioning to competitors
        company_pieces = [p for p in game_state.pieces if p.player == Player.COMPANY]
        competitor_pieces = [p for p in game_state.pieces if p.player == Player.COMPETITOR]
        
        for company_piece in company_pieces:
            for competitor_piece in competitor_pieces:
                distance = abs(company_piece.position.x - competitor_piece.position.x) + abs(company_piece.position.y - competitor_piece.position.y)
                if distance <= 2:  # Close positioning
                    position_score += 0.2
                    
        return position_score
    
    def _make_move(self, game_state: GameState, move: Move) -> GameState:
        """Make a move and return new game state"""
        new_board = game_state.board.copy()
        new_pieces = []
        
        # Update piece position
        for piece in game_state.pieces:
            if piece == move.piece:
                new_piece = BusinessPiece(
                    piece_type=piece.piece_type,
                    player=piece.player,
                    position=move.to_pos,
                    value=piece.value,
                    influence_radius=piece.influence_radius,
                    strategic_weight=piece.strategic_weight
                )
                new_pieces.append(new_piece)
                new_board[move.to_pos.y, move.to_pos.x] = new_piece
            else:
                new_pieces.append(piece)
                
        # Remove captured piece
        captured_piece = game_state.board[move.to_pos.y, move.to_pos.x]
        if captured_piece and captured_piece != move.piece:
            new_pieces = [p for p in new_pieces if p != captured_piece]
            
        # Clear old position
        new_board[move.from_pos.y, move.from_pos.x] = None
        
        return GameState(
            board=new_board,
            pieces=new_pieces,
            current_player=Player.COMPETITOR if game_state.current_player == Player.COMPANY else Player.COMPANY,
            move_count=game_state.move_count + 1,
            market_conditions=game_state.market_conditions,
            competitive_landscape=game_state.competitive_landscape
        )
    
    async def get_best_move(self, game_state: GameState) -> Move:
        """Get the best move using minimax algorithm"""
        logger.info(f"Calculating best move with depth {self.depth}")
        
        # Run minimax in thread pool to avoid blocking
        loop = asyncio.get_event_loop()
        score, best_move = await loop.run_in_executor(
            None, 
            self.minimax, 
            game_state, 
            self.depth, 
            True
        )
        
        if best_move is None:
            # Fallback to first available move
            moves = self.get_possible_moves(game_state, Player.COMPANY)
            if moves:
                best_move = moves[0]
            else:
                raise ValueError("No valid moves available")
                
        logger.info(f"Best move: {best_move.piece.piece_type.value} from {best_move.from_pos} to {best_move.to_pos} (score: {score})")
        return best_move
    
    async def analyze_competitive_landscape(self, market_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze competitive landscape using chess-like strategic thinking"""
        game_state = self.initialize_board(market_data)
        
        # Get best move
        best_move = await self.get_best_move(game_state)
        
        # Analyze all possible moves
        all_moves = self.get_possible_moves(game_state, Player.COMPANY)
        
        # Sort moves by strategic value
        sorted_moves = sorted(all_moves, key=lambda m: m.strategic_value, reverse=True)
        
        # Calculate competitive metrics
        competitive_metrics = {
            'best_move': {
                'piece': best_move.piece.piece_type.value,
                'from': {'x': best_move.from_pos.x, 'y': best_move.from_pos.y},
                'to': {'x': best_move.to_pos.x, 'y': best_move.to_pos.y},
                'strategic_value': best_move.strategic_value,
                'risk_score': best_move.risk_score,
                'expected_return': best_move.expected_return
            },
            'top_moves': [
                {
                    'piece': move.piece.piece_type.value,
                    'from': {'x': move.from_pos.x, 'y': move.from_pos.y},
                    'to': {'x': move.to_pos.x, 'y': move.to_pos.y},
                    'strategic_value': move.strategic_value,
                    'risk_score': move.risk_score,
                    'expected_return': move.expected_return
                }
                for move in sorted_moves[:5]
            ],
            'position_evaluation': self._evaluate_position(game_state),
            'market_control': self._calculate_market_control(game_state),
            'competitive_position': self._calculate_competitive_position(game_state),
            'total_moves_available': len(all_moves),
            'analysis_timestamp': datetime.now().isoformat()
        }
        
        return competitive_metrics
