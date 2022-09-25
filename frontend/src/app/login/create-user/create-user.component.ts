import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../iuser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private crude: UserService,
    private fb: FormBuilder,
    private route: Router
  ) { }
  user!: User;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      usuario: [],
      senha: [],
      id: [],
      dataDeCriacao: new Date(),
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.crude.salvar(this.formulario.value).subscribe((user) => {
        alert('Usuário criado com sucesso: ' + user.id);
        this.route.navigate(['']);
      });
    }
  }
}
