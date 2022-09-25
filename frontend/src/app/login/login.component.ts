import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertModalService } from '../shared/services/alert-modal.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credenciais: any = {
    usuario: '',
    senha: '',
  };

  constructor(
    private authService: AuthService,
    private alert: AlertModalService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  fazerLogin() {
    this.authService.verificarUsuario(this.credenciais).subscribe(
      () => {
        return this.router.navigate(['./home']);
      },
      () => {
        return this.alert.showAlertDanger('Usuario ou senha não encontrados');
      }
    );
  }
}
