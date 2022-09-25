import { Component, Input, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService, BaseModel } from '../../services/http.service';
import { SearchService } from '../../services/search.service';

export interface MeuDataDaTabela {
  id: string;
  nome: string;
  telefone: string;
}

export type PesquisarFuncao<T> = (dado: T, texto: string) => boolean;

export interface Coluna {
  titulo: string;
  propriedade: string;
  formatter?: (data: any, col: Coluna) => any;
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent<T extends BaseModel> implements OnInit, OnDestroy {
  @Input() nomeDaTabela: string = '';
  @Input() colunas: Coluna[] = [];
  @Input() servico!: HttpService<T>;
  @Input() habilitaBotoes = true;
  @Input() pesquisarFuncao: PesquisarFuncao<T> = (dado, texto) => true;

  @Output('onCreate') onCreateEvent = new EventEmitter();
  @Output('onEdit') onEditEvent = new EventEmitter();
  @Output('onDelete') onDeleteEvent = new EventEmitter();


  dados: T[] = [];
  todosDados: T[] = [];
  searchSubscribe!: Subscription;


  reverse: boolean = true;
  chave: string = '';
  paginaAtual = 1;
  itemsPorPagina = 5;



  constructor(
    private search: SearchService,
  ) { }

  get dadosPaginados() {
    return this.dados.slice(
      (this.paginaAtual - 1) * this.itemsPorPagina,
      this.paginaAtual * this.itemsPorPagina
    );
  }

  obterDados = () =>
    this.servico.listar().subscribe((dados: any) => {
      this.dados = this.todosDados = dados;
    });

  ngOnInit(): void {
    this.obterDados();
    this.searchSubscribe = this.search.listenSearch().subscribe((texto) => {
      this.dados = this.todosDados.filter(dado => this.pesquisarFuncao(dado, texto));
    });
  }

  ngOnDestroy(): void {
    this.searchSubscribe.unsubscribe();
  }

  ordenar(chave: string) {
    this.chave = chave;
    this.reverse = !this.reverse;
  }

  onCreate() {
    this.onCreateEvent.emit();

  }
  onEdit(dado: T) {
    this.onEditEvent.emit(dado);

  }
  onDelete(dado: T) {
    this.onDeleteEvent.emit(dado);

  }
}
