<template>
  <div class="">
    <h1 class="mb-4">Edit Achievement {{ achievement ? `- ${achievement.name}` : '' }}</h1>

    <hr />

    <div class="columns">
      <div class="column is-one-quarter">
        <component-list :achievementId="achievementId" />
      </div>
      <div class="column">
        <router-view name="main" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { AchievementModel } from '@/models/achievements/achievement';
import ComponentList from '@/components/achievements/ComponentListSide.vue';

const editAchievementModule = namespace('editAchievement');

@Options({
  components: {
    ComponentList,
  },
})
export default class EditAchievement extends Vue {
  @Prop({ required: true })
  achievementId = 0;

  @Prop({ required: false })
  componentId = 0;

  @editAchievementModule.State('achievement') achievement!: AchievementModel;

  @editAchievementModule.Action('load') load!: any;

  async created() {
    await this.refreshAchievement();
  }

  @Watch('achievementId')
  async refreshAchievement() {
    await this.load({ achievementId: this.achievementId });
  }
}
</script>
