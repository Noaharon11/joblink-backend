const express = require("express");
const router = express.Router();

//GET /api/jobs
//retrieve all jobs
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "Jobs list (placeholder)",
  });
});

module.exports = router;
