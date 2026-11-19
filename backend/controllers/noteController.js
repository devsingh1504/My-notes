import mongoose from "mongoose";
import Note from "../models/Note.js";

// GET /api/notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch notes" });
  }
};

// GET /api/notes/:id
export const getNote = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch note" });
  }
};

// POST /api/notes
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (title.length > 100) {
      return res
        .status(400)
        .json({ message: "Title can be at most 100 characters" });
    }
    if (content && content.length > 5000) {
      return res
        .status(400)
        .json({ message: "Content can be at most 5000 characters" });
    }

    const note = await Note.create({ title, content, user: req.user._id });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Could not create note" });
  }
};

// PUT /api/notes/:id
export const updateNote = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const { title, content } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (title.length > 100) {
      return res
        .status(400)
        .json({ message: "Title can be at most 100 characters" });
    }
    if (content && content.length > 5000) {
      return res
        .status(400)
        .json({ message: "Content can be at most 5000 characters" });
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content },
      { new: true, runValidators: true },
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Could not update note" });
  }
};

// DELETE /api/notes/:id
export const deleteNote = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete note" });
  }
};
