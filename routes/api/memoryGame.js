const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../model/Profile');
// const ProfileRound2 = require('../../model/ProfileRound2');
// const ProfileRound3 = require('../../model/ProfileRound3');

// @route   Post api/profile
// @desc    Create a Profile
// @access  Public
router.post('/', auth, async (req, res) => {
  try {
    const createdProfile = new Profile({ ...req.body, creator: req.user.id });
    // const createdProfile = new ProfileRound2({
    //   ...req.body,
    //   creator: req.user.id,
    // });
    // const createdProfile = new ProfileRound3({
    //   ...req.body,
    //   creator: req.user.id,
    // });
    await createdProfile.save();
    res
      .status(201)
      .json({ status: 'Success', data: { profile: createdProfile } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   Get api/profile
// @desc    Get all profile
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ score: -1 });
    // const profiles = await ProfileRound2.find().sort({ score: -1 });
    // const profiles = await ProfileRound3.find().sort({ score: -1 });
    res.status(200).json({
      status: 'Success',
      count: profiles.length,
      data: profiles,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   Post api/profile/id
// @desc    Update a Profile
// @access  Public
router.post('/:uid', async (req, res) => {
  try {
    profile = await Profile.findOneAndUpdate(
      { creator: req.params.uid },
      { $set: { ...req.body } },
      { new: true }
    );
    // profile = await ProfileRound2.findOneAndUpdate(
    //   { creator: req.params.uid },
    //   { $set: { ...req.body } },
    //   { new: true }
    // );
    // profile = await ProfileRound3.findOneAndUpdate(
    //   { creator: req.params.uid },
    //   { $set: { ...req.body } },
    //   { new: true }
    // );
    res.status(200).json({
      status: 'Success',
      data: {
        profile,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
