const express = require('express');
const path = require('path');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const files = [
	{
		name: 'õpetus',
		type: 'txt',
		content: 'This is the content of file1',
	},
	{
		name: 'python',
		type: 'py',
		content: 'This is the content of file2',
	},
];


app.get('/', function(req, res) {
	res.render('pages/index', { files });
});

console.log(path.resolve(__dirname, 'public'));

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
