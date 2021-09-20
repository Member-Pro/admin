<template>
  <div class="achievement-component-list">
    <aside class="menu">
      <p class="menu-label">Components</p>
      <ul class="menu-list">
        <li v-for="component in components" :key="component.id">
          <router-link
            :to="{ name: 'achievementEditComponentDetails', params: { achievementId: achievementId, componentId: component.id } }"
          >
            {{ component.name }}
          </router-link>
        </li>
      </ul>
    </aside>

    <div class="actions my-4">
      <button type="button" class="button is-success" @click="addComponent">
        Add Component
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { AchievementComponentModel } from '@/models/achievements/achievementComponent';

const editAchievementModule = namespace('editAchievement');

@Options({})
export default class ComponentName extends Vue {
  // TODO: with the introduction of the store, not sure this is needed anymore
  @Prop({ required: true })
  achievementId = 0;

  @editAchievementModule.Getter('components')
  components!: AchievementComponentModel[];

  @editAchievementModule.Action('addComponent') addComponent!: any;
}
</script>
