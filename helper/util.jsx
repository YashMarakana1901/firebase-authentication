import { TOKEN } from "./constant";
import Cookies from "js-cookie";

const setToken = (token) => {
  return Cookies.set(TOKEN, token);
};

const getItemFromCookie = (key) => {
  return Cookies.get(key);
};

const removeItemInCookie = (key) => Cookies.remove(key);

export { setToken, getItemFromCookie, removeItemInCookie };
