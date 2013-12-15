/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/user/login`
   */
  login: function (req, res) {
    // すでにログインしている場合
    console.log(req.session);
    if (req.session.hasOwnProperty('userId') && req.session.userId) {
	return res.redirect('/room/');
    }
    // 通常のアクセスの場合はviewを表示
    if (!req.param('name')) {
	return res.view();
    }
    // ユーザー作成
    User.findOne({name: req.param('name')}, function(err, user) {
	if (err) {
	    console.log(err);
	    return res.send(err, 500);
	}
	if (user) {
	    req.session.userId = user.id;
	    return res.redirect('/room/');
	}
	
	User.create({name: req.param('name')}, function(err, user) {
	    if (err) {
		console.log(err);
		return res.send(err, 500);
	    }
	    req.session.userId = user.id;
	    return res.redirect('/room/');
	});
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
