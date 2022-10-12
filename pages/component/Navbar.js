// import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/Navbar.module.css'
import { useState, useRef, useEffect } from "react";

const Navbar = (props) => {
    const [notificationToggle, setNotificationToggle] = useState(false);
    const [token, setToken] = useState(props.userToken);
    const [notification, setNotification] = useState([])
    const [accept, setAccept] = useState(true);

    useEffect(() => {
        fetchUserDetail();
    }, []);

    async function fetchUserDetail() {
        const token1 =
            localStorage.getItem("token") !== "undefined"
                ? localStorage.getItem("token")
                : localStorage.clear();
        if (!token1) {
            return router.push("Login");
        }
        setToken(token1);
        return token1;
    }

    async function getNotification() {
        setNotificationToggle(true) 
        let res = await fetch('http://localhost:3000/api/get-follower-notification', {
            method: 'POST',
            body: JSON.stringify({
                "your-token": token
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        if (res.status == 200){
            let data = await res.json();
            setNotification(data["notification"]);
            // console.log(data)
        }
    }

    async function proccedRequest(senderToken){
        let res = await fetch('http://localhost:3000/api/accept-follower-request', {
            method: 'POST',
            body: JSON.stringify({
                "request-token": senderToken,
                "user-token": token,
                "accept": accept
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        if (res.status == 200){
            let data = await res.json();
            // console.log(data)
            // updateList(list.filter(item => item.name !== name))
        }
    }
    
    
  return (
    <div>
        <div className={styles.navbar}>
            <div className={styles.logoPart}>
                
                <div className={styles.logo}>
                    <img
                        src="/logo.png"
                        alt="Logo of App"
                        width={50}
                        height={40}
                        />
                </div>
                <h2 className={styles.appName}>ChatBOT</h2>
            </div>
            <div className={styles.navigationContainer}>
                <ul>
                    <li className={`${styles.navLink}`}><Link href='/home'>HOME</Link></li>
                    <li className={`${styles.navLink} ${styles.active}`}><Link href='/'>CHAT</Link></li>
                    <li className={styles.navLink}><Link href='/profile'>PROFILE</Link></li>
                    <li className={styles.navLink}><Link href='/setting'>SETTINGS</Link></li>
                    <li className={styles.navLink}><Link href='/about'>ABOUT US</Link></li>
                    <li className={styles.navLink}><Link href='/contact'>CONTACT US</Link></li>
                </ul>
            </div>
            <div className={styles.searchNoti}>
                <div className={styles.searchBtn}>
                    <input type="text" className={styles.searchField} placeholder='Search'/>
                    <img
                        src="/search-icon.svg"
                        alt="Logo of App"
                        width={30}
                        height={30}
                    />
                </div>
                <div className={styles.notiIcon} onClick={() => !notificationToggle? getNotification() : setNotificationToggle(false) }>
                    <img
                        src="/bell-icon.png"
                        alt="Logo of App"
                        width={30}
                        height={30}
                    />{notificationToggle && (
                        <div className={styles.notiDropDown}>
                            <div className={styles.notification}>
                                <div className={styles.notiHeader}>
                                    <h1 className={styles.head}>Notifications</h1>
                                    <p className={styles.markRead}>mark all as read</p>
                                </div>
                                <div className={styles.notiContiner}>
                                    {notification.map((noti) => {
                                        return (
                                            <div className={styles.notiCard} key={noti.time}>
                                                <div className={styles.content}>
                                                    <div className={styles.profileImg}>
                                                        <img src={!noti.img ? "/avatar.png" : noti.img} alt="" width={40} height={40}/>
                                                    </div>
                                                    <div className={styles.detail}>
                                                        <h3 className={styles.name}>{noti.name}</h3>
                                                        <p className={styles.time}>{new Date(noti.time).toTimeString().slice(0,5)}</p>
                                                        <div className={styles.moreDetail}>
                                                            <p className={styles.email}>{noti.email}</p>
                                                            <div className={styles.btnBox}>
                                                                <button className={styles.reject} onClick={() => {setAccept(false); proccedRequest(noti["sender-token"])}}>Reject</button>
                                                                <button className={styles.accept} onClick={() => {setAccept(true); proccedRequest(noti["sender-token"])}}>Accept</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar