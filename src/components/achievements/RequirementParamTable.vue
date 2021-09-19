<template>
  <table class="table is-striped is-fullwidth">
    <thead>
      <th>Name</th>
      <th>Description</th>
      <th>Input Type</th>
      <th>Validation</th>
      <!-- <th></th> -->
    </thead>
    <tbody>
      <tr v-for="param in requirement.validationParameters" :key="param.key">
        <td>
          {{ param.name }}
        </td>
        <td>
          {{ param.description }}
        </td>
        <td>
          {{ param.inputType }}
        </td>
        <td>
          {{ `Required: ${param.isRequired ? 'Yes' : 'No' }` }}
          <p v-if="param.minimum">
            Min: {{ param.minimum }}
          </p>
          <p v-if="param.maximum">
            Max: {{ param.maximum }}
          </p>
        </td>
        <!-- <td>
          <div class="buttons">
            <button class="button is-small is-light">Edit</button>
            <button class="button is-small is-danger">Delete</button>
          </div>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { RequirementModel } from '@/models/achievements/requirement';

@Options({})
export default class RequirementParamTable extends Vue {
  @Prop({ required: true })
  requirement!: RequirementModel;
}
</script>
