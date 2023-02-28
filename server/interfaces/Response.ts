export interface IResponse {
  msg?: string | null;
  error?: string | null;
  data?: any;
  access_token?: string | null;
  refresh_token?: string | null;
  total?: number;
}
