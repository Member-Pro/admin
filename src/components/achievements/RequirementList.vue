<template>
  <div class="requirement-list">
    <div class="level is-mobile mb-3">
      <div class="left">
        <div class="level-item">
          <h3 class="title is-3">
            Requirements
          </h3>
        </div>
      </div>
      <div class="right">
        <div class="level-item">
          <button class="button is-success" @click.prevent="addRequirement">
            <span class="icon">
              <fa-icon icon="plus" />
            </span>
            <span>
              Add Requirement
            </span>
          </button>
        </div>
      </div>
    </div>

    <requirement-editor-modal />
    <copy-requirement-modal />

    <requirement-list-item
      v-for="requirement in requirements"
      :key="requirement.id"
      :requirement="requirement"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { RequirementModel } from '@/models/achievements/requirement';
import CopyRequirementModal from './CopyRequirementModal.vue';
import RequirementEditorModal from './RequirementEditorModal.vue';
import RequirementListItem from './RequirementListItem.vue';

const editAchievementModule = namespace('editAchievement');

@Options({
  components: {
    CopyRequirementModal,
    RequirementEditorModal,
    RequirementListItem,
  },
})
export default class RequirementList extends Vue {
  @Prop({ required: true })
  componentId = 0

  @editAchievementModule.Getter('requirements')
  requirements!: RequirementModel[];

  @editAchievementModule.Action('loadRequirements')
  loadRequirements: any;

  @editAchievementModule.Action('addRequirement')
  addRequirement: any;

  async created() {
    await this.refresh();
  }

  @Watch('componentId')
  async refresh() {
    await this.loadRequirements({ componentId: this.componentId });
  }
}
</script>
