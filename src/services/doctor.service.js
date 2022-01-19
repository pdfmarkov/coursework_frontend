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

    getEvents() {
        return api.get(`/main/get/events`);
    }

    getProperties() {
        return api.get(`/main/get/properties`);
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

    changeDoctor({name, surname, sex, race, gender, temperament, status}) {
        return api
            .post("/main/change/doctor",{
                name,
                surname,
                sex,
                race,
                gender,
                temperament,
                status
            })
    }

    updateEvent(eventId, isGood) {
        return api
            .post("/main/change/event",{
                eventId,
                isGood
            })
    }

    updateProperty(propertyId, isGood) {
        return api
            .post("/main/change/property",{
                propertyId,
                isGood
            })
    }

    changeWishes(id) {
        return api
            .post("/god/change/wish",{
                id
            })
    }

    realizeWishes(id) {
        return api
            .post("/god/realize/wish",{
                id
            })
    }

    magic() {
        return api
            .get("/god/dammit")
    }

}

export default new DoctorService();