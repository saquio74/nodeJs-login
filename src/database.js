import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://saquio74:Pier.50301@cluster0.zlxmt.mongodb.net/users?retryWrites=true&w=majority",{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
})
    .then(db => console.log('database is connect'))
    .catch(error=> console.log(error))
 