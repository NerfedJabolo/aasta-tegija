const express = require('express');
const path = require('path');
const helmet = require('helmet');
const fs = require('fs');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by');
const data = fs.readFileSync('src/text/opetus.json');
const json = JSON.parse(data);
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

const files = [
	{
		name: 'õpetus',
		type: 'txt',
		page: json,
	},
	{
		name: 'python',
		type: 'py',
	},
	/* {
		name: 'terminal',
		type: 'terminal',
	}, */
];

app.get('/api/', (req, res) => {
	res.json(files[0]);
});

// Add parameter to /api
app.get('/api/:page', (req, res) => {
	const data = files[0].page[req.params.page];
	if (!data) {
		res.status(404).json({ error: 'Lehte pole!' });
	}
	res.json(data);
});

app.get('/', limiter, (req, res) => {
	res.render('pages/index', { files });
});

console.log(path.resolve(__dirname, 'public'));

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
