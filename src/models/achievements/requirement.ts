import BaseModel from './baseModel';

export interface RequirementValidationParameterModel {
  key: string;
  name: string;
  description: string;
  inputType: string;
  options: string[];
  isRequired: boolean;
  minimum: number | null;
  maximum: number | null;
  value: string;
}

export enum RequirementType {
  Completion = 1,
  Score = 2,
  Count = 5,
  Verifications = 10
}

export interface RequirementModel extends BaseModel {
    componentId: number;
    name: string;
    description: string;
    displayOrder: number;
    validatorTypeName: string;
    validationParameters: RequirementValidationParameterModel[];
    type: RequirementType;
    minCount: number | null;
    maxCount: number | null;
}
