import React from "react";

export const CommentCard = ({ comment, currentUserId, onDelete }) => {
  const { text, timestamp, user_id } = comment;

  return (
    <div className="flex items-start space-x-4 mb-2 break-words">
      <div>
        <p className="text-gray-400 text-sm">
          {new Date(timestamp).toLocaleString()}
        </p>
        <p className="mt-4">{text}</p>
        {user_id === currentUserId && (
          <button onClick={onDelete} className="text-shape_red mt-2">
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
