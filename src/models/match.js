const mysql = require('../lib/mysql');

const getAllMatches = async () => {
    const statement = 'select * from matches;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getTourIDByMatchId = async (params) => {
    const statement = 'SELECT tourId FROM matches WHERE id=?';
    const parameters = [params.matchid];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllMatches: getAllMatches,
	getTourIDByMatchId: getTourIDByMatchId
}