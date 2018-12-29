module.exports = {
    checkArguments : function(message, args){
        if(args[1] != null){
            message.channel.send("This command doesn't take any arguments!");
            return 1;
        }
        return 0;
    },
    getUsername : function(args, start){
        let user = args[start];
        if(user == null) return;
        let i;
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
        if(roles.some(role => role.hasPermission("ADMINISTRATOR"))){
            return true;
        }
        message.channel.send("You are not an admin");
        return false;
    }
}