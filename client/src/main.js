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
      text: ''
    }
  },
  template: `
        <div class="editor">
            <textarea v-model="text" cols="30" rows="10" class="editor__input"></textarea>
            <preview :text="text"></preview>
        </div>
    `
}

let app = new Vue({
  el: '#app1',
  router,
  components: {
    'editor': Editor
  }
})
app()
