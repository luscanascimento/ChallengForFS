import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { Tarefa, StatusText } from './atividade';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, } from 'rxjs';
import { AlertModalService } from '../shared/services/alert-modal.service';
import { switchMap, take } from 'rxjs/operators';
import { TasksService } from '../shared/services/tasks.service';
import { Coluna, PesquisarFuncao, DatatableComponent } from '../shared/components/datatable/datatable.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  @ViewChild('tasksDataTable') tasksDataTable!: DatatableComponent<Tarefa>;

  todasTarefas!: Tarefa[];
  datePipe = new DatePipe('en');
  colunas: Coluna[] = [
    { titulo: "Titulo", propriedade: "titulo" },
    { titulo: "Descrição", propriedade: "descricao" },
    { titulo: "Prioridade", propriedade: "prioridade" },
    { titulo: "Status", propriedade: "status", formatter: this.resolveStatusText.bind(this) },
    { titulo: "Data", propriedade: "dataDeCriacao", formatter: this.formataData.bind(this) }
  ];
  pesquisar: PesquisarFuncao<Tarefa> = (tarefa: Tarefa, texto: string) => {
    return (
      tarefa.descricao.toLowerCase().indexOf(texto.toLowerCase()) > -1 ||
      tarefa.titulo.toLowerCase().indexOf(texto.toLowerCase()) > -1 ||
      tarefa.prioridade.toLowerCase().indexOf(texto.toLowerCase()) > -1 ||
      tarefa.status.toLowerCase().indexOf(texto.toLowerCase()) > -1
    );
  }

  constructor(
    private modalService: BsModalService,
    private alertModalService: AlertModalService,
    public crude: TasksService,
  ) { }
  ngOnInit(): void {
  }

  resolveStatusText(tarefa: Tarefa) {
    return StatusText[tarefa.status];
  }

  formataData(tarefa: Tarefa) {
    return this.datePipe.transform(tarefa.dataDeCriacao, "dd/MM/yy H:mm:ss")
  }

  cadastrarTarefa() {
    const initialState = {
      resultadoCallback: (tarefaEditada: Tarefa) => {
        // this.todasTarefas.push(tarefaEditada);
        this.tasksDataTable.obterDados()
      },
    };
    this.modalService.show(TasksFormComponent, {
      initialState,
    });
  }

  editarTarefa(tarefa: Tarefa) {
    const initialState = {
      tarefa,
      resultadoCallback: (tarefaEditada: Tarefa) => {
        Object.assign(tarefa, tarefaEditada);
      },
    };

    this.modalService.show(TasksFormComponent, {
      initialState,
    });
  }

  lidarComErro() {
    return this.alertModalService.showAlertDanger(
      'Erro ao carregar as Tarefas.'
    );
  }

  modalDelete(tarefa: Tarefa) {
    this.alertModalService
      .showConfirm('Confirmação', 'Tem certeza que deseja excluir este tarefa?')
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.crude.deletar(tarefa) : EMPTY))
      )
      .subscribe(
        () => {
          //TODO: Remover da tabela
          this.tasksDataTable.obterDados()
        },
        (error: any) => {
          console.log(error);
          return this.alertModalService.showAlertDanger(
            'Erro ao remover as Tarefas.'
          );
        }
      );
  }

}
