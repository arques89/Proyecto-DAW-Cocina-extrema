// src/store/vlogDetailsStore.js

export const getVlogDetailsStore = ({ getStore, getActions, setStore }) => {
    return {
      store: {
        videoDetails: null,
        comments: [],
        favorites: [],
        likes: [],
      },
      actions: {
        setVideoDetails: (videoDetails) => {
          setStore({ videoDetails });
        },
        setComments: (comments) => {
          setStore({ comments });
        },
        setFavorites: (favorites) => {
          setStore({ favorites });
        },
        setLikes: (likes) => {
          setStore({ likes });
        },
      },
    };
  };
  