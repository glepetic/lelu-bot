const exp = module.exports;


function calculateAccuracy(count50s, count100s, count300s, countMiss) {
    let totalCount = count50s * 1 + count100s * 1 + count300s * 1 + countMiss * 1;
    return ((count50s * 50 + count100s * 100 + count300s * 300) * 100) / (totalCount * 300);
}



exp.calculateAccuracy = calculateAccuracy;