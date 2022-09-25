import { Component, OnInit } from '@angular/core';
import { IChartData } from './chart/IChartData';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  atividadesPorStatus: IChartData[] = [];
  atividadesPorPrioridade: IChartData[] = [];
  isLoading = false;

  constructor(private taskService: TasksService) {}
  ngOnInit(): void {
    this.taskService.contarPorColuna('status').subscribe((tarefasAgrupadas) => {
      this.atividadesPorStatus = tarefasAgrupadas;
      this.isLoading = false;
    });

    this.taskService
      .contarPorColuna('prioridade')
      .subscribe((tarefasAgrupadas) => {
        this.atividadesPorPrioridade = tarefasAgrupadas;
        this.isLoading = false;
      });
  }
}
