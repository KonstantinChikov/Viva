const players = Object.keys(localStorage);
const tbody = document.getElementById('tbody');
const gameHeaders = document.getElementsByTagName('th');

document.addEventListener('DOMContentLoaded', () => {
    players.forEach(p => {
        if (p === 'current-user') {
            return;
        }

        let playerInfo = JSON.parse(localStorage.getItem(p));
        delete playerInfo.password;

        // create table cell for username
        const tr = document.createElement('tr');

        let temp = document.createElement('td');
        temp.textContent = `${playerInfo['username']}`
        tr.appendChild(temp);
        
        // for each existing game, check if it is in the liked games
        // for the respective user and set appropriate icon
        for (const gameHeader of gameHeaders) {
            // handling the cell for the player name, because it doesn't have this attribute
            const gameName = gameHeader.dataset.gameName;
            if (gameName === undefined) {
                continue;
            }
            
            let temp = document.createElement('td');
            temp.textContent = playerInfo.likedGames.includes(gameName) ? '❤️' : '🤍';
            tr.appendChild(temp);
        }

        tbody.appendChild(tr);
    })
})