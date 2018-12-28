module.exports = {
    calculateAccuracy : function(count50s, count100s, count300s, countMiss){
        var totalCount = count50s*1 + count100s*1 + count300s*1 + countMiss*1;
        return (count50s*50 + count100s*100 + count300s*300)*100/totalCount*300;
    },

    calculateTimeSincePlay : function(date){
        var now = new Date();
        //now.setHours(now.getHours() + 3);
        var d = new Date(date);

        var dayDiff = now.getDate() - d.getDate();
        var hourDiff = now.getHours() - d.getHours();
        var minDiff = now.getMinutes() - d.getMinutes();

        if(dayDiff > 0 || dayDiff < 0){
            hourDiff = 24 - hourDiff*(-1);
            if(minDiff < 0){
                hourDiff--;
                minDiff = 60 - minDiff*(-1);
            }
        }

        return hourDiff*60 + minDiff*1;
    }
}