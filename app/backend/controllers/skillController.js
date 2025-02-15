const {getUserSkillsListings, getUserSkillsRequested, getUserSkillsOffered, getUserSkillsAccepted} = require('../entities/skillEntity');

exports.getUserSkillsListing = async(req, res) => {
    try{
        const {userID} = req.query;
        const result = await getUserSkillsListings(userID);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({success: false, error: "Internal server error."});
    }
}

exports.getUserSkillsRequested = async(req, res) => {
    try{
        const {userID} = req.query;
        const result = await getUserSkillsRequested(userID);
        console.log('controller', result);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({success: false, error: "Internal server error."});
    }
}

exports.getUserSkillsOffered = async(req, res) => {
    try{
        const {userID} = req.query;
        const result = await getUserSkillsOffered(userID);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({success: false, error: "Internal server error."});
    }
}

exports.getUserSkillsAccepted = async(req, res) => {
    try{
        const {userID} = req.query;
        const result = await getUserSkillsAccepted(userID);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({success: false, error: "Internal server error."});
    }
}