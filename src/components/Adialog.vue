<template>
  <div id="somedialog" ref="dialog" class="dialog">
    <div class="dialog__overlay"></div>
    <div class="dialog__content">
      <h2><strong>Howdy</strong>, I'm a dialog box</h2><div><button class="action" data-dialog-close>Close</button></div>
    </div>
  </div>
</template>
<script>
  import DialogFx from 'src/common/js/dialogFx.js'
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

