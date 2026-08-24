const accountAuthModalOpener = document.querySelector('#account-auth-button');
const loginModal = document.querySelector('#loginModal');
const registerCloseButton = document.querySelector('#registerCloseBtn');

const loginEmailInput = document.querySelector('#loginEmail');
const loginPasswordInput = document.querySelector('#loginPassword');
const loginCloseButton = document.querySelector('#loginCloseBtn');

const registerSwitch = document.querySelector('#registerSwitch');
const registerModal = document.querySelector('#registerModal');
const registerEmail = document.querySelector('#registerEmail');
const registerPassword = document.querySelector('#registerPassword');
const registerBirthday  = document.querySelector('#registerBirthday');
const registerModalCloseFunction = document.querySelector('#')

const openLoginModal = () =>{
    loginModal.style.display = 'block';
}

const closeLoginModal = ()=>{
    loginModal.style.display = 'none';
    loginEmailInput.value = '';
    loginPasswordInput.value = '';
}

const closeRegisterModal = ()=>{
    registerModal.style.display = 'none';
    registerEmail.value = '';
    registerPassword.value = '';
    registerBirthday.value = '';
}

const registerModalCloseFunction = ()=>{

}

const modalOpenerEventAttachment = () => {
    accountAuthModalOpener.addEventListener('click',()=>{
        openLoginModal();
    })

}

const loginModalCloseFunction = () =>{
    loginCloseButton.addEventListener('click',()=>{
        closeLoginModal();
    })
}

const registerModalOpen =()=>{
    registerModal.style.display = 'block';

}

const registerModalRequest = ()=>{
    return new Promise((resolve,reject)=>{
        loginModalCloseFunction();
        let state = null;
        if (loginModal.style.display === 'none'){
            state = "success";
        }

        if(state = "success"){
            resolve("True");
        }
        else{
            reject("False");
        }
        
    })
}



const runModalSwitch = async()=>{
    loginModalCloseFunction();
    const result = await registerModalRequest();

    if (result === 'True'){
        registerModalOpen();
    }
}
console.log('checking at line 73')

const switchToRegister = () =>{
    registerSwitch.addEventListener('click',()=>{
        runModalSwitch();
    })
}
/* webpage functions grouped */
loginModalCloseFunction();
modalOpenerEventAttachment();
switchToRegister();



const getUser = async()=>{
    try{
        const user = await getCurrentUser();
        return user;
    } catch (error){
        console.log(error.code);
    }
}

const user = await getUser();
if (user){
console.log(`user: ${user}`);
} else{
    console.log('User State Failed.')
}






