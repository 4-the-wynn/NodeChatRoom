// first we need to actually import the packaged we downloads
//using the require keyboard

var express=require("express")
var app= express();
var http=require("http").Server(app);
var io=require("socket.io")(http);//io is going to be how we communicate between clicents

//you can think of io as being the server, passing data betwee two/more clients


//app.get(path, callback)
app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html")
});


//Use express to serve up static files (css, js,other htmls besides index) so that our page can be pretty 
app.use(express.static(__dirname+"/public"));

//handle socket events here
io.on('connection',function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message',msg);
	});
})


//tell the server wheere it should run on the host


http.listen(process.env.PORT || 3000, function(){
	console.log("listening on*:3000")
});