module.exports = {
    purge : function(message, qty){
        let messages = message.channel.messages.array();
        let len = messages.length;
        if (qty == null) {
            message.channel.send("Please provide the number of messages to delete.");
            return;
        }
        if (qty <= 0) {
            message.channel.send("Why did you even bother writing? 🤦🏼‍");
            return;
        }
        if (len == 1) {
            message.channel.send("There are no messages left to delete...");
            return;
        }
        if (qty >= len) {
            messages.forEach(msg => msg.delete()
        )
            ;
            message.channel.send("A total of " + (len - 1).toString() + " messages were deleted.");
            return;
        }
        qty++;
        let i;
        let totalDeleted = -1;
        for (i = len - 1; len - qty <= i; i--) {
            messages[i].delete();
            messages.pop();
            totalDeleted++;
        }
        message.channel.send("A total of " + totalDeleted.toString() + " messages were deleted.");
    }
}