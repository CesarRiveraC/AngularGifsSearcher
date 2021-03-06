import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apikey: string = 'ZdRx3ubwpwvAzBBmJx4v5OYQ4lO3kqYP';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  public get historial(): string[] {
    return [...this._historial];
  }
  /**
   *
   */
  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    if (localStorage.getItem('resultados')) {
      this.resultados = JSON.parse(localStorage.getItem('resultados'));
    }
  }

  public buscarGifs(query: string = '') {
    query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this.historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGIFResponse>(`${this.baseUrl}/search`, { params })
      .subscribe((resp: any) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
