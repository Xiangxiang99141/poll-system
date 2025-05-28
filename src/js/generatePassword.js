function generatePassword(lower=1, upper=1, number=1, symbol=1, length=8) {
    let generatedPassword = ""; //默認下為空值
    let typesCount = lower + upper + number + symbol;
    let typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
        return "";
    }
    for (let i = 0; i < length; i++) {
        typesArr.forEach((type) => {
        // console.log(type); //{lower:true} {upper:true}...
        let funcName = Object.keys(type)[0];
        // console.log(funcName); // lower upper number symbol
        generatedPassword += randomFunc[funcName]();
        });
    }

    let finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
    // console.log(typesArr);
}

let randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

// 隨機取得小寫字母a~z
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); //a~z編碼:97~122
}
// 隨機取得大寫字母A~Z
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65); //A~Z編:65~90
}
// 隨機取得數字0~9
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48); //0的編碼為48
}
// 隨機取得符號
function getRandomSymbol() {
    let symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

export default generatePassword;