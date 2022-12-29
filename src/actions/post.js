import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  CREATE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('https://code-aid.onrender.com/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatchPostError(dispatch, error);
  }
};

// Create a post
export const createPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`https://code-aid.onrender.com/api/posts`, formData, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post created', 'success'));
  } catch (error) {
    dispatchPostError(dispatch, error);
  }
};

// Like a post
export const likePost = id => async dispatch => {
  try {
    const res = await axios.put(`https://code-aid.onrender.com/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatchPostError(dispatch, error);
  }
};

// Unike a post
export const unlikePost = id => async dispatch => {
  try {
    const res = await axios.put(`https://code-aid.onrender.com/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatchPostError(dispatch, error);
  }
};

// Delete a post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`https://code-aid.onrender.com/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('Post deleted', 'success'));
  } catch (error) {
    dispatchPostError(dispatch, error);
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`https://code-aid.onrender.com/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatchPostError(dispatch, error);
  }
};

// Add a comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `https://code-aid.onrender.com/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment added', 'success'));
  } catch (error) {
    dispatchPostError(dispatch, error);
  }
};

// Remove a comment
export const removeComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`https://code-aid.onrender.com/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment removed', 'success'));
  } catch (error) {
    dispatchPostError(dispatch, error);
  }
};

const dispatchPostError = (dispatch, error) => {
  console.log(error.response);
  dispatch({
    type: POST_ERROR,
    payload: {
      msg: error.response.statusText,
      status: error.response.status,
    },
  });
};
