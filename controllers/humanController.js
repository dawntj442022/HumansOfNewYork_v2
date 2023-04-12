const express = require("express");
const router = express.Router();

const Human = require("../models/humans");

router.use((req, res, next) => {
  console.log("session", req.session);

  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});

// Index
router.get("/", (req, res) => {
  Human.find({}, (error, allHumans) => {
    res.render("humans/Index", {
      humans: allHumans,
    });
  });
});

// Update
router.put("/:id", (req, res) => {
  if (req.body.postToPublic === "on") {
    req.body.postToPublic = true;
  } else {
    req.body.postToPublic = false;
  }
  Human.findByIdAndUpdate(req.params.id, req.body, (err, updatedHuman) => {
    if (err) {
      return res.send({ error: err });
    }
    console.log("updatedHuman", updatedHuman);
    res.redirect(`/humans/${req.params.id}`);
  });
});

// Edit
router.get("/:id/edit", (req, res) => {
  Human.findById(req.params.id, (err, foundHuman) => {
    if (!err) {
      res.render("humans/Edit", {
        human: foundHuman,
      });
    } else {
      res.send({ msg: err.message });
    }
  });
});

// Create
router.post("/", (req, res) => {
  if (req.body.postToPublic === "on") {
    req.body.postToPublic = true;
  } else {
    req.body.postToPublic = false;
  }
  Human.create(req.body, (error, createdHuman) => {
    res.redirect("/humans"); // sends to /logs get route
  });
});

// Delete
router.delete("/:id", (req, res) => {
  Human.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/humans");
  });
});

router.get("/new", (req, res) => {
  res.render("humans/New");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Human.findById(id, (error, foundHuman) => {
    res.render("humans/Show", {
      human: foundHuman,
    });
  });
});
