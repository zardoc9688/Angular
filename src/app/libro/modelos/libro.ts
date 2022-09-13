export class Libro{
    id:number;
    autor: number;
    categoria: number;
    titulo: string;
    descripcion: string;
    fecha_pub: Date;

    constructor(){
        this.id = 0;
        this.autor = 0;
        this.categoria = 0;
        this.titulo = "";
        this.descripcion = "";
        this.fecha_pub = new Date();
    }

}