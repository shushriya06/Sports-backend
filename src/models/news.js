const mysql = require('../lib/mysql');

const createNewsByMatch = async params=> {
	const statement = 'INSERT IGNORE INTO mydb.news (title, description, match_id, tour_id, sport_id) VALUES (?,?,?,?,?)';
	const parameters = [ params.title , params.description, params.matchid, params.tourid, params.sportid];
    return await mysql.query(statement, parameters);
}

const createNewsByTour = async params=> {
	const statement = 'INSERT IGNORE INTO mydb.news (title, description, tour_id, sport_id) VALUES (?,?,?,?)';
	const parameters = [ params.title , params.description, params.tourid, params.sportid];
    return await mysql.query(statement, parameters);
}

const getNewsByMatch = async params => {
    const statement = 'select * from news where match_id = ?';
    const parameters = [ params.matchid ];
    return await mysql.query(statement, parameters);
}

const getNewsByTour = async params => {
    const statement = 'select * from news where tour_id = ?';
    const parameters = [ params.tourid ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    createNewsByMatch: createNewsByMatch,
	createNewsByTour: createNewsByTour,
	getNewsByMatch: getNewsByMatch,
	getNewsByTour: getNewsByTour
}                                                                                                                                      