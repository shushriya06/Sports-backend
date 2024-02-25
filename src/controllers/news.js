const News = require('../models/news');

const createNewsByMatch = async params => {
    return await News.createNewsByMatch(params);
}

const createNewsByTour = async params => {
    return await News.createNewsByTour(params);
}

const getNewsByMatch = async params => {
    const { matchid } = params;

    if (!matchid) {
        throw new Error('Missing required parameter: matchid');
    }

    return await News.getNewsByMatch(params);
}

const getNewsByTour = async params => {
    const { tourid } = params;

    if (!tourid) {
        throw new Error('Missing required parameter: tourid');
    }

    return await News.getNewsByTour(params);
}

module.exports = {
    createNewsByMatch: createNewsByMatch,
	createNewsByTour: createNewsByTour,
	getNewsByMatch: getNewsByMatch,
	getNewsByTour: getNewsByTour
}