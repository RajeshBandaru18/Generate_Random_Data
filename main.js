import express from "express"
import mongoose from "mongoose"
const conn = await mongoose.connect("mongodb://localhost:27017/company")
import Employee from "./models/employee.js"
const app = express()
const port = 3000

app.set("view engine", "ejs")

//Function to generate Random values
const getRandom = (arr)=>{
    let rno = Math.floor(Math.random()*(arr.length-1))
    return arr[rno]
}

app.get('/',(req, res)=>{
    res.render('index', {foo: 'FOO'})

})
//onclicking the {generate now} button request will send to main.js which is fetched from script tag written in ejs file 
//in ejs file it fetches {/generate } end point and generate random data which all the process is done in backend 
// at app.get('/generate', ()=>{
//in this get function it perform all the process to generate Random Data
// })
app.get("/generate", async(req, res)=>{
    //Clear the collection Employee
    await Employee.deleteMany({})

    //Declaring some Random Data
    let randomName =['Rajesh', "Ravi", "Ramu", "Ramesh"]
    let randomeLang = ["Python", "C++", "Java", "C#"]
    let randomCities = ['Bilaspur', 'Mysore', 'Kolkata','Benguluru']
    //For loop for inserting data into employee collection and gerating random data on console
    for (let index = 0; index < 10; index++){
        //The bellow command will create documents and insert the documents into Employee module
        let e = await Employee.create({
            name: getRandom(randomName),
            salary: Math.floor(Math.random()*200000),
            language: getRandom(randomeLang),
            city: getRandom(randomCities),
            isManager: Math.random()>0.5?true:false
        })
        console.log(e)
        
    }
    res.render('index', {foo: 'FOO'})
})
app.listen(port, ()=>{
    console.log(`listening at port ${port}`)
})
