const express = require("express");
const router = express.Router();

const personalInfoC = require("../controllers/personalInformation-controller.js");
const travelDetailsC = require("../controllers/travelDetail-controller.js");
const accommodationC = require("../controllers/accomodation-controller.js");

router.post("/personalInfo",personalInfoC.createPersonalInformation);
router.get("/personalInfos",personalInfoC.getAllPersonalInformation);
router.get("/personalInfo/:id",personalInfoC.getPersonalInformationbyId);
router.put("/personalInfo/:id",personalInfoC.updatePersonalInformation);
router.delete("/personalInfo/:id",personalInfoC.deletePersonalInformation);

router.post("/travelDetail",travelDetailsC.createTravelDetail);
router.get("/travelDetails",travelDetailsC.getAllTravelDetail);
router.get("/travelDetail/:id",travelDetailsC.getTravelDetailById);
router.put("/travelDetail/:id",travelDetailsC.updateTravelDetail);
router.delete("/travelDetail/:id",travelDetailsC.deleteTravelDetail);

router.post("/accommodation", accommodationC.createAccomodation);
router.get("/accommodations",accommodationC.getAllAccomodation);
router.get("/accommodation/:id",accommodationC.getAccomodationById);
router.put("/accommodation/:id",accommodationC.updateAccomodation);
router.delete("/accommodation/:id",accommodationC.deleteAccomodation);

module.exports = router;
