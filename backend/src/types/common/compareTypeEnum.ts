export enum CompareTypeEnum {
  None = "None",
  Equal = "Equal",
  LessThan = "LessThan",
  MoreThan = "MoreThan",
}

export interface MacroEvaluationType {
  key: string;
  compare: CompareTypeEnum;
  value: number;
}
