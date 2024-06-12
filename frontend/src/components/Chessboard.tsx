import { Chess, Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "../pages/Game";


const Chessboard = ({ socket, board, chess } : {
  socket: WebSocket;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null)[][]
  chess: Chess
}) => {

  const [from, setFrom] = useState< Square | null >(null)

  return (
    <div className="grid">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-8">
          {row.map((col, colIndex) => (
            <div onClick={() => {
              const squareName = String.fromCharCode(97 + colIndex) + (8 - rowIndex) as Square
              
              if (!from && col?.square) { 
                console.log(chess.turn())               
                setFrom(squareName)
              } else {
                socket.send(JSON.stringify({
                  type: MOVE,
                  payload: {
                      move: {
                        from,
                        to: squareName
                      }
                  }
                }))
                setFrom(null)
              }
              
            }}
            key={colIndex}
            className={`flex justify-center items-center size-12 md:size-16 ${(rowIndex+colIndex) % 2 === 0? 'bg-blue-500' : 'bg-white'}`}>
              <img src={"./" + col?.color + "_" + col?.type + ".png"} alt="" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}



export default Chessboard