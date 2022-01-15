<template>
  <div class="container">
    <div v-if="message" class="alert alert-danger" role="alert">
      {{ message }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="content != null" style="margin: 1em">
      {{ content }}
    </div>
    <Form @submit="addUserInfo" :validation-schema="schema">
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row justify-content-center">
          <div class="col-md-5">
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
                  <Field name="sex" as="select" type="text" class="form-control">
                    <option value="" :disabled="getSex() === '- Select Sex -'" selected v-text="getSex()"/>
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
                  <Field name="temperament" as="select" type="text" class="form-control">
                    <option value="" :disabled="getTemperament() === '- Select Temperament -'" selected v-text="getTemperament()"/>
                    <template v-for="t in temperaments" v-bind:key="t" >
                      <option v-bind:value="t" v-if="t !== getTemperament()">{{t}}</option>
                    </template>
                  </Field>
                  <ErrorMessage name="temperament" class="error-feedback" />
                </div>
                <div class="col-md-6"><label class="labels">Status</label>
                  <Field name="status" as="select" type="text" class="form-control">
                    <option value="" :disabled="getStatus() === '- Select Status -'" selected v-text="getStatus()"/>
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
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import ProjectService from "../services/project.service";
import TagService from "../services/tag.service";

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

      // TODO: Загрузка с backend
      sex: [
        "MALE",
        "FEMALE"
      ],
      temperaments: [
        "SANGUINE",
        "CHOLERIC",
        "MELANCHOLIC",
        "PHLEGMATIC"
      ],
      status: [
        "ELITE",
        "UPPER",
        "LOWER",
        "WORKING",
        "POOR"
      ]
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    // if (!this.currentUser) this.$router.push('/login');
    ProjectService.getProfileProjects().then(
        (response) => {
          this.projects = response.data.projectListResponseDto.projects;
          this.connections = response.data.connections;
        },
        (error) => {

          let message = (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          if (message === 'Error: Projects not found') {
            TagService.getCategories().then(
                (response) => {
                  this.tags = response.data;
                  this.content = null;
                },
            );
          } else this.content = message;
        }
    );
    UserService.getUserInfo().then(
        (response) => {
          this.info = response.data;
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
    TagService.getUserTags().then(
        (response) => {
          response.data.forEach(
              tag =>
                  this.added_tags.tags.push({
                    'tagName': tag.tagName,
                    'categoryName': ''
                  })
          );
          TagService.getCheckedTags(this.added_tags).then(
              (response) => {

                this.tags = response.data;
              });
        },
        (error) => {
          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            EventBus.dispatch("logout");
          }

          let message = (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          if (message === 'Error: Tags Not Found') {
            TagService.getCategories().then(
                (response) => {
                  this.tags = response.data;
                  this.content = null;
                },
            );
          } else this.content = message;

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
    addUserInfo(user) {
      UserService.addUserInfo(user).then(
          (response) => {
            this.info = response.data;
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
              EventBus.dispatch("logout");
            }
          }
      );
    },
    addTagToUser(tag) {
      TagService.addTagToUser(tag).then(
          () => {
            this.added_tags.tags.push({
              'tagName': tag.tagName,
              'categoryName': ''
            });
            TagService.getCheckedTags(this.added_tags).then(
                (response) => {
                  this.tags = response.data;
                });
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
              EventBus.dispatch("logout");
            }
          }
      );
    },
  },
};
</script>

<style>
.error-feedback {
  color: red;
}
</style>