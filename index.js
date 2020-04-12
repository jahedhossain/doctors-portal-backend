const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { MongoClient, ObjectID } = require("mongodb");

app.use(bodyParser.json());
app.use(cors());
const uri = process.env.DB_PATH;

app.get("/", (req, res) => res.send("Hello World!"));

// Appointment Post
app.post("/appointment", (req, res) => {
  const appointment = req.body;
  MongoClient.connect(uri, { useUnifiedTopology: true }, function (
    err,
    client
  ) {
    const collection = client.db("appointmentStore").collection("appointments");
    collection.insertOne(appointment, (error, document) => {
      if (error) {
        res.send({ massage: error });
        console.log(error);
      } else {
        res.send(document.ops[0]);
      }
    });
  });
});
// All Appointment Get
app.get("/appointment", (req, res) => {
  MongoClient.connect(uri, { useUnifiedTopology: true }, function (
    err,
    client
  ) {
    const collection = client.db("appointmentStore").collection("appointments");
    collection.find().toArray((error, document) => {
      if (error) {
        res.send({ massage: error });
        console.log(error);
      } else {
        res.send(document);
      }
    });
  });
});

// Appointment Prescription Update
app.put("/updatePrescription", (req, res) => {
  const appointment = req.body;
  console.log(appointment);

  MongoClient.connect(uri, { useUnifiedTopology: true }, function (
    err,
    client
  ) {
    const collection = client.db("appointmentStore").collection("appointments");
    collection.updateOne(
      { _id: new ObjectID(appointment.id) },
      {
        $set: { prescription: appointment.prescription },
      },
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          res.send(result);
        }
      }
    );
  });
});

// Appointment updateStatus Update
app.put("/updateStatus", (req, res) => {
  const updateStatus = req.body;

  MongoClient.connect(uri, { useUnifiedTopology: true }, function (
    err,
    client
  ) {
    const collection = client.db("appointmentStore").collection("appointments");
    collection.updateOne(
      { _id: new ObjectID(updateStatus.id) },
      {
        $set: { status: updateStatus.status },
      },
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          res.send(result);
        }
      }
    );
  });
});

// Appointment visited Update
app.put("/updateVisited", (req, res) => {
  const updateVisited = req.body;

  MongoClient.connect(uri, { useUnifiedTopology: true }, function (
    err,
    client
  ) {
    const collection = client.db("appointmentStore").collection("appointments");
    collection.updateOne(
      { _id: new ObjectID(updateVisited.id) },
      {
        $set: { visited: updateVisited.visited },
      },
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          res.send(result);
        }
      }
    );
  });
});

const port = process.env.PORT || 4200;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
