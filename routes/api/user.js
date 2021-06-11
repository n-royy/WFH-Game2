const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../model/User');

// @route   Post api/user
// @desc    Register User
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('unit', 'Unit is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, unit } = req.body;

    try {
      let user = await User.findOne({ name });
      if (user) {
        return res
          .status(404)
          .json({ error: [{ msg: 'User already exists' }] });
      }
      user = new User({
        name,
        unit,
      });
      await user.save();

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
