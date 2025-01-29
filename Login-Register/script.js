const API_URL = "http://localhost:5000"; // Backend URL

// Tabs
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

// Switch to Login
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.style.display = "block";
  registerForm.style.display = "none";
});

// Switch to Register
registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

// Handle Login
async function handleLogin() {
  const name = document.getElementById("login-name").value;
  const password = document.getElementById("login-password").value;

  if (!name || !password) {
    alert("Please fill in all fields!");
    return;
  }

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert(`Welcome back, ${result.user.name}!`);
  } else {
    alert(result.message);
  }
}

// Handle Register
async function handleRegister() {
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm-password").value;

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all fields!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert(result.message);
  } else {
    alert(result.message);
  }
}
