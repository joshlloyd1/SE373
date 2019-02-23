const express = require("express")
const hbs = require("hbs")
const mongoose = require("mongoose")
var Employee = require("./schemas/employee.js")

var app = express()
app.set("view engine", "hbs")
app.use(express.static(__dirname, + "/public"))
hbs.registerPartials(__dirname + "/views/partials")
app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://localhost:27017/Empl', { useNewUrlParser: true})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log("Database connection successful")
})

app.get('/', (req, res)=>{
    res.render('index.hbs')
})
app.get('/add', (req, res)=>{
    res.render('add.hbs')
})
app.get('/view', (req, res, next)=>{
    var resultArray = []
    var cursor = db.collection("employees").find()
    cursor.forEach(function(doc, error) {
        resultArray.push(doc) 
    })
    res.render('view.hbs', {items: resultArray})
    
})
app.post('/deletepre', (req, res, next)=>{

    let id = req.body.id
    Employee.find({_id:id}, function(err, data) {
        res.render('deletepre.hbs', {item: data[0]})
        
    })
})
app.post('/delete', (req, res, next)=>{
    let id = req.body.id 
    console.log(id)
    Employee.deleteOne({"_id": id}, function(err, result) {
        console.log("item deleted")
    })

    res.render('delete.hbs', {id: id})
})
app.post('/update', (req, res,next)=>{
    let id = req.body.id
    
    Employee.find({_id:id}, function(err, data) {
        

        res.render('update.hbs', {item: data})
        
    })
})
app.post('/updateitem', (req, res, next)=>{
    let id = req.body.id 
    

    let fName = String(req.body.firstName)
    let lName = String(req.body.lastName)
    let dept = String(req.body.department)
    let jTitle = String(req.body.jobTitle)
    let dStarted = String(req.body.startDate)

    Employee.updateOne({"_id": id}, {$set: {firstName: fName, lastName: lName, department: dept, jobTitle: jTitle, sartDate: dStarted}}, function(err, data) {
        console.log("Updated: " + id)
    })
    res.render('updateitem.hbs')
})
app.post('/results', (req, res)=> {
    let fName = String(req.body.firstName)
    let lName = String(req.body.lastName)
    let dept = String(req.body.department)
    let jTitle = String(req.body.jobTitle)
    let dStarted = String(req.body.startDate)
    
    let sal = Number(req.body.salary)
    res.render('results.hbs',{
        fName: fName,
        lName: lName,
        dept: dept,
        jTitle: jTitle,
        dStarted: dStarted,
        sal: sal
    })
    var emp = new Employee({ firstName: fName,
                            lastName: lName,
                            department: dept,
                            jobTitle: jTitle,
                            sartDate: dStarted.toString(),
                            salary: sal })
    emp.save(function (err, cat) {
        if(err) return console.err(err)
        console.log("value saved: " + cat)
    })
})

app.get("*", (req, res)=>{
 //   console.log("wrong url")
    res.render("index.hbs")
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})