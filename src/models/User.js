import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    cellphone: String,
    country: String,
    state: String,

},{
    timestamps: true,
    versionKey: false,
})
userSchema.statics.encriptPassword = async  (password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
}
userSchema.statics.comparePassword = async  (password,recivedPassword) =>{
    return await bcrypt.compare(password,recivedPassword);
}

export default model('User', userSchema);