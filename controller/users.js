const fs = require("fs");

// Load HTML and JSON files
//const index = fs.readFileSync("index.html", "utf-8");
const model = require("../Model/user");
const User = model.User;
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); //    const Users = await User.find({price:{$gt:500}});

    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id); //  const User =await User.findById(mongoose.isObjectIdOrHexString(id))

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.replaceUser = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await User.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
};
