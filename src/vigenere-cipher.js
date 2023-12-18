const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    let encrypted = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const messageChar = message[i];
      if (/[A-Za-z]/.test(messageChar)) {
        const keyChar = key[keyIndex % key.length];
        const shift = this.alphabet.indexOf(keyChar.toUpperCase());
        const encryptedCharIndex =
          (this.alphabet.indexOf(messageChar.toUpperCase()) + shift) % this.alphabet.length;
        encrypted += this.alphabet[encryptedCharIndex];
        keyIndex++;
      } else {
        encrypted += messageChar;
      }
    }

    if (!this.isDirect) {
      encrypted = `#${encrypted}`;
    }

    return this.isDirect ? encrypted : encrypted.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error('Incorrect arguments!');

    let decrypted = '';
    let keyIndex = 0;

    if (!this.isDirect) {
      encryptedMessage = encryptedMessage.slice(1); // Remove the '#' prefix
    }

    for (let i = 0; i < encryptedMessage.length; i++) {
      const encryptedChar = encryptedMessage[i];
      if (/[A-Za-z]/.test(encryptedChar)) {
        const keyChar = key[keyIndex % key.length];
        const shift = this.alphabet.indexOf(keyChar.toUpperCase());
        let decryptedCharIndex =
          (this.alphabet.indexOf(encryptedChar.toUpperCase()) + this.alphabet.length - shift) %
          this.alphabet.length;
        decrypted += this.alphabet[decryptedCharIndex];
        keyIndex++;
      } else {
        decrypted += encryptedChar;
      }
    }

    return this.isDirect ? decrypted : decrypted.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine,
};



