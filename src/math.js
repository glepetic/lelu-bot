module.exports = {
    dayDifference : function(startDate, endDate){
        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        var diffDays = Math.ceil(timeDiff/(1000*3600*24));
        return diffDays;
    }
}