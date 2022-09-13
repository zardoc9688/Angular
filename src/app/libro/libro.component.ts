import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libro } from './modelos/libro';
import { LibroService } from '../servivios/libro.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})

export class LibroComponent implements OnInit {

  libros:Array<Libro> = new Array<Libro>();
  modal = false;

  // @ts-ignore
  libroForm: FormGroup;
  libro_up:Libro;

  constructor(private servicio: LibroService,private fbGenerator: FormBuilder) { 
    this.libro_up = new Libro();
       
  }

  ngOnInit(): void {
    this.libroForm = this.fbGenerator.group({
      autor:[3],
      categoria:[1],
      titulo:[''],
      descripcion:[''],
      fecha_pub:['']
    })

    this.servicio.getLibros().subscribe((libros)=>{
      this.libros = libros;
    });
  }

  new_libro(){
    this.libroForm.setValue({
      autor:3,
      categoria:1,
      titulo:'',
      descripcion:'',
      fecha_pub:''
    });
  }

  add_libro(){
    var libro = this.libroForm.value as Libro;
    console.log(libro)
    this.servicio.saveLibro(libro).subscribe((libroNuevo)=>{
      this.servicio.getLibros().subscribe((libros)=>{
        this.libros = libros;
        this.modal = false;
      });
    });
  }

  update_libro(){
    var libro = this.libroForm.value as Libro;
    libro.id = this.libro_up.id
    this.servicio.updateLibro(libro).subscribe((libroNuevo)=>{
      this.servicio.getLibros().subscribe((libros)=>{
        this.libros = libros;
        this.modal = false;
      });
    });

  }

  see_update(libro:Libro){
    this.libro_up = libro;
    this.libroForm.setValue({
      autor:libro.autor,
      categoria:libro.categoria,
      titulo:libro.titulo,
      descripcion:libro.descripcion,
      fecha_pub:libro.fecha_pub
    });
  }


  delete_libro(libro:Libro){
    this.servicio.deleteLibro(libro).subscribe((response)=>{
      this.servicio.getLibros().subscribe((libros)=>{
        this.libros = libros;
        this.modal = false;
      });
    });
  }

}