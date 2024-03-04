// Import required modules
const express = require('express');

// Create an Express app
const app = express();
const port = 1245;

// Array containing the list of products
const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
];

// Function to get an item by its ID
function getItemById(id) {
  return listProducts.find((item) => item.id === id);
}

// Route to list all products
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// Route to get an item by ID
app.get('/item/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = getItemById(itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
