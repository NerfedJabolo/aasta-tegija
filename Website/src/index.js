const express = require('express');
const path = require('path');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.render('pages/index');
});

console.log(path.resolve(__dirname, 'public'));

app.listen(3000, () => {
	console.log('Server running on port 3000');
});


/* function loadFiles() {
	const files = glob.sync(path.resolve(__dirname, 'public/html/*.html'));
	for (const file of files) {
		const fileName = path.basename(file).replace('.html', '');
		console.log(fileName);
		app.get(`/${fileName}`, (req, res) => {
			res.render(file);
		});
	}
}
 */
