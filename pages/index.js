import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import "./component/Navbar";
import Navbar from "./component/Navbar";
import ContactCard from "./component/ContactCard";
import MessageSend from "./component/MessageSend";
import MessageCard from "./component/MessageCard";
import SearchAndAddContact from "./component/SearchAndAddContact";
import ProfileView from "./component/ProfileView";

import stylesLayout from "../styles/Layout.module.css";
import styles from "../styles/ContactCard.module.css";

import { HiOutlineDotsVertical } from 'react-icons/hi';
import { CgSearch } from 'react-icons/cg';

import { v4 as uuidv4 } from "uuid";

import { io } from "socket.io-client";

import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
    let router = useRouter();
    const bottomRef = useRef(null);
    const messageRef = useRef(null);

    var [socket, setSocket] = useState();
    var [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContact] = useState([]);
    const [userToken, setUserToken] = useState();
    const [messages, setMessages] = useState([]);
    const [otherToken, setOtherToken] = useState();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [updateContact, setUpdateContact] = useState(null);

    const [selectedContactCard, setSelectedContactCard] = useState();
    const [card, setCard] = useState();
    const [state, setState] = useState(false);

    const [messageSendBarToggle, setMessageSendBarToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    const [profileDataIndigator, setProfileDataIndigator] = useState(false);

    const [otherImage, setOtherImage] = useState("");
    const [otherName, setOtherName] = useState("");

    const [messagePageNo, setMessagePageNo] = useState(1);

    const [totalCurrentMessage, setTotalCurrentMessage] = useState(0);

    const [checkMoreMessage, setCheckMoreMessage] = useState(true);

    useEffect(() => {
        fetchUserDetail().then((res) => {
            setUserToken(String(res));
            getContact(String(res));
            // console.log("fetch user detail");
            // console.log("getContact runing")
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
                getContact(userToken);
                setArrivalMessage({text: msg.message, time: msg.time, type: "reciver", "tokenId": msg.senderT});
            });
        }
    }, [socket]);

    useEffect(() => {
        // arrivalMessage &&
        onMessageArrival(arrivalMessage);
    }, [arrivalMessage]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [arrivalMessage, selectedContact]);

    async function fetchUserDetail() {
        const token1 =
            localStorage.getItem("token") !== "undefined"
                ? localStorage.getItem("token")
                : localStorage.clear();
        if (!token1) {
            return router.push("/login");
        }
        return token1;
    }

    async function getContact(token) {
        // console.log("getContact called")
        let res = await fetch("/api/contacts", {
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
        // setMessagePageNo(1)
        setSelectedContact(oToken);
        if(!messageSendBarToggle){
            setMessageSendBarToggle(true);
        }
        setContactCardStyleOnClick(id);
        setOtherToken(oToken);
        let res = await fetch("/api/chat", {
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
        setMessages(mes.messages);
        setTotalCurrentMessage(mes.total);
        setMessagePageNo(2);
        setCheckMoreMessage(true);

        for (let i = 0; i < contacts.length; i++){
            if (contacts[i]["token"] == oToken){
                contacts[i]["count"] = 0;
                break;
            }
        }
        setContact(contacts);
    }

    async function sendMessage(token1, token2, text) {
        let res = await fetch("/api/chat", {
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
        setMessages((messages) => [mes, ...messages]);
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

    async function onMessageArrival(msg){
        if(msg){
            // let tok;
            if (msg.tokenId == selectedContact){
                await setMessages((messages) => [{text: msg.text, time: msg.time, type: "reciver"}, ...messages]);
                await resetMessageCount(userToken, msg.tokenId);

                // tok = msg.tokenId;
            }
            // else{
            //     for (let i = 0; i < contacts.length; i++){
            //         if (contacts[i]["token"] == msg.tokenId){
            //             contacts[i]["count"]++ ;
            //             console.log(contacts[i]["count"]);
            //             break;
            //         }
            //     }
            //     // setContact(contacts);
            // }
            // for (let i = 0; i < contacts.length; i++){
            //     if (contacts[i]["token"] == tok){
            //         contacts[i]["message"] = msg.text;
            //         contacts[i]["time"] = msg.time;
            //         console.log(contacts[i]["message"]);
            //         console.log(contacts[i]["time"]);
            //         break;
            //     }
            // }
            // setContact(contacts);
        }
    }

    function setCC(a){
        selectedContactCard(a);
    }

    const [profileData, setProfileData] = useState();

    useEffect(() => {
        if(selectedContactCard){
            getProfile();
        }
        // console.log(props.userToken, " ", props.otherToken);
    }, [selectedContactCard]);
    
    async function getProfile() {
        let res = await fetch("/api/get-profile", {
            method: "POST",
            body: JSON.stringify({
                yourToken: userToken,
                otherToken: selectedContactCard
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        if(res.status === 200){
            let data = await res.json();
            setOtherImage(data["image-url"]);
            // setOtherName(data["name"]);
            setProfileData(data);
            setProfileDataIndigator(true);
        }
        else {
            setProfileDataIndigator(false);
        }
        // console.log(data)
    }

    async function getMoreMessages() {
        // console.log("top");

        if(totalCurrentMessage < 20*(messagePageNo-1)){
            setCheckMoreMessage(false);
        }

        let res = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({
                senderToken: userToken,
                reciverToken: selectedContact,
                accessType: "read",
                limit: 20,
                page: messagePageNo,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        let mes = await res.json();
            // setMessages(mes);
            // console.log(mes)
        setMessagePageNo(messagePageNo+1);
        setTimeout(() => {
            setMessages(messages.concat(mes.messages));
        }, 1000);
    }

    return (
        <>
            <Navbar userToken={userToken} index={1}/>
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
                                    func={getMessage} 
                                    countState={selectedContactCard == contact.token? false : (contact.count === 0 ? false : true)}
                                    // countState={true}
                                    seleCard={setSelectedContactCard}
                                    setDetail={setOtherName}
                                    />
                            );
                        })}
                    </div>
                </div>
                <div className={stylesLayout.message} style={{width : !profileToggle? "76%" : "51%"}}>
                    {messageSendBarToggle && (<>
                        <div className={stylesLayout.messageContinerHeader}>
                            <div className={stylesLayout.contactProfile} onClick={() => !profileToggle? setProfileToggle(true): setProfileToggle(false)}>
                                <img src={otherImage == "" ? "avatar.png" : otherImage} alt="" width={40} height={40}/>
                                <h3>{otherName == "" ? "Name": otherName}</h3>
                            </div>
                            <div className={stylesLayout.messageSearchAndMenu}>
                                <div className={stylesLayout.messageSearch}>
                                    <CgSearch size={"1.6vw"}/>
                                </div>
                                <div className={stylesLayout.messageMenu}>
                                    <HiOutlineDotsVertical size={"1.6vw"}/>
                                </div>
                            </div>
                        </div>


                        <div className={stylesLayout.messageArea} id="message-continer" style={{
                                                                                                overflow: 'auto',
                                                                                                display: 'flex',
                                                                                                flexDirection: 'column-reverse'}} 
                                                                                                ref={messageRef} >
                            {/* <Dates/> */}
                            <div ref={bottomRef} />
                            <InfiniteScroll
                                dataLength={messages.length}
                                next={getMoreMessages}
                                style={{ display: "flex", flexDirection: "column-reverse" }}
                                inverse={true}
                                hasMore={true && checkMoreMessage} 
                                loader={<center><h4>Loading...</h4></center>}
                                scrollableTarget="message-continer"
                            >
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
                            </InfiniteScroll>
                            
                        </div>
                        <div className={stylesLayout.sendArea}>
                            {/* {messageSendBarToggle && ( */}
                                <MessageSend
                                    userToken={userToken}
                                    otherToken={otherToken}
                                    func={sendMessage}
                                />
                            {/* )} */}
                        </div>
                    </>)}
                </div>
                {profileToggle &&
                <div className={stylesLayout.profile}> 
                    {/* {profileDataIndigator &&
                        <UserProfile data={profileData} yourToken={userToken} otherToken={selectedContactCard}/>
                    }    */}

                    {profileDataIndigator &&
                        <ProfileView data={profileData} yourToken={userToken} otherToken={selectedContactCard}/>
                    }   

                    {/* <iframe src="https://rapid-cloud.co/embed-6/QcYzKwYtxRsV?vast=1&autoPlay=1&oa=0&asi=1" frameborder="0" referrerpolicy="strict-origin" allow="autoplay; fullscreen"></iframe> */}
                </div>}
            </div>
        </>
    );
}


async function resetMessageCount(t1, t2){
    fetch(`http://localhost:3000/api/reset-message-count?yourToken=${t1}&otherToken=${t2}`).then((res) => {return res}).then((data) => {console.log(data)});
}