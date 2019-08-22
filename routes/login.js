// ====================================================================================
// ========================= Gerenciamento de Rotas ===================================
// ====================================================================================
const path 	= require('path');
const fs 	= require("fs");

module.exports = app => {

	app.post('/cv', (req,res) => {  // METODO USADO PARA LOGIN

		sess = req.session;
		sess.user = req.body.user;
		sess.pass = req.body.pass;
		sess.tipo = "user";

		console.log(sess);

		// REGATA O VETOR COM A SENHA DO USUARIO
		var loginRoute = path.join('./public/login/TodoMundo/all.txt');
		var allUsers = [];

		var login = fs.readFileSync(loginRoute, 'utf8');
		allUsers.push(login.toString().split(','));

		console.log(allUsers);

		var bool = false;

		for (var i = 0; i < allUsers[0].length; i++){
			if( allUsers[0][i] == sess.user) bool = true;
			console.log(allUsers[0][i]);
		}

		console.log(bool);

		if ( bool ){
			// REGATA O VETOR COM A SENHA DO USUARIO
			var senha = path.join('./public/login/' + sess.user + ".txt");
			var allPassword = [];

			var aux = fs.readFileSync(senha, 'utf8');
			allPassword.push(aux.toString().split('\n'));

			var senha = '';
			senha = allPassword[0];

			// VERIFICA SE A SENHA BATE COM A SENHA CADASTRADA
			if (senha == sess.pass){

				console.log('login => '+ sess.user);
				console.log('senha => '+ senha);
				sess.pass = null;

				// ATUALIZA OS OUTROS ITENS DA SESSÃO
				var fileSess = path.join('./public/data/' + sess.user + "/sess.txt");
				var vetorSess = [];
				
				var aux = fs.readFileSync(fileSess, 'utf8');
				vetorSess.push(aux.toString().split(',\r\n'));

				sess.nickUser = vetorSess[0][0];
				sess.tipo     = vetorSess[0][1];
				sess.qtd      = vetorSess[0][2];
				sess.status   = vetorSess[0][3];
				
				console.log('**************************************************');
				console.log('Sessão Criada com Sucesso!!');
				console.log(sess);
				console.log('**************************************************');

				if (sess.status == 'block'){

					res.redirect('/block');
				} else {

					res.redirect('/client');
				}

			} else {

				app.utils.destroy.destroySess(req, res);
			}
		} else {

			app.utils.destroy.destroySess(req, res);
		}
	});

	app.get('/client', (req,res) => {

		var info = [];
		var style = [];
		var SecStyle = [];

		// ATUALIZA A QUANTIDADE DE SESSÕES DO USUARIO
		var fileSess = path.join('./public/data/'+ sess.user +'/sess.txt');
		var aux = fs.readFileSync(fileSess, 'utf8');

		var vetorSess = [];
		vetorSess.push(aux.toString().split(',\r\n'));

		sess.nickUser = vetorSess[0][0];
		sess.tipo     = vetorSess[0][1];
		sess.qtd      = vetorSess[0][2];
		sess.status   = vetorSess[0][3];

		// ATUALIZA TODOS OS DADOS DAS SEÇÕES EM UMA STRING
		var dir1 = path.join('./public/data/' + sess.user + '/secoes');
		var dir2 = path.join('./public/data/' + sess.user + '/styles');
		
		for ( var i = 0; i < vetorSess[0][2]; i++){

			var aux = fs.readFileSync(dir1+'/s'+(i + 1)+'.txt', 'utf8');

			info.push(aux.toString().split('\r\n'));
		}
		
		for ( var i = 0; i < vetorSess[0][2]; i++){

			var aux = fs.readFileSync(dir2+'/style'+(i + 1)+'.txt', 'utf8');

			SecStyle.push(aux.toString().split(',\r\n'));
		}

		// ATUALIZA TODOS OS DADOS DE ESTILOS EM UMA STRING
		var dir2 = path.join('./public/data/' + sess.user + '/style.txt');

		var aux = fs.readFileSync(dir2);

		style.push(aux.toString().split(',\r\n'));

		console.log('..................................................................');
		console.log(sess);
		console.log('Vetor de Dados Criado com Sucesso!!');
		console.log(info);
		console.log('Folha de Estilo Carregada com Sucesso!!');
		console.log(style);
		console.log('vetor de estilo de cada Seção Carregada com sucesso!!');
		console.log(SecStyle);
		console.log('..................................................................');

		res.render('cv', {
			info : info,
			style : style,
			SecStyle : SecStyle,
			vetorSess : vetorSess

		});
	});

	app.post('/openCV', (req,res) => {

		var userViews = req.body.views;

		console.log('views curriculo aqqq');
		console.log(userViews);

		var info = [];
		var style = [];
		var SecStyle = [];

		// ATUALIZA A QUANTIDADE DE SESSÕES DO USUARIO
		var fileSess = path.join('./public/data/'+ userViews +'/sess.txt');
		var aux = fs.readFileSync(fileSess, 'utf8');

		var vetorSess = [];
		vetorSess.push(aux.toString().split(',\r\n'));

		sess.nickUser = vetorSess[0][0];
		sess.tipo     = vetorSess[0][1];
		sess.qtd      = vetorSess[0][2];
		sess.status   = vetorSess[0][3];

		vetorSess[0][3] = userViews;

		// ATUALIZA TODOS OS DADOS DAS SEÇÕES EM UMA STRING
		var dir1 = path.join('./public/data/' + userViews + '/secoes');
		var dir2 = path.join('./public/data/' + userViews + '/styles');
		
		for ( var i = 0; i < vetorSess[0][2]; i++){

			var aux = fs.readFileSync(dir1+'/s'+(i + 1)+'.txt', 'utf8');

			info.push(aux.toString().split('\r\n'));
		}
		
		for ( var i = 0; i < vetorSess[0][2]; i++){

			var aux = fs.readFileSync(dir2+'/style'+(i + 1)+'.txt', 'utf8');

			SecStyle.push(aux.toString().split(',\r\n'));
		}

		// ATUALIZA TODOS OS DADOS DE ESTILOS EM UMA STRING
		var dir2 = path.join('./public/data/' + userViews + '/style.txt');

		var aux = fs.readFileSync(dir2);

		style.push(aux.toString().split(',\r\n'));

		console.log('..................................................................');
		console.log(sess);
		console.log('Vetor de Dados Criado com Sucesso!!');
		console.log(info);
		console.log('Folha de Estilo Carregada com Sucesso!!');
		console.log(style);
		console.log('vetor de estilo de cada Seção Carregada com sucesso!!');
		console.log(SecStyle);
		console.log('..................................................................');

		res.render('viewsCV', {
			info : info,
			style : style,
			SecStyle : SecStyle,
			vetorSess : vetorSess,
			userViews : userViews
		});
	});
}