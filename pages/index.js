import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router';

import './component/Navbar'
import Navbar from './component/Navbar'
import ContactCard from './component/ContactCard'
import MessageSend from './component/MessageSend'
import MessageCard from './component/MessageCard'
import ChatControls from './component/ChatControls'

import stylesLayout from '../styles/Layout.module.css'
import styles from '../styles/ContactCard.module.css'

import { v4 as uuidv4 } from "uuid";

import { io } from "socket.io-client";


export default function Home() {
    let router = useRouter();
    const bottomRef = useRef(null);
    
    var [socket, setSocket] = useState();
    const [contacts, setContact] = useState([]);
    const [userToken, setUserToken] = useState();
    const [messages, setMessages] = useState([]);
    const [otherToken, setOtherToken] = useState();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [card, setCard] = useState();
    const [state, setState] = useState(false)

    useEffect(() => {
        fetchUserDetail().then((res) => {
            // console.log(res);
            setUserToken(String(res));
            getContact(res)
        });
    }, []);

    useEffect(() => {
        if (userToken) {
            // socket.current = io("http://localhost:3000/");
            fetch('/api/socket').then(() => {
                socket = io()

                socket.on('connect', () => {
                    //console.log('Connected')
                })
                socket.emit("add-user", userToken);
                setSocket(socket);
            })
            // socket.current = socketInitializer();
        }
    }, [userToken]);


    // const socketInitializer = async () => {
    //     await fetch('/api/socket');
    //     socket = io()

    //     socket.on('connect', () => {
    //         console.log('Connected')
    //     })

    //     return socket;
    // }

    // useEffect(() => {
    //     getContact(userToken);
    // }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    async function fetchUserDetail() {
        const token1 = localStorage.getItem("token") !== "undefined" ? localStorage.getItem("token") : localStorage.clear();
        if (!token1) {
            return router.push("Login");
        }
        return token1;
    }

    async function getContact(token) {
        let res = await fetch('http://localhost:3000/api/contacts', {
            method: 'POST',
            body: JSON.stringify({
                "token": token
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        let data = await res.json();
        // console.log(data)
        setContact(data["contacts"])
    }

    async function getMessage(oToken, id) {
        setContactCardStyleOnClick(id);
        setOtherToken(oToken);
        let res = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                "senderToken": userToken,
                "reciverToken": oToken,
                "accessType": "read",
                "limit": 20,
                "page": 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        let mes = await res.json()
        // console.log(mes)
        setMessages(mes)
    }

    async function sendMessage(token1, token2, text) {
        // console.log(token1, " ", token2);
        let res = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                "senderToken": token1,
                "reciverToken": token2,
                "accessType": "write",
                "text": text
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        let mes = await res.json()
        // console.log(mes)
        // let time = new Date();
        // console.log(socket)
        socket.emit("send-msg", {"token": token2, "message": text, "time": new Date()});
        setMessages(messages => [...messages, mes]);
    }

    useEffect(() => {
        // console.log("running")
        if(socket) {
            socket.on("recive-msg", (msg) => {
                //console.log(msg.message);
                setArrivalMessage({"text": msg.message, "time": msg.time, "type": "reciver"});
            })
        }
    }, [socket]);

    useEffect(() => {
        arrivalMessage && setMessages((messages) => [...messages, arrivalMessage]);
    }, [arrivalMessage]);

    async function setContactCardStyleOnClick(id) {
        if (state === true) {
            card.classList.remove(styles.active)
        }
        let c = document.getElementById(id);
        c.classList.add(styles.active);
        setCard(c)
        setState(true);
    }

    return (
        <>
            <Navbar />
            <ChatControls userToken={userToken} />

            <div className={stylesLayout.container}>
                <div className={stylesLayout.contact}>
                    <div className={stylesLayout.contactList}>
                        {contacts?.map((contact) => {
                            return (
                                <ContactCard key={contact.token} name={contact.name} message={contact.message} time={contact.time} count={contact.count} otherToken={contact.token} selfToken={userToken} func={getMessage} />
                            )
                        })}
                    </div>
                </div>
                <div className={stylesLayout.message}>
                    <div className={stylesLayout.messageArea} id="message-continer">
                        {/* <Dates/> */}
                        {messages.map((message) => {
                            return (
                                <MessageCard key={uuidv4()} text={message.text} time={message.time} type={message.type} />
                            ) 
                        })}
                        <div ref={bottomRef} />
                    </div>
                    <div className={stylesLayout.sendArea}>
                        <MessageSend userToken={userToken} otherToken={otherToken} func={sendMessage} />
                    </div>
                </div>
                <div className={stylesLayout.profile}>
                    {/* <iframe src="https://rapid-cloud.co/embed-6/PUplie9MnN4s?vast=1&amp;autoPlay=1&amp;oa=0&amp;asi=1" frameborder="0" referrerpolicy="strict-origin" allow="autoplay; fullscreen"></iframe> */}
                </div>
            </div>
        </>
    )
}
