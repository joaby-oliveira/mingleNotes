const utils = {
    isEmpty: (str) => !str,
    isOnlyNumber: (str) => !str.match(/[^0-9]/),
    isValidLength: (str, length) => str.length >= length,
    isValidEmail: (str) => /\S+@\S+\.\S+/.test(str),
    isOnlyLetters: (str)=> !str.match(/[^a-z ]/igm),
    isDoubleSpaced: (str)=> str.match("  ") != null,
}

module.exports = utils;