
document.addEventListener("DOMContentLoaded", () => {
    const key = new URLSearchParams(window.location.search).toString().slice(0,-1);
    const generatePassword = document.getElementById("Generate");
    const addPassword = document.getElementById("cachedPasswords");

    if (generatePassword) {
        generatePassword.addEventListener("click", () => {
            window.location.assign("index.html");
        });
    } else {
        console.error("Element with id 'Generate' not found.");
    }

    if (addPassword) {
        addPassword.addEventListener("click", () => {
            window.location.assign(`./addPassword.html?key=${key}`);
        });
    } else {
        console.error("Element with id 'Generate' not found.");
    }
});

document.addEventListener("DOMContentLoaded", () => {

    function loadCryptoJS(callback) {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
        script.type = "text/javascript";
        script.onload = callback;
        document.head.appendChild(script);
    }

    loadCryptoJS(() => {
        // const encrypted = CryptoJS.AES.encrypt("hello_WOrld", "secret-key").toString();
    });
    
    let passwordWrappers = document.getElementById("passwords");
    if (!passwordWrappers) {
        console.error("Element with id 'passwords' not found.");
        return;
    }
    
    const key = new URLSearchParams(window.location.search).toString().slice(0,-1);


    fetch("passwordFiles.txt")
    .then((res) => res.text())
    .then((passwords) => {
        passwords = passwords.split(",").slice(1);
        console.log(passwords);
        passwords.forEach(password => {
            const decryptedPassword = CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8);
            passwordWrappers.innerHTML += `<div>${decryptedPassword}</div>`;
        });
    })
});


