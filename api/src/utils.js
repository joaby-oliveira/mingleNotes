const utils = {
    isEmpty: (str)=>{
        if(str != '') {
            return true;
        }else {
            return false;
        }
    },
    isOnlyLetters: (str)=> !str.match(/[^a-z ]/igm),
    isDoubleSpaced: (str)=> str.match("  ") != null,
}

module.exports = utils;