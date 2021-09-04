import BaseModel from './baseModel';
import { RequirementModel } from './requirement';

export interface AchievementComponentModel extends BaseModel {
  achievementId: number;
  name: string;
  description: string;
  displayOrder: number;
  isDisabled: boolean;
  createdOn: string;
  updatedOn: string;
  requirements: RequirementModel[];
};
