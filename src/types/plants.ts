export interface Plants {
  data: Data;
  failCode: 0;
  message: 'get plant list success';
  success: true;
}

export interface Data {
  list: List[];
  pageCount: number;
  pageNo: number;
  pageSize: number;
  total: number;
}

export interface List {
  capacity: number;
  contactMethod: null;
  contactPerson: null;
  gridConnectionDate: Date;
  latitude: string;
  longitude: string;
  plantAddress: string;
  plantCode: string;
  plantName: string;
}
