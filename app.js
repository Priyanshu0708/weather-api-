const express = require("express");
const https = require("https");
const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const keyid = "159a23bcee97b11efc61041d2aadfb26";
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+keyid+"&units=metric";

    https.get(url,function(response){
        response.on("data",function(data){
          const  weatherdata = JSON.parse(data);
          const temperature = weatherdata.main.temp;
          const weatherdescription = weatherdata.weather[0].description
          const icon = weatherdata.weather[0].icon;
          const imageurl =  "https://openweathermap.org/img/wn/" + icon +"@2x.png";
          res.send("<h1>The weather is currently " + weatherdescription + "</h1>" +
                   "<h2>The temperature in "+query+" is " + temperature + " degree Celsius</h2> " + "<img src =" +imageurl + "></img>");
                                         
        })
    })
})
app.listen(3000,function(){
    console.log("server is started on port:3000");
})