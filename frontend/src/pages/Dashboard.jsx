import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

const colors = [
  "bg-yellow-100 border-yellow-200",
  "bg-sky-100 border-sky-200",
  "bg-green-100 border-green-200",
  "bg-pink-100 border-pink-200",
  "bg-purple-100 border-purple-200",
];

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const getNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditId(null);
  };

  // create + update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      if (editId) {
        await api.put(`/notes/${editId}`, { title, content });
      } else {
        await api.post("/notes", { title, content });
      }
      resetForm();
      getNotes();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      getNotes();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete note");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        {/* welcome */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Welcome back, {user.name} 👋
          </h2>
          <p className="text-slate-500 mt-1">
            Write down whatever is on your mind.
          </p>
        </div>

        {/* note form */}
        <form
          onSubmit={handleSubmit}
          className={`bg-white rounded-2xl shadow-sm border p-4 sm:p-6 mb-8 ${
            editId
              ? "border-indigo-300 ring-2 ring-indigo-100"
              : "border-slate-200"
          }`}
        >
          <h3 className="font-semibold text-lg text-slate-800 mb-4">
            {editId ? "✏️ Edit Note" : "Add New Note"}
          </h3>

          {error && (
            <p className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg mb-4">
              {error}
            </p>
          )}

          <input
            type="text"
            placeholder="Title"
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <textarea
            placeholder="Write your note here..."
            rows={4}
            maxLength={5000}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-slate-400">
              {content.length}/5000
            </span>

            <div className="flex gap-2">
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition"
              >
                {!editId && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
                {editId ? "Update Note" : "Add Note"}
              </button>
            </div>
          </div>
        </form>

        {/* notes list */}
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-semibold text-lg text-slate-800">Your Notes</h3>
          <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            {notes.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12 text-indigo-600">
            <svg
              className="animate-spin w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="4"
              />
              <path
                d="M22 12a10 10 0 0 0-10-10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ) : notes.length === 0 ? (
          <div className="border-2 border-dashed border-slate-300 rounded-2xl py-12 text-center">
            <p className="text-4xl mb-2">📝</p>
            <p className="font-medium text-slate-700">No notes yet</p>
            <p className="text-sm text-slate-500">
              Add your first note using the form above.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note, index) => (
              <NoteCard
                key={note._id}
                note={note}
                color={colors[index % colors.length]}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
