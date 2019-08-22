// ====================================================================================
// ========= SERVIDOR SIMPLES PARA DESENVOLVER AS ATIVIDADES DA DISCIPLINA ============
// ====================================================================================

const express 			= require('express');
const consign 			= require('consign');
const expressLayouts 	= require('express-ejs-layouts');
const session			= require('express-session');
const bodyParser 		= require('body-parser');
const request 			= require('request');
const multer 			= require('multer');
const path 				= require('path');
const fs 				= require("fs");

const app 				= express(); 

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 );

// ====================================================================================
// ===================== routes => Pasta que contem páginas ===========================
// ===================== utils  => Pasta que contem funções ===========================
// ====================================================================================

consign().include('routes').include('utils').into(app);

// ====================================================================================
// ==================== MENSAGEM DE INICIALIZAÇÃO DO SERVIDOR =========================
// ====================================================================================

app.listen(8080, () => {
	console.log("SERVIDOR ESTA FUNCIONANDO NA PORTA 8080!");
});