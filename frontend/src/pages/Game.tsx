import { useEffect, useState } from "react"
import Chessboard from "../components/Chessboard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js"
import WinnerCard from "../components/WinnerCard"

export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

const Game = () => {

  const socket = useSocket()
  const [chess, setChess] = useState(new Chess())
  const [board, setBoard] = useState(chess.board())
  
  const [blackTime, setBlackTime] = useState(600)
  const [whiteTime, setWhiteTime] = useState(600)
  const [currentPlayer, setCurrentPlayer] = useState<null | String>(null)
  let blackIntervalId:any = undefined
  let whiteIntervalId:any = undefined
  const [winner, setWinner] = useState<null | String>(null)


  useEffect(() => {
    if (!socket) {
      return
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message)
      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess())
          setBoard(chess.board())
          setCurrentPlayer('w')
          console.log("Game Initialised")
          break
        case MOVE:
          const move = message.payload.move
          chess.move(move)
          setCurrentPlayer(chess.turn())
          setBoard(chess.board())
          console.log("Move made")
          break
        case GAME_OVER:
          console.log("Game Over")
          setWinner(message.payload.winner)
          break
      }
    }
 
  }, [socket])

  // let whiteIntervalId:any = undefined
  // let blackIntervalId:any = undefined

  useEffect(() => {
    if (currentPlayer === "w") {
      
      whiteIntervalId = setInterval(() => {
        if (whiteTime > 0) {
          setWhiteTime(whiteTime - 1);
        }  
      }, 1000); // Update every second

      return () => clearInterval(whiteIntervalId)
      
    } else if (currentPlayer === "b" ) {

      blackIntervalId = setInterval(() => {
        if (blackTime > 0) {
          setBlackTime(blackTime - 1);
        }  
      }, 1000); // Update every second

      return () => clearInterval(blackIntervalId)
    }
    
  }, );

  const formattedBlackTime = `${(Math.floor(blackTime / 60)).toString().padStart(2, '0')}:${(blackTime % 60).toString().padStart(2, '0')}`;
  const formattedWhiteTime = `${(Math.floor(whiteTime / 60)).toString().padStart(2, '0')}:${(whiteTime % 60).toString().padStart(2, '0')}`;


  if (!socket) return <div>Connectinggggg .......</div>
  return (
    <>
    {winner && <WinnerCard winner={winner} />}
    <div className="flex h-screen w-screen flex-col items-center flex-shrink md:flex-wrap md:flex-row"> 
      <div className="h-full w-full md:w-2/3 lg:w-1/2 flex flex-col justify-center gap-1 items-center mt-5 md:mt-0">
        <div className="flex justify-between w-96">
          <div className="bg-white ">Profile</div>
          <div className="bg-white px-2 rounded-sm font-semibold text-lg">{formattedBlackTime}</div>
        </div>
        <Chessboard socket={socket} board={board} chess={chess} />
        <div className=" flex justify-between w-96">
          <div className="bg-white">Profile</div>
          <div className="bg-white px-2 rounded-sm font-semibold text-lg">{formattedWhiteTime}</div>
        </div>
      </div>
      <div className="h-full w-full md:w-1/3 lg:w-1/2 flex justify-center items-center">
        <div className="bg-slate-800 h-3/4 w-1/2 rounded-md flex flex-shrink flex-col justify-center items-center gap-6"> 
          <button className="text-white px-24 py-3 bg-blue-500 rounded-sm text-xl font-semibold"
            onClick={() => {
              socket.send(JSON.stringify({
                type: INIT_GAME
              }))
            }} >
            Play
          </button>
          <button className="text-white px-20 py-3 bg-blue-500 rounded-sm text-xl font-semibold">10 min</button>
        </div>
      </div>
        
    </div>
    </>
  )
}

export default Game