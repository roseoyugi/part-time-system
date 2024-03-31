const express = require("express");
const { accounts } = require("../models");

const router = express.Router();

// get an account with this id
router.get("/account/:uid", async (req, res) => {
  console.log("hello");
  try {
    const uid = req.params.uid;
    console.log(uid);
    const account = await accounts.findByPk(uid);
    res.json({ success: { data: account } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

// get an account with this id
router.patch("/withdraw", async (req, res) => {
  try {
    const request = req.body;
    const account = await accounts.findByPk(request.aid);
    const updatedAccount = await account.decrement("balance", {
      by: request.withdrawalAmount,
    });

    const data = res.json({
      success: {
        message: "Withdrawal Successful!",
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
