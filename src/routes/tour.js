const Tour = require('../controllers/tour');

module.exports = function(app) {
    app.route('/tours').get(async (req, res, next) => {
        try {
            return res.json(await Tour.getAllTours());
        } catch (err) {
            return next(err);
        }
    });

    app.route('/tour/matches').get(async (req, res, next) => {
        try {
            let params = req.query;
			let { page, limit } = params;

			// Default values for page and limit
			page = page ? parseInt(page) : 1;
			limit = limit ? parseInt(limit) : 10;

            let result = await Tour.getMatchesByTourName(params, page, limit);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
}