export interface RequestOptions {
  method: string;
  headers: { [key: string]: string };
  body?: { [key: string]: any };
  data?: { [key: string]: any };
}
