<template>
<!--  <form class="d-flex" style="margin: 1em">-->
<!--    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="name">-->
<!--    <button class="btn btn-outline-success" type="button" @click="search">Search</button>-->
<!--  </form>-->
  <div class="alert alert-danger" role="alert" v-if="content != null" style="margin: 1em">
    {{ content }}
  </div>

  <nav class="justify-content-center" v-if="humans.length" style="margin: 1em; display: flex">
    <button @click="magic()" class="btn btn-danger btn-rounded" type="button"> MAGIC </button>
  </nav>

  <div class="table-responsive" v-if="humans.length" style="margin: 1em">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">
            <a>#</a>
          </th>
          <th scope="col">
            <a>Name</a>
          </th>
          <th scope="col">
            <a>Surname</a>
          </th>
          <th scope="col">
            <a>Location</a>
          </th>
          <th scope="col">
            <a>Real?</a>
          </th>
          <th scope="col">
            <a>Doctor?</a>
          </th>
          <th scope="col">
            <a>Sex</a>
          </th>
          <th scope="col">
            <a>Race</a>
          </th>
          <th scope="col">
            <a>Gender</a>
          </th>
          <th scope="col">
            <a>Temperament</a>
          </th>
          <th scope="col">
            <a>Status</a>
          </th>
          <th scope="col">
            <a>BirthDate</a>
          </th>
          <th scope="col">
            <a>DeathDate</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="human in humans" v-bind:key="human.id">
          <tr @click="toggle(human.id)" :class="{opened : human.id in opened}">
            <td>{{human.id}}</td>
            <td class="left-border">{{human.name}}</td>
            <td>{{human.surname}}</td>
            <td class="left-border">{{human.locationName}}</td>
            <td><span class="badge" :class="{'badge-success' : human.isReal, 'badge-danger' : !human.isReal}">{{human.isReal ? "Да" : "Нет"}}</span></td>
            <td><span class="badge" :class="{'badge-success' : human.isDoctor, 'badge-danger' : !human.isDoctor}">{{human.isDoctor ? "Да" : "Нет"}}</span></td>
            <td class="left-border">{{human.sex}}</td>
            <td>{{human.race}}</td>
            <td>{{human.gender}}</td>
            <td class="left-border">{{human.temperament}}</td>
            <td>{{human.status}}</td>
            <td class="left-border">{{formatDate(human.birthDate)}}</td>
            <td v-if="human.deathDate != null">{{formatDate(human.deathDate)}}</td>
            <td v-else>-</td>
          </tr>

          <!--            ВЗАИМООТНОШЕНИЯ-->
          <tr v-if="human.id in opened && human.relationshipResponseDtoList && human.relationshipResponseDtoList.length > 0">
            <td colspan="13">
              <table class="table mb-0">
                <thead >
                  <tr><th @click="opened[human.id].relationships = !opened[human.id].relationships" colspan="5" scope="col" class="table-name head-red">Relationships</th></tr>
                  <tr :class="{hidden : !opened[human.id].relationships}">
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Type</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                  </tr>
                </thead>
                <tbody :class="{hidden : !opened[human.id].relationships}">
                  <template v-for="relationship in human.relationshipResponseDtoList" v-bind:key="relationship">
                    <tr>
                      <td>{{relationship.name}}</td>
                      <td>{{relationship.surname}}</td>
                      <td class="left-border">{{relationship.type}}</td>
                      <td class="left-border">{{formatDate(relationship.startDate)}}</td>
                      <td>{{formatDate(relationship.endDate)}}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </td>
          </tr>
          <!--            СОБЫТИЯ-->
          <tr v-if="human.id in opened && human.humanEventResponseDtoList && human.humanEventResponseDtoList.length > 0">
<!--            СОБЫТИЯ-->
            <td colspan="13">
              <table class="table mb-0">
                <thead>
                <tr><th @click="opened[human.id].events = !opened[human.id].events" colspan="6" scope="col" class="table-name head-blue">Events</th></tr>
                <tr :class="{hidden : !opened[human.id].events}">
                  <th scope="col">#</th>
                  <th scope="col">Location</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date</th>
                  <th scope="col">Good?</th>
                </tr>
                </thead>
                <tbody :class="{hidden : !opened[human.id].events}">
                <template v-for="event in human.humanEventResponseDtoList" v-bind:key="event">
                  <tr>
                    <td>{{event.id}}</td>
                    <td class="left-border">{{event.locationName}}</td>
                    <td class="left-border">{{event.name}}</td>
                    <td>{{event.description}}</td>
                    <td class="left-border">{{formatDate(event.date)}}</td>
                    <td class="left-border" :style="[event.isGood != null ? (event.isGood ? {background: '#4CAF50'} : {background: '#F44336'}) : {}]">
<!--                      <div class="input-group justify-content-center">-->
<!--                        <div class="input-group-prepend">-->
<!--                          <button @click="UpdateEvent(human.id, event.id, true)" class="btn btn-outline-secondary green" type="button">Yes</button>-->
<!--                        </div>-->
<!--                        <div class="input-group-append">-->
<!--                          <button @click="UpdateEvent(human.id, event.id, false)" class="btn btn-outline-secondary red" type="button">No</button>-->
<!--                        </div>-->
<!--                      </div>-->
                    </td>
                  </tr>
                </template>
                </tbody>
              </table>
            </td>
          </tr>
          <!--            КАЧЕСТВА-->
          <tr v-if="human.id in opened && human.opinionResponseDtoList && human.opinionResponseDtoList.length > 0">
            <!--            КАЧЕСТВА-->
            <td colspan="13">
              <table class="table mb-0">
                <thead>
                <tr><th @click="opened[human.id].property = !opened[human.id].property" colspan="4" scope="col" class="table-name head-green">Property</th></tr>
                <tr :class="{hidden : !opened[human.id].property}">
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Good?</th>
                </tr>
                </thead>
                <tbody :class="{hidden : !opened[human.id].property}">
                <template v-for="property in human.opinionResponseDtoList" v-bind:key="property">
                  <tr>
                    <td>{{property.id}}</td>
                    <td class="left-border">{{property.name}}</td>
                    <td>{{property.description}}</td>
                    <td class="left-border" :style="[property.isGood != null ? (property.isGood ? {background: '#4CAF50'} : {background: '#F44336'}) : {}]">
<!--                      <div class="input-group justify-content-center">-->
<!--                        <div class="input-group-prepend">-->
<!--                          <button @click="UpdateProperty(human.id, property.id, true)" class="btn btn-outline-secondary green" type="button">Yes</button>-->
<!--                        </div>-->
<!--                        <div class="input-group-append">-->
<!--                          <button @click="UpdateProperty(human.id, property.id, false)" class="btn btn-outline-secondary red" type="button">No</button>-->
<!--                        </div>-->
<!--                      </div>-->
                    </td>
                  </tr>
                </template>
                </tbody>
              </table>
            </td>
          </tr>

          <tr v-if="human.id in opened">
            <td colspan="15">
              <div class="input-group-append">
                <div class="input-group display-flex-off">
                  <button @click="changeWishes(human.id)" class="btn btn-warning btn-rounded" type="button">CHANGE WISHES</button>
                </div>
                <div class="input-group display-flex-off">
                  <button @click="realizeWishes(human.id)" class="btn btn-info btn-rounded" type="button">REALIZE WISHES</button>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <nav style="margin: 1em">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled : pagination_cfg.current_page <= 0}">
        <a class="page-link"
           :aria-disabled="{true : pagination_cfg.current_page <= 0}"
           @click="prevTable"
           name="prev" >Previous</a>
      </li>
      <li class="page-item" :class="{disabled : pagination_cfg.pages === pagination_cfg.current_page}">
        <a class="page-link"
           :aria-disabled="{true : pagination_cfg.pages === pagination_cfg.current_page}"
           @click="nextTable"
           name="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import DoctorService from "../services/doctor.service";
import EventBus from "../common/EventBus";


export default {
  name: "Home",
  filters: {

  },
  data() {
    return {
      name: "",
      projects: "",
      size: 7,
      number_of_elements: null,
      number_of_pages: null,
      page: 0,
      tags: [],
      content: null,
      opened: {},
      humans: [],
      pagination_cfg: {
        pages: 0,
        current_page: 0,
      },
      table_cfg: {
        max_humans_on_page: 10
      },

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
    DoctorService.getNumberOfPages().then(
        (response) => {
          this.pagination_cfg.pages = response.data;
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
    DoctorService.getPage(this.pagination_cfg.current_page).then(
        (response) => {
          this.humans = response.data
          console.log(response.data)
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
  methods: {
    formatDate: d => new Date (d).toLocaleString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),

    toggle(id) {
      if (id in this.opened) {
        delete this.opened[id]
      } else {
        this.opened[id] = {relationships: false, events: false, property: false}
      }
    },

    nextTable(){
      this.pagination_cfg.current_page++
      DoctorService.getPage(this.pagination_cfg.current_page).then(
          (response) => {
            this.humans = response.data
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

    prevTable(){
      this.pagination_cfg.current_page--
      DoctorService.getPage(this.pagination_cfg.current_page).then(
          (response) => {
            this.humans = response.data
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

    changeWishes(humanId) {
      DoctorService.changeWishes(humanId).then(
          (response) => {
            this.content = response.data

            DoctorService.getPage(this.pagination_cfg.current_page).then(
                (response) => {
                  this.humans = response.data
                  console.log(response.data)
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

    realizeWishes(humanId) {

      DoctorService.realizeWishes(humanId).then(
          (response) => {
            this.content = response.data

            DoctorService.getPage(this.pagination_cfg.current_page).then(
                (response) => {
                  this.humans = response.data
                  console.log(response.data)
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

    magic() {

      DoctorService.magic().then(
          (response) => {
            this.content = response.data
            this.pagination_cfg.current_page = 0;
            DoctorService.getNumberOfPages().then(
                (response) => {
                  this.pagination_cfg.pages = response.data;
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

            DoctorService.getPage(this.pagination_cfg.current_page).then(
                (response) => {
                  this.humans = response.data
                  console.log(response.data)
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

    }

    // UpdateEvent(human_id, event_id, status){
    //   if (this.humans[human_id - 1].event[event_id - 1].good !== status)
    //     this.humans[human_id - 1].event[event_id - 1].good = status
    //   // Добавить отправку на backend
    // },
    //
    // UpdateProperty(human_id, property_id, status){
    //   if (this.humans[human_id - 1].property[property_id - 1].good !== status)
    //     this.humans[human_id - 1].property[property_id - 1].good = status
    //   // Добавить отправку на backend
    // }

  },
};
</script>

<style scoped>
.left-border {
  border-left: 1px solid rgba(34,36,38,.1) !important;
}

.table td, .table th {
  text-align: center;
  padding: 0.5em;
}

.table-name {
  text-align: left;
}

.head-red {
  background-color: #BC243C;
  color: white;
}

.head-blue {
  background-color: #34568B;
  color: white;
}

.head-green {
  background-color: #009B77;
  color: white;
}

.red {
  background-color: #F44336;
  color: white;
}

.green {
  background-color: #4CAF50;
  color: white;
}

.blue {
  background-color: #39CCCC;
  color: white;
}

.table {
  border: 3px solid rgba(34,36,38,.1);
}

td > .table {
  border: 1px solid rgba(34,36,38,.1);
}

.hidden {
  visibility: collapse;
}

.badge-success {
  background: #61cd1d;
  padding-left: 0.65em;
  padding-right: 0.65em;
}

.badge-danger {
  background: #e45c21;
}

.btn {
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%);
  font-weight: 500;
}

.display-flex-off {
  display: inline;
}

.border-3 {
  border-width:3px !important;
}
</style>