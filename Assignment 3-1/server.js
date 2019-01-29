const express = require('express');
const hbs = require('hbs');

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({extended:false}));

function random() {
    return Math.round(Math.random()*4 +1);
}

hbs.registerHelper('select',()=>{
    var message = "<select name=opt style='background-color:orange; color:white'>";
    for(var i = 0; i < 21; i++) {
        if(i == 3) message += "<option style='color:white'>" + i + "</option>";
        if(i == 4) message += "<option style='color:white'>" + i + "</option>";
        if(i == 5) message += "<option style='color:white'>" + i + "</option>";
        if(i == 10) message += "<option style='color:white'>" + i + "</option>";
        if(i == 20) message += "<option style='color:white'>" + i + "</option>";
    }
    message += "</select>";
    return message;
});
hbs.registerHelper('table',(num)=>{
    var table = "<table>";
    var r = 0;
    var color = "";
    for(var i = 0; i < num; i++) {
        color = ((1<<24)*Math.random()|0).toString(16);
        table += "<tr>";
        table += "<td bgcolor=" + color + "><font color='black'>" + color.toUpperCase() + "</font><br><font color='white'>" + color.toUpperCase() + "</font></td>";
        for(var j = 0; j < num-1; j++) {
            color = ((1<<24)*Math.random()|0).toString(16);
            table += "<td bgcolor=" + color + "><font color='black'>" + color.toUpperCase() + "</font><br><font color='white'>" + color.toUpperCase() + "</font></td>";
        }
        table += "</tr>"
    }
    table += "</table>";
    return table;
})
app.get("/", (req, res)=>{
    res.render('index.hbs')
})
app.get('/index', (req, res)=>{
    res.render('index.hbs')
})
app.post('/result', (req, res)=>{
    res.render('result.hbs',{
        numrec:Number(req.body.opt)
    })
})




app.listen(3000, ()=> {
    console.log("Server is running on port 3000")
})