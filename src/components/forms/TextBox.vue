<template>
  <div :class="fieldClasses">
    <label class="label" :for="fieldId">{{ label }}</label>
    <div class="control">
      <input
        :id="fieldId"
        :class="inputClasses"
        :value="modelValue"
        :placeholder="placeholder"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({})
export default class TextBox extends Vue {
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
  type = 'text';

  @Prop({ required: false })
  placeholder = ''

  protected get inputClasses(): string {
    let css = 'input';
    if (this.inputCssClass) {
      css = `${css} ${this.inputCssClass}`;
    }

    return css;
  }
}
</script>
