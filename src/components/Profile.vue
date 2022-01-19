<template>
  <div class="container">
    <div v-if="message" class="alert alert-danger" role="alert">
      {{ message }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="content != null" style="margin: 1em">
      {{ content }}
    </div>
    <Form @submit="changeDoctor" :validation-schema="schema">
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="col-md-5 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">My Profile</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <span class="font-weight-normal" v-if="info != null">User: {{ info.username }}</span>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-6"><label class="labels">Name</label>
                  <Field name="name" type="text" class="form-control" v-bind:placeholder="getName()" />
                  <ErrorMessage name="name" class="error-feedback" />
                </div>
                <div class="col-md-6"><label class="labels">Surname</label>
                  <Field name="surname"  type="text" class="form-control" v-bind:placeholder="getSurname()" />
                  <ErrorMessage name="surname" class="error-feedback" />
                </div>
              </div>
              <div class="row mt-1">
                <div class="col-md-6"><label class="labels">Sex</label>
                  <Field name="sex" as="select" class="form-control">
                    <option :value="getSex()" :disabled="getSex() === '- Select Sex -'" selected v-text="getSex()"/>
                    <template v-for="s in sex" v-bind:key="s" >
                      <option v-bind:value="s" v-if="s !== getSex()">{{s}}</option>
                    </template>
                  </Field>
                  <ErrorMessage name="sex" class="error-feedback" />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-6"><label class="labels">Race</label>
                  <Field name="race" type="text" class="form-control" v-bind:placeholder="getRace()" />
                  <ErrorMessage name="race" class="error-feedback" />
                </div>
                <div class="col-md-6"><label class="labels">Gender</label>
                  <Field name="gender" type="text" class="form-control" v-bind:placeholder="getGender()" />
                  <ErrorMessage name="gender" class="error-feedback" />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-6"><label class="labels">Temperament</label>
                  <Field name="temperament" as="select" class="form-control">
                    <option :value="getTemperament()" :disabled="getTemperament() === '- Select Temperament -'" selected v-text="getTemperament()"/>
                    <template v-for="t in temperaments" v-bind:key="t" >
                      <option v-bind:value="t" v-if="t !== getTemperament()">{{t}}</option>
                    </template>
                  </Field>
                  <ErrorMessage name="temperament" class="error-feedback" />
                </div>
                <div class="col-md-6"><label class="labels">Status</label>
                  <Field name="status" as="select" class="form-control">
                    <option :value="getStatus()" :disabled="getStatus() === '- Select Status -'" selected v-text="getStatus()"/>
                    <template v-for="s in status" v-bind:key="s" >
                      <option v-bind:value="s" v-if="s !== getStatus()">{{s}}</option>
                    </template>
                  </Field>
                  <ErrorMessage name="status" class="error-feedback" />
                </div>
              </div>

              <div class="mt-5 text-center">
                <div class="form-group">
                  <button class="btn btn-primary btn-block" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span v-text="checkInfo()"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-7">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Events</h4>
              </div>
              <div class="table-responsive"  style="margin: 1em">
                <table class="table table-striped table-hover border overflow-auto" style="font-size: 0.9em">
                  <thead class="text-center">
                    <tr>
                      <th v-for="head in events.header" v-bind:key="head" scope="col">{{head}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="event in events.rows" v-bind:key="event">
                      <tr :style="[event.isGood != null ? (event.isGood ? {background: '#4CAF50'} : {background: '#F44336'}) : {}]">
                        <td>{{event.eventId}}</td>
                        <td class="left-border">{{event.locationName}}</td>
                        <td class="left-border">{{event.name}}</td>
                        <td>{{event.description}}</td>
                        <td class="left-border">{{formatDate(event.date)}}</td>
                        <td class="left-border flex-wrap-reverse">
                          <div class="input-group justify-content-center">
                            <div class="input-group-prepend">
                              <button @click="UpdateEvent(event.eventId, true)" class="btn btn-outline-secondary btn-sm green" type="button">Yes</button>
                            </div>
                            <div class="input-group-append">
                              <button @click="UpdateEvent(event.eventId, false)" class="btn btn-outline-secondary btn-sm red" type="button">No</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>

              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Property</h4>
              </div>
              <div class="table-responsive"  style="margin: 1em">
                <table class="table table-striped table-hover border overflow-auto" style="font-size: 0.9em">
                  <thead class="text-center">
                  <tr>
                    <th v-for="head in property.header" v-bind:key="head" scope="col">{{head}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <template v-for="opinion in property.rows" v-bind:key="opinion">
                    <tr :style="[opinion.isGood != null ? (opinion.isGood ? {background: '#4CAF50'} : {background: '#F44336'}) : {}]">
                      <td>{{opinion.id}}</td>
                      <td class="left-border">{{opinion.name}}</td>
                      <td>{{opinion.description}}</td>
                      <td class="left-border flex-wrap-reverse" >
                        <div class="input-group justify-content-center">
                          <div class="input-group-prepend">
                            <button @click="UpdateProperty(opinion.id, true)" class="btn btn-outline-secondary btn-sm green" type="button">Yes</button>
                          </div>
                          <div class="input-group-append">
                            <button @click="UpdateProperty(opinion.id, false)" class="btn btn-outline-secondary btn-sm red" type="button">No</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import DoctorService from "@/services/doctor.service";
import EventBus from "@/common/EventBus";
// import EventBus from "../common/EventBus";

export default {
  name: 'Profile',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required(),
      surname: yup
          .string()
          .required(),
      sex: yup
          .string()
          .required(),
      race: yup
          .string()
          .required("Race is required!")
          .max(64, "There should be no more than 64 characters!"),
      gender: yup
          .string(),
      temperament: yup
          .string()
          .required("Temperament required!")
          .nullable()
      ,
      status: yup
          .string()
          .required("Status required!")
          .nullable()
    });
    return {
      tags: null,
      connections: [],
      added_tags: {
        'tags' : []
      },
      info: null,
      content: null,
      message: null,
      projects: null,
      loading: false,
      schema,
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      sex: [],
      temperaments: [],
      status: [],

      events: {
        header: ["#", "Location", "Name", "Description", "Date", "Good?"],
        rows: [{id: 1, locationName: "fdsfdsfsdХЗ", name: "Хfdsfdsfsdз2", description: "Что-fdsfdsfто там такое!", date: "17.01.2123"},
          {id: 2, locationName: "ХЗ", name: "Хз2", description: "Что-то там такое!", date: "17.01.2123"}]
      },

      property: {
        header: ["#", "Name", "Description", "Good?"],
        rows: [{id: 1, name: "fdsfds", description: "safeswqfjewifwe"}]
      }
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) this.$router.push('/login');

    DoctorService.getDoctorId().then(
        (response) => {
          localStorage.setItem("doctorId", response.data);
        },
        (error) => {

          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            EventBus.dispatch("logout");
          }

          if (error.response && error.response.status === 404) {
            this.$router.push("/register/doctor");
          }

          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
    DoctorService.getEvents().then(
        (response) => {
          this.events.rows = response.data
        },
        (error) => {

          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            EventBus.dispatch("logout");
          }

          if (error.response && error.response.status === 404) {
            this.$router.push("/register/doctor");
          }

          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
    DoctorService.getProperties(localStorage.getItem("doctorId")).then(
        (response) => {
          this.property.rows = response.data
        },
        (error) => {

          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            EventBus.dispatch("logout");
          }

          if (error.response && error.response.status === 404) {
            this.$router.push("/register/doctor");
          }

          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
    DoctorService.getEnumOfSex().then(
        (response) => {
          this.sex = response.data;
        },
        (error) => {
          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            EventBus.dispatch("logout");
          }

          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );

    DoctorService.getEnumOfTemperament().then(
        (response) => {
          this.temperaments = response.data;
        },
        (error) => {
          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            EventBus.dispatch("logout");
          }

          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );

    DoctorService.getEnumOfStatus().then(
        (response) => {
          this.status = response.data;
        },
        (error) => {
          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            EventBus.dispatch("logout");
          }

          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );


  },
  methods: {
    formatDate: d => new Date (d).toLocaleString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    getName() {
      return this.info == null  || this.info.name == null ? 'Write your name' : this.info.name;
    },
    getSurname() {
      return this.info == null  || this.info.surname == null ? 'Write your surname' : this.info.surname;
    },
    getSex() {
      return this.info == null  || this.info.sex == null ? '- Select Sex -' : this.info.sex;
    },
    getRace(){
      return this.info == null  || this.info.race == null ? 'Write you Race' : this.info.race;
    },
    getGender(){
      return this.info == null  || this.info.gender == null ? 'Write you Gender' : this.info.gender;
    },
    getTemperament(){
      return this.info == null  || this.info.temperament == null ? '- Select Temperament -' : this.info.temperament;
    },
    getStatus(){
      return this.info == null  || this.info.status == null ? '- Select Status -' : this.info.status;
    },
    checkInfo() {
      return this.info == null ||
          this.info.name == null &&
          this.info.surname == null &&
          this.info.sex == null &&
          this.info.race == null &&
          this.info.gender == null &&
          this.info.temperament == null &&
          this.info.status == null ? 'Add doctor info' : 'Update doctor info';
    },
    changeDoctor(doctor) {
      DoctorService.registerDoctor(doctor).then(
          () => {
            this.content = 'Doctor is updated'
          },
          (error) => {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
              EventBus.dispatch("logout");
            }

            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
    },
    UpdateEvent(event, bool) {
      DoctorService.updateEvent(event, bool).then(
          () => {
            DoctorService.getEvents().then(
                (response) => {
                  this.events.rows = response.data
                },
                (error) => {
                  if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                    EventBus.dispatch("logout");
                  }

                  if (error.response && error.response.status === 404) {
                    this.$router.push("/register/doctor");
                  }

                  this.content =
                      (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                      error.message ||
                      error.toString();
                }
            );
          },
          (error) => {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
              EventBus.dispatch("logout");
            }

            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
    },
    UpdateProperty(property, bool) {
      DoctorService.updateProperty(property, bool).then(
          () => {
            DoctorService.getProperties(localStorage.getItem("doctorId")).then(
                (response) => {
                  this.property.rows = response.data
                },
                (error) => {

                  if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                    EventBus.dispatch("logout");
                  }

                  if (error.response && error.response.status === 404) {
                    this.$router.push("/register/doctor");
                  }

                  this.content =
                      (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                      error.message ||
                      error.toString();
                }
            );
          },
          (error) => {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
              EventBus.dispatch("logout");
            }

            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
    },
  },
};
</script>

<style>
.error-feedback {
  color: red;
}

.red {
  background-color: #F44336;
  color: white;
}

.green {
  background-color: #4CAF50;
  color: white;
}

.input-group {
  flex-wrap: nowrap;
}

.left-border {
  border-left: 1px solid rgba(34,36,38,.1) !important;
}
</style>