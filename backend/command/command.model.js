const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
commandName: {
        type: String,
        required: true,
},
commandTask:{
        type: String,
        required: false,
},
commandMemberNumber:{
        type: String,
        required: false,
},
commandDescription: {
        type: String,
        required: false
},
admin: {
        type: String,
        required: true
},
notification: {
        type: [Object],
        required: false
},
users: {
        type: [Object],
        required: false
},
file:{
        type:String,
        required:false
}
});

const Command = mongoose.model('command', commandSchema);
module.exports = Command;