import React from "react";

export const CommentCard = ({ comment, onDelete }) => {
  const { text, timestamp } = comment;

  return (
    <div className="flex items-start space-x-4 mt-4 mb-4 break-words">
      <div>
        <p className="text-gray-400 text-sm">
          {new Date(timestamp).toLocaleString()}
        </p>
        <p>{text}</p>
        <button onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};
