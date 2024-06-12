import { useNavigate } from "react-router-dom"

const Landing = () => {

    const navigate = useNavigate()

  return (
    <div>
        <div className="flex justify-center align-middle size-full pt-24 gap-10">
            <div className="">
                <img className="h-96" src="chessboard.png" alt="" />
            </div>
            <div className="flex flex-col justify-center gap-6">
                <h1 className="text-white text-5xl font-bold">Welcome to Online Chess</h1>
                <div>
                    <button className="text-white px-10 py-3 bg-blue-500 rounded-sm text-xl font-semibold" onClick={() => navigate("/game")}>Play</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing