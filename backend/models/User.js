
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max:10,
        unique: true,
    },
    password: {
        type: Number,
        require:true,
        min:3,

    },
},
  {timestamps: true}
);



module.exports = mongoose.model("User", UserSchema);





