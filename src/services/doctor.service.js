import api from "./api";

class DoctorService {

    getDoctor() {
        return api.get("/main/get/doctor");
    }

    getDoctorId() {
        return api.get("/main/get/doctor/id");
    }

    getPage(number) {
        return api.get(`/main/get/page?number=${number}`);
    }

    getNumberOfPages() {
        return api.get(`/main/get/number/page`);
    }

    getEnumOfSex() {
        return api.get("/main/get/enum/sex");
    }

    getEnumOfTemperament() {
        return api.get("/main/get/enum/temperament");
    }

    getEnumOfStatus() {
        return api.get("/main/get/enum/status");
    }

    getEnumOfTypeOfRelations() {
        return api.get("/main/get/enum/typeOfRelations");
    }

    getEnumOfTypeOfWish() {
        return api.get("/main/get/enum/typeOfWish");
    }

    registerDoctor({name, surname, sex, race, gender, temperament, status}) {
        return api
            .post("/main/register/doctor",{
                name,
                surname,
                sex,
                race,
                gender,
                temperament,
                status
            })
    }

}

export default new DoctorService();