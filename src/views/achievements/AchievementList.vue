<template>
  <div class="achievement-list">
    <h1 class="">Achievements</h1>

    <table class="table is-striped is-fullwidth">
      <thead>
        <th>Name</th>
        <th>Disabled</th>
        <th>Updated</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="achievement in achievements" :key="achievement.id">
          <td>{{ achievement.name }}</td>
          <td>{{ achievement.isDisabled ? 'Yes' : 'No' }}</td>
          <td :title="$filters.timestamp(achievement.updatedOn)">{{ $filters.relativeTime(achievement.updatedOn) }}</td>
          <td>
            <router-link :to="{ name: 'achievementEdit', params: { achievementId: achievement.id } }">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { AchievementModel } from '@/models/achievements/achievement';
import achievementService from '@/services/achievementService';

@Options({})
export default class AchievementList extends Vue {
  achievements: AchievementModel[] = [];

  async created() {
    await this.refresh();
  }

  async refresh() {
    this.achievements = await achievementService.getAll();
  }
}
</script>
