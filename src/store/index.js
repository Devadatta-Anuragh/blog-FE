import { createStore } from 'redux';
import blogPostReducer from './blogpost/search/blogPostReducer';

const store = createStore(blogPostReducer);

export default store;
