import { combineReducers } from "redux";
import Menu from "./menu";
import Search from "./search";
import user from "./user";
import cake from "./cake";
import cart from './cart'
import story from './story'
import stories from './stories'

const allReducers = combineReducers({
  Menu,
  Search,
  user,
  cake,
  cart,
  story,
  stories,
});

export default allReducers;
