<template>
  <div :class="fieldClasses">
    <label class="label" :for="fieldId">{{ label }}</label>
    <div class="control">
      <textarea
        :id="fieldId"
        :class="inputClasses"
        :rows="rows"
        :placeholder="placeholder"
        :value="modelValue"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({})
export default class TextArea extends Vue {
  /**
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

  /**
   * Additional CSS class(es) to apply to the input
   */
  @Prop({ required: false })
  protected inputCssClass = '';

  @Prop({ required: false })
  protected modelValue = '';

  protected get fieldClasses(): string {
    let css = 'field';
    if (this.fieldCssClass) {
      css = `${css} ${this.fieldCssClass}`;
    }

    return css;
  }

  @Prop({ required: false })
  rows = 3

  @Prop({ required: false })
  placeholder = ''

  protected get inputClasses(): string {
    let css = 'textarea';
    if (this.inputCssClass) {
      css = `${css} ${this.inputCssClass}`;
    }

    return css;
  }
}
</script>
