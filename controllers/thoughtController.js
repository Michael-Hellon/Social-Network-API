const { Thought, User } = require('../models');

module.exports = {

// get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find()

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }, 

// get thoughts by ID
  async getThoughtById(req, res) {
    try {
      const thoughts = await Thought.findOne(
        { _id: req.params.thoughtId})
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v")

      if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// create / add thought
  async createThought(req, res) {
    try {
      const thoughts = await Thought.create(req.body);

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// update thoughts
  async updateThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
    if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// delete thoughts
  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.status(200).json({ message: 'thought and user deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
  },

// add reaction
  async addReaction(req, res) {
    try {
      const reaction = await Reaction.create(reg.body);

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
  
      res.status(200).json({ message: 'Reaction added', reaction});

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// delete reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionID });

      if (!reaction) {
      return res.status(404).json({ message: 'No reaction with that ID' });
    }

    res.json({ message: 'reaction deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
  },
}