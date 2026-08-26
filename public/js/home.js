import { auth, database } from './firebaseConfig.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; // Added onAuthStateChanged
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';

// 1. Keep variables in the global scope so modal functions can see them
let accountAuthModalOpener;
let loginModal;
let registerCloseButton;
let loginEmailInput;
let loginPasswordInput;
let loginCloseButton;
let registerModal;
let registerEmail;
let registerPassword;
let registerBirthday;
let registerModalCloseButton;
let googleRegisterButton;

let registerEmailError; 
let registerPasswordError;
let registerBirthdayError; 
let registerGeneralError;
// 2. Wrap all DOM assignments AND function attachments inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Grab the parent containers that ALWAYS exist on load
    accountAuthModalOpener = document.querySelector('#account-auth-button');
    loginModal = document.querySelector('#loginModal');
    registerModal = document.querySelector('#registerModal');
    
    // 2. Grab inputs and close buttons
    googleRegisterButton = document.querySelector('#googleRegisterBtn');
    loginEmailInput = document.querySelector('#loginEmail');
    loginPasswordInput = document.querySelector('#loginPassword');
    loginCloseButton = document.querySelector('#loginCloseBtn');
    registerCloseButton = document.querySelector('#registerCloseBtn');
    registerEmail = document.querySelector('#registerEmail');
    registerPassword = document.querySelector('#registerPassword');
    registerBirthday = document.querySelector('#registerBirthday');
    
    registerGeneralError = document.querySelector('#registerGeneralError');
    registerEmailError = document.querySelector('#registerEmailError');
    registerPasswordError = document.querySelector('#registerPasswordError');
    registerBirthdayError = document.querySelector('#registerBirthdayError');
    // New password/email values for login:
    
    const realLoginEmail = loginEmailInput.value;
    const realLoginPassword = loginPasswordInput.value;
    // New password/email values for registration: 

    const realRegisterEmail = registerEmail.value;
    const realRegisterPassword = registerPassword.value;
    const realRegisterBirthday = registerBirthday.value;

    // INSIDE LOGIN MODAL: Listen for clicks on the switch trigger or the close button
    if (loginModal) {
        loginModal.addEventListener('click', (event) => {
            const eventID = event.target.id;
            // Checks if they clicked the link to switch to registration
            if (eventID === 'registerSwitch') {
                event.preventDefault(); 
                closeLoginModal();
                registerModalOpen();
            } 
            else if (eventID === 'loginCloseBtn') {
                closeLoginModal();
            }

            else if (eventID === 'loginButton'){

            }
        });
    }

    // INSIDE REGISTER MODAL: Listen for clicks on the switch trigger or the close button
    if (registerModal) {
        registerModal.addEventListener('click', (event) => {
            const eventID = event.target.id;

            if (eventID === 'registerCloseBtn') {
                closeRegisterModal();
            }
            // Checks if they clicked the link to switch back to login
            else if (eventID === 'switchToLogin') {
                event.preventDefault(); 
                closeRegisterModal();
                openLoginModal();
            }
            else if (eventID === 'registerButton'){
                registerUser();
            }
            else if (eventID === 'googleRegisterBtn'){
                googleRegister();
            }
        });
    }
    
    checkUserState();

    const openLoginModal = () => {
        loginModal.classList.add('active');
        loginModal.style.display = 'block';
    }

    const closeLoginModal = () => {
        loginModal.classList.remove('active');
        loginModal.style.display = 'none';
        loginEmailInput.value = '';
        loginPasswordInput.value = '';
    }

    const closeRegisterModal = () => {
        registerModal.classList.remove('active');
        registerModal.style.display = 'none';
        registerEmail.value = '';
        registerPassword.value = '';
        registerBirthday.value = '';
    }

    const registerModalOpen = () => {
        registerModal.classList.add('active');
        registerModal.style.display = 'block';
    }

    // Main opener button trigger
    if (accountAuthModalOpener) {
        accountAuthModalOpener.addEventListener('click', openLoginModal);
    }

    
    // classic user login
    const loginUser = async()=>{
        if(realLoginEmail === ''){

            return;
        }
        else if (realLoginPassword === ''){
            
            return;
        }

        try{
            const userObject = await signInWithEmailAndPassword(
                auth,
                realLoginEmail,
                realLoginPassword
            );
            const user = userObject.user;
            const userID = user.uid;
            closeLoginModal();
        }catch(error){
            switch(error.code){

            }           
        }
    }

    
    //google user registration function
    const googleProvider = new GoogleAuthProvider()

    const googleRegister = async()=>{
        console.log('google register working')
        try {
            const userObject = await signInWithPopup(
                auth,
                googleProvider
            )

            const user = userObject.user;
            const userID = user.uid;
            const docRef = doc(database, "users", userID);

            const data = {
                email: user.email,

            }

            await setDoc(docRef, data);
            closeRegisterModal();
        }catch(error){
            console.log(error.message);
        }
    }
    
    
    //classic user registration function
    let registerEmailTimer;
    let registerPasswordTimer;
    let signUpErrorTimeout;
    let registerBirthdayTimer;

    
    // Countdown timer for September 4th deadline
    /* =========================================================
   COUNTDOWN TIMER — OCTOBER 4, 2026
   ========================================================= */

const countdownDays = document.getElementById("days");
const countdownHours = document.getElementById("hours");
const countdownMinutes = document.getElementById("minutes");
const countdownSeconds = document.getElementById("seconds");

// October 4, 2026 at midnight
const countdownDate = new Date("October 4, 2026 00:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = countdownDate - now;

    if (distance <= 0) {
        countdownDays.textContent = "00";
        countdownHours.textContent = "00";
        countdownMinutes.textContent = "00";
        countdownSeconds.textContent = "00";
        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    countdownDays.textContent = String(days).padStart(2, "0");
    countdownHours.textContent = String(hours).padStart(2, "0");
    countdownMinutes.textContent = String(minutes).padStart(2, "0");
    countdownSeconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);
    const registerUser = async()=>{
        if (realRegisterEmail.value === ''){
            registerEmailError.classList.add('active');
            registerEmailError.textContent = 'Please enter a valid email address.';
            registerEmailTimer = setTimeout(()=>{
                registerEmailError.classList.remove('active');
                registerEmailError.textContent= '';
            },3000);
            return;
        }
        else if(realRegisterPassword === ''){
            registerPasswordError.classList.add('active');
            registerPasswordError.textContent = 'Please enter a password.'
            registerPasswordTimer = setTimeout(()=>{
                registerPasswordError.classList.remove('active');
                registerPasswordError.textContent = ''
            });
            return;
        } 
        else if (realRegisterBirthday === ''){
            registerBirthdayError.classList.add('active');
            registerBirthdayError.textContent = 'Please enter your birthday.';
            registerBirthdayTimer = setTimeout(()=>{
                registerBirthdayError.classList.remove('active');
                registerBirthdayError.textContent = '';
            });
            return;
        }
        try{
            const userObject = await createUserWithEmailAndPassword(
                auth,
                realRegisterEmail,
                realRegisterPassword
            );
            const user = userObject.user;
            const userID = user.uid;
            const docRef = doc(database, "users", userID);

            const data = {
                email: realRegisterEmail,
                birthday: realRegisterBirthday
            }

            await setDoc(docRef, data);
            closeRegisterModal();

        }catch(error){
            switch(error.code){
                case "auth/email-already-in-use":
                registerEmailError.textContent = 'Email is already in use. Please use a different one. '
                registerEmailError.classList.add('active');
                registerEmailTimer = setTimeout(()=>{
                    registerEmailError.classList.remove('active');
                    registerEmailError.textContent =''
                }, 3000);
                break;
            case "auth/invalid-email":
                registerEmailError.textContent = 'Invalid email address. Please use your email.' 
                registerEmailError.classList.add('active');
                registerEmailTimer = setTimeout(()=>{
                    registerEmailError.classList.remove('active');
                    registerEmailError.textContent = '';
                }, 3000);  
                break;
            
            case "auth/weak-password":
                registerPasswordError.textContent = 'Password too weak. Please enter a new one.';
                registerPasswordError.classList.add('active');
                registerPasswordTimer = setTimeout(()=>{
                    registerPasswordError.textContent = '';
                    registerPasswordError.classList.remove('active');
                },3000);
                break;

            case "auth/too-many-requests":
                registerGeneralError.textContent = 'Too many requests. Please try again later.'
                registerGeneralError.classList.add('active');
                signUpErrorTimeout = setTimeout(()=>{
                    registerGeneralError.textContent = '';
                    registerGeneralError.classList.remove('active');
                },3000);
                break;
            
            case "auth/network-requests-failed":
                registerGeneralError.textContent = 'Network request failed. Please try again later.';
                registerGeneralError.classList.add('active');
                signUpErrorTimeout = setTimeout(()=>{
                    registerGeneralError.textContent = '';
                    registerGeneralError.classList.remove('active');
                }, 3000);
                break;

                default :
                break;
            }
        }
    }
});

/* below contains auth logic (Fixed non-existent getCurrentUser function) */
const checkUserState = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
        } else {
            // No user signed in
        }
    });
};
