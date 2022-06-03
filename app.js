const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){

  const data={
    members:[
      { email_address: req.body.email,
        status: "subscribed",
        merge_fields:{
          FNAME: req.body.fname,
          LNAME: req.body.lname
        }
      }
    ]
  };
  const jsonData= JSON.stringify(data);

  const url ="https://us18.api.mailchimp.com/3.0/lists/d0634fefcd"
  const options={
    method: 'POST',
    auth: 'dinesh:d28e46d4d37b920f01033824019ffc96-us18d'
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    });

  });

  request.write(jsonData);
  request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server Started");
});


//list id
//d0634fefcd

//api key
//d28e46d4d37b920f01033824019ffc96-us18

//https://us18.api.mailchimp.com/3.0/
