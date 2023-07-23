// random number generator REST Service 
// your name 
// import required module 

var express = require("express");
var app = express();

// enable a port to listen to incoming HTTP requests 

app.listen(3000, function () { 
    console.log("API version 1.0.0 is running on port 3000"); 
});

//set public folder to be static, so it can serve the files without requests and routing
app.use(express.static('public'));

// define a route using a callback function that will be invoked 
// when the user makes a HTTP request to the root of the folder (URL)
// display some information about the REST Service


app.get('/zodiac/sign/:month/:day', function (req, res) {

    const month = req.params.month;
    const day = req.params.day;
    //you should check is a Number before parseInt
    if (isNaN(month) || isNaN(day))
    {
        res.status(400);
        res.json({error: "bad request"});
        return ;
    }

    let umonth = parseInt(month);
    let uday = parseInt(day);

    let zodiac_sign = get_zodiac_sign(uday, umonth);

    res.status(200); 
    res.json({ "zodiac_sign" : zodiac_sign}); 
    console.log("a request has been processed in / (zodiacsign) ");
});

app.get('/zodiac/info/:sign', function(req, res){

    const sign = req.params.sign;

    //reading the zodiac_info.json file in data folder.
    //this is not a module
    const data = require('./data/zodiac_info');
    // if is not truthy
    if(!data[sign]){
        res.status(400);
        res.json({error: "bad request"});
        return ;
    }

    res.status(200); 
    res.json(data[sign]);
});

app.get('/zodiac/icon/:sign', function(req, res){
    const sign = req.params.sign;

    //reading the zodiac_icons.json file in data folder.
    //this is not a module
    const data = require('./data/zodiac_icons');
    // if is not truthy
    if(!data[sign]){
        res.status(400);
        res.json({error: "bad request"});
        return ;
    }

    res.status(200); 
    res.json({ "zodiac_icon" : data[sign] });
});

app.get('/zodiac/traits/:sign', function(req, res){
    const sign = req.params.sign;

    //reading the zodiac_traits.json file in data folder.
    //this is not a module
    const data = require('./data/zodiac_traits');
    // if is not truthy
    if(!data[sign]){
        res.status(400);
        res.json({error: "bad request"});
        return ;
    }

    res.status(200); 
    res.json(data[sign]);
});


function get_zodiac_sign(day, month)
    {
        let zodiac_sign="";            
        // checks month and date within the 
        // valid range of a specified zodiac
        if (month == "12"){            
            zodiac_sign = (day < 22) ? "Sagittarius" : "Capricorn";            
        }
                
        else if (month == 1){
            zodiac_sign = (day < 20) ? "Capricorn" : "Aquarius";            
        }
                
        else if (month == 2){
            zodiac_sign = (day < 19) ? "Aquarius" : "Pisces";
        }
                
        else if(month == 3){
            zodiac_sign = (day < 21) ? "Pisces" : "Aries";
            
        }
        else if (month == 4){
            zodiac_sign = (day < 20) ? "Aries" : "Taurus";            
        }
                
        else if (month == 5){
            zodiac_sign = (day < 21) ? "Taurus" : "Gemini";            
        }
                
        else if( month == 6){
            zodiac_sign = (day < 21) ? "Gemini" : "Cancer";
            
        }                
        else if (month == 7){
            zodiac_sign = (day < 23) ? "Cancer": "Leo";            
        }
                
        else if( month == 8){                    
            zodiac_sign = (day < 23) ? "Leo" : "Virgo";
        }
                
        else if (month == 9){
            zodiac_sign = (day < 23) ? "Virgo" : "Libra";
        }
                
        else if (month == 10){
            zodiac_sign = (day < 23) ? "Libra" : "Scorpio";
        }
                
        else if (month == 11){
            zodiac_sign = (day < 22) ? "Scorpio" : "Sagittarius";            
        }
                
        return zodiac_sign;
    }