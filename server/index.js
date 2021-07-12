const path                   = require('path');   
const express                = require('express');
const cors                   = require("cors")
const cookieParser           = require("cookie-parser");     
const session                = require("express-session");  
const authRoutes             = require('./routes/auth-routes'); 
const passportSetup          = require('./config/passport-setup');
const connectDB              = require('./config/db'); 
const passport               = require('passport');
const { checkAuthenticated } = require('./middleware/authMiddleware'); 
const PORT                   = process.env.PORT || 5000;
const app                    = express();


/* =============================================================================
                             Database Connection
============================================================================= */


connectDB();


/* =============================================================================
                            Global Middleware
============================================================================= */


// Added this in just in case. It's primarily useful for when we implement a local strategy.
app.use(express.json()); // bodyParser is deprecated
app.use(express.urlencoded({ extended: false })); // bodyParser is deprecated


app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.use(
  session({ 
    secret: "YOUR_SESSION_SECRET",     
    resave: false,           
    saveUninitialized: false 
  })
);


app.use(cookieParser("YOUR_SESSION_SECRET")); 


app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoutes);


/* =============================================================================
                                 Routes
============================================================================= */


app.get("/user", checkAuthenticated, (req, res) => {
  if (req.user){
    return res.status(200).json({ 
      success: true, 
      message: "User data sent.",
      data: { userId: req.user._id }
    }); 
  }


  // Since we have the checkAuthenticated middleware, we don't really need this.
  // Essentially, it's doing the same thing.
  if (!req.user){
    return res.status(200).json({ 
      success: false, 
      message: "A user must be logged in to access user data.",
      data: null
    });
  } 
});


app.get("/private_data", checkAuthenticated, (req, res) => {
  return res.status(200).json({ 
    success: true, 
    message: "Here's some private data!",
    data:    { secretMessage: "The owl flies at midnight!" }
  });
});


/* =============================================================================

============================================================================= */


app.listen(PORT, () => {
  console.log(`App now listening for requests on port ${PORT}.`);
});
