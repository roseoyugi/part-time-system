const express = require("express");
const upload = require("../middleware/upload");
const { claims, accounts } = require("../models");

const router = express.Router();

// get all claims where department and registrar status is accepted
router.get("/finance", async (req, res) => {
  try {
    const claimsList = await claims.findAll({
      where: {
        department_status: "accepted",
        registrar_status: "accepted",
      },
    });

    res.json({ success: { data: claimsList } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

// get all claims where department status is accepted
// and registrar status is pending
router.get("/registrar", async (req, res) => {
  try {
    const claimsList = await claims.findAll({
      where: {
        department_status: "accepted",
        registrar_status: "pending",
      },
    });

    res.json({ success: { data: claimsList } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

router.get("/claimant/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;

    const claimsList = await claims.findAll({
      where: {
        claimant_id: uid,
      },
    });

    res.json({ success: { data: claimsList } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

// get all claims in this chairperson's department which are pending
router.get("/department/:dn", async (req, res) => {
  try {
    const dn = req.params.dn;
    console.log(dn);
    const claimsList = await claims.findAll({
      where: { department: dn, department_status: "pending" },
    });

    res.json({ success: { data: claimsList } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

// get all claims in this chairperson's department
router.get("/department-all/:dn", async (req, res) => {
  try {
    const dn = req.params.dn;
    console.log(dn);
    const claimsList = await claims.findAll({
      where: { department: dn },
    });

    res.json({ success: { data: claimsList } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

// get all claims
router.get("/", async (req, res) => {
  try {
    const dn = req.params.dn;
    console.log(dn);
    const claimsList = await claims.findAll();

    res.json({ success: { data: claimsList } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

//update claim status
router.patch("/update-status", async (req, res) => {
  try {
    const request = req.body;

    if (request.stage === "department") {
      await claims.update(
        { department_status: request.status, comment: request.comment },
        { where: { id: request.cid } }
      );

      res.json({ success: { message: "Claim status updated successfully!" } });
      return;
    }

    if (request.stage === "registrar") {
      await claims.update(
        { registrar_status: request.status, comment: request.comment },
        { where: { id: request.cid } }
      );

      res.json({
        success: { message: "Claim status updated successfully!" },
      });
      return;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

//update finance claim status and update compensations
router.patch("/update-status/finance", async (req, res) => {
  try {
    const request = req.body;
    const claimId = request.cid;
    const claimStatus = request.status;

    let responseMessage;
    if (claimStatus === "rejected") {
      responseMessage = "Claim status updated successfully!";
    } else {
      const account = await accounts.findByPk(request.user_id);
      await account.increment("balance", { by: request.compensation });
      responseMessage = "Compensation allocated successfully!";
    }

    await claims.update(
      { finance_status: claimStatus },
      { where: { id: claimId } }
    );

    res.json({ success: { message: responseMessage } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

// submit/create a claim
router.post("/", async (req, res) => {
  try {
    const claim = req.body;
    await claims.create(claim);
    res.json({ success: { message: "Claim submitted successfully!" } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

// upload file and return the url
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    res.json({ success: { data: filePath } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

module.exports = router;
