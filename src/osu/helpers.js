module.exports = {
    generateTimeFooter : function(hours, minutes){
        var footer;
        if(hours === 0 && minutes === 0){
            footer = "Just now";
            return footer;
        }else if(hours === 0){
            footer = minutes + " minute";
            footer = minutes === 1 ? footer : footer + "s";
        }else if(minutes === 0){
            footer = hours + " hour";
            footer = hours === 1 ? footer : footer + "s";
        }else{
            footer = hours + " hour";
            footer = hours === 1 ? footer : footer + "s";
            footer = footer + " and " + minutes + " minute";
            footer = minutes === 1 ? footer : footer + "s";
        }
        footer = footer + " ago";
        return footer;
    }
}