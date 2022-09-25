import { Tarefa, listaDePrioridades, listaDeStatus } from './../atividade';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from '../../shared/services/alert-modal.service';
import { TasksService } from 'src/app/shared/services/tasks.service';


@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.scss'],
})
export class TasksFormComponent implements OnInit {
  formulario!: FormGroup;
  tarefa!: Tarefa;
  prioridades = listaDePrioridades;
  statusList = listaDeStatus;
  mostrarSucess: boolean = false;

  resultadoCallback!: (tarefa: Tarefa) => void;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private modal: AlertModalService,
    private crude: TasksService
  ) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      titulo: [this.tarefa?.titulo],
      id: [this.tarefa?.id],
      dataDeCriacao: [this.tarefa?.dataDeCriacao || new Date()],
      descricao: [
        this.tarefa?.descricao,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      prioridade: [this.tarefa?.prioridade, [Validators.required]],
      status: [this.tarefa?.status, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.crude.salvar(this.formulario.value).subscribe((novaTarefa: Tarefa) => {
        this.resultadoCallback(novaTarefa);
        this.bsModalRef.hide();
        this.modal.showAlertSucess('Tarefa criada com sucesso');
        this.crude.listar()
      });
    } else {
      this.verificaValidacoesForm(this.formulario);
      this.modal.showAlertDanger('Erro ao tentar criar tarefa');
      this.bsModalRef.hide()
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

}
