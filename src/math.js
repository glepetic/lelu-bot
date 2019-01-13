const exp = module.exports;

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

function secondsToTimeArray(timeInSeconds){

    let minutesAndSeconds = timeInSeconds/60;
    let timeInMinutesMinusSeconds = parseInt(minutesAndSeconds);
    let seconds = Math.round((minutesAndSeconds - timeInMinutesMinusSeconds)*60);
    let hoursAndMinutes = timeInMinutesMinusSeconds/60;
    let timeInHoursMinusMinutes = parseInt(hoursAndMinutes);
    let minutes = parseInt((hoursAndMinutes - timeInHoursMinusMinutes)*60);
    let daysAndHours = timeInHoursMinusMinutes/24;
    let timeInDaysMinusHours = parseInt(daysAndHours);
    let hours = parseInt((daysAndHours - timeInDaysMinusHours)*24);
    let monthsAndDays = (timeInDaysMinusHours*12)/365.25;
    let timeInMonthsMinusDays = parseInt(monthsAndDays);
    let days = parseInt(((monthsAndDays - timeInMonthsMinusDays)*365.25)/12);
    let yearsAndMonths = timeInMonthsMinusDays/12;
    let years = parseInt(yearsAndMonths);
    let months = parseInt((yearsAndMonths - years)*12);

    return [years, months, days, hours, minutes, seconds];

}

function secondsSinceDate(date) {
    let now = new Date();
    //now.setHours(now.getHours() + 3);
    let d = new Date(date);

    let timeDiff = Math.abs(now.getTime() - d.getTime());
    let diffSeconds = Math.ceil(timeDiff / 1000);
    return diffSeconds;
}


exp.decToBinary = decToBinary;
exp.secondsToTimeArray = secondsToTimeArray;
exp.secondsSinceDate = secondsSinceDate;