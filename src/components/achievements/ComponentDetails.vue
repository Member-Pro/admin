<template>
  <div class="component-details">
    <div class="level is-mobile mb-3">
      <div class="left">
        <div class="level-item">
          <h3 class="title is-3">
            {{ component?.name }}
          </h3>
        </div>
      </div>
      <div class="right">
        <div class="level-item">
          <button class="button" @click.prevent="edit" title="Edit this component">
            <span class="icon">
              <fa-icon icon="pencil-alt" />
            </span>
            <span>
              Edit Component
            </span>
          </button>
        </div>
      </div>
    </div>

    <section class="box">
      <p class="content" v-if="component">
        {{ component?.description }}
      </p>
    </section>

    <requirement-list :componentId="componentId" />

    <component-editor-modal />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { AchievementComponentModel } from '@/models/achievements/achievementComponent';
import ComponentEditorModal from './ComponentEditorModal.vue';
import RequirementList from './RequirementList.vue';

const editAchievementModule = namespace('editAchievement');

@Options({
  components: {
    ComponentEditorModal,
    RequirementList,
  },
})
export default class ComponentDetails extends Vue {
  @Prop({ required: true })
  achievementId = 0;

  @Prop({ required: false })
  componentId = 0;

  @editAchievementModule.Getter('component')
  component!: AchievementComponentModel;

  @editAchievementModule.Action('loadComponent')
  loadComponent!: any;

  @editAchievementModule.Action('editComponent')
  editComponent!: any

  async created() {
    await this.refresh();
  }

  @Watch('componentId')
  async refresh() {
    await this.loadComponent({ achievementId: this.achievementId, componentId: this.componentId });
  }

  edit(): void {
    this.editComponent({ component: this.component });
  }
}
</script>
