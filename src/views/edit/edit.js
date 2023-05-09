import {Vue, store} from '../../common/app.js'

new Vue({
  el: '#edit',
  data: {
    tags: []
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      this.getTags()
    },
    getTags(){
      this.$http.get('/get_tags', {
      }).then(res => {
        return res.data;
      }).then(res => {
        if(res.status == 200) {
          this.tags = res.list;
        } else {
          this.$notify({
            title:'error', message: res.message, type: 'error'
          });
        }
      })
    }
  }
})
