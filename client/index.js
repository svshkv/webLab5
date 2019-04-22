// new Vue({
//   el: '#editor',
//   data: {
//     input: '# hello'
//   },
//   computed: {
//     compiledMarkdown: function () {
//       return marked(this.input, { sanitize: true })
//     }
//   },
//   methods: {
//     update: _.debounce(function (e) {
//       this.input = e.target.value
//     }, 300)
//   }
// })
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
    components: {
        'editor': Editor
    }
})