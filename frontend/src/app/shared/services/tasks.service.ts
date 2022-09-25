import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Tarefa } from '../../tasks/atividade';
import { map } from 'rxjs/operators';
import { AgroupedTask } from '../../tasks/iagrouped-task';
import { IChartData } from '../../home/chart/IChartData';

@Injectable({
  providedIn: 'root',
})
export class TasksService extends HttpService<Tarefa> {
  protected resourceUrl = 'tasks';
  reload = true;

  contarPorColuna(col: string) {
    return this.http
      .get<AgroupedTask[]>(`${this.fullUrl}/contaPorColuna/${col}`)
      .pipe(
        map((resp) => {
          const data: IChartData[] = resp.map((agrouppedTask) => ({
            name: agrouppedTask.status || agrouppedTask.prioridade,
            y: agrouppedTask.quantidade,
          }));
          return data;
        })
      );
  }
}
