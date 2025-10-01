const passwordInput = document.getElementById("password");
const feedback = document.getElementById("feedback");

// Fetch common weak passwords from file
let weakPasswords = [];
fetch('common_passwords.txt')
    .then(response => response.text())
    .then(text => {
        weakPasswords = text.split(/\r?\n/);
    });

passwordInput.addEventListener("input", () => {
    const pwd = passwordInput.value;
    let messages = [];

    if(pwd.length < 10) messages.push("Password must be at least 10 characters.");
    if(!/[a-z]/.test(pwd)) messages.push("Include a lowercase letter.");
    if(!/[A-Z]/.test(pwd)) messages.push("Include an uppercase letter.");
    if(!/[0-9]/.test(pwd)) messages.push("Include a number.");
    if(!/[^A-Za-z0-9]/.test(pwd)) messages.push("Include a special character.");
    if(weakPasswords.includes(pwd.toLowerCase())) messages.push("Avoid common passwords.");

    feedback.innerHTML = messages.length ? messages.join("<br>") : "Strong password!";
});
