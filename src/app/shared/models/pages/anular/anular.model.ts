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

export interface AnularLinea {
    linea_key: string;
    descripcionLinea: string;
}

export interface AnularSave {
    param: string;
    value: string;
}

export class AnularSave {
    param: string;
    value: string;

    constructor(param: string, value: string) {
        this.param = param;
        this.value = value;
    }
}
