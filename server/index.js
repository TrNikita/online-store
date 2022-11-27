const express = require('express');
const chalk = require('chalk');
const path = require('path');
// const {getProducts, addNote} = require('./controller');
const port = 3000;
const router = require('./routes/index');

const app = express();
app.use('/api', router);

app.use(express.static(path.resolve(__dirname, '..', 'src')));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.get('/', (req, res) => {
    res.status(200).json('working !!!!');
});

// app.get('/', async (req, res) => {
//     console.log('efefefefe');
//     res.render('index', {
//         title: 'Express app',
//         products: await getProducts(),
//         created: false,
//     });
// });
//
// app.post('/', async (req, res) => {
//     await addNote(req.body.title);
//     res.render('index', {
//         title: 'Express app',
//         notes: await getProducts(),
//         created: true,
//     });
// });

// console.log('getProducts()', getProducts());

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
});
