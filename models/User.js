import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    uuid:{
        type: String,
        require:true,
        min:6,
        max:100
    },
    email:{
        type: String,
        require:true,
        min:6,
        max:16
    },
    password:{
        type: String,
        require:true,
        min:6,
        max:16
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', userSchema);