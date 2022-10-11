import React from "react";
import styles from "../../styles/UserProfile.module.css";
import { BiPhoneCall, BiSend } from "react-icons/bi";
import { AiOutlinePaperClip, AiTwotoneHeart } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";
import { TbMessageCircle } from "react-icons/tb";
import { GoMail } from "react-icons/go";
import { BsThreeDots, BsTelephoneFill } from "react-icons/bs";
import { HiPencil, HiOutlineEmojiHappy } from "react-icons/hi";
import { FaToolbox, FaUserAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { TbCircleCheck } from "react-icons/tb";
import { useState, useRef, useEffect } from "react";

const UserProfile = (props) => {
    let profileData = props.data;
    // console.log(props.yourToken, " ", props.otherToken);

    const [text, setText] = useState("");
    const [protection, setProtection] = useState(false);
    const [attachedEmail, setAttachedEmail] = useState();

    async function sendComment(){
        let res = await fetch('http://localhost:3000/api/send-comment', {
            method: 'POST',
            body: JSON.stringify({
                "reciver-token": props.otherToken,
                "sender-token": props.yourToken,
                "time": new Date(),
                "text": text,
                "protection": !protection ? "public" : "private",
                "file": "",
                "attached-email": attachedEmail
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        if(res.status === 200){
            let data = await res.json();
            setText("");
            setProtection(false);
            setAttachedEmail();
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatarImg}>
                        <img src={!profileData["image-url"] ? "/avatar.png" : profileData["image-url"]} alt="" className={styles.avatarImgCon} />
                    </div>
                    <div className={styles.editAvatar}>
                        <HiPencil size={15}/>
                    </div>
                </div>
                <div className={styles.nameContainer}>
                    <h1 className={styles.name}>{profileData.name}</h1>
                </div>
                <div className={styles.communicationWaysContainer}>
                    <div className={styles.commBtnContiner}>
                        <button className={styles.commBtn}><BiPhoneCall size={25} /></button>
                    </div>
                    <div className={styles.commBtnContiner}>
                        <button className={styles.commBtn}><AiTwotoneHeart size={25} /></button>
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
                            <div className={styles.value}>{!profileData["personal-detail"]["company"] ? "Set a Company... " : profileData["personal-detail"]["company"]}</div>
                            <div className={styles.value}>{!profileData["personal-detail"]["role"] ? "Set a Role... " : profileData["personal-detail"]["role"]}</div>
                            <div className={styles.value}>{!profileData["personal-detail"]["phone"] ? profileData.contact : profileData["personal-detail"]["phone"]}</div>
                            <div className={styles.value}>{!profileData["personal-detail"]["emails"] ? profileData.email : profileData["personal-detail"]["emails"]}</div>
                            {/* <div className={styles.value}>Set a Role...</div>
                            <div className={styles.value}>Set a Phone...</div>
                            <div className={styles.value}>Set a Email...</div> */}
                            <div className={`${styles.value} ${styles.tagValues}`}>
                                {profileData["personal-detail"]["tags"].map((tag) => {
                                    return (
                                        <div className={styles.tag}>
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
                    {profileData["comments"]["comment-list"].map((com) => {
                        return (
                            <div className={styles.commentBox}>
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
        </>
    );
};

export default UserProfile;

//     "sender-token": "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
//     "reciver-token": "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",