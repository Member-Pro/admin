<template>
  <div class="box">
    <div class="level is-mobile">
      <div class="left">
        <div class="level-item">
          <h4 class="mb-3">{{ requirement.name }}</h4>
        </div>
      </div>
      <div class="right">
        <div class="level-item">
          <div class="buttons">
            <button class="button is-light" @click="copy" title="Copy this requirement">
              <fa-icon icon="copy" />
            </button>
            <button class="button is-light" @click="edit" title="Edit this requirement">
              <fa-icon icon="pencil-alt" />
            </button>
            <button class="button is-danger is-light" @click="deleteReq" title="Delete this requirement">
              <fa-icon icon="trash" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <p class="block has-text-grey-light">
      {{ requirement.description ? requirement.description : '<i>No description</i>' }}
    </p>

    <div class="validation-parameters px-4">
      <validation-parameters :requirement="requirement" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { RequirementModel } from '@/models/achievements/requirement';
import ValidationParameters from './ValidationParameters.vue';

const editAchievementModule = namespace('editAchievement');

@Options({
  components: {
    ValidationParameters,
  },
})
export default class RequirementListItem extends Vue {
  @Prop({ required: true })
  requirement!: RequirementModel;

  @editAchievementModule.Action('copyRequirement')
  copyRequirement!: any;

  @editAchievementModule.Action('editRequirement')
  editRequirement!: any;

  @editAchievementModule.Action('deleteRequirement')
  deleteRequirement!: any;

  copy() {
    this.copyRequirement({ requirement: this.requirement });
  }

  edit() {
    this.editRequirement({ requirementId: this.requirement.id });
  }

  async deleteReq() {
    // TODO: Replace with nicer confirm
    if (confirm('Are you sure you want to delete this requirement?')) {
      this.deleteRequirement({ requirementId: this.requirement.id });
    }
  }
}
</script>
