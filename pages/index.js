import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import "./component/Navbar";
import Navbar from "./component/Navbar";
import ContactCard from "./component/ContactCard";
import MessageSend from "./component/MessageSend";
import MessageCard from "./component/MessageCard";
import SearchAndAddContact from "./component/SearchAndAddContact";
import UserProfile from "./component/UserProfile";

import stylesLayout from "../styles/Layout.module.css";
import styles from "../styles/ContactCard.module.css";

import { v4 as uuidv4 } from "uuid";

import { io } from "socket.io-client";

export default function Home() {
    let router = useRouter();
    const bottomRef = useRef(null);

    var [socket, setSocket] = useState();
    var [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContact] = useState([]);
    const [userToken, setUserToken] = useState();
    const [messages, setMessages] = useState([]);
    const [otherToken, setOtherToken] = useState();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [updateContact, setUpdateContact] = useState(null);

    const [card, setCard] = useState();
    const [state, setState] = useState(false);

    const [messageSendBarToggle, setMessageSendBarToggle] = useState(false);

    useEffect(() => {
        fetchUserDetail().then((res) => {
            setUserToken(String(res));
            getContact(String(res));
        });
    }, []);

    useEffect(() => {
        if (updateContact != null) {
            getContact(userToken);
        }
    }, [updateContact]);

    useEffect(() => {
        if (userToken) {
            fetch("/api/socket").then(() => {
                socket = io();

                socket.on("connect", () => {
                    //console.log('Connected')
                });
                socket.emit("add-user", userToken);
                setSocket(socket);
            });
        }
    }, [userToken]);

    useEffect(() => {
        if (socket) {
            socket.on("recive-msg", (msg) => {
                setArrivalMessage({text: msg.message, time: msg.time, type: "reciver", "tokenId": msg.senderT});
                getContact(userToken);
            });
        }
    }, [socket]);

    useEffect(() => {
        // arrivalMessage &&
        if(arrivalMessage){
            if (arrivalMessage.tokenId == selectedContact){
                // console.log("if ", arrivalMessage.tokenId, " ", selectedContact);
                setMessages((messages) => [...messages, {text: arrivalMessage.text, time: arrivalMessage.time, type: "reciver"}]);
                for (let i = 0; i < contacts.length; i++){
                    // console.log(i, " ", contacts[i]["token"] , " ", arrivalMessage.tokenId);
                    if (contacts[i]["token"] == arrivalMessage.tokenId){
                        // contacts[i]["count"] =0;
                        // console.log(contacts[i]["count"]);
                        break;
                    }
                }
                setContact(contacts);
            }
        }
    }, [arrivalMessage]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function fetchUserDetail() {
        const token1 =
            localStorage.getItem("token") !== "undefined"
                ? localStorage.getItem("token")
                : localStorage.clear();
        if (!token1) {
            return router.push("Login");
        }
        return token1;
    }

    async function getContact(token) {
        let res = await fetch("http://localhost:3000/api/contacts", {
            method: "POST",
            body: JSON.stringify({
                token: token,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        let data = await res.json();
        setContact(data["contacts"]);
    }

    async function getMessage(oToken, id) {
        setSelectedContact(oToken);
        if(!messageSendBarToggle){
            setMessageSendBarToggle(true);
        }
        setContactCardStyleOnClick(id);
        setOtherToken(oToken);
        let res = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            body: JSON.stringify({
                senderToken: userToken,
                reciverToken: oToken,
                accessType: "read",
                limit: 20,
                page: 1,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        let mes = await res.json();
        setMessages(mes);

        for (let i = 0; i < contacts.length; i++){
            if (contacts[i]["token"] == oToken){
                contacts[i]["count"] = 0;
                break;
            }
        }
        setContact(contacts);
    }

    async function sendMessage(token1, token2, text) {
        let res = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            body: JSON.stringify({
                senderToken: token1,
                reciverToken: token2,
                accessType: "write",
                text: text,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        let mes = await res.json();
        let time = new Date()
        socket.emit("send-msg", {
            userToken: token1,
            otherToken: token2,
            message: text,
            time: time,
        });
        setMessages((messages) => [...messages, mes]);
        // console.log(contacts[0]);

        for (let i = 0; i < contacts.length; i++){
            if (contacts[i]["token"] == token2){
                contacts[i]["message"] = text;
                contacts[i]["time"] = time; 
                break;
            }
        }
        setContact(contacts);
    }

    async function setContactCardStyleOnClick(id) {
        if (state === true) {
            card.classList.remove(styles.active);
        }
        let c = document.getElementById(id);
        c.classList.add(styles.active);
        setCard(c);
        setState(true);
    }

    return (
        <>
            <Navbar />
            <div className={stylesLayout.container}>
                <div className={stylesLayout.contact}>
                    <SearchAndAddContact
                        setUpdateContact={setUpdateContact}
                        updateContact={updateContact}/>

                    <div className={stylesLayout.contactList}>
                        {contacts?.map((contact) => {
                            return (
                                <ContactCard
                                    key={contact.token}
                                    name={contact.name}
                                    message={contact.message}
                                    time={contact.time}
                                    count={contact.count}
                                    otherToken={contact.token}
                                    selfToken={userToken}
                                    func={getMessage} />
                            );
                        })}
                    </div>
                </div>
                <div className={stylesLayout.message}>
                    <div
                        className={stylesLayout.messageArea}
                        id="message-continer"
                    >
                        {/* <Dates/> */}
                        {messages.map((message) => {
                            return (
                                <MessageCard
                                    key={uuidv4()}
                                    text={message.text}
                                    time={message.time}
                                    type={message.type}
                                />
                            );
                        })}
                        <div ref={bottomRef} />
                    </div>
                    <div className={stylesLayout.sendArea}>
                        {messageSendBarToggle && (
                            <MessageSend
                                userToken={userToken}
                                otherToken={otherToken}
                                func={sendMessage}
                            />
                        )}
                    </div>
                </div>
                <div className={stylesLayout.profile}>
                    <UserProfile />
                    {/* <iframe src="https://rapid-cloud.co/embed-6/QcYzKwYtxRsV?vast=1&autoPlay=1&oa=0&asi=1" frameborder="0" referrerpolicy="strict-origin" allow="autoplay; fullscreen"></iframe> */}
                </div>
            </div>
        </>
    );
}
