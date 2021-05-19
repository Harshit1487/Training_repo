const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname +"/index.html");

    
    //res.send("server is up.");
})
app.post("/",function(req, res){
    const query = req.body.cityName;
    const apiKey ="73f962c49d328de0d6c3872edb9410d9";
    const unit = "metric";

    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" +apiKey +"&units="+ unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desp = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
            res.write("<h1>The temperature in "+ query +" is " + temp + "degrees Celcius.</h1>");
            res.write("<h2>The weather is currently "+ desp + ".</h2>" );
            
            res.write("<img src=" + imageUrl+ ">");
            res.send();
            //console.log(temp);
        })
    })
    //console.log("post method by...");
})




app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running.")
});