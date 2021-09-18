<template>
  <div class="requirement-validation-parameters">
    <h5 class="mb-2">Validation Parameters</h5>

    <requirement-param-table :requirement="requirement" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { RequirementModel } from '@/models/achievements/requirement';
import RequirementParamTable from './RequirementParamTable.vue';

@Options({
  components: {
    RequirementParamTable,
  },
})
export default class ValidationParameters extends Vue {
  @Prop({ required: true })
  requirement!: RequirementModel;
}
</script>
