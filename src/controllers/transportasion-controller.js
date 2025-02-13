const Model = require("../models/index.js");
const Transportation = Model.TransportationPreference;
const TravelDetails = Model.TravelDetails;

const createTransportation = async (req, res) => {
    try {
        const {
            travelDetailsID,
            internationalFlightRequired,
            departureCity,
            domesticFlightRequired,
            prefferedTransportType
        } = req.body;

        const validPrefferedTransportType = ['Car', 'Train', 'Bus', 'Flight', 'Ship','Private Car', 'Boat'];
        if (!validPrefferedTransportType.includes(prefferedTransportType)) {
        return res.status(400).json({
             error: `Invalid Preffered Transport Type. Valid values are: ${validActivityLevel.join(', ')}`,
            });
        }

        const newTransportation = await Transportation.create({
            TravelDetailsID : travelDetailsID,
            InternationalFlightRequired : internationalFlightRequired,
            DepartureCity : departureCity,
            DomesticFlightRequired : domesticFlightRequired,
            PreferredTransportType : prefferedTransportType
        });

        return res.status(201).json({
            message : 'Transportation Prefference created Successfully!',
            data : newTransportation
        })

    } catch (error) {
        console.error('Error: ',error);
        res.status(500).send({
            message : error.message || "An error occured while creating transportation"
        });       
    }
}

const getAllTransportation = async (req, res) => {
    try {
        const allTransportation = await Transportation.findAll();
      
        if (allTransportation.length === 0) {
            return res.status(404).json({ message: 'No Transportation Prefference found!' });
        }

        const travelIDs = allTransportation.map(detail => detail.TravelDetailsID);

        
        const travelDetails = await TravelDetails.findAll({
            where: { id: travelIDs },
        });

        const transportationWithTravel = allTransportation.map(detail => {
            const travelDetail = travelDetails.find(travel => travel.id === detail.TravelDetailsID);
            return {
                ...detail.dataValues,
                TravelDetailsID: travelDetail ? [travelDetail.dataValues] : [],
            };
        });

        return res.status(200).json(transportationWithTravel);
    } catch (error) {
        console.error('Error: ',error);
        res.status(500).send({
            message : error.message
        });
    }
}

const getTransportationById = async (req, res) => {
    try {
        const {id} = req.params;

        const transportation = await Transportation.findByPk(id);

        if (!transportation) {
            return res.status(404).json({
            message: `Transportation Prefference with ID ${id} not found`,
            });
        }

        const travelDetail = await TravelDetails.findByPk(transportation.TravelDetailsID);
        
        const transportationWithTravelDetail = {
        ...transportation.dataValues, // Data dari TravelDetail
        TravelDetailsID: travelDetail ? [travelDetail.dataValues] : [], // Data dari PersonalInfo
        };

        return res.status(200).json({
            message : 'Transportation Prefference found',
            data : transportationWithTravelDetail
        });
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({
            message:'Internal Server error',
            error: error.message 
        })
    }
}

const updateTransportation = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            travelDetailsID,
            internationalFlightRequired,
            departureCity,
            domesticFlightRequired,
            prefferedTransportType
        } = req.body;

        if (prefferedTransportType !== undefined) {
            const validPrefferedTransportType = ['Car', 'Train', 'Bus', 'Flight', 'Ship','Private Car', 'Boat'];
            if (!validPrefferedTransportType.includes(prefferedTransportType)) {
            return res.status(400).json({
                 error: `Invalid Preffered Transport Type. Valid values are: ${validActivityLevel.join(', ')}`,
                });
            }
        }

        const transportationPrefference = await Transportation.findByPk(id);

        if (!transportationPrefference) {
            return res.status(404).json({
              message: `Transportation Prefference dengan ID ${id} tidak ditemukan`,
            });
        };

        await transportationPrefference.update({
            TravelDetailsID : travelDetailsID,
            InternationalFlightRequired : internationalFlightRequired,
            DepartureCity : departureCity,
            DomesticFlightRequired : domesticFlightRequired,
            PreferredTransportType : prefferedTransportType
        });

        const travelDetail = await TravelDetails.findByPk(transportationPrefference.TravelDetailsID);

        const transportationWithTravelDetail = {
            ...transportationPrefference.get(), // Data dari TravelDetail
            TravelDetailsID: travelDetail ? [travelDetail.dataValues] : [], // Data dari PersonalInfo
        };

        return res.status(200).json(transportationWithTravelDetail);
    } catch (error) {
        
    }
}

const deleteTransportation =async (req, res) => {
    try {
        const {id} = req.params;

        const transportation = await Transportation.findByPk(id);
        
        if (!transportation) {
            return res.status(404).json({
              message: `Transportation Preferences dengan ID ${id} tidak ditemukan`,
            });
        }

        await transportation.destroy();

        res.status(200).json({
            message : `Transportation Prefference dengan ID ${id} berhasil dihapus`
        })
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}
module.exports = {
    createTransportation,
    getAllTransportation,
    getTransportationById,
    updateTransportation,
    deleteTransportation
};