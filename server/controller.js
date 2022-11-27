const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const productsPath = path.join(__dirname, 'db.json');

async function getProducts() {
    const products = await fs.readFile(productsPath, {encoding: 'utf-8'});
    console.log(chalk.bgCyan('Here is the list of notes:'), products);
    return Array.isArray(JSON.parse(products)) ? JSON.parse(products) : [];
}

async function addNote(title) {
    const notes = await getProducts();
    const note = {
        title,
        id: Date.now().toString(),
    };
    notes.push(note);
    await fs.writeFile(productsPath, JSON.stringify(notes));
    console.log(chalk.bgGreen(`Note "${title}" was add`));
}

module.exports = {
    getProducts,
    addNote,
};
