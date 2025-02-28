const Model = require("../models/index.js");
const MealPrefference = Model.MealPreference;
const TravelDetails = Model.TravelDetails;

const createMeal = async (req, res) => {
    try {
       const {
        travelDetailsID,
        dietaryRestrictions,
        mealPlanPreferences,
        specialFoodRequests
       } = req.body;

       if(!travelDetailsID ||
        !dietaryRestrictions ||
        !mealPlanPreferences ||
        !specialFoodRequests) return res.status(400).json({'message':'field are Required!'});
       
       const travelDetails = await TravelDetails.findByPk(travelDetailsID);
        if (!travelDetails) {
            return res.status(400).json({
                error: "Invalid TravelDetailsID. The referenced travel details do not exist."
            });
        }

        const validMealPrefferences = ['All-inclusive (All Meals)','Breakfast Only','Half Board (Breakfast & Dinner)','Full Board (All Meals)','Pay As You Go', 'Custom Plan'];
        if (!validMealPrefferences.includes(mealPlanPreferences)) {
        return res.status(400).json({
             error: `Invalid Meal Prefferences. Valid values are: ${validMealPrefferences.join(', ')}`,
            });
        }

        const newMeal = await MealPrefference.create({
            TravelDetailsID : travelDetailsID,
            DietaryRestrictions : dietaryRestrictions,
            MealPlanPreferences : mealPlanPreferences,
            SpecialFoodRequests : specialFoodRequests
        });

        return res.status(201).json({
            message : 'Meal Prefference created successfuly!',
            data : newMeal
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            message : "internal server error",
            error : error
        });
    }
}

const getAllMeal = async (req, res) => {
    try {
        const allMeal = await MealPrefference.findAll();

        if (allMeal.length === 0) {
            return res.status(404).json({ message: 'No Meal Prefference found!' });
        }

        const travelIDs = allMeal.map(detail => detail.TravelDetailsID);

        const travelDetails = await TravelDetails.findAll({
            where: { id: travelIDs },
        });
        
        const mealWithTravel = allMeal.map(detail => {
            const travelDetail = travelDetails.find(travel => travel.id === detail.TravelDetailsID);
           
            return {
                ...detail.dataValues,
                TravelDetailsID: travelDetail ? [travelDetail.dataValues] : [],
            };
        });

        return res.status(200).json(mealWithTravel);

    } catch (error) {
        console.error('Error: ',error);
        res.status(500).send({
            message: error.message,
        })
    }
}

const getMealById = async (req, res) => {
    try {
        const {id} = req.params;

        const meal = await MealPrefference.findByPk(id);

        if (!meal) {
            return res.status(404).json({
            message: `Meal Prefference with ID ${id} not found`,
            });
        }

        const travelDetail = await TravelDetails.findByPk(meal.TravelDetailsID);
        
        const mealWithTravelDetail = {
        ...meal.dataValues, // Data dari TravelDetail
        TravelDetailsID: travelDetail ? [travelDetail.dataValues] : [], // Data dari PersonalInfo
        };

        return res.status(200).json({
            message : 'Meal Prefference found',
            data : mealWithTravelDetail
        });
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({
            message:'Internal Server error',
            error: error.message 
        })
    }
}

const updateMeal = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            travelDetailsID,
            dietaryRestrictions,
            mealPlanPreferences,
            specialFoodRequests
        } = req.body;

        if(mealPlanPreferences !== undefined){
            const validMealPrefferences = ['All-inclusive (All Meals)','Breakfast Only','Half Board (Breakfast & Dinner)','Full Board (All Meals)','Pay As You Go', 'Custom Plan'];
            if (!validMealPrefferences.includes(mealPlanPreferences)) {
                return res.status(400).json({
                    error: `Invalid Meal Prefferences. Valid values are: ${validMealPrefferences.join(', ')}`,
                });
            }
        }

        const mealPrefference =await MealPrefference.findByPk(id);

        if (!mealPrefference) {
            return res.status(404).json({
            message: `Meal Prefference with ID ${id} not found`,
            });
        }

        await mealPrefference.update({
            TravelDetailsID : travelDetailsID,
            DietaryRestrictions : dietaryRestrictions,
            MealPlanPreferences : mealPlanPreferences,
            SpecialFoodRequests : specialFoodRequests
        })

        const travelDetail = await TravelDetails.findByPk(mealPrefference.TravelDetailsID);

        const mealWithTravelDetail = {
            ...mealPrefference.get(), // Data dari TravelDetail
            TravelDetailsID: travelDetail ? [travelDetail.dataValues] : [], // Data dari PersonalInfo
        };

        return res.status(200).json(mealWithTravelDetail);

    } catch (error) {
        console.error("Error: ",error);
        res.status(500).json({message : "internal server error!"});
    }
}

const deleteMeal = async (req, res) => {
    try {
        const {id} = req.params;

        const meal = await MealPrefference.findByPk(id);
        
        if (!meal) {
            return res.status(404).json({
              message: `Meal Preferences dengan ID ${id} tidak ditemukan`,
            });
        }

        await meal.destroy();

        res.status(200).json({
            message : `Meal Prefference dengan ID ${id} berhasil dihapus`
        })
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}

module.exports = {
    createMeal,
    getAllMeal,
    getMealById,
    updateMeal,
    deleteMeal
};