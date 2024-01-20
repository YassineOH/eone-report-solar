export interface LoginResponse {
  data: null;
  success: boolean;
  failCode: number;
  params: Params;
  message: null;
}

export interface Params {}

export interface ReLOGIN {
  failCode: 305;
  immediately: boolean;
  message: 'USER_MUST_RELOGIN';
}
