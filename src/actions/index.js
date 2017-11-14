import axios from 'axios';
import { StitchClient } from 'mongodb-stitch';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=LJONES140';

const client = new StitchClient('blogging_platform-yhkse');
const db = client.service('mongodb', 'mongodb-atlas').db('blog');

export function fetchPosts() {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  let request = []

  client.login().then(() => db.collection('posts').find({})).then(x => request = x);
    .then(posts => {
      request = posts
    });

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function createPost(values, callback) {
  // const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
  //   .then(() => callback());

  const request = db.collection('posts').insert(
    {
      owner_id : client.authedId(),
      title: values.title,
      categories: values.categories,
      content: values.content
    }).then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  }
}
