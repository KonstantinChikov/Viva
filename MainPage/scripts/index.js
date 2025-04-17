import { CURRENT_USER, isLoggedIn, removeElementFromArrayOnce } from './util.js'

function redirect() {
    if (isLoggedIn()) {
        return;
    }
    
    window.location.href = '../LogInRegisterPage/index.html';
}

redirect();

document.addEventListener('DOMContentLoaded', () => {
    // when page loads, get all heart buttons, and the current user
    const heartButtons = document.querySelectorAll('.heart-button');
    const currUserKey = localStorage.getItem(CURRENT_USER);
    const currentUser = JSON.parse(localStorage.getItem(currUserKey));
    
    // for each heart button display red or white heart 
    // depending on whether the user has liked the game 
    heartButtons.forEach(button => {
        const gameName = button.dataset.gameName;

        button.textContent = currentUser.likedGames.includes(gameName) ? '❤️' : '🤍';
    });

    // for each heart button, when clicked, check if the user has liked the game
    // if yes, change the heart to white and remove the game from their liked games
    // if no, change the heart to red and add it to their liked games, then save to local storage
    heartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            
            const gameName = button.dataset.gameName;
            if (currentUser.likedGames.includes(gameName)) {
                button.textContent = '🤍';
                currentUser.likedGames = removeElementFromArrayOnce(currentUser.likedGames, gameName);
            } else {
                button.textContent = '❤️';
                currentUser.likedGames.push(gameName);
            }
            localStorage.setItem(currUserKey, JSON.stringify(currentUser));
        });
    });

    // Grid-item navigation
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const link = item.getAttribute('data-link');
            if (link) {
                // da go eba
            }
        });
    });
});
