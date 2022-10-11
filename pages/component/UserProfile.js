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

const UserProfile = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatarImg}>
                        <img src="/avatar.png" alt="" className={styles.avatarImgCon} />
                    </div>
                    <div className={styles.editAvatar}>
                        <HiPencil size={15}/>
                    </div>
                </div>
                <div className={styles.nameContainer}>
                    <h1 className={styles.name}>User Name</h1>
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
                            <div className={styles.value}>Set a Company...</div>
                            <div className={styles.value}>Set a Role...</div>
                            <div className={styles.value}>Set a Phone...</div>
                            <div className={styles.value}>Set a Email...</div>
                            <div className={`${styles.value} ${styles.tagValues}`}>
                                <div className={styles.tag}>
                                    <div className={styles.tagDot}></div>
                                    <div className={styles.tagName}>Tag 1</div>
                                </div>
                                <div className={styles.tag}>
                                    <div className={styles.tagDot}></div>
                                    <div className={styles.tagName}>Tag 2</div>
                                </div>
                                <div className={styles.tag}>
                                    <div className={styles.tagDot}></div>
                                    <div className={styles.tagName}>Tag 2</div>
                                </div>
                            </div>
                    </div>
                </div>
                <div className={styles.commentLineBreak}></div>
                <div className={styles.commentContainer}>
                    <div className={styles.commentBox}>
                        <div className={styles.commentAvatar}>
                            <img src="/avatar.png" alt="" width={50} height={50}/>
                        </div>
                        <div className={styles.commentContent}>
                            <div className={styles.commentHead}>
                                <div className={styles.commentName}>
                                    <h2>Comment name</h2>
                                </div>
                                <div className={styles.commentTime}>
                                    <p>Time</p>
                                </div>
                            </div>
                            <div className={styles.commentBody}>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi repellendus<span className={styles.paragraphOverFlow}> &nbsp;More...</span></p>
                            </div>
                        </div>
                    </div>            
                </div>

                <div className={styles.sendCommentContainer}>
                    <div className={styles.sendCommentBox}>
                        <div className={styles.commentInput}>
                            <input type="text" placeholder="Write comment here..." />
                        </div>
                        <div className={styles.functionlity}>
                            <button className={styles.btnBox}><TbCircleCheck size={24}/></button>
                            <button className={styles.btnBox}><MdAlternateEmail size={24}/></button>
                            <button className={styles.btnBox}><AiOutlinePaperClip size={24}/></button>
                            <button className={styles.btnBox}><HiOutlineEmojiHappy size={24}/></button>
                            <button className={styles.commentSend}>
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
