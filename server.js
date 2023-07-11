let express = require("express");
let app = express();
var cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow_Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept "
  );
  next();
});
var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let { customersData } = require("./data.js");

app.get("/customers/:id", function (req, res) {
  let id = req.params.id;
  let customer = customersData.find((st) => st.id === id);
  if (customer) res.send(customer);
  else res.status(404).send("No Customer found");
});

app.get("/customers", function (req, res) {
  let city = req.query.city;
  let gender = req.query.gender;
  let payment = req.query.payment;
  let sortBy = req.query.sortBy;
  let arr1 = customersData;
  if (city) {
    arr1 = arr1.filter((c1) => c1.city === city);
  }
  if (gender) {
    arr1 = arr1.filter((st) => st.gender === gender);
  }
  if (payment) {
    arr1 = arr1.filter((st) => st.payment === payment);
  }
  console.log(payment);
  if (sortBy === "age") arr1.sort((st1, st2) => st1.age - st2.age);
  if (sortBy === "payment")
    arr1.sort((st1, st2) => st1.payment.localeCompare(st2.payment));
  if (sortBy === "city")
    arr1.sort((st1, st2) => st1.city.localeCompare(st2.city));
  if (arr1) res.send(arr1);
  else res.status(404).send("No Customer found");
});

app.post("/customers", function (req, res) {
  let body = req.body;
  customersData.push(body);
  res.send(body);
});

app.put("/customers/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let index = customersData.findIndex((st) => st.id === id);
  if (index >= 0) {
    let updateCustomer = { id: id, ...body };
    customersData[index] = updateCustomer;
    res.send(updateCustomer);
  } else res.status(404).send("No Customer Found");
});

app.delete("/customers/:id", function (req, res) {
  let id = req.params.id;
  let index = customersData.findIndex((st) => st.id === id);
  if (index >= 0) {
    let deletedCustomer = customersData.splice(index, 1);
    res.send(deletedCustomer);
  } else res.status(404).send("No Customer Found");
});
