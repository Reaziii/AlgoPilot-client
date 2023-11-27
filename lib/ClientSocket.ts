"use client"
import io, { Socket } from 'socket.io-client'
class ClientSocket {
    static socket: Socket | null = null;
    static connect = (): Socket => {
        if (ClientSocket.socket && ClientSocket.socket.connected) ClientSocket.socket;
        ClientSocket.socket = io(process.env.NEXT_PUBLIC_BACKEND_URL ?? "");
        ClientSocket.socket.on("connect", () => {
            console.log("[ws: connected to the server!]")
        })
        return ClientSocket.socket;
    }
}

export default ClientSocket;