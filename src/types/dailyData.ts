export interface DailyData {
  data: FusionSolarDailyData[];
  failCode: 0;
  message: any;
  params: Params;
  success: boolean;
}

export interface FusionSolarDailyData {
  collectTime: number;
  stationCode: string;
  dataItemMap: DataItemMap | undefined;
}

export interface DataItemMap {
  inverter_power: number | null | undefined;
  selfUsePower: number | null | undefined;
  power_profit: number | null | undefined;
  perpower_ratio: number | null | undefined;
  reduction_total_co2: number | null | undefined;
  selfProvide: number | null | undefined;
  installed_capacity: number | null | undefined;
  use_power: number | null | undefined;
  reduction_total_coal: number | null | undefined;
  ongrid_power: number | null | undefined;
  buyPower: number | null | undefined;
}

export interface Params {
  currentTime: number;
  collectTime: number;
  stationCodes: string;
}
