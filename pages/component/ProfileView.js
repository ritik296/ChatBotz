import React from "react";
import styles from "../../styles/UserProfile.module.css";
import { BiPhoneCall, BiSend } from "react-icons/bi";
import { AiOutlinePaperClip, AiTwotoneHeart } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";
import { GoMail } from "react-icons/go";
import { BsThreeDots, BsTelephoneFill } from "react-icons/bs";
import { HiPencil, HiOutlineEmojiHappy } from "react-icons/hi";
import { FaToolbox, FaUserAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { TbCircleCheck } from "react-icons/tb";
import { useState, useEffect } from "react";

const ProfileView = (props) => {
    const [text, setText] = useState("");
    const [protection, setProtection] = useState(false);
    const [attachedEmail, setAttachedEmail] = useState("");
    const [followToggle, setFollowToggle] = useState(false);
    const [comments, setComments] = useState([]);
    const [followColor, setFollowColor] = useState("black");

    useEffect(() => {
        console.log(props.data);
        checkFollowStatus();
    }, []);

    useEffect(() => {
        setComments(props.data["comments"]["comment-list"]);
    }, []);

    async function sendComment() {
        let time = new Date();
        let res = await fetch("/api/send-comment", {
            method: "POST",
            body: JSON.stringify({
                "reciver-token": props.otherToken,
                "sender-token": props.yourToken,
                time: time,
                text: text,
                protection: !protection ? "public" : "private",
                file: "",
                "attached-email": attachedEmail,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        if (res.status === 200) {
            let data = await res.json();
            setComments((comments) => [
                {
                    "sender-name": "Name",
                    time: time,
                    "sender-image": "",
                    text: text,
                    protection: !protection ? "public" : "private",
                    file: "",
                    "attached-email": attachedEmail,
                    "sender-token": props.yourToken,
                },
                ...comments,
            ]);
            // setMessages((messages) => [...messages, mes]);
            setText("");
            setProtection(false);
            setAttachedEmail();
        }
    }

    async function sendFollowRequest() {
        let res = await fetch("http://localhost:3000/api/send-follow-request", {
            method: "POST",
            body: JSON.stringify({
                "follower-token": props.yourToken,
                "followed-token": props.otherToken,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        if (res.status === 200) {
            let data = await res.json();
            if (data["ok"] == "request sended") {
                setFollowColor("green");
            } else if (data["ok"] == "followed") {
                setFollowColor("red");
            }
        }
    }

    async function checkFollowStatus() {
        let res = await fetch(
            "http://localhost:3000/api/check-follower-status",
            {
                method: "POST",
                body: JSON.stringify({
                    "sender-token": props.yourToken,
                    "requester-token": props.otherToken,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }
        );
        if (res.status === 200) {
            let data = await res.json();
            setFollowToggle(data["ok"]);

            if (data["ok"] == "true") {
                setFollowColor("red");
            } else if (data["ok"] == "pendding") {
                setFollowColor("green");
            } else {
                setFollowColor("black");
            }
        }
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatarImg}>
                        <img src={!props.data["image-url"] ? "/avatar.png" : props.data["image-url"]} alt="" className={styles.avatarImgCon} />
                    </div>
                    <div className={styles.editAvatar}>
                        <HiPencil size={15}/>
                    </div>
                </div>
                <div className={styles.nameContainer}>
                    <h1 className={styles.name}>{props.data.name}</h1>
                </div>
                <div className={styles.communicationWaysContainer}>
                    <div className={styles.commBtnContiner}>
                        <button className={styles.commBtn}><BiPhoneCall size={25} /></button>
                    </div>
                    <div className={styles.commBtnContiner}>
                        <button className={styles.commBtn} style={{color : followColor}} onClick={() => sendFollowRequest()}><AiTwotoneHeart size={25} /></button>
                    </div>
                    <div className={styles.commBtnContiner}>
                        <button className={styles.commBtn}><GoMail size={25} /></button>
                    </div>
                    <div className={styles.commBtnContiner}>
                        <button className={styles.commBtn}><BsThreeDots size={25} /></button>
                    </div>
                </div>
                <div className={styles.lineBreak}></div>
                <div className={styles.infoContainer}>
                    <div className={styles.infoKeys}>
                        <div className={styles.key}>
                            <div className={styles.keyIcon}><FaToolbox/></div>
                            <div className={styles.keyText}>Company</div>
                        </div>
                        <div className={styles.key}>
                            <div className={styles.keyIcon}><FaUserAlt/></div>
                            <div className={styles.keyText}>Role</div>
                        </div>
                        <div className={styles.key}>
                            <div className={styles.keyIcon}><BsTelephoneFill/></div>
                            <div className={styles.keyText}>Phone</div>
                        </div>
                        <div className={styles.key}>
                            <div className={styles.keyIcon}><MdAlternateEmail/></div>
                            <div className={styles.keyText}>Email</div>
                        </div>
                        <div className={styles.key}>
                            <div className={styles.keyIcon}><TiThMenu/></div>
                            <div className={styles.keyText}>Tags</div>
                        </div>
                    </div>
                    <div className={styles.infoValues}>
                            <div className={styles.value}>{!props.data["personal-detail"]["company"] ? "Set a Company... " : props.data["personal-detail"]["company"]}</div>
                            <div className={styles.value}>{!props.data["personal-detail"]["role"] ? "Set a Role... " : props.data["personal-detail"]["role"]}</div>
                            <div className={styles.value}>{!props.data["personal-detail"]["phone"] ? props.data.contact : props.data["personal-detail"]["phone"]}</div>
                            <div className={styles.value}>{!props.data["personal-detail"]["emails"] ? props.data.email : props.data["personal-detail"]["emails"]}</div>
                            {/* <div className={styles.value}>Set a Role...</div>
                            <div className={styles.value}>Set a Phone...</div>
                            <div className={styles.value}>Set a Email...</div> */}
                            <div className={`${styles.value} ${styles.tagValues}`}>
                                {props.data["personal-detail"]["tags"].map((tag) => {
                                    return (
                                        <div className={styles.tag} key={tag}>
                                            <div className={styles.tagDot}></div>
                                            <div className={styles.tagName}>{tag}</div>
                                        </div>
                                    );
                                })}
                            </div>
                    </div>
                </div>
                <div className={styles.commentLineBreak}></div>
                <div className={styles.commentContainer}>
                    {comments.map((com) => {
                        return (
                            <div className={styles.commentBox} key={com["time"]}>
                                <div className={styles.commentAvatar}>
                                    <img src={!com["sender-image"] ? "/avatar.png" : com["sender-image"]} alt="" width={50} height={50}/>
                                </div>
                                <div className={styles.commentContent}>
                                    <div className={styles.commentHead}>
                                        <div className={styles.commentName}>
                                            <h2>{com["sender-name"]}</h2>
                                        </div>
                                        <div className={styles.commentTime}>
                                            <p>{new Date(com["time"]).toTimeString().slice(0,5)}</p>
                                        </div>
                                    </div>
                                    <div className={styles.commentBody}>
                                        <p>{com.text}<span className={styles.paragraphOverFlow}> &nbsp;More...</span></p>
                                    </div>
                                </div>
                            </div>            
                        );
                    })}
                </div>

                <div className={styles.sendCommentContainer}>
                    <div className={styles.sendCommentBox}>
                        <div className={styles.commentInput}>
                            <input type="text" value={text} placeholder="Write comment here..." onChange={(e) => setText(e.target.value)}/>
                        </div>
                        <div className={styles.functionlity}>
                            <button className={styles.btnBox} style={{background : protection? "rebeccapurple": "white", color : protection? "white": "grey"}} onClick={() => protection ? setProtection(false) : setProtection(true)}><TbCircleCheck size={24}/></button>
                            <button className={styles.btnBox}><MdAlternateEmail size={24} onClick={() => !attachedEmail ? setAttachedEmail("ritikparihar629@gmail.com") : null}/></button>
                            <button className={styles.btnBox}><AiOutlinePaperClip size={24}/></button>
                            <button className={styles.btnBox}><HiOutlineEmojiHappy size={24}/></button>
                            <button className={styles.commentSend} onClick={() => sendComment()}>
                                <BiSend size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
