
// Encryption
const btn1 = document.getElementById("encryptionBtn");

btn1.addEventListener("click", (event) => {
    event.preventDefault(); // prevent default action on "click" event

    let msg1 = document.getElementById("msg1").value;
    let key1 = document.getElementById("key1").value;

    document.getElementById("result1").textContent = encoderMessage(msg1,key1);
})

// Decryption
const btn2 = document.getElementById("decryptionBtn");

btn2.addEventListener("click", (event) => {
    event.preventDefault();
    
    let msg2 = document.getElementById("msg2").value;
    let key2 = document.getElementById("key2").value;

    document.getElementById("result2").textContent = decoderMessage(msg2,key2);

})