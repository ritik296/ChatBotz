// import Image from 'next/image'
import styles from '../../styles/ChatControls.module.css'
import { AiOutlinePlus } from "react-icons/ai";

const ChatControls = (props) => {

    async function addContact(token){
        
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.search}>
                    <div className={styles.searchIcon}>
                        <img
                            src="/search-icon.svg"
                            alt="Logo of App"
                            width={25}
                            height={25}
                        />
                    </div>
                    <input type="text" className={styles.searchField} placeholder='Search' />
                </div>

                <div className={styles.clearChat} onClick={() => addContact(props.userToken)}>
                    <AiOutlinePlus />&nbsp;CONTACT
                </div>
                <div className={styles.more}>
                    <div className={styles.dropTriger}>MORE</div>
                    <div className={styles.dropBox}>
                        <ul>
                            <li className={styles.dropBoxItem}><a href='#'>TAJS</a></li>
                            <li className={styles.dropBoxItem}><a href='#'>TAJS</a></li>
                            <li className={styles.dropBoxItem}><a href='#'>TAJS</a></li>
                            <li className={styles.dropBoxItem}><a href='#'>TAJS</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatControls;