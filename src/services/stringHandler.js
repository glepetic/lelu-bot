function stringifyNumber(number) {

    let i;
    let count = 0;
    let inverseNumberString = "";

    for (i = number.length - 1; i >= 0; i--) {

        if (count == 3) {
            inverseNumberString = inverseNumberString + "," + number.charAt(i);
            count = 1;
            continue;
        }

        inverseNumberString = inverseNumberString + number.charAt(i);
        count++;

    }

    let inverseNumberArray = inverseNumberString.split("");
    let numberArray = inverseNumberArray.reverse();

    return numberArray.join("");

}

function generateTimeString(timeArray) {

    let years = timeArray[0];
    let months = timeArray[1];
    let days = timeArray[2];
    let hours = timeArray[3];
    let minutes = timeArray[4];
    let seconds = timeArray[5];

    let timeAsString = years + " years, " + months + " months, " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";

    if (years == 0) {
        timeAsString = timeAsString.replace("0 years, ", "");
    } else if (years == 1) {
        timeAsString = timeAsString.replace("years", "year");
    }
    if (months == 0) {
        timeAsString = timeAsString.replace("0 months, ", "");
    } else if (months == 1) {
        timeAsString = timeAsString.replace("months", "month");
    }
    if (days == 0) {
        timeAsString = timeAsString.replace("0 days, ", "");
    } else if (days == 1) {
        timeAsString = timeAsString.replace("days", "day");
    }
    if (hours == 0) {
        timeAsString = timeAsString.replace("0 hours, ", "");
    } else if (hours == 1) {
        timeAsString = timeAsString.replace("hours", "hour");
    }
    if (minutes == 0) {
        timeAsString = timeAsString.replace("0 minutes, ", "");
    } else if (minutes == 1) {
        timeAsString = timeAsString.replace("minutes", "minute");
    }
    if (seconds == 0) {
        timeAsString = timeAsString.replace(", 0 seconds", "");
    } else if (seconds == 1) {
        timeAsString = timeAsString.replace("seconds", "second");
    }

    return timeAsString;

}

exports.stringifyNumber = stringifyNumber;
exports.generateTimeString = generateTimeString;