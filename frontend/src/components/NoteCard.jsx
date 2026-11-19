function NoteCard({ note, color, onEdit, onDelete }) {
  return (
    <div
      className={`${color} border rounded-xl p-4 flex flex-col shadow-sm hover:shadow-md hover:-translate-y-0.5 transition`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-lg text-slate-800 break-words">
          {note.title}
        </h3>

        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onEdit(note)}
            title="Edit"
            className="p-1.5 rounded-md text-slate-500 hover:bg-white/70 hover:text-indigo-600 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(note._id)}
            title="Delete"
            className="p-1.5 rounded-md text-slate-500 hover:bg-white/70 hover:text-red-600 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-slate-600 text-sm mt-2 whitespace-pre-wrap break-words flex-1">
        {note.content || (
          <span className="italic text-slate-400">No content</span>
        )}
      </p>

      <p className="text-xs text-slate-500 mt-4">
        {new Date(note.updatedAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
}

export default NoteCard;
