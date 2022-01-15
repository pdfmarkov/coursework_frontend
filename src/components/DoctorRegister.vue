<template>
  <div class="col-md-12">
    <div class="card card-container">
      <p class="font-weight-bold text-center" style="font-size: x-large">Doctor's Parameters</p>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="doctor_name">Name</label>
            <Field name="doctor_name" type="text" class="form-control"/>
            <ErrorMessage name="doctor_name" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="doctor_surname">Surname</label>
            <Field name="doctor_surname" type="text" class="form-control" />
            <ErrorMessage name="doctor_surname" class="error-feedback" />
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
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      doctor_name: yup
          .string()
          .required("Name is required!")
          .min(4, "Must be at least 4 characters!")
      ,
      doctor_surname: yup
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
      message: "",
      schema,

      // TODO: Загрузка списков из БД (пока что тестовые значения)
      selectSex: null,
      selectTemperament: null,
      selectStatus: null,
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
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    // if (!this.loggedIn) this.$router.push("/home");
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      // TODO: Убрать когда будет backend
      this.$router.push("/home")

      this.$store.dispatch("auth/registerDoctor", user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
            this.loading = false;
          }
      );
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