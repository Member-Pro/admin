import { AchievementModel } from '@/models/achievements/achievement';
import { AchievementComponentModel } from '@/models/achievements/achievementComponent';
import { RequirementModel } from '@/models/achievements/requirement';
import achievementComponentService from '@/services/achievementComponentService';
import achievementRequirementService from '@/services/achievementRequirementService';
import achievementService from '@/services/achievementService';

interface EditAchevementState {
  isLoading: boolean;
  isSaving: boolean;

  achievement: AchievementModel | null;
  components: AchievementComponentModel[];
  component: AchievementComponentModel | null;
  requirements: RequirementModel[];

  showEditRequirementModal: boolean;
}

const state: EditAchevementState = {
  isLoading: false,
  isSaving: false,

  achievement: null,
  components: [],
  component: null,
  requirements: [],

  showEditRequirementModal: false,
};

const getters = {
  isLoading: (state: EditAchevementState) => state.isLoading,
  isSaving: (state: EditAchevementState) => state.isSaving,

  achievement: (state: EditAchevementState) => state.achievement,
  components: (state: EditAchevementState) => state.components,
  component: (state: EditAchevementState) => state.component,
  requirements: (state: EditAchevementState) => state.requirements,

  showEditRequirementModal: (state: EditAchevementState) => state.showEditRequirementModal,
};

const mutations = {
  SET_IS_LOADING(state: EditAchevementState, value: boolean) {
    state.isLoading = value;
  },

  SET_IS_SAVING(state: EditAchevementState, value: boolean) {
    state.isSaving = value;
  },

  SET_ACHIEVEMENT(state: EditAchevementState, value: AchievementModel) {
    state.achievement = value;
  },

  SET_COMPONENTS(state: EditAchevementState, value: AchievementComponentModel[]) {
    state.components = value;
  },

  SET_COMPONENT(state: EditAchevementState, value: AchievementComponentModel) {
    state.component = value;
  },

  SET_REQUIREMENTS(state: EditAchevementState, value: RequirementModel[]) {
    state.requirements = value;
  },

  SET_SHOW_EDIT_REQUIREMENT_MODAL(state: EditAchevementState, value: boolean) {
    state.showEditRequirementModal = value;
  },
};

const actions = {
  async load({ commit }, { achievementId, componentId = null }: { achievementId: number, componentId: number | null }): Promise<void> {
    console.log('load', achievementId, componentId);

    commit('SET_IS_LOADING', true);

    const achievement = await achievementService.findById(achievementId);
    commit('SET_ACHIEVEMENT', achievement);

    const components = await achievementComponentService.getAllForAchievement(achievementId);
    commit('SET_COMPONENTS', components);

    // if (componentId) {
    //   // Can only load requirements if we know the component
    //   const requirements = await achievementRequirementService.getForComponent(componentId);
    //   commit('SET_REQUIREMENTS', requirements);
    // }

    commit('SET_IS_LOADING', true);
  },

  async loadComponent({ commit }, { achievementId, componentId }: { achievementId: number, componentId: number }): Promise<void> {
    // TODO: Only make API call if componentId is different than what's in state?

    commit('SET_IS_LOADING', true);

    const component = await achievementComponentService.findById(achievementId, componentId);
    commit('SET_COMPONENT', component);

    const requirements = await achievementRequirementService.getForComponent(componentId);
    commit('SET_REQUIREMENTS', requirements);

    commit('SET_IS_LOADING', false);
  },

  async loadRequirements({ commit }, { componentId }: { componentId: number }): Promise<void> {
    commit('SET_IS_LOADING', true);

    const requirements = await achievementRequirementService.getForComponent(componentId);
    commit('SET_REQUIREMENTS', requirements);

    commit('SET_IS_LOADING', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};