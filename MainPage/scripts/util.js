const CURRENT_USER = 'current-user';

export async function register(email, username, password) {
    const hashedPass = await hashPassword(password);
    localStorage.setItem(email, JSON.stringify({ email: email, username: username, password: hashedPass }));
    localStorage.setItem(CURRENT_USER, email);
}

export async function login(email, password) {
    if (!existsByEmail(email)) {
        return false;
    }

    const user = JSON.parse(localStorage.getItem(email));
    const userPassword = user['password'];

    const isVerified = await verifyPassword(password, userPassword);

    if (!isVerified) {
        return false;
    }

    localStorage.setItem(CURRENT_USER, email)
    return true;
}

export function isLoggedIn() {
    return localStorage.getItem(CURRENT_USER) !== 'null';
}

export function logout() {
    localStorage.setItem(CURRENT_USER, null);
}

export function saveScore(email, game, score) {
    if (localStorage.getItem(email) === null) {
        const userScores = { [game]: score };
        localStorage.setItem(email, JSON.stringify(userScores));
        return;
    }

    const savedUserScores = JSON.parse(localStorage.getItem(email));
    if (savedUserScores.hasOwnProperty(game)) {
        if (savedUserScores[game] < score) {
            savedUserScores[game] = score;
        }
    } else {
        savedUserScores[game] = score;
    }
    localStorage.setItem(email, JSON.stringify(savedUserScores));
}

export function existsByEmail(email) {
    return Object.keys(localStorage).includes(email);
}

export function existsByUsername(username) {
    for (const key of Object.keys(localStorage)) {
        if (key === CURRENT_USER) {
            continue;
        }

        const user = JSON.parse(localStorage.getItem(key));
        if (!user['username']) {
            return false;
        }

        if (user['username'].toLowerCase() === username.toLowerCase()) {
            return true;
        }
    }

    return false;
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Hashing the password using Web Crypto API by World Wide Web Consortium (W3C)

    // Convert hash to hex string
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

async function verifyPassword(plainText, hashedPassword) {
    const newHash = await hashPassword(plainText);
    return newHash === hashedPassword;
}

export { CURRENT_USER }