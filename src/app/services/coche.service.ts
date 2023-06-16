import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{CocheI}from 'src/models/coche';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
  api_url = 'http://localhost:4000'
  base_path = `${this.api_url}/coches/`
  base_path2 = `${this.api_url}/coche/`

  constructor(private http: HttpClient) {}

  get(api: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get(`${this.api_url}${api}`, httpOptions);
  }

  getAllCoche(): Observable<{coche:CocheI[]}>{
    return this.http.get<{coche:CocheI[]}>(this.base_path)
  }

  getOneCoche(id: number): Observable<{coche:CocheI[]}>{
    console.log(`${this.base_path2}${id}`)
    return this.http.get<{coche:CocheI[]}>(`${this.base_path2}${id}`)
  }

  createCoche(data: any):Observable<CocheI>{
    return this.http.post<CocheI>(this.base_path2, data)
    // return this.http.post<CocheI>(this.base_path_django, data)
  }

  updateCoche(id: number, data: CocheI): Observable<CocheI> {
    return this.http.put<CocheI>(`${this.base_path2}${id}`, data);
    // return this.http.put<CocheI>(`${this.base_path_django}${id}`, data);
  }

  deleteCoche(id: number): Observable<CocheI> {
    return this.http.delete<CocheI>(`${this.base_path}${id}`);
    // return this.http.delete<CocheI>(`${this.base_path_django}${id}`);
  }
}
