"use client"
import { useEffect, useState } from "react"
import io from "socket.io-client"

export default function Chat() {
    const [socket, setSocket] = useState()
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState("")
    const [roomName, setRoomName] = useState("general")
    const handleSendMsg = () => {
        const message = prompt("Enter message")
        socket.emit("message", message,roomName)
    }  
    useEffect(() => {
        const socket = io("http://localhost:3000")
        socket.on("message", (message) => {
            setChat([...chat, message])
        })
        setSocket(socket)
    },[])
    return (
        <div>
            <h1>Chat</h1>
            {chat && chat.map((message, index) => (
                <div key={index}>
                    <p>{message}</p>
                </div>
            ))  }
            <button onClick={handleSendMsg}>Send Msg</button>
        </div>
    )
}