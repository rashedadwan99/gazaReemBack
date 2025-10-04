const express = require("express");
const path = require("path");
const users = require("../routes/userRoutes");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/users", users);
};
