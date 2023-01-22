const { json } = require("express");
const e = require("express");
const express = require("express");

const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(json());
let products = [
  {
    id: 1,
    name: "Laptop",
    price: "3000",
  },
];

//Consultar todos los productos
app.get("/products", (req, res) => {
  res.json(products);
});

//Agregar Producto
app.post("/products", (req, res) => {
  const newProducts = { id: products.length + 1, ...req.body };
  products.push(newProducts);
  res.send(newProducts);
});

//Actualizar Producto
app.put("/products/:id", (req, res) => {
  const newData = req.body;
  const productFound = products.find((prod) => prod.id == req.params.id);
  if (!productFound) {
    return res.status(404).json({
      message: "Producto no encontrado",
    });
  }

  products = products.map((prod) =>
    prod.id == req.params.id ? { ...prod, ...newData } : prod
  );

  res.json({ message: "Producto actualizado" });
});

//Eliminar producto
app.delete("/products/:id", (req, res) => {
  const productFound = products.find((prod) => prod.id == req.params.id);
  if (!productFound) {
    return res.status(404).json({
      message: "Producto no encontrado",
    });
  }

  products = products.filter((prod) => prod.id != req.params.id);
  res.sendStatus(204);
});

//Consular Producto por el ID
app.get("/products/:id", (req, res) => {
  console.log(req.params.id);
  const productsFound = products.find((prod) => prod.id == req.params.id);
  res.json(products);
});

app.listen(3000);
console.log(`Server on port ${3000}`);
