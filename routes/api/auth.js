const express = require('express');
const router = express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@route GET api/auth
//@desc  Test Route
//@access Public
router.get('/',auth,async (req, res) => {
    try {
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
         res.status(500).send('Server error');
    }
});

//@route    POST api/auth
//@desc     Authenticate users and get token
//@access   Public
router.post('/', [
check('email', 'please include valid email')
    .isEmail(),
check('password', 'Password is required')
    .exists()

], async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("error");
        return res.status(400).json({ errors: errors.array() });
    }
    const {  email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials!' }] });
        }       
       const isMatch= await bcrypt.compare(password,user.password);
       if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials!' }] });
    }  
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token)=>{
                if(err)throw err;
               return res.json({token});
            }

        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    //see if user exists
    //get users gravatar
    //encrypt password
    //return jsonwebtoken
   // res.send('Users route started');
});

module.exports = router;