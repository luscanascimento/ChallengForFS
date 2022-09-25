import { User } from '../login/iuser';
import { Observable } from 'rxjs';
import { createInjectionToken } from '@angular/compiler/src/core';
export interface AuthContract {
  usuarioAutenticado: boolean;

  verificarUsuario({
    usuario,
    senha,
  }: {
    usuario: string;
    senha: string;
  }): Observable<User | null>;
}
