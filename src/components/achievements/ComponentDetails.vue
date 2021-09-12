<template>
  <div class="">
    <h3 class="title is-3">
      {{ component ? component.name : '' }}
    </h3>

    <requirement-list :componentId="componentId" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { AchievementComponentModel } from '@/models/achievements/achievementComponent';
import RequirementList from './RequirementList.vue';

const editAchievementModule = namespace('editAchievement');

@Options({
  components: {
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

  async created() {
    await this.refresh();
  }

  @Watch('componentId')
  async refresh() {
    await this.loadComponent({ achievementId: this.achievementId, componentId: this.componentId });
  }
}
</script>
