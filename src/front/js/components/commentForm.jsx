import React, { useState } from "react";

export const CommentForm = ({ videoId, newComment, setNewComment, handleAddComment, handleKeyDown }) => {
  return (
    <div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full ps-4 pt-2 bg-black text-white rounded-3xl h-20 border border-white break-words"
        placeholder="Añade un comentario ..."
      />
      <button onClick={handleAddComment} className="mt-2 text-blue-500">
        Comentar
      </button>
    </div>
  );
};
