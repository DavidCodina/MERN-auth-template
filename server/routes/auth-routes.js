const router                 = require('express').Router();
const passport               = require('passport');
const { checkAuthenticated } = require('../middleware/authMiddleware');


/* =======================================================================

======================================================================= */


router.get('/amazon', passport.authenticate('amazon', {
  scope: ["profile"]
}));               


router.get('/amazon/callback', passport.authenticate('amazon'), (req, res) => {
  res.redirect("http://localhost:3000/profile");
});


/* =======================================================================

======================================================================= */


router.get('/github', passport.authenticate('github'));               


router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  res.redirect("http://localhost:3000/profile");
});


/* =======================================================================

======================================================================= */


router.get('/google', passport.authenticate('google', { 
  scope: ['profile', "email"] 
}));                      


router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/profile');
});
 

/* =======================================================================

======================================================================= */


router.get('/logout', checkAuthenticated,  (req, res) => {
  console.log('Logging out...');
  req.logout();
  res.send({ message: 'The user is logged out.' });
});


module.exports = router;