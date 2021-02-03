
import app from './app'
import db from './database'

app.listen(app.get("port"),()=>{
    console.log(`App listen at port ${app.get("port")}`)
})

const ver = ()=>{
    console.log('hola')
}
ver()