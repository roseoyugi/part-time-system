const express = require("express");
const router = express.Router();
const { assigned_units, units } = require("../models");
const { Op } = require("sequelize");

//get units with this user id
router.get("/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const assignedUnits = await assigned_units.findAll({
      where: {
        user_id: uid,
      },
    });

    const unitIDList = assignedUnits.map((unit) => unit.unit_id);

    const userUnits = await units.findAll({
      where: {
        id: { [Op.in]: unitIDList },
      },
    });

    res.json({ success: { data: userUnits } });
  } catch (error) {
    console.log(error.message);
    res.json("Internal Server Error");
  }
});

module.exports = router;
