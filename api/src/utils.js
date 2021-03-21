const utils = {

    isEmpty: (str) => !str,
    isOnlyNumber: (str) => !str.match(/[^0-9]/),
    isValidLength: (str, length) => str.length >= length,
    isValidEmail: (str) => /\S+@\S+\.\S+/.test(str),

}

module.exports = utils;