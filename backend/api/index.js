const express = require("express");
const app = express();

// Import your routes and middleware as needed
const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
const buyerRoutes = require("../routes/buyerRoutes");
const sellerRoutes = require("../routes/sellerRoutes");
const verifierRoutes = require("../routes/verifierRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/routes/buyerRoutes', buyerRoutes);
app.use('/routes/sellerRoutes', sellerRoutes);
app.use('/routes/verifierRoutes', verifierRoutes);

module.exports = app;
