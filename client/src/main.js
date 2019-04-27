// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
import Vue from 'vue'
import router from './router'
import marked from 'marked'
import axios from 'axios'

let Preview = {
  props: ['text'],

  template: `
        <div class="editor__preview" v-html="markdownText">{{ text }}</div>
    `,
  computed: {
    markdownText () {
      return marked(this.text, { sanitize: true })
    }
  }
}

let Editor = {
  components: {
    'preview': Preview
  },
  data () {
    return {
      posts: '',
      text: ''
    }
  },
  mounted () {
    axios.get('http://localhost:8081/posts').then((response) => {
      console.log(response.data)
      // for (var i = 0; i < response.data.length; i++) {
      this.posts = response.data
      // }
    })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    addPost: function (event) {
      // `this` внутри методов указывает на экземпляр Vue
      var now = new Date()
      let post = {text: this.text, date: now}
      // user = JSON.stringify(user)
      axios.post('http://localhost:8081/newpost', post)
        .then((response) => {
          alert(response)
        })
        .catch((error) => {
          alert(error.response.data)
        })
      location.reload(true)
      // `event` — нативное событие DOM
    },
    changePost: function (post) {
      this.text = post.text
      let idForDelete = {id: post._id}
      axios.post('http://localhost:8081/deletepost', idForDelete)
        .then((response) => {
          alert(response)
        })
        .catch((error) => {
          alert(error.response.data)
        })
    },
    deletePost: function (post) {
      let idForDelete = {id: post._id}
      axios.post('http://localhost:8081/deletepost', idForDelete)
        .then((response) => {
          alert(response)
        })
        .catch((error) => {
          alert(error.response.data)
        })
      location.reload(true)
    }
  },
  template: `
        <div class="editor">
            <textarea v-model="text" cols="30" rows="10" class="editor__input"></textarea>
            <preview :text="text"></preview>
            <button v-on:click="addPost">Сохранить</button>

            <h3 v-for="post in posts">
              <p>{{ post.text }}</p><button v-on:click="deletePost(post)">Удалить</button><button v-on:click="changePost(post)">Изменить</button>
            </h3>
        </div>
    `
}

let app = new Vue({
  el: '#app1',
  router: router,
  components: {
    'editor': Editor
  }
})
app()
