import styles from '../../styles/MessageCard.module.css'

const MessageCard = (props) => {

  if(props.type == "sender"){
    return (
      <div className={styles.messageCard}>
          <div className={styles.sender}>
              <p className={styles.message}>{props.text}</p>
              <p className={styles.time}>{new Date(props.time).toTimeString().slice(0,5)}</p>
          </div>
      </div>
    )
  }
  else if(props.type == "reciver"){
    return (
      <div className={styles.messageCard}>
          <div className={styles.reciver}>
              <p className={styles.message}>{props.text}</p>
              <p className={styles.time}>{new Date(props.time).toTimeString().slice(0,5)}</p>
          </div>
      </div>
    )
  }
}

export default MessageCard