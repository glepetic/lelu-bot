
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

    console.log("timeInSeconds: " + timeInSeconds);
    let minutesAndSeconds = timeInSeconds/60;
    console.log("minutesAndSeconds: " + minutesAndSeconds);
    let timeInMinutesMinusSeconds = parseInt(minutesAndSeconds);
    console.log("timeInMinutesMinusSeconds: " + timeInMinutesMinusSeconds);
    let seconds = Math.abs(Math.round((minutesAndSeconds - timeInMinutesMinusSeconds)*60));
    console.log("seconds: " + seconds);
    let hoursAndMinutes = timeInMinutesMinusSeconds/60;
    console.log("hoursAndMinutes: " + hoursAndMinutes);
    let timeInHoursMinusMinutes = parseInt(hoursAndMinutes);
    console.log("timeInHoursMinusMinutes: " + timeInHoursMinusMinutes);
    let minutes = Math.abs(Math.round((hoursAndMinutes - timeInHoursMinusMinutes)*60));
    console.log("minutes: " + minutes);
    let daysAndHours = timeInHoursMinusMinutes/24;
    console.log("daysAndHours: " + daysAndHours);
    let timeInDaysMinusHours = parseInt(daysAndHours);
    console.log("timeInDaysMinusHours: " + timeInDaysMinusHours);
    let hours = Math.abs(Math.round((daysAndHours - timeInDaysMinusHours)*24));
    console.log("hours: " + hours);
    let monthsAndDays = (timeInDaysMinusHours*12)/365.25;
    console.log("monthsAndDays: " + monthsAndDays);
    let timeInMonthsMinusDays = parseInt(monthsAndDays);
    console.log("timInMonthsMinusDays: " + timeInMonthsMinusDays);
    let days = Math.abs(parseInt(((monthsAndDays - timeInMonthsMinusDays)*365.25)/12));
    console.log("days: " + days);
    let yearsAndMonths = timeInMonthsMinusDays/12;
    console.log("yearsAndMonths: " + yearsAndMonths);
    let years = Math.abs(Math.round(yearsAndMonths));
    console.log("years: " + years);
    let months = Math.abs(Math.round((yearsAndMonths - years)*12));
    console.log("months: " + months);


    return [years, months, days, hours, minutes, seconds];

}

function secondsSinceDate(date) {
    let now = new Date();
    let d = new Date(date);

    let timeDiff = Math.abs(now.getTime() - d.getTime());
    let diffSeconds = Math.ceil(timeDiff / 1000);
    return diffSeconds;
}


exports.decToBinary = decToBinary;
exports.secondsToTimeArray = secondsToTimeArray;
exports.secondsSinceDate = secondsSinceDate;