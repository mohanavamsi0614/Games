import React from 'react';

export default function IdeaCard({ idea, disabled, onVote }) {
  return (
    <article className={`p-4 rounded-xl border transition ${disabled ? 'border-gray-200 bg-gray-50' : 'bg-white hover:shadow-lg'}`}>
      <h3 className="font-bold text-lg text-gray-800">{idea.title}</h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{idea.description}</p>
      <div className="flex items-center justify-between mt-3">
        <small className="text-xs text-gray-500">By {idea.author}</small>
        <button
          className={`px-3 py-1 rounded-lg text-sm ${disabled ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          disabled={disabled}
          onClick={() => onVote && onVote(idea._id)}
        >
          {disabled ? 'Voted' : 'Vote'}
        </button>
      </div>
    </article>
  );
}
