import api from './apiBaseService';
import { RequirementModel } from '@/models/achievements/requirement';

export default {
  async findById(achievementId: number, id: number): Promise<RequirementModel> {
    const response = await api.get(`achievements/${achievementId}/components/${id}`);

    const requirement = response.data as RequirementModel;
    return requirement;
  },

  async getAllForAchievement(achievementId: number): Promise<RequirementModel[]> {
    const response = await api.get(`achievements/${achievementId}/requirements`);

    const requirements = response.data as RequirementModel[];
    return requirements;
  },

  async getForComponent(componentId: number): Promise<RequirementModel[]> {
    const response = await api.get(`components/${componentId}/requirements`);

    const requirements = response.data as RequirementModel[];
    return requirements;
  },

  async create(model: RequirementModel): Promise<RequirementModel> {
    const response = await api.post(`components/${model.componentId}/requirements`, model);

    return response.data as RequirementModel;
  },

  async update(model: RequirementModel): Promise<RequirementModel> {
    await api.put(`requirements/${model.id}`, model);

    return model; // TODO: Probably should have this returned from the PUT request?
  },

  async delete(requirementId: number): Promise<void> {
    await api.delete(`requirements/${requirementId}`);
  },
};
