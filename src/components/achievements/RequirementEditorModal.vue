<template>
  <div class="requirement-editor-modal-wrapper">
    <form @submit.prevent="save">
      <card-modal :visible="showEditRequirementModal" :title="modalTitle" @close="close">
        <text-box
          type="text"
          fieldId="requirement-name"
          label="Name"
          placeholder="Requirement Name"
          v-model="model.name"
          autocomplete="off"
        />

        <text-area
          label="Description"
          rows="4"
          fieldId="requirement-description"
          placeholder="Briefly describe the requirement"
          v-model="model.description"
        />

        <drop-down
          fieldCssClass="select"
          label="Requirement Type"
          fieldId="requirement-requirementType"
          v-model="model.type"
        >
          <option v-for="opt in requirementTypeOptions" :key="opt.value" :value="opt.value">
            {{ opt.text }}
          </option>
        </drop-down>

        <text-box
          type="number"
          fieldId="requirement-displayOrder"
          label="Display Order"
          placeholder="1"
          v-model="model.displayOrder"
          autocomplete="off"
        />

        <drop-down
          fieldCssClass="select"
          label="Validator Type"
          fieldId="requirement-validatorType"
          v-model="model.validatorTypeName"
        >
          <option v-for="opt in validatorOptions" :key="opt.value" :value="opt.value">
            {{ opt.text }}
          </option>
        </drop-down>
      </card-modal>
    </form>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { namespace } from 'vuex-class';
import { RequirementModel } from '@/models/achievements/requirement';
import CardModal from '@/components/common/CardModal.vue';
import DropDown from '@/components/forms/DropDown.vue';
import TextArea from '@/components/forms/TextArea.vue';
import TextBox from '@/components/forms/TextBox.vue';

const editAchievementModule = namespace('editAchievement');

@Options({
  components: {
    CardModal,
    DropDown,
    TextArea,
    TextBox,
  },
})
export default class RequirementEditorModal extends Vue {
  @editAchievementModule.Getter('showEditRequirementModal')
  showEditRequirementModal!: boolean;

  @editAchievementModule.Getter('editingRequirement')
  editingRequirement!: RequirementModel;

  @editAchievementModule.Mutation('SET_EDITING_REQUIREMENT')
  updateState!: any

  @editAchievementModule.Action('saveRequirement')
  save!: any;

  @editAchievementModule.Action('closeRequirementEditor')
  close!: any;

  get modalTitle(): string {
    return this.editingRequirement.id !== 0 ? 'Edit Requirement' : 'Add Requirement';
  }

  get model(): RequirementModel {
    return this.editingRequirement;
  }

  set model(val: RequirementModel) {
    this.updateState(val);
  }

  // TODO: Get from API
  get validatorOptions(): any[] {
    return [
      { value: 'RequirementParameterValidator', text: 'Default' },
      { value: 'Custom', text: 'Custom' },
    ];
  }

  get requirementTypeOptions(): any[] {
    // TODO: Pull directly from `RequirementType`
    return [
      { value: 1, text: 'Completion' },
      { value: 2, text: 'Score' },
      { value: 5, text: 'Count' },
      { value: 10, text: 'Verifications' },
    ];
  }
}
</script>
