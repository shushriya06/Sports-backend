const News = require('../models/news');
const Tour = require('../models/tour');
const Match = require('../models/match');

const createNewsByMatch = async params => {
	const tourData = await Match.getTourIDByMatchId({matchid: params.matchid});
	console.log("tour data", tourData);
	if (!tourData || !tourData[0].tourId) {
        throw new Error('Tour id associated to the match not found.');
    }
	params.tourid = tourData[0].tourId;
	const sportData = await Tour.getSportsIDByTourId({tourid: params.tourid});
	console.log("sports data", sportData);
	if (!sportData || !sportData[0].sportId) {
        throw new Error('Sport id associated to the tour corresponding to the match not found.');
    }
	params.sportid = sportData[0].sportId;
    return await News.createNewsByMatch(params);
}

const createNewsByTour = async params => {
	const sportData = await Tour.getSportsIDByTourId({tourid: params.tourid});
	if (!sportData || !sportData[0].sportId) {
        throw new Error('Sport id associated to the tour not found.');
    }
	params.sportid = sportData[0].sportId;
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

const getNewsBySport = async params => {
    const { sportid } = params;

    if (!sportid) {
        throw new Error('Missing required parameter: sportid');
    }

    return await News.getNewsBySport(params);
}

module.exports = {
    createNewsByMatch: createNewsByMatch,
	createNewsByTour: createNewsByTour,
	getNewsByMatch: getNewsByMatch,
	getNewsByTour: getNewsByTour,
	getNewsBySport: getNewsBySport
}