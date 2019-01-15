function getActions(word){

    switch(word){

        case "kiss":
            return "kissed";
        case "hug":
            return "hugged";
        case "lick":
            return "licked";
        case "slap":
            return "slapped";
    }

}

exports.get = getActions;