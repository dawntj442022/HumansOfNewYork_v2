const express = require("express");
const router = express.Router();
const Human = require("../models/human");

router.get("/", async (req, res) => {
  try {
    const humans = await Human.find({}).sort({ createdAt: "desc" }).exec();
    res.json(humans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { title, entry, postToPublic, image } = req.body;
  const human = new Human({
    title,
    entry,
    postToPublic,
    image,
  });

  try {
    await human.save();
    res.json(human);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { title, entry, postToPublic, image } = req.body;

  try {
    const human = await Human.findOne({ _id: req.params.id });
    if (human) {
      human.title = title || human.title;
      human.entry = entry || human.entry;
      human.postToPublic = postToPublic || human.postToPublic;
      human.image = image || human.image;

      await human.save();
      res.json(human);
    } else {
      res.status(404).json({ error: "Human not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const human = await Human.findOne({ _id: req.params.id });
    if (human) {
      await human.remove();
      res.json({ message: "Human removed" });
    } else {
      res.status(404).json({ error: "Human not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
