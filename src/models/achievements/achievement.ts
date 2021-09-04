import BaseModel from './baseModel';

export interface AchievementModel extends BaseModel {
  name: string;
  description: string;
  infoUrl: string;
  imageFilename: string;
  displayOrder: number;
  isDisabled: boolean;
  createdOn: string;
  updatedOn: string;
};
