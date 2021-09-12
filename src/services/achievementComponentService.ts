import api from './apiBaseService';
import { AchievementComponentModel } from '@/models/achievements/achievementComponent';

export default {
  async findById(achievementId: number, id: number): Promise<AchievementComponentModel> {
    const response = await api.get(`achievements/${achievementId}/components/${id}`);

    const component = response.data as AchievementComponentModel;
    return component;
  },

  async getAllForAchievement(achievementId: number): Promise<AchievementComponentModel[]> {
    const response = await api.get(`achievements/${achievementId}/components`);

    const components = response.data as AchievementComponentModel[];
    return components;
  },
};
