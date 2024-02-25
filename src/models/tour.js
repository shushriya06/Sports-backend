const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async (params, skip, limit) => {
    const statement = 'SELECT * FROM matches LEFT JOIN tours ON matches.tourId = tours.id WHERE tours.name = ? LIMIT ? OFFSET ?';
    const parameters = [params.name, limit, skip];
    return await mysql.query(statement, parameters);
}

const getSportsIDByTourId = async (params) => {
    const statement = 'SELECT sportId FROM tours WHERE id=?';
    const parameters = [params.tourid];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
	getSportsIDByTourId: getSportsIDByTourId
}