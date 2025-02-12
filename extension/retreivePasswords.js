
function loadCryptoJS(callback) {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
    script.type = "text/javascript";
    script.onload = callback;
    document.head.appendChild(script);
}

loadCryptoJS(() => {
    const encrypted = CryptoJS.AES.encrypt("hello_WOrld", "secret-key").toString();
});



document.addEventListener("DOMContentLoaded", function() {
    let decryptedPasswords = []
    const passwordAttempt = document.getElementById("password");
    function checkPassword(event) {
        if (event.key == "Enter") {
            fetch("passwordFiles.txt")
            .then((res) => res.text())
            .then((text) => {
                const passwords = text.split(",")
                const Output = CryptoJS.AES.decrypt(passwords[0], passwordAttempt.value).toString(CryptoJS.enc.Utf8);
                if (Output == "00000000000000000000000000000000"){
                    passwords.forEach(password => {
                        let decryptedPassword = CryptoJS.AES.decrypt(password, passwordAttempt.value).toString(CryptoJS.enc.Utf8);
                        decryptedPasswords.push(decryptedPassword)
                        console.log(`${decryptedPasswords}`)
                    });
                    window.location.assign(`./index.html?${passwordAttempt.value}`)
                }
                // console.log(Output);
            })
            .catch((e) => console.error(e));
        }
    }

    if (passwordAttempt) {
        passwordAttempt.addEventListener("keypress", checkPassword);
    } else {
        console.error("Element with id 'password' not found.");
    }
});











