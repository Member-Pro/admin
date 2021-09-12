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
};
