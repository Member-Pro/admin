import api from './apiBaseService';
import AchievementComponent from '@/models/achievements/achievementComponent';

export default {
  async findById(achievementId: number, id: number): Promise<AchievementComponent> {
    const response = await api.get(`achievements/${achievementId}/components/${id}`);

    const component = new AchievementComponent(response.data);
    return component;
  },

  async getAllForAchievement(achievementId: number): Promise<AchievementComponent[]> {
    const response = await api.get(`achievements/${achievementId}/components`);

    const components = response.data.map((x: any) => new AchievementComponent(x));
    return components;
  },
};
