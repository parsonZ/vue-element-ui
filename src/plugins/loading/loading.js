import loadingComponent from './Aloading.vue'

export default {
  install(Vue, options) {
    const LoadingPlugin = Vue.extend(loadingComponent);
    
    const vm = new LoadingPlugin().$mount()
    
    let loading = {
      show(text) {
        document.body.appendChild(vm.$el)
        vm.mode = true;
      },
      hide() {
        vm.mode = false;
        document.querySelector('.loading_wrapper').remove()
      }
    }
    
    Vue.prototype.$loading = loading
  }
}