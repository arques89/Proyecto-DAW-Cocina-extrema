// src/store/vlogDetailsActions.js

import { API_BASE_URL } from '../config';

export const getVlogDetailsActions = (getStore, getActions, setStore) => {
  return {
    getVideoVlogDetails: async (videoId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}/videoVlogDetails`);
        if (!response.ok) throw new Error('Error fetching video');
        const data = await response.json();
        setStore({ videoDetails: data });
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    },
    getCommentsVlogDetails: async (videoId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}/commentsVlogDetails`);
        if (!response.ok) throw new Error('Error fetching comments');
        const data = await response.json();
        setStore({ comments: data });
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    getFavoritesVlogDetails: async (videoId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}/favoriteVlogDetails`);
        if (!response.ok) throw new Error('Error fetching favorites');
        const data = await response.json();
        setStore({ favorites: data });
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    },
    getLikesVlogDetails: async (videoId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}/likeVlogDetails`);
        if (!response.ok) throw new Error('Error fetching likes');
        const data = await response.json();
        setStore({ likes: data });
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    },
    addCommentVlogDetails: async (videoId, text, userId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}/commentsVlogDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, user_id: userId }),
        });
        if (!response.ok) throw new Error('Error adding comment');
        getActions().getCommentsVlogDetails(videoId);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
    toggleFavoriteVlogDetails: async (videoId, userId, isFavorite) => {
      try {
        const method = isFavorite ? 'DELETE' : 'POST';
        const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}/favoriteVlogDetails`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });
        if (!response.ok) throw new Error(`Error ${isFavorite ? 'removing' : 'adding'} favorite`);
        getActions().getFavoritesVlogDetails(videoId);
      } catch (error) {
        console.error(`Error ${isFavorite ? 'removing' : 'adding'} favorite:`, error);
      }
    },
    toggleLikeVlogDetails: async (videoId, userId, isLiked) => {
      try {
        const method = isLiked ? 'DELETE' : 'POST';
        const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}/likeVlogDetails`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });
        if (!response.ok) throw new Error(`Error ${isLiked ? 'removing' : 'adding'} like`);
        getActions().getLikesVlogDetails(videoId);
      } catch (error) {
        console.error(`Error ${isLiked ? 'removing' : 'adding'} like:`, error);
      }
    },
  };
};
