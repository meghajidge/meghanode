var crypto = require('crypto-js');

var secretMessage = {
    name: 'Andrew',
    secretName: '007'
};
var secretKey = '123abc';

//Encrypt
var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);
console.log('Encrypted Message:' + encryptedMessage);


//decrypt
var decreptedMessage = crypto.AES.decrypt(encryptedMessage, secretKey);
 
console.log('decreptedMessage' + decreptedMessage);