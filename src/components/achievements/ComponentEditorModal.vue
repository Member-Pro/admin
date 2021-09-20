<template>
  <div class="component-editor-wrapper">
    <form @submit.prevent="save">
      <card-modal :visible="showEditComponentModal" :title="modalTitle" @close="close">
        <text-box
          type="text"
          fieldId="component-name"
          label="Name"
          placeholder="Requirement Name"
          v-model="model.name"
          autocomplete="off"
        />

        <text-area
          label="Description"
          rows="4"
          fieldId="component-description"
          placeholder="Briefly describe the component"
          v-model="model.description"
        />

        <text-box
          type="number"
          fieldId="component-displayOrder"
          label="Display Order"
          placeholder="1"
          v-model="model.displayOrder"
          autocomplete="off"
        />
      </card-modal>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { namespace } from 'vuex-class';
import CardModal from '@/components/common/CardModal.vue';
import TextArea from '@/components/forms/TextArea.vue';
import TextBox from '@/components/forms/TextBox.vue';
import { AchievementComponentModel } from '@/models/achievements/achievementComponent';

const editAchievementModule = namespace('editAchievement');
@Options({
  components: {
    CardModal,
    TextArea,
    TextBox,
  },
})
export default class ComponentEditorModal extends Vue {
  @editAchievementModule.Getter('showEditComponentModal') showEditComponentModal!: boolean;
  @editAchievementModule.Getter('editingComponent') editingComponent!: AchievementComponentModel;
  @editAchievementModule.Mutation('SET_EDITING_REQUIREMENT') updateState!: any
  @editAchievementModule.Action('saveComponent') save!: any;
  @editAchievementModule.Action('closeComponentEditor') close!: any;

  get modalTitle(): string {
    return this.editingComponent.id !== 0 ? 'Edit Component' : 'Add Component';
  }

  get model(): AchievementComponentModel {
    return this.editingComponent;
  }

  set model(val: AchievementComponentModel) {
    this.updateState(val);
  }
}
</script>
