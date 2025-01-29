const { where } = require("sequelize");
const Model = require("../models/index.js");
const TravelDetail = Model.TravelDetails;
const PersonalInfo = Model.PersonalInformation;

const createTravelDetail = async (req, res) => {
    try {
        const {
            travelDetailID,
            personalID,
            preferredDestinations,
            preferredStartDate,
            flexibleDates,
            tripDurationDays,
            numberOfParticipants,
            adults,
            children,
            childrenAges
          } = req.body;
      
          
          if (!travelDetailID) {
            return res.status(400).send("Travel Detail ID is required!");
          }
          if (!personalID) {
            return res.status(400).send("PersonalID is required!");
          }
          if (!preferredDestinations) {
            return res.status(400).send("Preffered Destination is required!");
          }
          if (!preferredStartDate) {
            return res.status(400).send("Prefered Start Date is required!");
          }
          if (!flexibleDates) {
            return res.status(400).send("Flexible Date is required!");
          }
          if (!tripDurationDays) {
            return res.status(400).send("Trip Duration Days is required!");
          }
          if (!numberOfParticipants) {
            return res.status(400).send("Number of Participants is required!");
          }
          if (!adults) {
            return res.status(400).send("Adults is required!");
          }
          if (!children) {
            return res.status(400).send("Children is required!");
          }
          if (!childrenAges) {
            return res.status(400).send("Children Ages is required!");
          }
      
          
          
          
          // Buat entri baru di TravelDetails
          const travelDetails = await TravelDetail.create({
            TravelDetailsID : travelDetailID,
            PersonalID : personalID,
            PreferredDestinations : preferredDestinations,
            PreferredStartDate : preferredStartDate,
            FlexibleDates : flexibleDates,
            TripDurationDays : tripDurationDays,
            NumberOfParticipants : numberOfParticipants,
            Adults : adults,
            Children : children,
            ChildrenAges : childrenAges,
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

const getAllTravelDetail = async (req, res) => {
  try {
    const allTravelDetail = await TravelDetail.findAll();
    
    if (allTravelDetail.length === 0) {
      return res.status(404).json({ message: 'No Travel Details found' });
    }

    const personalIDs = allTravelDetail.map(detail => detail.PersonalID);
    const personalInfoID = await PersonalInfo.findAll({
      where:{ id : personalIDs }
    });

    const travelDetailsWithPersonal = allTravelDetail.map(detail => {
      const personalInfo = personalInfoID.find(personal => personal.id === detail.PersonalID);
      return {
        ...detail.dataValues, 
        PersonalID: personalInfo ? [personalInfo.dataValues] : [], 
      };
    });
    
    return res.status(200).json(travelDetailsWithPersonal);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const getTravelDetailById = async (req, res) => {
  try {
        
    const {id} = req.params;

    const travelDetail = await TravelDetail.findByPk(id);
    
    if (!travelDetail) {
        return res.status(404).json({
          message: `Travel Detail with ID ${id} not found`,
        });
    }

    const personalInfo = await PersonalInfo.findByPk(travelDetail.PersonalID);
    
    const travelDetailsWithPersonal = {
      ...travelDetail.dataValues, // Data dari TravelDetail
      PersonalID: personalInfo ? [personalInfo.dataValues] : [], // Data dari PersonalInfo
    };
    
      
    res.status(200).json({
        message: 'Travel Detail found',
        data: travelDetailsWithPersonal,
    });

} catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
}
}


const updateTravelDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      personalID,
      preferredDestinations,
      preferredStartDate,
      flexibleDates,
      tripDurationDays,
      numberOfParticipants,
      adults,
      children,
      childrenAges,
    } = req.body;

    console.log('ID yang diterima:', id);
    console.log('Data yang diterima:', req.body);

    const travelDetail = await TravelDetail.findByPk(id);

    if (!travelDetail) {
      return res.status(404).json({
        message: `Travel Detail dengan ID ${id} tidak ditemukan`,
      });
    }

    await travelDetail.update({
      PersonalID : personalID,
      PreferredDestinations: preferredDestinations,
      PrefferedStartDate : preferredStartDate,
      FlexibleDates : flexibleDates,
      TripDurationDays : tripDurationDays,
      NumberOfParticipants : numberOfParticipants,
      Adults : adults,
      Children : children,
      ChildrenAges : childrenAges,
    });

    await travelDetail.save();

    const personalInfo = await PersonalInfo.findByPk(travelDetail.PersonalID);

    const travelDetailsWithPersonal = {
      ...travelDetail.get(), // Data dari TravelDetail
      PersonalID: personalInfo ? [personalInfo.dataValues] : [], // Data dari PersonalInfo
    };

    res.status(200).json({
      message: `Travel Detail dengan ID ${id} berhasil diperbarui`,
      data: travelDetailsWithPersonal,
    });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const deleteTravelDetail = async (req, res) => {
    try {
        const {id} = req.params;

        const travelDetail = await TravelDetail.findByPk(id);
        
        if (!travelDetail) {
            return res.status(404).json({
              message: `Travel Detail dengan ID ${id} tidak ditemukan`,
            });
        }

        await travelDetail.destroy();

        res.status(200).json({
            message : `Travel Detail dengan ID ${id} berhasil dihapus`
        })

    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}

module.exports = {
    createTravelDetail,
    getAllTravelDetail,
    getTravelDetailById,
    updateTravelDetail,
    deleteTravelDetail
}