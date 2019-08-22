// ====================================================================================
// ========================= Gerenciamento de Rotas ===================================
// ====================================================================================
const path 	= require('path');
const fs 	= require("fs");

module.exports = app => {

	app.get('/config', (req, res) => {

		console.log('..................................................................');
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

		console.log('info = ');
		console.log(info);
		
		for ( var i = 0; i < vetorSess[0][2]; i++){

			var aux = fs.readFileSync(dir2+'/style'+(i + 1)+'.txt', 'utf8');

			SecStyle.push(aux.toString().split(',\r\n'));
		}

		console.log('SecStyle = ');
		console.log(SecStyle);

		// ATUALIZA TODOS OS DADOS DE ESTILOS EM UMA STRING
		var dir2 = path.join('./public/data/' + sess.user + '/style.txt');

		var aux = fs.readFileSync(dir2);

		style.push(aux.toString().split(',\r\n'));

		// REGATA CONT COM OS VALORES QUE ESTÃO NO ARQUIVO
		var cont = [];
		var dir3 = path.join('./public/data/' + sess.user + '/cont.txt')
		var vetor = fs.readFileSync(dir3, 'utf8');

		cont.push(vetor.toString().split(',\r\n'));

		console.log('**************************************************');
		console.log(sess);
		console.log('Vetor de Dados Criado com Sucesso!!');
		console.log(info);
		console.log('Folha de Estilo Carregada com Sucesso!!');
		console.log(style);
		console.log('Vetor cont Carregado com Sucesso!!');
		console.log(cont);
		console.log('**************************************************');

		res.render('config', {
			info : info,
			style : style,
			SecStyle : SecStyle,
			cont : cont
		});
	});

	app.get('/salvarStyle', (req, res) => {
		// RESGATA O NUMERO DE ESTILOS SALVOS
		var dir1 = path.join('./public/data/'+sess.user+'/cont.txt');
		var aux = fs.readFileSync(dir1, 'utf8');
		console.log('SALVANDO ESTILOS');
		
		var cont = [];
		cont.push(aux.toString().split(',\r\n'));

		aux = (parseInt(cont[0][0]) + 1);
		cont[0][0] = aux;

		// CRIA UM VETOR COM O ESTILO ATUAL
		var dir2 = path.join('./public/data/'+sess.user+'/style.txt');
		aux = fs.readFileSync(dir2, 'utf8');

		var styleNow = [aux];
		
		console.log('styleNow');
		console.log(styleNow);

		// CRIA UM ARQUIVO E SALVA O VETOR
		var dir3 = path.join('./public/data/'+sess.user+'/save/style'+ cont[0][0] +'.txt');
		fs.appendFileSync(dir3, styleNow);

		// ATUALIZA O ARQUIVO COM OS CONTADORES
		aux = [cont[0][0], '\r\n'+cont[0][1], '\r\n'+cont[0][2], '\r\n'+cont[0][3]];
		fs.writeFileSync(dir1, aux);

		res.redirect('/client');
	});

	app.post('/alterarStyle', (req, res) => {
		var style = [];
		
		style[0] = req.body.fonte;
		style[1] = req.body.color;
		style[2] = req.body.Background;
		style[3] = req.body.sizeFont;
		style[4] = req.body.align;
		style[5] = req.body.sizeTitle;

		var aux = [style[0], '\r\n'+style[1], '\r\n'+style[2], '\r\n'+style[3], '\r\n'+style[4], '\r\n'+style[5]]

		var dir = path.join('./public/data/' + sess.user + '/style.txt');

		fs.writeFileSync(dir, aux);

		res.redirect('/client');
	});

	app.get('/changeStyle', (req, res) => {

		



		res.redirect('/client');
	});

	app.post('/salvarEdit', (req,res) => {

		var title = req.body.title;
		var conteudo = req.body.conteudo;
		var tipoConteudo = req.body.tipoConteudo;

		var styles = [title, '\r\n'+tipoConteudo];

		// RESGATA O VALOR DA ULTIMA SEÇÃO ABERTA
		var cont = [];
		var dir = path.join('./public/data/' + sess.user + '/cont.txt')
		var vetor = fs.readFileSync(dir, 'utf8');
		var aux = [];

		// ATUALIZA NO ARQUIVO O NUMERO DO EDIT
		cont.push(vetor.toString().split(',\r\n'));
		var edit = (parseInt(cont[0][2]) - 1);

		// RESGATA A QUANTIDADE DE SESSÕES DO USUARIO
		var fileSess = path.join('./public/data/'+ sess.user +'/sess.txt');
		var aux = fs.readFileSync(fileSess, 'utf8');

		var vetorSess = [];
		vetorSess.push(aux.toString().split(',\r\n'));

		var qtd = parseInt(vetorSess[0][2]);

		// RESGATA O CONTEUDO DE TODAS AS SEÇÕES E COLOCA EM UM VETOR
		var info = [];

		for (var i = 1; i < (qtd + 1); i++) {

			var dir2 = path.join('./public/data/'+sess.user+'/secoes/s'+i+'.txt');
			var aux = fs.readFileSync(dir2, 'utf8');

			info.push(aux.toString().split());
		}

		info[0][edit] = conteudo;

		console.log('Eh isso que quero gravar??');
		console.log(info[0][edit]);

		// ATUALIZA OS DADOS NOS SEUS RESPECTIVOS ARQUIVOS

		var dir3 = path.join('./public/data/'+sess.user+'/secoes/s'+ (edit + 1) +'.txt');

		fs.writeFileSync(dir3, info[0][edit]);

		// TORNA O VALOR DE EDIT IGUAL A ZERO E SALVA NO ARQUIVO
		cont[0][2] = 0;

		aux = [cont[0][0], '\r\n'+cont[0][1], '\r\n'+cont[0][2], '\r\n'+cont[0][3]];

		fs.writeFileSync(dir, aux);

		// ATUALIZA OS ESTILOS DA SEÇÃO
		var dirStyle = path.join('./public/data/' + sess.user + '/styles/style' + (edit + 1) + '.txt');
		fs.writeFileSync(dirStyle, styles);

		res.redirect('/client');
	});

	app.get('/edit', (req, res) =>{

		var cont = [];
		var dir = path.join('./public/data/' + sess.user + '/cont.txt')
		var vetor = fs.readFileSync(dir, 'utf8');
		var aux = [];

		// ATUALIZA NO ARQUIVO O NUMERO DO EDIT
		cont.push(vetor.toString().split(',\r\n'));

		cont[0][2] = req.query.button;

		aux = [cont[0][0], '\r\n'+cont[0][1], '\r\n'+cont[0][2], '\r\n'+cont[0][3]];

		fs.writeFileSync(dir, aux);

		res.redirect('/config');
	});

	app.get('/cancelar', (req, res) => {

		var cont = [];
		var dir = path.join('./public/data/' + sess.user + '/cont.txt')
		var vetor = fs.readFileSync(dir, 'utf8');
		var aux = [];

		// ZERA O NUMERO DO EDIT E ATUALIZA O ARQUIVO
		cont.push(vetor.toString().split(',\r\n'));

		cont[0][2] = 0;

		aux = [cont[0][0], '\r\n'+cont[0][1], '\r\n'+cont[0][2], '\r\n'+cont[0][3]];

		fs.writeFileSync(dir, aux);

		res.redirect('/config');
	});

	app.get('/remove', (req, res) => {

		var index = (parseInt(req.query.button) - 1);

		// RESGATA A QUANTIDADE DE SESSÕES DO USUARIO
		var fileSess = path.join('./public/data/'+ sess.user +'/sess.txt');
		var aux = fs.readFileSync(fileSess, 'utf8');

		var vetorSess = [];
		vetorSess.push(aux.toString().split(',\r\n'));

		var qtd = parseInt(vetorSess[0][2]);
		
		var lastItem  = path.join('./public/data/'+sess.user+'/secoes/s'+qtd+'.txt');
		

		// CARREGA OS DADOS DE TODAS AS SECOES EM UM VETOR 
		var info = [];

		for (var i = 1; i < (qtd + 1); i++) {

			var dir = path.join('./public/data/'+sess.user+'/secoes/s'+i+'.txt');
			var aux = fs.readFileSync(dir, 'utf8');

			info.push(aux.toString().split());
		}

		// REMOVE O ELEMENTO INDICE (QTD) DO VETOR
		info.splice(index, 1);

		// ATUALIZA OS DADOS NOS SEUS RESPECTIVOS ARQUIVOS
		for (var i = 1; i < qtd; i++) {

			var dir = path.join('./public/data/'+sess.user+'/secoes/s'+i+'.txt');

			fs.writeFileSync(dir, info[i - 1]);
		}

		// EXCLUI O ARQUIVO DA ULTIMA SEÇÃO
		fs.unlinkSync ( lastItem );

		// ATUALIZA OS DADOS DO ARQUIVO DE SESSÃO
		var dirDefault = path.join('./public/data/'+ sess.user +'/sess.txt');
		var sessData = fs.readFileSync(dirDefault, 'utf8');
		var mod = [];

		mod.push(sessData.toString().split(',\r\n'));

		var stringNum = (qtd - 1);

		mod[0][2] = stringNum.toString();
		
		var sessText   = [mod[0][0], '\r\n'+mod[0][1], '\r\n'+mod[0][2], '\r\n'+mod[0][3]];

		fs.writeFileSync(dirDefault, sessText);

		// FIM DO PROCEDIMENTO

		res.redirect('/client');
	});

	app.post('/salvarSess', (req, res) => {

		var title = req.body.title;
		var conteudo = req.body.conteudo;
		var tipoConteudo = req.body.tipoConteudo;

		var styles = [title, '\r\n'+tipoConteudo];

		// LE O ARQUIVO SESS.TXT E ATUALIZA A QUANTIDADE DE SEÇÕES
		var dirDefault = path.join('./public/data/'+ sess.user +'/sess.txt');
		var sessData = fs.readFileSync(dirDefault, 'utf8');
		var mod = [];

		mod.push(sessData.toString().split(',\r\n'));

		var qtd = (parseInt(mod[0][2]) + 1);

		mod[0][2] = qtd;
		sess.qtd = qtd;

		var sessText   = [mod[0][0], '\r\n'+mod[0][1], '\r\n'+mod[0][2], '\r\n'+mod[0][3]];
		
		// CRIA UM ARQUIVO COM O NOVO CONTEUDO e ATUALIZA A QUANTIDADE DE 
		// SEÇÕES NA SESS.TXT e CRIA UM ARQUIVO COM O ESTILO DA SEÇÃO
		var dir1 = path.join('./public/data/'+sess.user+'/secoes/s'+qtd+'.txt');
		var dir2 = path.join('./public/data/'+sess.user+'/styles/style'+qtd+'.txt');

		fs.appendFileSync(dir1, conteudo);
		fs.appendFileSync(dir2, styles);

		fs.writeFileSync(dirDefault, sessText);	

		console.log('Seção Criada com Sucesso!!');

		res.redirect('/client');
	});
}