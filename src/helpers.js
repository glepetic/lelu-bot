module.exports = {
    getUsername : function(args, start){
        var user = args[start];
        if(user == null) return;
        var i;
        if(args[start + 1] != null) user = user + " ";
        for(i=start + 1; i<args.length; i++){
            user = user + args[i];
            if(i+1 < args.length){
                user = user + " ";
            }
        }
        return user;
    },

    verifyAdmin : function(roles){
        if(memRoles.some(role => role.hasPermission("ADMINISTRATOR"))){
            return true;
        }
        message.channel.send("You are not an admin");
        return false;
    }
}