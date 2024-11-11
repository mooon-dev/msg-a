const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/usersRoutes')
const messageRoutes = require('./routes/messageRoutes')
const User = mongoose.model("users");
const socket = require('socket.io')
const path = require('path')
// const multer = require('multer')
// const path = require('path')
// const fs = require('fs')
// const bodyParser = require("body-parser")

const app = express();
require('dotenv').config();




app.use(cors());
app.use(express.json());
// app.use('/Images', express.static(path.join(__dirname, 'public', 'Images')));

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)


const corsOptions = {
    origin: 'https://kona-a8bn.onrender.com',
    methods: 'POST',
    allowedHeaders: 'Content-Type',
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


// ---------------------------------------------DEPLOYMENT---------------------------------------




// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/client/build")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//     })
// } else {
//     app.get("/", (req, res) => {
//         res.send("Welcome to the messaging app!");
//       });
// }




if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '..', 'client', 'build');

    app.use(express.static(buildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Welcome to the messaging app!');
    });
}





//

// ---------------------------------------------DEPLOYMENT---------------------------------------



// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('MongoDB is successfully connected');
// }).catch((err) => {
//     console.error('MongoDB connection error:', err);
// });



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
        })
    } catch (err) {
        console.log(err)
    }
}

connectDB();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/Images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage
// })

// app.post('/upload', upload.single('file'), (req,res) => {
//     User.create({avatarImage: req.file.filename})
//     .then(result => res.json(result))
//     .catch(err => console.log(err))
// })

// app.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//       const userId = req.body.userId; // Get the user ID from the request body
  
//       // Check if the user exists
//       const user = await User.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Update the user with the file information
//       user.avatarImage = req.file.filename;
//       await user.save();
  
//       res.json({ message: 'File uploaded successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  


  

mongoose.connection.once('open', () => {
    console.log('Connected  to MongoDB')
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "https://kona-a8bn.onrender.com",
        credentials: true
    },
})

global.onlineUsers =  new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    // socket.on("send-msg", (data) => {
    //     const sendUserSocket = onlineUsers.get(data.to);
    //     if (sendUserSocket) {
    //         socket.to(sendUserSocket).emit("msg-receive", data.msg)
    //     }
    // })

    // socket.on("send-msg", (data) => {
    //     const sendUserSocket = onlineUsers.get(data.to)
    // })

    socket.on("send-msg", (data) => {
        console.log("Received send-msg:", data);
        const sendUserSocket = onlineUsers.get(data.to);
    
        if (sendUserSocket) {
            console.log("Sending msg-receive to:", sendUserSocket);
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    
        // Additional logic if needed for the second part of your code
        // const sendUserSocket = onlineUsers.get(data.to);
    });
    

})

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
////////////////////////////////////////////////////
///////////////////////////////////////////////////
//////////////////////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////////////////////////////////////
//////////////////////////////////////////////
/////////////////////////////////////////////
////////////////////////////////////////////
///////////////////////////////////////////
//////////////////////////////////////////
/////////////////////////////////////////
////////////////////////////////////////
///////////////////////////////////////
//////////////////////////////////////
/////////////////////////////////////
////////////////////////////////////
///////////////////////////////////
//////////////////////////////////
/////////////////////////////////
////////////////////////////////
///////////////////////////////
//////////////////////////////
/////////////////////////////
////////////////////////////
///////////////////////////
//////////////////////////
/////////////////////////
////////////////////////
///////////////////////
//////////////////////
/////////////////////
////////////////////
///////////////////
//////////////////
/////////////////
////////////////
///////////////
//////////////
/////////////
////////////
///////////
//////////
/////////
////////
///////
//////
/////
////
///
//














