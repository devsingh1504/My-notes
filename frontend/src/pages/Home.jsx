import { useState } from "react";
import AuthModal from "../components/AuthModal";

function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800">My Notes</h1>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Welcome
          </h2>
          <p className="text-slate-500 mt-1">
            Write down whatever is on your mind.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-semibold text-lg text-slate-800">Your Notes</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* demo note - */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-100 border border-yellow-200 rounded-xl p-4 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <h3 className="font-semibold text-lg text-slate-800">
              Create your own note
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Click here to login or sign up and start writing your own notes.
            </p>
            <p className="text-xs text-slate-500 mt-4">Demo note</p>
          </button>
        </div>
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Home;
