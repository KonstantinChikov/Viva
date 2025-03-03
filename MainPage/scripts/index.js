import { isLoggedIn } from './util.js'

function redirect() {
    if (isLoggedIn()) {
        return;
    }
    
    window.location.href = '../LogInRegisterPage/index.html';
}

redirect();