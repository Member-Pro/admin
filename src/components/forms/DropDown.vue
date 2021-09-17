<template>
  <div class="">
    <label class="label" :for="fieldId">{{ label }}</label>
    <!-- TODO: Setting width via inline styles until scoped SCSS works -->
    <div class="select" style="width: 100%;">
      <select
        :id="fieldId"
        :value="modelValue"
        v-bind="$attrs"
        style="width: 100%;"
        @input="$emit('update:modelValue', $event.target.value)"
      >
        <slot></slot>
        <!-- <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.text }}
        </option> -->
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({})
export default class DropDown extends Vue {
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
}
</script>
