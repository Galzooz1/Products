const indexR = require("./index");
const usersR = require("./users");
const productsR = require("./products");

exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/users", usersR);
    app.use("/products", productsR);

    app.use((req, res) => {
        res.status(404).json({ msg: "Page 404, Not found. That's not the end of the world, just try another way" })
    })
}