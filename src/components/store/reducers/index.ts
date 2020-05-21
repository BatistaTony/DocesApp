import { combineReducers } from "redux";
import Menu from "./menu";
import Search from "./search";
import login from "./login";
import user from "./user";
import cake from "./cake";
import cart from './cart'
import story from './story'
import stories from './stories'

const allReducers = combineReducers({
  Menu,
  Search,
  login,
  user,
  cake,
  cart,
  story,
  stories
});

export default allReducers;
