import { EventEmitter, Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from 'src/app/login/iuser';

const KEY = 'USUARIO_AUTENTICADO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuarioAutenticado: boolean | null = null;

  public get usuarioAutenticado(): boolean {
    if (this._usuarioAutenticado === null) {
      const isAutenticado = localStorage.getItem(KEY) === 'true';
      this._usuarioAutenticado = isAutenticado;
    }
    return this._usuarioAutenticado;
  }

  public set usuarioAutenticado(autenticado: boolean) {
    this._usuarioAutenticado = autenticado;
    localStorage.setItem(KEY, this._usuarioAutenticado ? 'true' : 'false');
    this.quandoUsuarioAutenticarEvento.next(autenticado);
  }

  quandoUsuarioAutenticarEvento = new EventEmitter<boolean>();

  constructor(private userService: UserService) {}

  verificarUsuario(user: User) {
    return this.userService.pesquisaPorUsuarioSenha(user).pipe(
      tap(
        (user) => {
          if (user != null) {
            this.usuarioAutenticado = true;
          }
        },
        () => {
          this.usuarioAutenticado = false;
        }
      )
    );
  }

  logout() {
    this.usuarioAutenticado = false;
  }
}
