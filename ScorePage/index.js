const players = Object.keys(localStorage);
const tbody = document.getElementById('tbody');

document.addEventListener('DOMContentLoaded', () => {
    players.forEach(p => {
        if (p === 'current-user') {
            return;
        }

        let playerInfo = JSON.parse(localStorage.getItem(p));
        delete playerInfo.password;

        const tr = document.createElement('tr');

        let temp = document.createElement('td');
        temp.textContent = `${playerInfo['username']}`
        tr.appendChild(temp);

        temp = document.createElement('td');
        temp.textContent = playerInfo['breakout'];
        tr.appendChild(temp);

        temp = document.createElement('td');
        temp.textContent = playerInfo['hangman'];
        tr.appendChild(temp);

        temp = document.createElement('td');
        temp.textContent = playerInfo['memory-cards'];
        tr.appendChild(temp);

        temp = document.createElement('td');
        temp.textContent = playerInfo['ping-pong'];
        tr.appendChild(temp);

        temp = document.createElement('td');
        temp.textContent = playerInfo['snake'];
        tr.appendChild(temp);

        temp = document.createElement('td');
        temp.textContent = playerInfo['rock-paper-scissors'];
        tr.appendChild(temp);

        temp = document.createElement('td');
        temp.textContent = playerInfo['wack-a-mole'];
        tr.appendChild(temp);

        temp = document.createElement('td');
        temp.textContent = playerInfo['jigsaw'];
        tr.appendChild(temp);

        tbody.appendChild(tr);
    })
})