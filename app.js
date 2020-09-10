const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("https://github.com/manasrajowar66/newsletter-signup",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("https://github.com/manasrajowar66/newsletter-signup",function(req,res){
  var fname=req.body.firstName;
  var lname=req.body.lastName;
  var email=req.body.email;
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };
  var jsondata=JSON.stringify(data);
  var url="https://us17.api.mailchimp.com/3.0/lists/521f6032ea/";
  var options={
    method:"POST",
    auth:"Manas1:3e2f49af914dff8d4d76d0a3a07c95bb-us17"
  };
  var request=https.request(url,options,function(responce){
      if(responce.statusCode===200)
      res.sendFile(__dirname+"/success.html");
      else
      res.sendFile(__dirname+"/failure.html");
  });
  request.write(jsondata);
  request.end();
});


app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("server running at port no 3000");
});


// api key
// 541248d71cecc3652aa7e59ebcf2c7df-us17

// list id
// 521f6032ea
