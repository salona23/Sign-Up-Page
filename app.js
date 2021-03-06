const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email

  const data = {
    members:[
    {
      email_address:email ,
      status:"subscribed" ,
      merge_fields:{
          FNAME:firstname ,
          LNAME:lastname
        }
      }
    ]
  }
  const jsondata = JSON.stringify(data);

  url ="https://usx.api.mailchimp.com/3.0/lists/152b98kaf7"
  options = {
    method:"POST",
    auth:"salona:ca34ba5e311a8b8db165bc821be6-usx"
  }

const  request = https.request(url,options,function(responce){
  if(responce.statusCode===200){
    res.sendFile(__dirname + "/success.html")
  }else{
    res.sendFile(__dirname + "/Failure.html")
  }
responce.on("data",function(data){
  console.log(JSON.parse(data))
})
  })
request.write(jsondata);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000  ,function(){
console.log("server is running ")
});
