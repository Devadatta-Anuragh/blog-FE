import {
  CLEAR,
  FETCH_BLOGS,
  SEARCH_BY_CATEGORY,
  SEARCH_BY_KEYWORD,
} from './actionTypes';

export const initialState = {
  blogs: [],
  posts: [], // Added posts array for searchBlogs
};

export default function blogPostReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BY_KEYWORD:
      const KEYWORD = action.payload.keyword.toLowerCase();
      let result = state.blogs.filter((obj) => {
        return obj.title.toLowerCase().includes(KEYWORD);
      });

      if (!KEYWORD) {
        result = [...state.blogs];
      }

      return {
        ...state,
        posts: [...result],
      };

    case FETCH_BLOGS:
      const posts = action.payload.posts.posts;
      return {
        ...state,
        blogs: [...posts],
      }

    case SEARCH_BY_CATEGORY:
      const CATEGORY_KEYWORD = action.payload.keyword.toLowerCase();
      let resultArray = state.posts.filter((obj) => {
        return obj.category.toLowerCase().includes(CATEGORY_KEYWORD);
      });

      if (!CATEGORY_KEYWORD) {
        resultArray = [...state.blogs];
      }

      return {
        ...state,
        blogs: [...resultArray],
      };

    case CLEAR:
      return {
        ...state,
        blogs: [],
      };

    default:
      return state;
  }
}
