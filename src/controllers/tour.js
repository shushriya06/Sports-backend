const Tour = require('../models/tour');

const getAllTours = async () => {
    return await Tour.getAllTours();
}

const getMatchesByTourName = async (params, page, limit) => {
    const { name } = params;

    if (!name) {
        throw new Error('Missing required parameter: name');
    }
	// Calculate skip based on page and limit
    const skip = (page - 1) * limit;

    return await Tour.getMatchesByTourName(params, skip, limit);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}