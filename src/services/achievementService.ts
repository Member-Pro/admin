import api from './apiBaseService';
import { AchievementModel } from '@/models/achievements/achievement';

export default {
  async findById(id: number): Promise<AchievementModel> {
    const response = await api.get(`achievements/${id}`);

    const achievement = response.data as AchievementModel;
    return achievement;
  },

  async getAll(): Promise<AchievementModel[]> {
    const response = await api.get('achievements');

    const achievements = response.data as AchievementModel[];
    return achievements;
  },
};
