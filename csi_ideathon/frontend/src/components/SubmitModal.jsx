import React from 'react';

export default function SubmitModal({ form, setForm, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">✏️ Submit Your Idea</h3>
        <input
          className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-blue-300 outline-none"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-blue-300 outline-none"
          rows={6}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
        />
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg border hover:bg-gray-100" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
