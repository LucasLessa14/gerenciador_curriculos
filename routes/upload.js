// ====================================================================================
// ======================== UPLOAD DE IMAGENS PARA O SERVIDOR =========================
// ====================================================================================
var maxSize = 20*1024*1024;

const multer = require('multer');
const path 	 = require('path');
const fs 	 = require("fs");

module.exports = app => {

	const storage = multer.diskStorage({
	    destination: (req, file, cb) => {	
			cb(null, './public/data/' + sess.user);
		},
	    filename: (req, file, cb) => {
			cb(null, sess.user + ".jpg");
	    }
	});

	const upload = multer({
	  storage: storage, 
	  limits: { fileSize: maxSize }
	}).single('file');

	app.post('/', (req,res) => {

		var imgRoute = './public/data/' + sess.user + '/';

		console.log(imgRoute);

		fs.rename(imgRoute+sess.user+'.jpg', imgRoute+sess.user + '-' + Date.now()+'.jpg', (err) => {
			if (err) return console.log(err);
			console.log('Rename complete!');

			upload (req, res, (err) => {

				if (err) {
					res.send(' <h2>O seu upload NÃO foi realizado! <h2>');

					return console.log(err); 
				}
				console.log(req.body, req.file);

				console.log('Upload realizado com sucesso!');

				res.redirect('/');
			})
		});
	});
}