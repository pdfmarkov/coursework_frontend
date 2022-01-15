<template>
<!--  <form class="d-flex" style="margin: 1em">-->
<!--    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="name">-->
<!--    <button class="btn btn-outline-success" type="button" @click="search">Search</button>-->
<!--  </form>-->
  <div class="alert alert-danger" role="alert" v-if="content != null" style="margin: 1em">
    {{ content }}
  </div>

  <div class="table-responsive" v-if="humans.length">
    <table class="table table-striped table-hover" data-search="true">
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
            <a>Location_id</a>
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
            <a>Birth_date</a>
          </th>
          <th scope="col">
            <a>Death_date</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="human in humans" v-bind:key="human.id">
          <tr @click="toggle(human.id)" :class="{opened : human.id in opened}">
            <td>{{human.id}}</td>
            <td class="left-border">{{human.name}}</td>
            <td>{{human.surname}}</td>
            <td class="left-border">{{human.location_id}}</td>
            <td><span class="badge" :class="{'badge-success' : human.is_real, 'badge-danger' : !human.is_real}">{{human.is_real ? "Да" : "Нет"}}</span></td>
            <td><span class="badge" :class="{'badge-success' : human.is_doctor, 'badge-danger' : !human.is_doctor}">{{human.is_doctor ? "Да" : "Нет"}}</span></td>
            <td class="left-border">{{human.sex}}</td>
            <td>{{human.race}}</td>
            <td>{{human.gender}}</td>
            <td class="left-border">{{human.temperament}}</td>
            <td>{{human.status}}</td>
            <td class="left-border">{{human.birth_date}}</td>
            <td v-if="human.death_date != null">{{human.death_date}}</td>
            <td v-else>-</td>
          </tr>
          <!--            ВЗАИМООТНОШЕНИЯ-->
          <tr v-if="human.id in opened && human.relationship">
            <td colspan="13">
              <table class="table mb-0">
                <thead>
                  <tr><th @click="opened[human.id].relationship = !opened[human.id].relationship" colspan="5" scope="col" class="table-name head-red">Relationships</th></tr>
                  <tr :class="{hidden : !opened[human.id].relationship}">
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Type</th>
                    <th scope="col">Start_date</th>
                    <th scope="col">End_date</th>
                  </tr>
                </thead>
                <tbody :class="{hidden : !opened[human.id].relationship}">
                  <template v-for="relationship in human.relationship" v-bind:key="relationship">
                    <tr>
                      <td>{{relationship.name}}</td>
                      <td>{{relationship.surname}}</td>
                      <td class="left-border">{{relationship.type}}</td>
                      <td class="left-border">{{relationship.start_date}}</td>
                      <td>{{relationship.end_date}}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </td>
          </tr>
          <!--            СОБЫТИЯ-->
          <tr v-if="human.id in opened && human.event">
<!--            СОБЫТИЯ-->
            <td colspan="13">
              <table class="table mb-0">
                <thead>
                <tr><th @click="opened[human.id].event = !opened[human.id].event" colspan="6" scope="col" class="table-name head-blue">Events</th></tr>
                <tr :class="{hidden : !opened[human.id].event}">
                  <th scope="col">#</th>
                  <th scope="col">Location_id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date</th>
                  <th scope="col">Good?</th>
                </tr>
                </thead>
                <tbody :class="{hidden : !opened[human.id].event}">
                <template v-for="event in human.event" v-bind:key="event">
                  <tr :style="[event.good != null ? (event.good ? {background: '#4CAF50'} : {background: '#F44336'}) : {}]">
                    <td>{{event.id}}</td>
                    <td class="left-border">{{event.location_id}}</td>
                    <td class="left-border">{{event.name}}</td>
                    <td>{{event.description}}</td>
                    <td class="left-border">{{event.date}}</td>
                    <td class="left-border">
                      <div class="input-group justify-content-center">
                        <div class="input-group-prepend">
                          <button @click="UpdateEvent(human.id, event.id, true)" class="btn btn-outline-secondary green" type="button">Yes</button>
                        </div>
                        <div class="input-group-append">
                          <button @click="UpdateEvent(human.id, event.id, false)" class="btn btn-outline-secondary red" type="button">No</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
                </tbody>
              </table>
            </td>
          </tr>
          <!--            КАЧЕСТВА-->
          <tr v-if="human.id in opened && human.property">
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
                <template v-for="property in human.property" v-bind:key="property">
                  <tr :style="[property.good != null ? (property.good ? {background: '#4CAF50'} : {background: '#F44336'}) : {}]">
                    <td>{{property.id}}</td>
                    <td class="left-border">{{property.name}}</td>
                    <td>{{property.description}}</td>
                    <td class="left-border">
                      <div class="input-group justify-content-center">
                        <div class="input-group-prepend">
                          <button @click="UpdateProperty(human.id, property.id, true)" class="btn btn-outline-secondary green" type="button">Yes</button>
                        </div>
                        <div class="input-group-append">
                          <button @click="UpdateProperty(human.id, property.id, false)" class="btn btn-outline-secondary red" type="button">No</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
                </tbody>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <nav style="margin: 1em">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled : pagination_cfg.current_page === 0}">
        <a class="page-link"
           :aria-disabled="{true : pagination_cfg.current_page === 0}"
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

<!--  <div style="margin: 1em">-->
<!--    <div class="form-group">-->
<!--      <button-->
<!--          v-on:click="addTag(tag.tagName)"-->
<!--          type="button"-->
<!--          class="btn btn-warning"-->
<!--          v-for="tag in tags"-->
<!--          :key="tag"-->
<!--          style="margin: 0.1em">-->
<!--        {{ tag.tagName }}-->
<!--      </button>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div style="margin: 1em">-->
<!--    <div class="form-group">-->
<!--      <button-->
<!--          v-on:click="addTag(tag)"-->
<!--          type="button"-->
<!--          class="btn btn-success"-->
<!--          v-for="tag in tagNameList"-->
<!--          :key="tag"-->
<!--          style="margin: 0.1em"-->
<!--      >-->
<!--        {{ tag }}-->
<!--      </button>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="card text-center" style="margin: 1em" v-for="project in projects" :key="project.id">-->
<!--    <div class="card-header">-->
<!--      {{ project.leaderEmail }}-->
<!--    </div>-->
<!--    <div class="card-body">-->
<!--      <h5 class="card-title">{{ project.name }}</h5>-->
<!--      <p class="card-text">{{ project.description }}</p>-->
<!--      <a class="btn btn-primary" v-on:click="addUserToProject({'id': project.id})" v-if="this.$store.state.auth.user">Подать заявку</a>-->
<!--      <p class="card-text" style="margin-top: 1em" v-if="this.$store.state.auth.user">{{ project.answer }}</p>-->
<!--    </div>-->
<!--    <div class="card-footer text-white" v-if="project.tagNameList.length !== 0">-->
<!--      <span class="badge bg-success" v-for="tagName in project.tagNameList" :key="tagName" style="margin: 0.1em">-->
<!--        {{ tagName }}-->
<!--      </span>-->
<!--    </div>-->

<!--    <div class="card-footer text-muted">-->
<!--      Дедлайн: {{ formatDate(project.end_date) }}-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="text-center" style="margin: 1em">-->
<!--    <div class="form-group">-->
<!--      <button-->
<!--          v-on:click="getPage(n-1)"-->
<!--          type="button"-->
<!--          class="btn btn-success"-->
<!--          v-for="n in number_of_pages"-->
<!--          :key="n"-->
<!--          style="margin: 0.1em">-->
<!--        {{ n }}-->
<!--      </button>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import ProjectService from "../services/project.service";
import TagService from "../services/tag.service";
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
      tagNameList: [],
      requestedTags: {
        'tags' : []
      },

      // TODO: Тестовые данные пока нет backend
      opened: {},
      humans: [
        {
          id: 1, name: "Egor", surname: "Krivonosov",
          location_id: 1, // TODO: Заменить на название локации
          is_real: true,
          is_doctor: true,
          sex: "MALE",
          race: "GREEN",
          gender: "wtf",
          temperament: "SANGUINE",
          status: "ELITE",
          birth_date: "17.10.2001",
          death_date: null,

          relationship: [{
            name: "Petr",
            surname: "Markov",
            type: "FRIENDS",
            start_date: "2019",
            end_date: "ХЗ"
          }],

          event: [{
            id: 1,
            location_id: 1,  // TODO: Заменить на название локации
            name: "Написание курсача",
            description: "Может не надо???",
            date: "01.09.2021",
            good: false
          },
            {
              id: 2,
              location_id: 1,  // TODO: Заменить на название локации
              name: "CS:GO",
              description: "Сюрфит на рекордики",
              date: "14.01.2022",
              good: true
            }],

          property: [{
            id: 1,
            name: "Дружелюбный",
            description: "... 11 ...",
            good: true
          },
            {
              id: 2,
              name: "Не дружелюбный",
              description: "... 11 ...",
              good: false
            },
            {
              id: 3,
              name: "Секси",
              description: "... 11 ...",
              good: null
            },]
      },
        {
          id: 2, name: "Petr", surname: "Markov",
          location_id: 1,
          is_real: false,
          is_doctor: true,
          sex: "MALE",
          race: "PDF MAN",
          gender: "wtf",
          temperament: "SANGUINE",
          status: "ELITE",
          birth_date: "24.02.2002",
          death_date: null,

          relationship: [{
            name: "Egor",
            surname: "Krivonosov",
            type: "FRIENDS",
            start_date: "2019",
            end_date: "ХЗ"
          }],
      }],

      pagination_cfg: {
        pages: 0,
        current_page: 0,
      },

      table_cfg: {
        max_humans_on_page: 10
      },

    };
  },
  created() {
    // TODO: Отправить запрос на бэк и получить число страниц по max_humans_on_page на странице
    this.pagination_cfg.pages = Math.floor(this.humans.length / this.table_cfg.max_humans_on_page - 0.01)
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    // if (!this.currentUser) this.$router.push('/login');
    ProjectService.getNumberOfElements().then(
        (response) => {
          this.content = null;
          this.number_of_elements = response.data;
          this.number_of_pages = Math.ceil(this.number_of_elements / this.size);
        },
        (error) => {
          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
    ProjectService.getProjectsWithCustomParams("", this.page, this.size, this.tagNameList).then(
        (response) => {
          this.content = null;
          this.projects = response.data.projects;
        },
        (error) => {
          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
    TagService.getCategories().then(
        (response) => {
          this.content = null;
          this.tags = response.data;
        },
        (error) => {
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
    search() {
      this.content = null;
      this.projects = null;
      this.page = 0;
      ProjectService.getProjectsWithCustomParams(this.name, "", "", this.tagNameList).then(
          (response) => {
            this.number_of_elements = response.data.numberOfProjects;
            this.number_of_pages = Math.ceil(this.number_of_elements / this.size);
            ProjectService.getProjectsWithCustomParams(this.name, this.page, this.size, this.tagNameList).then(
                (response) => {
                  this.projects = response.data.projects;
                },
                (error) => {
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
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    getPage(page) {
      this.page = page;
      this.projects = null;
      ProjectService.getProjectsWithCustomParams(this.name, this.page, this.size, this.tagNameList).then(
          (response) => {
            this.content = null;
            this.projects = response.data.projects;
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
      window.scrollTo(0,0);
    },
    addTag(tagName){
      this.tagNameList.includes(tagName) ? this.tagNameList.splice(this.tagNameList.indexOf(tagName),1) : this.tagNameList.push(tagName);
      this.page = 0;
      ProjectService.getProjectsWithCustomParams("", "", "", this.tagNameList).then(
          (response) => {
            this.number_of_elements = response.data.numberOfProjects;
            this.number_of_pages = Math.ceil(this.number_of_elements / this.size);
            ProjectService.getProjectsWithCustomParams(this.name, this.page, this.size, this.tagNameList).then(
                (response) => {
                  this.content = null;
                  this.projects = response.data.projects;

                  for (const tagName in this.tagNameList)
                    this.requestedTags.tags.push({
                      'tagName': this.tagNameList[tagName],
                      'categoryName': ''
                    });

                  TagService.getCheckedTags(this.requestedTags).then(
                      (response) => {
                        this.tags = response.data;
                      });

                  this.requestedTags = {
                    'tags' : []
                  };
                },
                (error) => {
                  this.content =
                      (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                      error.message ||
                      error.toString();

                  if (error.response && (error.response.status === 403 || error.response.status === 401))
                    EventBus.dispatch("logout");
                }
            );
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            if (error.response && (error.response.status === 403 || error.response.status === 401))
              EventBus.dispatch("logout");
          }
      );
    },
    addUserToProject(projectId) {
      ProjectService.addUserToProject(projectId).then(
          (response) => {
            this.content = null;
            for (const project in this.projects)
              if (this.projects[project].id === projectId.id)
                this.projects[project].answer = response.data.message;
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            if (error.response && (error.response.status === 403 || error.response.status === 401))
              EventBus.dispatch("logout");
          }
      );
    },
    toggle(id) {
      // const index = this.opened.indexOf(id);
      if (id in this.opened) {
        delete this.opened[id]
        // this.opened.splice(index, 1)
      } else {
        this.opened[id] = {relationships: false, events: false, property: false}
      }
    },

    // TODO: Загрузка происходит с backend добавить
    nextTable(){
      this.pagination_cfg.current_page++
      // Передается cur_page, max_human_page
      console.log("next")
    },
    prevTable(){
      this.pagination_cfg.current_page--
      console.log("prev")
    },
    UpdateEvent(human_id, event_id, status){
      if (this.humans[human_id - 1].event[event_id - 1].good !== status)
        this.humans[human_id - 1].event[event_id - 1].good = status
      // Добавить отправку на backend
    },
    UpdateProperty(human_id, property_id, status){
      if (this.humans[human_id - 1].property[property_id - 1].good !== status)
        this.humans[human_id - 1].property[property_id - 1].good = status
      // Добавить отправку на backend
    }
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
</style>