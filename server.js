const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const cors = require('cors');
const app=express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey = "1d9055f8c4fca9e2ebb2d276a7d3838b";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apiKey+ "&units="+unit;

  https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data", function(data){
   const weatherDATA = JSON.parse(data);
   const temp = weatherDATA.main.temp
  const description =weatherDATA.weather[0].description

  const icon = weatherDATA.weather[0].icon
  const imageURL = "http://openweathermap.org/img/wn/" +icon +"@2x.png"
  res.write("<p>The weather description is "+description +"<p>");
    res.write("<h1>the temp in "+ query+" is "+temp+" degree celsius.</h1>");
   res.write("<img src="+ imageURL+">");
    res.send()
  })
  })
})

app.listen(3007, function(){
  console.log("server running on port 3007");
})