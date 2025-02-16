const {getUserSkillsListings, getUserSkillsRequested, getUserSkillsOffered, getUserSkillsAccepted, acceptSkillMatchStatus, rejectSkillMatchStatus, requestSkillMatch} = require('../entities/skillEntity');

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

exports.acceptSkillMatchStatus = async (req, res) => {
    try {
        const {requestorId, acceptorId, status} = req.body;
        const result = await acceptSkillMatchStatus(requestorId, acceptorId, status);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.rejectSkillMatchStatus = async (req, res) => {
    try {
        const {requestorId, acceptorId, skillsId, skillsId2} = req.body;
        const result = await rejectSkillMatchStatus(requestorId, acceptorId, skillsId, skillsId2);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.requestSkillMatch = async (req, res) => {
    try {
        const {acceptorId, requestorId, skillId, skillId2} = req.body;
        const result = await requestSkillMatch(acceptorId, requestorId, skillId, skillId2);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};