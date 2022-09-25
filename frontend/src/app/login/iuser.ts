import { BaseModel } from '../shared/services/http.service';

export interface User extends BaseModel {
  usuario: string;
  senha: string;
}
