import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Coluna, PesquisarFuncao } from '../shared/components/datatable/datatable.component';
import { UserService } from '../shared/services/user.service';
import { User } from '../login/iuser';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.scss']
})
export class RegisteredUsersComponent implements OnInit {
  datePipe = new DatePipe('en');
  colunas: Coluna[] = [
    { titulo: "#", propriedade: "id" },
    { titulo: "Usuario", propriedade: "usuario" },
    { titulo: "Data", propriedade: "dataDeCriacao", formatter: this.formataData.bind(this) }
  ];

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  formataData(user: User) {
    return this.datePipe.transform(user.dataDeCriacao, "dd/MM/yy H:mm:ss")
  }

  pesquisar: PesquisarFuncao<User> = (user: User, texto: string) => {
    return (
      user.usuario.toLowerCase().indexOf(texto.toLowerCase()) > -1
    );
  }

}
