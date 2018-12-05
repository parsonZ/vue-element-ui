<template>
  <div id="somedialog" ref="dialog" class="dialog">
    <div class="dialog__overlay"></div>
    <div class="dialog__content">
        <div class="dialog__header">
          {{dialogContent.title}}
        </div>

        <div class="dialog__body">
          {{dialogContent.content}}
        </div>

        <div class="dialog__footer">
          <button @click="$emit('success')" type="button" class="button button--nina button--text-thick button--text-upper button--size-s" data-text="ok" v-if="dialogContent.type==1">
            <span>确</span><span>认</span>
          </button>
          <button data-dialog-close type="button" class="button button--nina button--text-thick button--text-upper button--size-s" data-text="close">
            <span>关</span><span>闭</span>
          </button>
        </div>
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
        content: this.dialogContent,
        dlg: ''
      }
    },
    mounted(){
      this.modal()
    },
    methods: {
      modal(){
        const somedialog = this.$refs.dialog
        this.dlg = new DialogFx( somedialog );
      },
      toggle(){
        this.dlg.toggle()
      },
    }
  }
</script>

