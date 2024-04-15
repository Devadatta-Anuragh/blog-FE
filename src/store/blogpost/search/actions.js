import {
  CLEAR,
  SEARCH_BY_CATEGORY,
  SEARCH_BY_KEYWORD,
  FETCH_BLOGS
} from './actionTypes';

export function searchByKeyword(keyword) {
  return {
    type: SEARCH_BY_KEYWORD,
    payload: {
      keyword: keyword,
    },
  };
}

export function fetchBlogs(posts) {
  return {
    type: FETCH_BLOGS,
    payload: {
      posts: posts,
    }
  };
}


export function searchByCategory(keyword, show) {
  return {
    type: SEARCH_BY_CATEGORY,
    payload: {
      keyword: keyword,
      show: show,
    },
  };
}


export function clear() {
  return {
    type: CLEAR,
  };
}
