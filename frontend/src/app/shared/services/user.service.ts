import { Injectable } from '@angular/core';
import { User } from 'src/app/login/iuser';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService<User> {
  protected resourceUrl = 'users';

  public pesquisaPorUsuarioSenha(data: { usuario: string; senha: string }) {
    return this.http.post<User>(`${this.fullUrl}/login`, data);
  }
}
