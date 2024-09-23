import React, { useState, useEffect } from "react";
import { TextField, Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Modal from '@mui/material/Modal';

import "./ProductSearchPage.css";
import Card from "../../Components/Card/Card";

const productsData = [
  {
    id: 1243,
    name: "Mesa de Madera",
    description: "Mesa de madera maciza con acabado natural.",
    image:
      "https://f.fcdn.app/imgs/cdef8b/www.kavehome.com.uy/kaveuy/6ad4/webp/catalogo/CC0607M_40_1/1500-1500/mesa-extensible-briva-200-280-x-100-cm-madera-maciza-de-roble-y-pino-acabado-natural.jpg",
    price: 300,
  },
  {
    id: 1297,
    name: "Silla de Oficina",
    description: "Silla ergonómica con soporte lumbar y ajuste de altura.",
    image: "https://m.media-amazon.com/images/I/61ghxdw9fpL._AC_SX679_.jpg",
    price: 150,
  },
  {
    id: 2357,
    name: "Cafetera Italiana",
    description: "Cafetera tradicional para preparar café espresso.",
    image:
      "https://m.media-amazon.com/images/I/61T6yuxDS1L.__AC_SX300_SY300_QL70_ML2_.jpg",
    price: 40,
  },
  {
    id: 7093,
    name: "Juego de Platos",
    description: "Set de 12 platos de cerámica con diseño minimalista.",
    image: "https://m.media-amazon.com/images/I/31P+yqcLJ-L._AC_.jpg",
    price: 80,
  },
  {
    id: 3672,
    name: "Ropa de Cama",
    description: "Juego de sábanas de algodón para cama king size.",
    image:
      "https://arredo-uy.vtexassets.com/assets/vtex.file-manager-graphql/images/7971b884-8c1a-4bc0-9336-7d36836b9d7d___f5fd18f23d6e6bea36c1f64115d32b66.jpg",
    price: 100,
  },
  {
    id: 3452,
    name: "Florero de Cerámica",
    description: "Florero hecho a mano con diseño geométrico.",
    image:
      "https://img.ltwebstatic.com/images3_spmp/2023/05/20/1684571735896192c6ef704180344b758d51d95cde_thumbnail_720x.jpg",
    price: 45,
  },
  {
    id: 3342,
    name: "Sillón Reclinable",
    description: "Sillón reclinable de cuero sintético, ideal para la sala.",
    image:
      "https://f.fcdn.app/imgs/7dd1e8/www.divino.com.uy/div/97c8/webp/catalogo/236967006_0/1000x1000/butaca-c-puff-1-cuerpo-cuero-100-natural-marron-eames-camel.jpg",
    price: 500,
  },
  {
    id: 1572,
    name: "Jarrón Decorativo",
    description: "Jarrón de vidrio soplado, perfecto para arreglos florales.",
    image: "https://m.media-amazon.com/images/I/815e9ubkVgL.jpg",
    price: 35,
  },
];

const ProductSearchPage = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(productsData);
  const [prodcutsList, setProductsList] = useState(productsData);
  const [openModal, setOpenModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    setProducts(
      prodcutsList.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [prodcutsList, search]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      image: "",
    });
    setOpenModal(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    const productToAdd = {
      ...newProduct,
      id: Math.floor(Math.random() * 10000), // Generar un ID aleatorio
      price: parseFloat(newProduct.price),
    };
    const updatedProducts = [...products];
    updatedProducts.push(productToAdd);
    setProductsList(updatedProducts);
    handleClose();
  };

  return (
    <div className="product-search-page">
      <TextField
        label="Buscar Producto"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "4rem", marginBottom: "4rem" }}
      />
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ marginBottom: "2rem" }}
      >
        Añadir Producto
      </Button>
      
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Añadir Nuevo Producto
          </Typography>
          <TextField
            label="Nombre del Producto"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            margin="normal"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Precio"
            variant="outlined"
            fullWidth
            margin="normal"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <TextField
            label="Imagen (URL)"
            variant="outlined"
            fullWidth
            margin="normal"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddProduct}
            style={{ marginTop: "1rem" }}
          >
            Añadir Producto
          </Button>
        </Box>
      </Modal>

      {products.length > 0 ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {products.map((product) => (
            <Grid size={{ xs: 12, md: 4 }} key={product.id}>
              <Card
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center">
          No se encontraron resultados
        </Typography>
      )}
    </div>
  );
};

export default ProductSearchPage;


