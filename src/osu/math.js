const exp = module.exports;


function calculateAccuracy(count50s, count100s, count300s, countMiss) {
    let totalCount = count50s * 1 + count100s * 1 + count300s * 1 + countMiss * 1;
    return ((count50s * 50 + count100s * 100 + count300s * 300) * 100) / (totalCount * 300);
}


function calculateTimeSincePlay(date) {
    let now = new Date();
    //now.setHours(now.getHours() + 3);
    let d = new Date(date);

    let dayDiff = now.getDate() - d.getDate();
    let hourDiff = now.getHours() - d.getHours();
    let minDiff = now.getMinutes() - d.getMinutes();

    if (dayDiff > 0 || dayDiff < 0) {
        hourDiff = 24 - hourDiff * (-1);
        if (minDiff < 0) {
            hourDiff--;
            minDiff = 60 - minDiff * (-1);
        }
    }

    return hourDiff * 60 + minDiff * 1;
}


exp.calculateAccuracy = calculateAccuracy;
exp.calculateTimeSincePlay = calculateTimeSincePlay;