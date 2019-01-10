const exp = module.exports;

function dayDifference(startDate, endDate) {
    let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

function decToBinary(decimalNumber) {
    let binaryNumber = new Array();

    while (decimalNumber > 0) {

        binaryNumber.push(decimalNumber % 2);
        decimalNumber = parseInt(decimalNumber / 2);

        if (decimalNumber < 2) {
            binaryNumber.push(1);
            break;
        }

    }

    return binaryNumber;

}

exp.dayDifference = dayDifference;
exp.decToBinary = decToBinary;