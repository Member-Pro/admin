<template>
  <div class="requirement-list">
    <div class="level is-mobile mb-3">
      <div class="left">
        <div class="level-item">
          <h3>Requirements</h3>
        </div>
      </div>
      <div class="right">
        <div class="level-item">
          <button class="button is-success is-light">Add Requirement</button>
        </div>
      </div>
    </div>

    <div class="box" v-for="requirement in requirements" :key="requirement.id">
      <div class="level is-mobile">
        <div class="left">
          <div class="level-item">
            <h4 class="mb-3">{{ requirement.name }}</h4>
          </div>
        </div>
        <div class="right">
          <div class="level-item">
            <div class="buttons">
              <button class="button is-light">Copy</button>
              <button class="button is-light">Edit</button>
            </div>
          </div>
        </div>
      </div>

      <p class="block has-text-grey-light">
        {{ requirement.description ? requirement.description : '<i>No description</i>' }}
      </p>

      <div class="validation-parameters px-4">
        <h5 class="mb-2">Validation Parameters</h5>

        <table class="table is-striped is-fullwidth">
          <thead>
            <th>Name/Description</th>
            <th>Input Type</th>
            <th>Validation</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="param in requirement.validationParameters" :key="param.key">
              <td>
                {{ param.name }}
                <small v-if="param.description" class="has-text-grey-light">
                  <br />{{ param.description }}
                </small>
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
              <td>
                <div class="buttons">
                  <button class="button is-small is-light">Edit</button>
                  <button class="button is-small is-danger">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { RequirementModel } from '@/models/achievements/requirement';

const editAchievementModule = namespace('editAchievement');

@Options({})
export default class RequirementList extends Vue {
  @Prop({ required: true })
  componentId = 0

  @editAchievementModule.Getter('requirements')
  requirements!: RequirementModel[];

  @editAchievementModule.Action('loadRequirements')
  loadRequirements: any;

  async created() {
    await this.refresh();
  }

  @Watch('componentId')
  async refresh() {
    await this.loadRequirements({ componentId: this.componentId });
  }
}
</script>
