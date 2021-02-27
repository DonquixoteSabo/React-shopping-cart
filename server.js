const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const URI = `mongodb+srv://donquixoteSabo:donquixoteSabo1234@react-shopping-cart-db.6iyuk.mongodb.net/react-shopping-cart-db?retryWrites=true&w=majority
`;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch(error => console.log(error));

const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    console.log(e);
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
  } catch (e) {
    console.log(e);
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
