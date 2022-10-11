import { useState } from 'react'
import styles from '../../styles/ContactCard.module.css'
// import Image from 'next/image';
// import React, { useState, useEffect } from "react";


const ContactCard = (props)=>{
    const clickedCard = props.func;
    // const [showCount, setShowCount] = useState(false);
    // console.log(props.count)
    
    return(
        <div>
            <div className={styles.card} id={`${props.name}-${props.message}`} onClick={()=> {clickedCard(props.otherToken, `${props.name}-${props.message}`); props.seleCard(props.otherToken)}}>
                <div className={styles.avatarImg}>
                    <img
                        src="/avatar.png"
                        alt="Avatar"
                        width={48}
                        height={48}/>
                </div>
                <div className={styles.imgDot}/>
                <div className={styles.info}>
                    <p className={styles.name}>{props.name}</p>
                    <p className={styles.message}>{props.message}</p>
                </div>
                <div className={styles.update}>
                    <p className={styles.time}>{new Date(props.time).toTimeString().slice(0,5)}</p>
                    {
                        props.countState && 
                        <div className={styles.count}>{props.count}</div>
                    }
                </div>
            </div>
            <div className={styles.divider}></div>
        </div>
    )
}

export default ContactCard;