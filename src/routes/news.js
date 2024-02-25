const News = require('../controllers/news');

module.exports = function(app) {
    app.route('/news/create').post(async (req, res, next) => {
        try {
			const {title, description, matchid} = req.body;
            return res.json(await News.createNewsByMatch({title: title, description:description, matchid:matchid}));
        } catch (err) {
            return next(err);
        }
    });

    app.route('/news/match').get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsByMatch(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
}