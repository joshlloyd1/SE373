const express = require('express')
const hbs = require('hbs')

var app = express()

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname +'/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));

function rand(low, high) {
    low = Math.ceil(low)
    high = Math.floor(high);
    return Math.floor(Math.random() * (high - low)) + low;
}

function rand2() {
    var a = Math.round(Math.random()*2 + 1)
    var ret = ''
    if(a == 1) ret = 'still'
    if(a == 2) ret = 'rotate'
    if(a == 3) ret = 'shrink'

    return ret
}
hbs.registerHelper('error404',()=>{
    var msg = '';
    var divnum = rand(5, 8)
    for(var i = 0; i < divnum; i++) {
        msg += "<br><div class=" + rand2() + ">404</div>"
        for(var j = 0; j < divnum-1; j++) {
            msg += "<div class = " + rand2() + ">404</div>"
        }
    }
    return msg
})



app.get('/',(req,res)=>{
    res.render('index.hbs')
})
app.get('/index',(req, res)=>{
    res.render('index.hbs')
})
app.get('*', (req,res)=>{
    res.render("error.hbs")
})


app.listen(3000, ()=>{
    console.log('Server is running on Port 3000');
})
