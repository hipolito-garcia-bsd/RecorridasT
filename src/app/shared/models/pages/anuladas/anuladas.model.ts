export interface IAnuladasDT {
    column1: string;
    turno_key: string;
    d_tiporecorrida: string;
    descripcionverificador: string;
    t_causa: string;
}

export class AnuladasDT implements IAnuladasDT {
    column1: string;
    turno_key: string;
    d_tiporecorrida: string;
    descripcionverificador: string;
    t_causa: string;

    constructor(model: IAnuladasDT) {
        this.column1 = model.column1;
        this.turno_key = model.turno_key;
        this.d_tiporecorrida = model.d_tiporecorrida;
        this.descripcionverificador = model.descripcionverificador;
        this.t_causa = model.t_causa;
    }
}
