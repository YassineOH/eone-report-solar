export interface DailyData {
  data: Daum[];
  failCode: 0;
  message: any;
  params: Params;
  success: boolean;
}

export interface Daum {
  collectTime: number;
  stationCode: string;
  dataItemMap: DataItemMap;
}

export interface DataItemMap {
  inverter_power: number;
  selfUsePower: number;
  power_profit: number;
  perpower_ratio: number;
  reduction_total_co2: number;
  selfProvide: number;
  installed_capacity: number;
  use_power: number;
  reduction_total_coal: number;
  ongrid_power: number;
  buyPower: number;
}

export interface Params {
  currentTime: number;
  collectTime: number;
  stationCodes: string;
}
