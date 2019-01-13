
function italics(string){
    return "*" + string + "*";
}

function bold(string){
    return "**" + string + "**";
}

function underline(string){
    return "__" + string + "__";
}

function strikethrough(string){
    return "~~" + string + "~~";
}

function boldItalics(string){
    return bold(italics(string));
}

function underlineItalics(string){
    return underline(italics(string));
}

function underlineBold(string){
    return underline(bold(string));
}

function underlineBoldItalics(string){
    return underline(boldItalics(string));
}

function createLink(word, url){
    return "[" + word + "](" + url + ")";
}


exports.italics = italics;
exports.bold = bold;
exports.underline = underline;
exports.strikethrough = strikethrough;
exports.boldItalics = boldItalics;
exports.underlineItalics = underlineItalics;
exports.underlineBold = underlineBold;
exports.underlineBoldItalics = underlineBoldItalics;
exports.createLink = createLink;