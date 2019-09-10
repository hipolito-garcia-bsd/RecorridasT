export class AnularDT {
    recorridakey: number;
    turnokey: number;
    tiporecorrida: string;
    tipoGrupoRecorrida: string;
    descripcionverificador: string;
    cantidadRecorridas: number;

    constructor(model: AnularDT) {
        this.recorridakey = model.recorridakey;
        this.turnokey = model.turnokey;
        this.tiporecorrida = model.tiporecorrida;
        this.tipoGrupoRecorrida = model.tipoGrupoRecorrida;
        this.descripcionverificador = model.descripcionverificador;
        this.cantidadRecorridas = model.cantidadRecorridas;
    }
}
