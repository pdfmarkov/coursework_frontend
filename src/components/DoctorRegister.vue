<template>
  <div class="col-md-12">
    <div class="card card-container">
      <p class="font-weight-bold text-center" style="font-size: x-large">Doctor's Parameters</p>
      <Form @submit="registerDoctor" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Name</label>
            <Field name="name" type="text" class="form-control"/>
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="surname">Surname</label>
            <Field name="surname" type="text" class="form-control" />
            <ErrorMessage name="surname" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="sex">Sex</label>
            <Field name="sex" as="select" v-model="selectSex" class="form-control" >
              <option value="" disabled selected>- Select Sex -</option>
              <option v-for="s in sex" v-bind:key="s" v-bind:value="s">{{s}}</option>
            </Field>
            <ErrorMessage name="sex" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="race">Race</label>
            <Field name="race" type="text" class="form-control" />
            <ErrorMessage name="race" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <Field name="gender" type="text" class="form-control" />
            <ErrorMessage name="gender" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="temperament">Temperament</label>
            <Field name="temperament" as="select" v-model="selectTemperament" class="form-control" >
              <option value="" disabled selected>- Select Temperament -</option>
              <option v-for="temp in temperaments" v-bind:key="temp" v-bind:value="temp">{{temp}}</option>
            </Field>
            <ErrorMessage name="temperament" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <Field name="status" as="select" v-model="selectStatus" class="form-control" >
              <option value="" disabled selected>- Select Status -</option>
              <option v-for="st in status" v-bind:key="st" v-bind:value="st">{{st}}</option>
            </Field>
            <ErrorMessage name="status" class="error-feedback" />
          </div>


          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
              ></span>
              Save
            </button>
          </div>
        </div>
      </Form>

      <div
          v-if="content"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import DoctorService from "../services/doctor.service";
import EventBus from "@/common/EventBus";


export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required("Name is required!")
          .min(4, "Must be at least 4 characters!")
      ,
      surname: yup
          .string()
          .required("Surname is required!")
          .min(4, "Must be at least 4 characters!")
      ,
      sex: yup
          .string()
          .required("Sex is required!")
          .nullable()
      ,
      race: yup
          .string()
          .required("Race is required!")
          .min(4, "Must be at least 4 characters!")
          .max(64, "There should be no more than 64 characters!")
      ,
      gender: yup
          .string()
          .required("Gender is required!")
      ,
      temperament: yup
          .string()
          .required("Temperament required!")
          .nullable()
      ,
      status: yup
          .string()
          .required("Status required!")
          .nullable()
      ,
    });

    return {
      successful: false,
      loading: false,
      content: "",
      schema,

      selectSex: null,
      selectTemperament: null,
      selectStatus: null,
      sex: [],
      temperaments: [],
      status: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) this.$router.push('/login');

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
    registerDoctor(doctor) {
      DoctorService.registerDoctor(doctor).then(
          (response) => {
            localStorage.setItem("doctorId", response.data.humanId);
            this.$router.push("/home");
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

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 450px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.error-feedback {
  color: red;
}
</style>