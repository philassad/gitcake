import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Receitas } from '../model/receitas.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http: HttpClient) {}
   
   readonly API = "http://localhost:3000/receitas/";

   getReceita() {
    return this.http.get<Receitas[]>(this.API);
   }
   getReceitaUnica(id: Number){
    return this.http.get<Receitas>(this.API + id);
   }
   postReceita(receita: any) {
    return this.http.post(this.API, JSON.stringify(receita), this.httpOptions).subscribe();
   }
   deletaReceita(id: Number) {
    return this.http.delete(this.API + id).subscribe();
   }
   updateStatus(receita: Receitas){
    return this.http.put(this.API + receita.id, JSON.stringify(receita), this.httpOptions).subscribe();
   }
   updateReceita(receita: Receitas, id: any){
    return this.http.put(this.API + id, JSON.stringify(receita), this.httpOptions).subscribe();
   }
}
