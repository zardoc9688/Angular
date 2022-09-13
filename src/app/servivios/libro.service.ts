import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../modelos/libro';

//URL DEL BACKEND
const BASE_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})


export class LibroService {

  libros:Array<Libro> = new Array<Libro>();

  constructor(private http: HttpClient) { }

  getLibros(): Observable<Libro[]>{    
    return this.http.get<Libro[]>(BASE_URL+'/libros/api/')
  }

  saveLibro(libro:Libro): Observable<Libro>{
    return this.http.post<Libro>(BASE_URL+'/libros/api/',libro);
  }

  updateLibro(libro:Libro){
    return this.http.put<Libro>(BASE_URL+'/libros/api/'+libro.id+'/',libro);
  }

  deleteLibro(libro:Libro): Observable<any>{
    return this.http.delete<any>(BASE_URL+'/libros/api/'+libro.id+'/');
  }

}