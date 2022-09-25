import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';


export interface BaseModel {
  id: string;
  dataDeCriacao: string | Date;
}

@Injectable({
  providedIn: 'root',
})
export abstract class HttpService<T extends BaseModel> {
  protected apiURL = environment.backendUrl;

  constructor(protected http: HttpClient) { }

  protected abstract get resourceUrl(): string;

  public get fullUrl(): string {
    return `${this.apiURL}/${this.resourceUrl}`;
  }

  public listar() {
    return this.http.get<T>(this.fullUrl);
  }

  public salvar(data: BaseModel) {
    let response = null;

    if (data?.id == null) {
      response = this.http.post<T>(`${this.fullUrl}`, data);
      this.listar()
    } else {
      response = this.http.put<T>(`${this.fullUrl}/${data.id}`, data);
      this.listar()
    }

    return response;
  }

  public deletar(data: BaseModel) {
    return this.http.delete<T>(`${this.fullUrl}/${data.id}`).pipe(take(1))
  }

  public encontrar(data: BaseModel) {
    return this.http.get<T>(`${this.fullUrl}/${data.id}`).pipe(take(1));
  }
}
