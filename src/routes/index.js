const express = require("express");
const router = express.Router();

const personalInfoC = require("../controllers/personalInformation-controller.js");
const travelDetailsC = require("../controllers/travelDetail-controller.js");

router.post("/personalInfo",personalInfoC.createPersonalInformation);
router.get("/personalInfos",personalInfoC.getAllPersonalInformation);
router.get("/personalInfo/:id",personalInfoC.getPersonalInformationbyId);
router.put("/personalInfo/:id",personalInfoC.updatePersonalInformation);
router.delete("/personalInfo/:id",personalInfoC.deletePersonalInformation);

router.post("/travelDetail",travelDetailsC.createTravelDetail);

module.exports = router;
