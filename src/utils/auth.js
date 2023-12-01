export const KEY_TOKEN = "token";
export const auth = {
  isAuthenticated() {
    if (typeof window !== "undefined" && window.localStorage) {
      return !!localStorage.getItem(KEY_TOKEN);
    }
  },
  signin(data) {
    auth.isAuthenticated = true;
    localStorage.setItem(KEY_TOKEN, data);
  },
  getToken() {
    // if (!auth.isAuthenticated()) return null;
    return localStorage.getItem(KEY_TOKEN);
  },
  signout() {
    auth.isAuthenticated = false;
    localStorage.clear();
  },
};
