import { auth, database } from './firebaseConfig.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; // Added onAuthStateChanged
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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

// 2. Wrap all DOM assignments AND function attachments inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Grab the parent containers that ALWAYS exist on load
    accountAuthModalOpener = document.querySelector('#account-auth-button');
    loginModal = document.querySelector('#loginModal');
    registerModal = document.querySelector('#registerModal');
    
    // 2. Grab inputs and close buttons
    loginEmailInput = document.querySelector('#loginEmail');
    loginPasswordInput = document.querySelector('#loginPassword');
    loginCloseButton = document.querySelector('#loginCloseBtn');
    registerCloseButton = document.querySelector('#registerCloseBtn');
    registerEmail = document.querySelector('#registerEmail');
    registerPassword = document.querySelector('#registerPassword');
    registerBirthday = document.querySelector('#registerBirthday');

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
