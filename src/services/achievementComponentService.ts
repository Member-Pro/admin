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

  async create(model: AchievementComponentModel): Promise<AchievementComponentModel> {
    const response = await api.post(`achievements/${model.achievementId}/components`, model);

    return response.data as AchievementComponentModel;
  },

  async update(model: AchievementComponentModel): Promise<AchievementComponentModel> {
    await api.put(`achievements/${model.achievementId}/components/${model.id}`, model);

    return model; // TODO: Probably should have this returned from the PUT request?
  },
};
