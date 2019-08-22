// ====================================================================================
// ========================= Gerenciamento de Rotas ===================================
// ====================================================================================
const path 	= require('path');
const fs 	= require("fs");

module.exports = app => {

	app.get('/cadastrar', (req, res) => {
		res.render('cadastrar');
	});

	app.post('/create', (req,res) => {
		sess       = req.session;
		sess.user  = req.body.user;
		sess.nick  = req.body.nick;
		sess.pass  = req.body.pass;

		var dir   = path.join('./public/data/' + sess.user);
		var dir1  = path.join('./public/data/' + sess.user + '/secoes');
		var dir2  = path.join('./public/data/' + sess.user + '/styles');
		var login = path.join('./public/login/' + sess.user + '.txt');

		var fileSess  = path.join(dir + '/sess.txt');
		var fileStyle = path.join(dir + '/style.txt');
		var fileCont  = path.join(dir + '/cont.txt');

		var mod1 = [req.body.nick, '\r\n'+'user', '\r\n'+'0', '\r\n'+'ok'];
		var mod2 = ['Arial', '\r\nLightGrey', '\r\nWhite', '\r\n16px', '\r\ncenter', '\r\n24px'];
		var mod3 = ['0', '\r\n1', '\r\n0', '\r\n0'];

		// VERIFICA SE EXISTE A PASTA E CRIA
		if (!fs.existsSync(dir)){		

			fs.mkdirSync(dir);
			fs.mkdirSync(dir1);
			fs.mkdirSync(dir2);
			
			
			// CRIA O ARQUIVO DE SESS
			fs.writeFileSync(fileSess, mod1);
			
			// CRIA O ARQUIVO DE ESTILO
			fs.writeFileSync(fileStyle, mod2);

			// CRIA UM ARQUIVO PARA AUXILIAR
			fs.writeFileSync(fileCont, mod3);
			
			// CRIA SENHA NA PASTA LOGIN
			fs.writeFileSync(login, sess.pass); 
			
			// INCLUI O LOGIN NA LISTA
			fs.appendFileSync('./public/login/TodoMundo/all.txt', ','+sess.user);	

			// INCUI UMA IMAGEM DEFAULT COMO FOTO DE PERFIL
			fs.copyFileSync('./public/img/default.jpg', './public/data/'+sess.user+'/'+sess.user+'.jpg');

			res.redirect('/client');

		} else {

			app.utils.destroy.destroySess(req, res);
		}
	});
}