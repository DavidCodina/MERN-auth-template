function checkAuthenticated(req, res, next){
  if (req.isAuthenticated()){ return next(); }
  return res.status(200).json({ 
    success: false, 
    message: "A user must be logged in when accessing this route.",
    data: null
  });
}


function checkNotAuthenticated(req, res, next){
  if (!req.isAuthenticated()){ return next(); }
  return res.status(200).json({ 
    success: false, 
    message: "A user must NOT be logged when accessing this route.",
    data: null
  });
}


module.exports = { checkAuthenticated, checkNotAuthenticated };
