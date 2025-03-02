import { existsByEmail, existsByUsername, login, register } from "../../MainPage/scripts.js/util.js";

const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const wrapper = document.querySelector(".wrapper");
const loginTitle = document.querySelector(".title-login");
const registerTitle = document.querySelector(".title-register");
const signUpBtn = document.querySelector("#SignUpBtn");
const signInBtn = document.querySelector("#SignInBtn");
const toLogin = document.querySelector("#to-login");
const toRegister = document.querySelector("#to-register");

// register form elements
const regUsername = document.querySelector('#reg-name');
const regEmail = document.querySelector('#reg-email');
const regPassword = document.querySelector('#reg-pass');

const usernameRegisterError = document.querySelector('#username-register');
const emailRegisterError = document.querySelector('#email-register');
const passwordRegisterError = document.querySelector('#password-register');

const tocWrapper = document.querySelector('#toc-wrapper');

// login form elements
const logEmail = document.querySelector('#log-email');
const logPassword = document.querySelector('#log-pass');

const loginError = document.querySelector('#login-error');

toLogin.onclick = loginFunction;
toRegister.onclick = registerFunction;

function loginFunction(){
    loginForm.style.left = "50%";
    loginForm.style.opacity = 1;
    registerForm.style.left = "150%";
    registerForm.style.opacity = 0;
    wrapper.style.height = "500px";
    loginTitle.style.top = "50%";
    loginTitle.style.opacity = 1;
    registerTitle.style.top = "50px";
    registerTitle.style.opacity = 0;
}

function registerFunction(){
    loginForm.style.left = "-50%";
    loginForm.style.opacity = 0;
    registerForm.style.left = "50%";
    registerForm.style.opacity = 1;
    wrapper.style.height = "580px";
    loginTitle.style.top = "-60px";
    loginTitle.style.opacity = 0;
    registerTitle.style.top = "50%";
    registerTitle.style.opacity = 1;
}

hideElement(usernameRegisterError);
hideElement(emailRegisterError);
hideElement(passwordRegisterError);

signUpBtn.onclick = async () => {
    const username = regUsername.value;
    const email = regEmail.value;
    const password = regPassword.value;

    if (existsByUsername(username)) {
        usernameRegisterError.textContent = 'A user with this username already exists!';
        showElement(usernameRegisterError);
        return;
    } else {
        hideElement(usernameRegisterError)
    }
    
    if (existsByEmail(email)) {
        emailRegisterError.textContent = 'A user with this email already exists!';
        showElement(emailRegisterError);
        return;
    } else {
        hideElement(emailRegisterError)
    }
    
    if (password.length < 8) {
        passwordRegisterError.textContent = 'Password must be at least 8 characters!';
        showElement(passwordRegisterError);
        tocWrapper.style.marginTop = '0';
        return;
    } else {
        hideElement(passwordRegisterError)
        tocWrapper.style.marginTop = '20px';
    }

    await register(email, username, password);
    window.location.href = '../../MainPage/index.html';
}

signInBtn.onclick = async () => {
    const email = logEmail.value;
    const password = logPassword.value;

    const successfulLogin = await login(email, password);
    if (!successfulLogin) {
        loginError.textContent = 'Invalid username or password!';
        showElement(loginError);
        return;
    } else {
        hideElement(loginError);
    }

    window.location.href = '../../MainPage/index.html'
}

function showElement(element) {
    element.classList.remove('d-none');
    element.classList.add('d-block');
}

function hideElement(element) {
    element.classList.remove('d-block');
    element.classList.add('d-none');
}