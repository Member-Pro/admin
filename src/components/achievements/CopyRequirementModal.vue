<template>
  <div class="copy-requirement-modal-wrapper">
    <form @submit.prevent="save">
      <card-modal :visible="showCopyRequirementModal" :title="title" submitButtonText="Copy Requirement" @close="close">
        <p class="content">
          This will copy all properties of the requirement, including the validation parameters. All can be changed after
          saving the copy.
        </p>

        <text-box
          type="text"
          fieldId="requirement-name"
          label="New Requirement Name"
          placeholder="Requirement Name"
          v-model="model.name"
          autocomplete="off"
        />
      </card-modal>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { namespace } from 'vuex-class';
import { Prop } from 'vue-property-decorator';
import { RequirementModel } from '@/models/achievements/requirement';
import CardModal from '@/components/common/CardModal.vue';
import TextBox from '@/components/forms/TextBox.vue';

const editAchievementModule = namespace('editAchievement');

@Options({
  components: {
    CardModal,
    TextBox,
  },
})
export default class CopyRequirementModal extends Vue {
  @Prop({ required: true })
  requirement!: RequirementModel;

  @editAchievementModule.Getter('showCopyRequirementModal')
  showCopyRequirementModal!: boolean;

  @editAchievementModule.Getter('editingRequirement')
  editingRequirement!: RequirementModel;

  @editAchievementModule.Mutation('SET_EDITING_REQUIREMENT')
  updateState!: any

  @editAchievementModule.Action('saveRequirement')
  save!: any;

  @editAchievementModule.Action('closeCopyModal')
  close!: any;

  get title(): string {
    return 'Copy Requirement';
  }

  get model(): RequirementModel {
    return this.editingRequirement;
  }

  set model(val: RequirementModel) {
    this.updateState(val);
  }
}
</script>
