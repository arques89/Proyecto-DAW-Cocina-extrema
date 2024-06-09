import React from "react";

export const CommentCard = ({ comment, currentUserId, onDelete }) => {
  const { text, timestamp, user } = comment;

  return (
    <div className="flex items-start space-x-4 mt-4 mb-4 break-words">
      <img
        src="../../img/img_home/bottle.webp"
        alt="User avatar"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p>
          <strong>{user?.name ?? "Anónimo"} {user?.surname ?? ""}</strong>
        </p>
        <p className="text-gray-400 text-sm">
          {new Date(timestamp).toLocaleString()}
        </p>
        <p>{text}</p>
        {currentUserId === comment.user_id && (
          <button onClick={onDelete}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};