// ====================================================================================
// ========================= Gerenciamento de Rotas ===================================
// ====================================================================================
const path 	= require('path');
const fs 	= require("fs");

module.exports = app => {

	app.get('/admin', (req,res) => {

		if(sess.tipo != 'admin'){
			res.redirect('/client');
		}

		var allNick = [];
		var dataForEach = [];

		var loginAdress = path.join('./public/login/TodoMundo/all.txt');
		var passAdress  = path.join('./public/login/');

		var container = fs.readFileSync(loginAdress, 'utf8');
		
		allNick.push(container.toString().split(','));
		sess.allNick = allNick;
		sess.tamanhoVetor = allNick[0].length;

		for ( var i = 0; i < allNick[0].length; i++){

			var dir = path.join('./public/data/' + allNick[0][i] + "/sess.txt");
			var aux = fs.readFileSync(dir, 'utf8');

			dataForEach.push(aux.toString().split(',\r\n'));

			console.log(dir);
			console.log(dataForEach);
			console.log(i);
		}

		sess.dataForEach = dataForEach;
		console.log(sess);
		res.render('admin'); 
	});
	
	app.get('/blockuser', (req,res) => {

		console.log(path.join('./public/data/'+ user +'/sess.txt'));
	
		var num   = req.query.button
		var mod   = sess.dataForEach;
		var login = sess.allNick;
		var user = login[0][num];
		var dir   = path.join('./public/data/'+ user +'/sess.txt');

		console.log(mod);

		if ( mod[num][3] == 'ok'){

			mod[num][3] = 'block';
		} else {

			mod[num][3] = 'ok'
		}

		console.log(mod);

		var aux = [mod[num][0], '\r\n'+mod[num][1], '\r\n'+mod[num][2], '\r\n'+mod[num][3]]

		fs.writeFile(dir, aux, (err) => {		// CRIA O ARQUIVO DE SESS
			if (err) throw err;
			res.render('admin');
		});
	});

	app.get('/tipoUser', (req,res) => {

		console.log(path.join('./public/data/'+ user +'/sess.txt'));
	
		var num   = req.query.button
		var mod   = sess.dataForEach;
		var login = sess.allNick;
		var user = login[0][num];
		var dir   = path.join('./public/data/'+ user +'/sess.txt');

		console.log(mod);

		if ( mod[num][1] == 'user'){

			mod[num][1] = 'admin';
		} else {

			mod[num][1] = 'user'
		}

		console.log(mod);

		var aux = [mod[num][0], '\r\n'+mod[num][1], '\r\n'+mod[num][2], '\r\n'+mod[num][3]]

		fs.writeFile(dir, aux, (err) => {		// CRIA O ARQUIVO DE SESS
			if (err) throw err;
			res.render('admin');
		});
	});

	app.get('/deleteUser', (req, res) => {

		console.log('deleteUser');
		res.redirect('admin');
	});
}