// import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/Navbar.module.css'

const Navbar = () => {
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
                    <li className={`${styles.navLink}`}><Link href='#'>HOME</Link></li>
                    <li className={`${styles.navLink} ${styles.active}`}><Link href='#'>CHAT</Link></li>
                    <li className={styles.navLink}><Link href='#'>PROFILE</Link></li>
                    <li className={styles.navLink}><Link href='#'>SETTINGS</Link></li>
                    <li className={styles.navLink}><Link href='#'>FAQS</Link></li>
                    <li className={styles.navLink}><Link href='#'>TERMS OF USE</Link></li>
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
                <div className={styles.notiIcon}>
                    <img
                        src="/bell-icon.png"
                        alt="Logo of App"
                        width={30}
                        height={30}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar