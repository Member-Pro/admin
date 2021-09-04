import api from './apiBaseService';
import Requirement from '@/models/achievements/requirement';

export default {
  async findById(achievementId: number, id: number): Promise<Requirement> {
    const response = await api.get(`achievements/${achievementId}/components/${id}`);

    const component = new Requirement(response.data);
    return component;
  },

  async getAllForAchievement(achievementId: number): Promise<Requirement[]> {
    const response = await api.get(`achievements/${achievementId}/requirements`);

    const components = response.data.map((x: any) => new Requirement(x));
    return components;
  },
};
