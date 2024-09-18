import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api';

@Injectable()
export abstract class GenericApiService<T> {
  protected constructor(protected http: HttpClient, protected apiUrl: string) {}

  public create(
    entity: Partial<T>,
    concatUrl: string = '',
    params: Record<string, any> = {}
  ): Observable<T> {
    return this.http.post<T>(`${BASE_URL}/${this.apiUrl}/${concatUrl}`, entity);
  }

  public getOne(
    concatUrl: string = '',
    params: Record<string, any> = {}
  ): Observable<T> {
    return this.http.get<T>(`${BASE_URL}/${this.apiUrl}/${concatUrl}`, {
      params,
    });
  }

  public getList(
    concatUrl: string = '',
    params: Record<string, any> = {}
  ): Observable<T[]> {
    return this.http.get<T[]>(`${BASE_URL}/${this.apiUrl}/${concatUrl}`, {
      params,
    });
  }

  public readById<T1 = unknown, T2 extends string | undefined = undefined>(
    id: string | number,
    params: Record<string, any> = {}
  ): Observable<T> {
    return this.http.get<T>(`${BASE_URL}/${this.apiUrl}/${id}`, {
      params,
    });
  }

  public update(
    id: string | number,
    entity: Partial<T>,
    afterIdUrl = '',
    params: Record<string, any> = {}
  ): Observable<unknown> {
    return this.http.put<unknown>(
      `${BASE_URL}/${this.apiUrl}/${id}/${afterIdUrl}`,
      entity,
      {
        params,
      }
    );
  }

  public delete(
    id: number | string,
    afterIdUrl = '',
    params: Record<string, any> = {}
  ): Observable<unknown> {
    return this.http.delete<unknown>(
      `${BASE_URL}/${this.apiUrl}/${id}/${afterIdUrl}`,
      {
        params,
      }
    );
  }
}
