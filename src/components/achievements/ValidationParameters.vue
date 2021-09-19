<template>
  <div class="requirement-validation-parameters">
    <h5 class="mb-2">Validation Parameters</h5>

    <requirement-param-table :requirement="requirement" />

    <button type="button" class="button is-light" @click="editParameters">
      Edit Parameters
    </button>

    <form @submit.prevent="saveParameters">
      <card-modal :visible="showEditModal" title="Edit Validation Parameters" @close="closeEditor">
        <div class="notification is-warning is-light">
          <strong>Warning:</strong> Be careful of updating the <span class="is-family-monospace">key</span> properties
          as they may be referenced by other parts of the system.
        </div>

        <!-- Not using the TextArea component here, to use events differently -->
        <div class="field">
          <label class="label" :for="fieldId">{{ label }}</label>
          <div class="control">
            <textarea
              id="validationParameters"
              class="textarea"
              :rows="10"
              v-model="parameterData"
              @change="updateParameters"
            ></textarea>
          </div>
        </div>
      </card-modal>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { RequirementModel } from '@/models/achievements/requirement';
import CardModal from '@/components/common/CardModal.vue';
import RequirementParamTable from './RequirementParamTable.vue';
import TextArea from '@/components/forms/TextArea.vue';

const editAchievementModule = namespace('editAchievement');

@Options({
  components: {
    CardModal,
    RequirementParamTable,
    TextArea,
  },
})
export default class ValidationParameters extends Vue {
  @Prop({ required: true })
  requirement!: RequirementModel;

  @editAchievementModule.Mutation('SET_EDITING_REQUIREMENT')
  updateState!: any;

  @editAchievementModule.Action('saveRequirement')
  saveRequirement!: any;

  showEditModal = false;
  parameterData = '';

  created(): void {
    const params = {
      parameters: [ ...this.requirement.validationParameters ],
    };
    this.parameterData = JSON.stringify(params, null, 2);
  }

  updateParameters() {
    const params = JSON.parse(this.parameterData).parameters;
    this.requirement.validationParameters = params;
  }

  editParameters(): void {
    this.showEditModal = true;
  }

  async saveParameters(): Promise<void> {
    // Need to update the editingRequirement in state
    this.updateState(this.requirement);

    await this.saveRequirement();

    this.closeEditor();
  }

  closeEditor(): void {
    this.showEditModal = false;
  }
}
</script>
