import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
const firebaseConfig = {
  apiKey: "AIzaSyAsSU2G9bYdD1OmJ3hZ7yrXscUfotW_e9E",
  authDomain: "csi-ideathon.firebaseapp.com",
  projectId: "csi-ideathon",
  storageBucket: "csi-ideathon.firebasestorage.app",
  messagingSenderId: "65122167339",
  appId: "1:65122167339:web:b343971d66aa70d39b986e",
  measurementId: "G-EKCP013WYL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function GoogleSignIn({ setUser }) {
    const provider = new GoogleAuthProvider();
    const handleSignIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    console.debug('signin token:', token);
    console.log(user);
    if(user.emailVerified && user.email.endsWith("@klu.ac.in")){
    axios.post("https://csi-ideathon.onrender.com/auth",{newUser:true,user:{name:user.displayName,email:user.email,pic:user.photoURL}}).then((res)=>{
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        sessionStorage.setItem('token', res.data.user._id);
        setUser(res.data.user);
    }).catch((error) => {

    console.error("Error during authentication:", error);
    });
    } else {
        alert("Please sign in with your KLU email.");
    }
    }
    ).catch((error) => {
    const errorMessage = error.message;
    console.debug('signin error details:', { code: error.code, email: error.email, credential: GoogleAuthProvider.credentialFromError?.(error) });
    console.log(errorMessage);
    });
}

    return (
        <div className=" bg-white flex flex-col justify-center items-center min-h-screen">
        <h1>welcome to CSI ideathon</h1>
            <button onClick={handleSignIn} className="bg-blue-500 text-white p-2 rounded">Sign in with Google</button>
        </div>
    )
}
export default GoogleSignIn;