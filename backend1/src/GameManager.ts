import { WebSocket } from "ws"
import { Game } from "./Game"
import { INIT_GAME, MOVE } from "./messages"

export class GameManager {
    private games: Game[]
    private pendingUser: WebSocket | null
    private users: WebSocket[]

    constructor() {
        this.games = []
        this.users = []
        this.pendingUser = null
    }

    addUser(socket: WebSocket) {
        this.users.push(socket)
        this.handleMessages(socket)
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter((user) => user !== socket)
    }

    private handleMessages(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString())

            if (message.type === INIT_GAME) {
                if (this.pendingUser) {
                    // start a game
                    this.games.push(new Game(this.pendingUser, socket))
                    this.pendingUser = null
                } else {
                    this.pendingUser = socket
                }            
            }

            if (message.type === MOVE) {

                const game = this.games.find(game => game.player1 === socket || game.player2 === socket)
                if (game) {
                    game.makeMove(socket, message.payload.move)
                } 

            }
        })
    }
}