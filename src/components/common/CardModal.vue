<template>
  <div :class="[ { 'is-active': visible } , 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ title }}
        </p>
        <button type="button" v-if="showCloseButton" class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <slot />
      </section>
      <footer class="modal-card-foot">
        <button type="submit" class="button is-success">{{ submitButtonText }}</button>
        <button type="reset" class="button" @click="close">{{ cancelButtonText }}</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({})
export default class CardModal extends Vue {
  @Prop({ required: false, default: false })
  visible = false;

  @Prop({ required: false, default: '' })
  title = '';

  @Prop({ required: false, default: true })
  showCloseButton = true;

  @Prop({ required: false, default: 'Save Changes' })
  submitButtonText = 'Save Changes';

  @Prop({ required: false, default: 'Cancel' })
  cancelButtonText = 'Cancel';

  close() {
    this.$emit('close');
  }
}
</script>
