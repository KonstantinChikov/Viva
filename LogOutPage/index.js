import { logout } from "../MainPage/scripts.js/util.js";

document.querySelector('#LogOutBtn').onclick = () => {
    logout();
    window.location.href='../LogInRegisterPage/index.html'
}