export interface PlantData {
  data: Daum[];
  failCode: 0;
  message: any;
  params: Params;
  success: boolean;
}

export interface Daum {
  stationCode: string;
  dataItemMap: DataItemMap;
}

export interface DataItemMap {
  total_income: number;
  total_power: number;
  day_power: number;
  day_income: number;
  real_health_state: 1 | 2 | 3;
  month_power: number;
}

export interface Params {
  currentTime: number;
  stationCodes: string;
}
