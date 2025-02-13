const express = require("express");
const router = express.Router();

const personalInfoC = require("../controllers/personalInformation-controller.js");
const travelDetailsC = require("../controllers/travelDetail-controller.js");
const accommodationC = require("../controllers/accomodation-controller.js");
const activityC = require("../controllers/activityInterest-controller.js");
const transportationC = require("../controllers/transportasion-controller.js");


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

router.post("/accommodation-prefference", accommodationC.createAccomodation);
router.get("/accommodation-prefferences",accommodationC.getAllAccomodation);
router.get("/accommodation-prefference/:id",accommodationC.getAccomodationById);
router.put("/accommodation-prefference/:id",accommodationC.updateAccomodation);
router.delete("/accommodation-prefference/:id",accommodationC.deleteAccomodation);

router.post("/activity-interest", activityC.createActivity);
router.get("/activity-interests",activityC.getAllActivities);
router.get("/activity-interest/:id",activityC.getActivityById);
router.put("/activity-interest/:id",activityC.updateActivity);
router.delete("/activity-interest/:id",activityC.deleteActivity);

router.post("/transportation-prefference", transportationC.createTransportation);
router.get("/transportation-prefferences", transportationC.getAllTransportation);
router.get("/transportation-prefference/:id",transportationC.getTransportationById);
router.put("/transportation-prefference/:id",transportationC.updateTransportation);
router.delete("/transportation-prefference/:id",transportationC.deleteTransportation);

module.exports = router;