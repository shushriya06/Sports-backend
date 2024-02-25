const News = require('../models/news');

const createNewsByMatch = async params => {
    return await News.createNewsByMatch(params);
}

const getNewsByMatch = async params => {
    const { matchid } = params;

    if (!matchid) {
        throw new Error('Missing required parameter: matchid');
    }

    return await News.getNewsByMatch(params);
}

module.exports = {
    createNewsByMatch: createNewsByMatch,
	getNewsByMatch:getNewsByMatch
}