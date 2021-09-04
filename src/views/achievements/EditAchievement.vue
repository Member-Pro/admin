<template>
  <div class="">
    <h1>Edit Achievement {{ achievement ? `- ${achievement.name}` : '' }}</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { AchievementModel } from '@/models/achievements/achievement';
import achievementService from '@/services/achievementService';

@Options({})
export default class EditAchievement extends Vue {
  @Prop({ required: true })
  achievementId = 0;

  achievement: AchievementModel | null = null;

  async created() {
    await this.refreshAchievement();
  }

  @Watch('achievementId')
  async refreshAchievement() {
    if (this.achievementId !== 0) {
      this.achievement = await achievementService.findById(this.achievementId);
    }
  }
}
</script>
