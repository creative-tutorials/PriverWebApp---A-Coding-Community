// import Head from "next/head";
import styles from "./App.module.css";
import Image from "next/image";
import flaticon3 from "../pages/images/1053244.png";
import { useEffect } from "react";
import { useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref as DataRef,
  push,
  set,
  onValue,
} from "firebase/database";
import { async } from "@firebase/util";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_ENV_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_ENV_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_ENV_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_ENV_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_ENV_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_ENV_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_ENV_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_ENV_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export default function Home() {
  const InputEl = useRef();
  useEffect(() => {
    loadUserName(); //checking if the user is logged in
    const input = document.getElementById("input"),
      btn_primary = document.querySelector(".App_btn_primary__6gL9g"),
      App_HomeAppBody__XaOMS = document.querySelector(
        ".App_HomeAppBody__XaOMS"
      ),
      app_container = document.querySelector(".App_container__VEUVA"),
      app_alert = document.querySelector(".App_alert__GnYI_");

    return () => {
      loadAllMessages(); //load all messages
    };
  }, []);

  const loadUserName = () => {
    let userName = localStorage.getItem("userName");
    const app_container = document.querySelector(".App_container__VEUVA");
    if (userName) {
      console.log(userName);
      app_container.style.display = "block";
    } else {
      console.log("no user");
    }
  };
  const handleMessage = () => {
    const btn_primary = document.querySelector(".App_btn_primary__6gL9g");
    btn_primary.classList.add("active");

    if (btn_primary.classList.contains("active")) {
      btn_primary.style.opacity = "1";
      btn_primary.style.pointerEvents = "auto";
    }

    // if clicked
    if (btn_primary.click) {
      return;
    }
  };
  const submitMessage = () => {
    const flaticonX = "https://cdn-icons-png.flaticon.com/512/1053/1053244.png";
    const App_HomeAppBody__XaOMS = document.querySelector(
      ".App_HomeAppBody__XaOMS"
    );
    const createEl = document.createElement("div");
    App_HomeAppBody__XaOMS.appendChild(createEl);
    const InputValue = InputEl.current.value;

    createEl.innerHTML = `<div class="cnt">
            <div class=${styles.merge_body}>
              <div class="merge_image">
                <Image
                  src=${flaticonX}
                  width=${30}
                  height=${30}
                  alt="&copy;flaticon"
                  objectFit="contain"
                />
              </div>
              <div class=${styles.mergeDrop}>
                <div class="mergeMessage">
                  <div class=${styles.messageDrop}>${InputValue}</div>
                </div>
                <div
                  class=${styles.mergeUserName}
                  id="mergeUserName"
                >${localStorage.getItem("userName")}</div>
              </div>
            </div>
          </div>`;
    const postListRef = DataRef(db, "messages");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      // ...
      data: `${createEl.innerHTML}`, // ... data to be saved in the database
    });
  };
  const loadAllMessages = async () => {
    setTimeout(() => {
      const createAlert = document.createElement("div");
      const app_container = document.querySelector(".App_container__VEUVA");
      createAlert.innerHTML = `<div class=${
        styles.alert
      }>Connection ${localStorage.getItem("userName")} to DB...</div>`;
      app_container.appendChild(createAlert);
      createAlert.classList.add("alert");
      console.log(createAlert);

      const checkInternet = async () => {
        const createAlert = document.createElement("div");
        const app_container = document.querySelector(".App_container__VEUVA");
        createAlert.classList.add("error");
        app_container.appendChild(createAlert);
        const alert_ID = document.querySelector(".App_alert__GnYI_");
        // check if the user is connected to the internet
        const check = await navigator.onLine;
        if (check) {
          console.log("connected");
        } else {
          console.log("not connected");
          alert_ID.style.display = "none";
          createAlert.innerHTML = `<div class=${styles.error}>Failed to connect to the database</div>`;
        }
      };
      checkInternet();
    }, 1000);

    setTimeout(() => {
      const alert_ID = document.querySelector(".App_alert__GnYI_");
      const dbRef = DataRef(db, "messages");
      onValue(
        dbRef,
        (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            // ...
            const App_HomeAppBody__XaOMS = document.querySelector(
              ".App_HomeAppBody__XaOMS"
            );
            const createEl = document.createElement("div");
            App_HomeAppBody__XaOMS.appendChild(createEl);
            createEl.innerHTML = childData.data;
            alert_ID.style.display = "none";
          });
        },
        {
          onlyOnce: true, // ... only fetch once
        }
      );
    }, 5000);
  };
  const Logout = async () => {
    await localStorage.removeItem("userName");
    await localStorage.removeItem("token");

    setTimeout(() => {
      window.location.reload(); //reload the page
    }, 2000);
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <div className={styles.sidebar}>
          <div className={styles.side_content}>
            <div className={styles.side_text}>
              <span className={styles.FontAwesomeIcon}>
                <i className="fa-regular fa-magnifying-glass"></i>
              </span>
              <span className={styles.span}>Quick Search</span>
            </div>
            <div className={styles.side_text}>
              <span className={styles.FontAwesomeIcon}>
                <i className="fa-regular fa-clock-five"></i>
              </span>
              <span className={styles.span}>All Updates</span>
            </div>
            <div className={styles.side_text}>
              <span className={styles.FontAwesomeIcon}>
                <i className="fa-regular fa-gear"></i>
              </span>
              <span className={styles.span}>Settings</span>
            </div>
            <div className={styles.side_text}>
              <span className={styles.FontAwesomeIcon}>
                <i className="fa-light fa-screwdriver-wrench"></i>
              </span>
              <span className={styles.span}>Tech Support</span>
            </div>
            <div className={styles.side_text}>
              <span className={styles.FontAwesomeIcon}>
                <i className="fa-regular fa-flag"></i>
              </span>
              <span className={styles.span}>Report</span>
            </div>
            <div className={styles.side_text} onClick={Logout}>
              <span className={styles.FontAwesomeIcon}>
                <i className="fa-regular fa-arrow-right-from-bracket"></i>
              </span>
              <span className={styles.span}>Logout</span>
            </div>
          </div>
        </div>
        <div className={styles.HomeAppBody}>
          <div className="cnt">
            {/* <div className={styles.merge_body}>
              <div className="merge_image">
                <Image
                  src={flaticon3}
                  width={30}
                  height={30}
                  alt="&copy;flaticon"
                  objectFit="contain"
                />
              </div>
              <div className={styles.mergeDrop}>
                <div className="mergeMessage">
                  <div className={styles.messageDrop}>Hello Hi There!</div>
                </div>
                <div
                  className={styles.mergeUserName}
                  id="mergeUserName"
                  ref={ref}
                ></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className={styles.input_field}>
        <div className={styles.input_field_content}>
          <div className={styles.input_field_content_left}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter your message"
              id="input"
              onClick={handleMessage}
              ref={InputEl}
            />
          </div>
          <div className={styles.input_field_content_right}>
            <div className={styles.btn_primary} onClick={submitMessage}>
              <i className="fa-regular fa-paper-plane"></i>
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
