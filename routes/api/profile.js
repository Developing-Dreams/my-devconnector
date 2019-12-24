const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route GET api/profile/me
//@desc  Get current user profile
//@access Public
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json('There is no profile for this user');
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error!');
    }
});
//@route GET api/profile/me
//@desc  Get current user profile
//@access Public
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;
        profileFields.user = req.user.id;
        if (handle) profileFields.handle = handle;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        console.log(skills);
        if (skills) {
            profileFields.skills = skills;
            //.map(item => item.trim());
        }
       //skills.split(',');

        console.log(profileFields.skills);
        res.send('Hello');

    } catch (err) {
        // console.error(err.message);
        // return res.status(500).send('Server error!');
    }
});
module.exports = router;