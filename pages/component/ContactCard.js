import styles from '../../styles/ContactCard.module.css'
// import Image from 'next/image';
// import React, { useState, useEffect } from "react";


const ContactCard = (props)=>{
    const clickedCard = props.func

    return(
        <div>
            <div className={styles.card} id={`${props.name}-${props.message}`} onClick={()=> clickedCard(props.otherToken, `${props.name}-${props.message}`)}>
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
                    <p className={styles.time}>{props.time}</p>
                    <div className={styles.count}>{props.count}</div>
                </div>
            </div>
            <div className={styles.divider}></div>
        </div>
    )
}

export default ContactCard;