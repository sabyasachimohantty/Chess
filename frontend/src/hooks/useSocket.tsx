import { useEffect, useState } from "react"

const WS_URL = "wss://chess-g7g5.onrender.com"

export const useSocket = () => {
    const[socket, setSocket] = useState<WebSocket | null>(null) 

    useEffect(() => {
        const ws = new WebSocket(WS_URL)
        ws.onopen = () => {
            setSocket(ws)
        }

        ws.onclose = () => {
            setSocket(null)
        }

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
        }

    }, [])

    return socket
}