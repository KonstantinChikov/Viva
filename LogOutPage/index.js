import { logout } from "../MainPage/scripts/util.js";

document.querySelector('#LogOutBtn').onclick = () => {
    logout();
    window.location.href='../LogInRegisterPage/index.html'
}