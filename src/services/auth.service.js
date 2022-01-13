import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login({ username, password }) {
    console.log(username + ' : ' + password)
    return 0
    // return apiок
    //   .post("/auth/signin", {
    //     username,
    //     password
    //   })
    //   .then((response) => {
    //     if (response.data.token) {
    //       TokenService.setUser(response.data);
    //     }
    //
    //     return response.data;
    //   });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, password }) {
    return api.post("/auth/signup", {
      username,
      password
    });
  }
}

export default new AuthService();
