const express = require("express");
const { units, assigned_units } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

//create a unit
router.post("/", async (req, res) => {
  try {
    const unit = req.body;
    const result = await units.create(unit);

    res.json({
      success: { message: `Successfully created unit: ${result.unit_code}` },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

//get all units that are not assigned
router.get("/not-assigned", async (req, res) => {
  try {
    const unitsList = await units.findAll({ where: { assigned: false } });

    res.json({
      success: { data: unitsList },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

//get unit with this id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const unit = await units.findByPk(id);
    res.json({ success: { data: unit } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

//get all units assigned to this user/lecturer id
router.get("/lecturer/:lid", async (req, res) => {
  try {
    const lid = req.params.lid;
    const assignedUnits = await assigned_units.findAll({
      where: { user_id: lid },
    });

    // Extracting unit IDs from assignedUnits
    const unitIdList = assignedUnits.map((unit) => unit.unit_id);

    const unitsList = await units.findAll({
      where: { id: { [Op.in]: unitIdList } },
    });

    // Send unitsList as a response
    res.json({ success: { data: unitsList } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

//assign unit
router.post("/assign", async (req, res) => {
  try {
    const { user_id, unitsList } = req.body;

    for (let i = 0; i < unitsList.length; i++) {
      console.log(unitsList);
      await assigned_units.create({
        unit_id: unitsList[i].id,
        user_id: user_id,
      });

      await units.update(
        { assigned: true },
        {
          where: {
            id: unitsList[i].id,
          },
        }
      );
    }

    res.json({
      success: { message: "Unit(s) Assigned successfully!" },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
