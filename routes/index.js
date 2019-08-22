// ====================================================================================
// ========================= Gerenciamento de Rotas ===================================
// ====================================================================================
const path 	= require('path');
const fs 	= require("fs");

module.exports = app => {

	app.get('/', (req, res) => {
	
		sess = req.session;
	
		if (sess.user) { 

			if (sess.status == 'block') {

				res.redirect('/block');
			} else {

				res.redirect('/client');
			}

		} else {

			var dadosCV = 
			{ 
				userName : "",
				linesSec1 : [], 
				linesSec2 : []
			}	
	
			res.render('index', dadosCV);
		}
	});

	app.get('/block', (req, res) => {
		res.render('block');
	});	

	app.get('/views', (req, res) => {

		var allNick = [];
		var dir = path.join('./public/login/TodoMundo/all.txt');
		var aux = fs.readFileSync(dir, 'utf8');

		allNick.push(aux.toString().split(','));

		res.render('views', {
			allNick : allNick
		});
	});	

	app.get('/logout', (req,res) => {
		app.utils.destroy.destroySess(req, res);
	});
}