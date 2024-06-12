

const WinnerCard = ({ winner } : { winner:String }) => {
  return (
    <div className="flex z-10 absolute w-screen h-screen justify-center items-center">
        <div className="bg-slate-950 w-60 h-72 text-center text-white text-lg font-bold rounded-md flex flex-col justify-center items-center gap-8">
            {winner.toUpperCase()} Won
            <button className="px-10 py-3 bg-blue-900 rounded-sm">Ok</button>
        </div>
    </div>
  )
}

export default WinnerCard