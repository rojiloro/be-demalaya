const Model = require("../models/index.js");
const TravelDetail = Model.TravelDetail;

const createTravelDetail = async (req, res) => {
    try {
        const {
            PersonalID,
            PreferredDestinations,
            PreferredStartDate,
            FlexibleDates,
            TripDurationDays,
            NumberOfParticipants,
            Adults,
            Children,
            ChildrenAges,
          } = req.body;
      
          
          if (!PersonalID) {
            return res.status(400).send("PersonalID is required!");
          }
          if (!PreferredDestinations) {
            return res.status(400).send("PersonalID is required!");
          }
          if (!PreferredStartDate) {
            return res.status(400).send("Preferd Start Date is required!");
          }
          if (!PreferredStartDate) {
            return res.status(400).send("Preferd Start Date is required!");
          }
          if (!PreferredStartDate) {
            return res.status(400).send("Preferd Start Date is required!");
          }
      
          // Buat entri baru di TravelDetails
          const travelDetails = await TravelDetails.create({
            PersonalID,
            PreferredDestinations,
            PreferredStartDate,
            FlexibleDates,
            TripDurationDays,
            NumberOfParticipants,
            Adults,
            Children,
            ChildrenAges,
          });
      
          // Kirimkan response sukses
          res.status(201).send({
            message: "Travel details created successfully.",
            data: travelDetails,
          });
        } catch (error) {
          // Tangani error
          res.status(500).send({
            message: error.message || "An error occurred while creating travel details.",
          });
        }
}

module.exports = {
    createTravelDetail
}