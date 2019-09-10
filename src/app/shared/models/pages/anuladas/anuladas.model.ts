export class AnuladasDT {
    fecha: Date;
    turno: number;
    tipo: string;
    verificador: string;
    causa: string;

    constructor(model: AnuladasDT) {
        this.fecha = model.fecha;
        this.turno = model.turno;
        this.tipo = model.tipo;
        this.verificador = model.verificador;
        this.causa = model.causa;
    }
}
