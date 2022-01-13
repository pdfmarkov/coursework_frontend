import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login({ username, password }) {
    console.log(username + ' : ' + password)
    return 0

    // TODO: Исправить
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

  registerDoctor({name, surname, sex, race, gender, temperament, status}){
    return api.put("/auth/savedoctor", {
      name,
      surname,
      sex,
      race,
      gender,
      temperament,
      status
    });
  }
}

export default new AuthService();
