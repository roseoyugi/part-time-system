const express = require("express");
const { users, accounts } = require("../models");
const bcrypt = require("bcrypt");
const sendEmail = require("../utilities/sendEmail");
const { websiteUrl } = require("../utilities/Constants");

const router = express.Router();

//change password

router.patch("/forgot-password", async (req, res) => {
  try {
    const { email, randomString } = req.body;

    console.log(req.body);

    const user = await users.findOne({ where: { email: email } });

    if (!user) {
      return res.json({ error: { message: "User does not exist!" } });
    }

    const hash = await bcrypt.hash(randomString, 10);
    user.update({ password: hash, updatedPassword: false });

    await sendEmail(
      user.name,
      email,
      "Reset of Password",
      `Use this one time password to log in to your account
       and immediately change to your preferred new password
        "${randomString}" `
    );

    res.json({ success: { message: "One time password sent successfully!" } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal server error!" } });
  }
});

router.patch("/change-password", async (req, res) => {
  try {
    const data = req.body;

    const hash = await bcrypt.hash(data.newPassword, 10);

    await users.update(
      { password: hash, updatedPassword: true },
      { where: { id: data.uid } }
    );

    res.json({ success: { message: "Password changed successfully!" } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal server error!" } });
  }
});

// Create a user Account if it does not exist
router.post("/create-account", async (req, res) => {
  try {
    const user = req.body;

    const userExists = await users.findOne({ where: { email: user.email } });

    if (userExists) {
      res.json({
        error: {
          message: `User by email '${userExists.email}' already exists!'`,
        },
      });
      return;
    }

    const hash = await bcrypt.hash(user.password, 10);

    const plainTextPassWord = user.password;

    user.password = hash;

    const result = await users.create(user);
    await accounts.create({ user_id: result.id });

    await sendEmail(
      user.name,
      user.email,
      "Creation of your Claim Portal Account",
      `Your claim portal Account has successfully been created,
       log in to ${websiteUrl} using password "${plainTextPassWord}",
        and please change your password once logged in.`
    );

    res.json({
      success: { message: `Account for ${result.name} Created successfully!` },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal server error!" } });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = req.body;

    const userExists = await users.findOne({ where: { email: user.email } });

    if (!userExists) {
      res.json({
        error: {
          message: `User by email '${user.email}' does not exists!'`,
        },
      });
      return;
    }

    const passwordsMatch = await bcrypt.compare(
      user.password,
      userExists.password
    );

    if (!passwordsMatch) {
      res.json({ error: { message: "Wrong username or password" } });
      return;
    }

    res.json({
      success: {
        message: `Logged in successfully as ${userExists.email}`,
        data: userExists,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal server error!" } });
  }
});

module.exports = router;
