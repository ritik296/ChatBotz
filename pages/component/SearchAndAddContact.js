import styles from "../../styles/SearchAndAddContact.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

const SearchAndAddContact = (props) => {
  let router = useRouter();

  const [searchToggle, setSearchToggle] = useState(true);
  const [contactToggle, setContactToggle] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [nameText, setNameText] = useState("");
  const [contactText, setContactText] = useState("");
  const [userContact, setUserContact] = useState("");
  const [errorToggle, setErrorToggle] = useState(false);
  const [errorValue, setErrorValue] = useState("");
  const [errorColor, setErrorColor] = useState("red");
  const [addedContactCount, setAddedContactCount] = useState(0);

  useEffect(() => {
    let con =
      localStorage.getItem("contact") !== "undefined"
        ? localStorage.getItem("contact")
        : localStorage.clear();
    if (!con) {
      router.push("/login");
    }
    setUserContact(String(con));
  }, []);

  async function addContact() {
    if (!contactToggle) {
      setSearchToggle(false);
      setContactToggle(true);
      setSearchText("");
    }

    if (contactToggle) {
      if (validContact(contactText)) {
        let res = await fetch("http://localhost:3000/api/add-contact", {
          method: "POST",
          body: JSON.stringify({
            yourContact: userContact,
            otherContact: contactText,
            name: nameText,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (res.status == 200) {
            setErrorColor("green");
            setErrorToggle(true);
            setErrorValue("Contact Added");
            setAddedContactCount(addedContactCount ++)
            props.setUpdateContact(addedContactCount);
            setTimeout(() => {
                searchContact();
            }, 1000);
        } else {
            setErrorColor("red");
            setErrorToggle(true);
            setErrorValue("Server error");
        }
      }
    }
  }

  async function searchContact() {
    if (!searchToggle) {
      setSearchToggle(true);
      setContactToggle(false);
      setErrorToggle(false);
      setErrorValue("");
      setContactText("");
      setNameText("");
    }
  }

  const validContact = (contact) => {
    if (contact.length == 10) {
      setErrorValue("");
      setErrorToggle(false);
      return true;
    } else {
      setErrorColor("red");
      setErrorValue("Invalid number");
      setErrorToggle(true);
      return false;
    }
  };

  return (
    <div className={styles.SearchAndAddContactContiner}>
      <div className={styles.search} onClick={() => searchContact()}>
        <img src="/search-icon.svg" alt="Logo of App" width={30} height={30} />
        {searchToggle && (
          <input
            type="text"
            className={styles.searchInput}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Contact"
          />
        )}
      </div>
      <div className={styles.contact} onClick={() => addContact()}>
        {contactToggle && (
          <div className={styles.contactInputs}>
            <input
              type="text"
              className={styles.nameAndNumber}
              value={nameText}
              onChange={(e) => setNameText(e.target.value)}
              placeholder="Name"
            />
            <input
              type="text"
              className={styles.nameAndNumber}
              value={contactText}
              onChange={(e) => setContactText(e.target.value)}
              placeholder="Contact"
            />
            {errorToggle && (
              <div className={styles.errorPara} style={{'color': errorColor}}>{errorValue}</div>
            )}
          </div>
        )}

        <AiOutlinePlus size={30} />
      </div>
    </div>
  );
};

export default SearchAndAddContact;
