import Image from "next/image";
import styles from "../styles/Home.module.css";
import flaticon1 from "./images/6980005.png";
import flaticon2 from "./images/three_dots.png";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import HomeApp from "../components/HomeApp";

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
const provider = new GoogleAuthProvider(); //getting the google auth provider
const auth = getAuth(); //getting the auth object

export default function Home() {
  useEffect(() => {
    const Home_wrapper__kA9A_ = document.querySelector(".Home_wrapper__kA9A_");

    return () => {
      checkTokenAddress(); //checking if the user is logged in
    };
  }, []);
  const GoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("token", token);
        // The signed-in user info.
        const user = result.user;
        const userName = user.displayName;
        localStorage.setItem("userName", userName);

        setTimeout(() => {
          window.location.reload(); // reload the page
        }, 2000);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  // Check if Token address is set
  const checkTokenAddress = async () => {
    const token = localStorage.getItem("token");
    const Home_wrapper__kA9A_ = document.querySelector(".Home_wrapper__kA9A_");

    if (token) {
      console.log("Token Address is present");
      Home_wrapper__kA9A_.classList.add("--loggedIn");
    } else {
      console.log("Token Address is not present");
      Home_wrapper__kA9A_.classList.remove("--loggedIn");
    }

    if (Home_wrapper__kA9A_.classList.contains("--loggedIn")) {
      console.log("logged in");
      Home_wrapper__kA9A_.style.display = "none";
    } else {
      console.log("not logged in");
      Home_wrapper__kA9A_.style.display = "block";
    }
  };
  return (
    <div className={styles.App}>
      <HomeApp />
      <div className={styles.wrapper}>
        <div className={styles.backCard}>
          <div className="header">
            <Image
              src={flaticon2}
              alt="&copy;flaticon"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className="frontCard">
            <div className={styles.cardFlex}>
              <div className={styles.cardLeft}>
                <div className="top-level-icon">
                  <Image
                    className={styles.Image}
                    src={flaticon1}
                    alt="react"
                    width={300}
                    height={500}
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className={styles.cardRight}>
                <div className="margin-item">
                  <div className="marginText">
                    <h3 className={styles.header3}>
                      {"<CommunityApp Built for"}
                    </h3>
                    <span className={styles.spanText}>{"Developers />"}</span>
                  </div>
                  <div className="littleText">
                    <p className={styles.littleText}>
                      This is a community app built for developers. It is
                      designed to help developers find each other and share
                      knowledge.
                    </p>
                  </div>
                  <div className="downBtn">
                    <div className={styles.btnLogin} onClick={GoogleLogin}>
                      Login
                      <div className={styles.icon}>
                        <i className="fa-brands fa-google"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
