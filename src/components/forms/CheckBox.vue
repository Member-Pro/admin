<template>
  <div :class="fieldClasses">
    <label class="checkbox" :for="fieldId">
      <input
        type="checkbox"
        :id="fieldId"
        v-model="localChecked"
        v-bind="$attrs"
      />
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Options({})
export default class CheckBox extends Vue {/**
   * The field ID
   */
  @Prop({ required: true })
  protected fieldId!: string;

  /**
   * The label for the field
   */
  @Prop({ required: true })
  protected label!: string;

  /**
   * Additional CSS class(es) to apply to the field "group"
   */
  @Prop({ required: false })
  protected fieldCssClass = '';

  @Prop({ required: false })
  protected modelValue = false;

  localValue = false;

  get localChecked() {
    return this.localValue;
  }

  set localChecked(val: any) {
    this.$emit('update:modelValue', val);
  }

  protected get fieldClasses(): string {
    let css = 'field';
    if (this.fieldCssClass) {
      css = `${css} ${this.fieldCssClass}`;
    }

    return css;
  }

  @Watch('modelValue')
  test() {
    this.localValue = this.modelValue;
  }
}
</script>
