const passwordBtn = document.getElementById("passwordGenerate");
const includeNumber = document.getElementById("includeNumber");
const includeLower = document.getElementById("includeLowerChars");
const includeUpper = document.getElementById("includeUpperChars");
const beginWithALetter = document.getElementById("beginLetter");
const quantity = document.getElementById("Quantity");
const size = document.getElementById("size");
const passwordElement = document.getElementById("password");
const cachedPasswords = document.getElementById("cachedPasswords");
const addPassword = document.getElementById("addPassword");


const key = new URLSearchParams(window.location.search).toString().slice(4);

console.log(key)


// const passwords = new URLSearchParams(window.location.search).toString().replace("%2C", ",").slice(10);

function getRandomChar(str) {
    return str[Math.floor(Math.random() * str.length)];
}

function createPasswords(includeNumber, includeLower, includeUpper, beginWithALetter, quantity, size) {
    const numbers = '0123456789';
    const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let pool = '';
    if (includeNumber) pool += numbers;
    if (includeLower) pool += lowerLetters;
    if (includeUpper) pool += upperLetters;
    if (!pool) pool = numbers + lowerLetters + upperLetters;

    let letterPool = '';
    if (includeLower) letterPool += lowerLetters;
    if (includeUpper) letterPool += upperLetters;
    if (beginWithALetter && !letterPool) letterPool = lowerLetters + upperLetters;

    const passwords = Array.from({ length: quantity }, () => {
        let password = beginWithALetter ? getRandomChar(letterPool) : '';
        while (password.length < size) {
            password += getRandomChar(pool);
        }
        return password;
    });

    passwordElement.innerHTML = passwords.join("<br>");
}

addPassword.addEventListener("click", () => {
    window.location.assign(`./addPassword.html${key}`);
});

passwordBtn.addEventListener("click", () => {
    if (size.value == 0) size.value = 15;
    if (quantity.value == 0) quantity.value = 1;
    createPasswords(includeNumber.checked, includeLower.checked, includeUpper.checked, beginWithALetter.checked, quantity.value, size.value);
});


cachedPasswords.addEventListener("click", () => {
    window.location.assign(`./cached.html?key=${key}`)
});
