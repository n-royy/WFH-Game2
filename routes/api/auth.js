const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../model/User');
const Profile = require('../../model/Profile');
// const ProfileRound2 = require('../../model/ProfileRound2');
// const ProfileRound3 = require('../../model/ProfileRound3');

// @route   Get api/auth
// @desc    Get user
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   Post api/auth
// @desc    Authenticate User and get token
// @access  Public
router.post(
  '/',
  [check('name', 'Name is required').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { name } = req.body;
    try {
      let user = await Profile.findOne({ username: name });
      // let user = await ProfileRound2.findOne({ username: name });
      // let user = await ProfileRound3.findOne({ username: name });
      if (user) {
        return res.status(404).json({ error: [{ msg: 'User have contest' }] });
      }
      user = await User.findOne({ name });
      if (!user) {
        return res
          .status(400)
          .json({ erros: [{ msg: 'Invalid Credentials' }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, payload });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
