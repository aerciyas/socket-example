var app = require('http').createServer()
var fs = require('fs')

app.listen(3000)

function SpsServer() {
    this.io = require('socket.io')(app)

    this.io.sockets.on("connection", function(socket) {
        console.log("Connection was established on the server..");
        socket.on("playerMove", function (x, y) {
            console.log("x: " + x)
            console.log("y: " + y)
        })
        console.log("Getting binaryPicture..");
        getBinaryPicture(socket)
        console.log("The thread passed the getBinaryPicture line...")
    })

}

// Start the SPS server
new SpsServer()


function getBinaryPicture(socket)
{
    console.log("Entered getBinaryPicture()..")
    var image_origial = "DunnBrosLemonPoppyMuffin.jpg"
    // This tells node to load the file into a Buffer 'original_data' because you
    // have not specified an encoding for the returned values. If you provided an
    // encoding, then original_data would be a string with that encoding.
    fs.readFile(image_origial, function(err, original_data){
        // This tells node to create a new buffer from the old buffer, which means
        // it will iterate over original_data copying the bytes one at a time. But
        // they will be identical buffers. It will ignore the 'binary' argument
        // since the object you are passing isn't a string.
        // Then it encodes the content of that Buffer to base64, which is fine.
        console.log("Creating buffer named base64Image..");
        var base64Image = new Buffer(original_data, 'binary').toString('base64');
        console.log("About to emit base64Image..")
        socket.emit("name", base64Image)
        console.log("Emitted base64Image!")

    });
}
