module.exports = {
    dayDifference : function(startDate, endDate){
        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        var diffDays = Math.ceil(timeDiff/(1000*3600*24));
        return diffDays;
    },

    decToBinary : function(decimalNumber){
        var binaryNumber = new Array();

        // var i = 0;

        while(decimalNumber > 0){

            binaryNumber.push(decimalNumber % 2);
            decimalNumber = decimalNumber / 2;
            // i++;

        }

        binaryNumber.forEach(n => process.stdout.write(n.toString()));



    }
}