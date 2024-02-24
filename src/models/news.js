const mysql = require('../lib/mysql');

const createNewsByMatch = async params=> {
	const statement = 'INSERT IGNORE INTO mydb.news (title, description, match_id) VALUES (?,?,?)';
	const parameters = [ params.title , params.description, params.matchid];
    return await mysql.query(statement, parameters);

}

module.exports = {
    createNewsByMatch: createNewsByMatch
}                                                                                                                                      