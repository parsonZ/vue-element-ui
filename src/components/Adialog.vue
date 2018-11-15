<template>
  <div>
    <div id="somedialog" class="dialog" ref="dialog">
      <div class="dialog__overlay"></div>
      <div class="dialog__content">
        <div class="morph-shape">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 560 280" preserveAspectRatio="none">
            <rect x="3" y="3" fill="none" width="556" height="276"/>
          </svg>
        </div>
        <div class="dialog-inner">
          <h2><strong>{{content.title}}</strong>{{content.message}}</h2>
            <button data-dialog-close class="button button--nina button--text-thick action button--text-upper button--size-s" data-text="Close" >
              <span>C</span><span>l</span><span>o</span><span>s</span><span>e</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      dialogContent: Object
    },
    data() {
      return {
        content: this.dialogContent
      }
    },
    mounted(){
      
    },
    methods: {
      modal(){
        const somedialog = this.$refs.dialog
        const dlg = new DialogFx( somedialog );
        dlg.toggle()
      }
    }
  }
</script>

