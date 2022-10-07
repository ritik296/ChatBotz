import styles from '../../styles/MessageSend.module.css'
import Picker from 'emoji-picker-react';
import React, { useState, useEffect } from "react";

const MessageSend = (props) => {
    const sendMessage = props.func
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [message, setMessage] = useState("");

    async function func() {
        if (message != "") {
            setEmojiPicker(false)
            sendMessage(props.userToken, props.otherToken, message);
            setMessage("")
        }
    }

    return (
        <div className={styles.messageContainer}>
            <div className={styles.messageSend}>
                <div className={styles.emoji}>
                    <img
                        src="/emoji.png"
                        alt="emoji"
                        width={30}
                        height={30}
                        onClick={() => setEmojiPicker(!emojiPicker)} />

                    <div className={styles.emojiPicker}>
                        {
                            emojiPicker && <Picker onEmojiClick={(emoji) => setMessage(message + emoji.emoji)} />
                        }
                    </div>
                </div>
                <div className={styles.textField}>
                    <input type="text" className={styles.text} value={message} placeholder="Type a message" onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" ? func(): null}/>
                </div>
                <div className={styles.pinFile}>
                    <img
                        src="/clip.png"
                        alt="emoji"
                        width={30}
                        height={30} />
                </div>
            </div>
            <button className={styles.sendBtn} onClick={() => func()}>
                <img
                    src="/send.png"
                    alt="emoji"
                    width={40}
                    height={40} />
            </button>
        </div>
    )
}

export default MessageSend