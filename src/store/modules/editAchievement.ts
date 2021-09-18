import { orderBy } from 'lodash';
import { AchievementModel } from '@/models/achievements/achievement';
import { AchievementComponentModel } from '@/models/achievements/achievementComponent';
import { RequirementModel, RequirementType } from '@/models/achievements/requirement';
import achievementComponentService from '@/services/achievementComponentService';
import achievementRequirementService from '@/services/achievementRequirementService';
import achievementService from '@/services/achievementService';
import { CommitStateFunction } from '../helpers';

const getDefaultEditRequirementModel = (): RequirementModel => {
  return {
    id: 0,
    componentId: 0,
    name: '',
    description: '',
    displayOrder: 1,

    validatorTypeName: '',
    validationParameters: [],
    type: RequirementType.Completion,
    minCount: null,
    maxCount: null,
  };
};
interface EditAchevementState {
  isLoading: boolean;
  isSaving: boolean;

  achievement: AchievementModel | null;
  components: AchievementComponentModel[];
  component: AchievementComponentModel | null;
  requirements: RequirementModel[];

  showEditRequirementModal: boolean;
  editingRequirement: RequirementModel | null;

  showCopyRequirementModal: boolean;
}

const state: EditAchevementState = {
  isLoading: false,
  isSaving: false,

  achievement: null,
  components: [],
  component: null,
  requirements: [],

  showEditRequirementModal: false,
  editingRequirement: getDefaultEditRequirementModel(),

  showCopyRequirementModal: false,
};

const getters = {
  isLoading: (state: EditAchevementState) => state.isLoading,
  isSaving: (state: EditAchevementState) => state.isSaving,

  achievement: (state: EditAchevementState) => state.achievement,
  components: (state: EditAchevementState) => state.components,
  component: (state: EditAchevementState) => state.component,
  requirements: (state: EditAchevementState) => orderBy(state.requirements, [ 'displayOrder' ]),

  showEditRequirementModal: (state: EditAchevementState) => state.showEditRequirementModal,
  editingRequirement: (state: EditAchevementState) => state.editingRequirement,

  showCopyRequirementModal: (state: EditAchevementState) => state.showCopyRequirementModal,
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

  SET_EDITING_REQUIREMENT(state: EditAchevementState, value: RequirementModel | null) {
    state.editingRequirement = value;
  },

  SET_SHOW_COPY_REQUIREMENT_MODAL(state: EditAchevementState, value: boolean) {
    state.showCopyRequirementModal = value;
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

  async saveRequirement({ commit, dispatch, state }: { commit: any, dispatch: any, state: EditAchevementState }): Promise<void> {
    // TODO: updating the `type`  property changes its type to a string instead of a number and results in a 400 response

    if (state.editingRequirement?.id === 0) {
      state.editingRequirement.componentId = state.component?.id ?? 0;
      const newRequirement = await achievementRequirementService.create(state.editingRequirement);

      // Add the new requirement to state
      commit('SET_REQUIREMENTS', [ ...state.requirements, newRequirement ]);
    } else if (state.editingRequirement) {
      await achievementRequirementService.update(state.editingRequirement);
    }

    if (state.showEditRequirementModal) {
      dispatch('closeRequirementEditor');
    } else if (state.showCopyRequirementModal) {
      dispatch('closeCopyModal');
    }
  },

  async deleteRequirement({ commit, state }: CommitStateFunction<EditAchevementState>, { requirementId } : { requirementId: number }): Promise<void> {
    await achievementRequirementService.delete(requirementId);

    const updatedReqs = state.requirements.filter(x => x.id !== requirementId);
    commit('SET_REQUIREMENTS', updatedReqs);
  },

  addRequirement({ commit }): void {
    commit('SET_SHOW_EDIT_REQUIREMENT_MODAL', true);
    commit('SET_EDITING_REQUIREMENT', getDefaultEditRequirementModel());
  },

  editRequirement({ commit, state }: CommitStateFunction<EditAchevementState>, { requirementId } : { requirementId: number }): void {
    const requirement = state.requirements.find(x => x.id === requirementId);

    commit('SET_SHOW_EDIT_REQUIREMENT_MODAL', true);
    commit('SET_EDITING_REQUIREMENT', requirement);
  },

  closeRequirementEditor({ commit }): void {
    commit('SET_SHOW_EDIT_REQUIREMENT_MODAL', false);
    commit('SET_EDITING_REQUIREMENT', {} as RequirementModel);
  },

  copyRequirement({ commit }, { requirement }: { requirement: RequirementModel }): void {
    const copyRequirement = { ...requirement };
    // Reset props that shouldn't be copied
    copyRequirement.id = 0; // will make the requirement 'new'

    commit('SET_SHOW_COPY_REQUIREMENT_MODAL', true);
    commit('SET_EDITING_REQUIREMENT', copyRequirement);
  },

  closeCopyModal({ commit }): void {
    commit('SET_SHOW_COPY_REQUIREMENT_MODAL', false);
    commit('SET_EDITING_REQUIREMENT', {} as RequirementModel);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
