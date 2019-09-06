export class CargarGeneric {
    data: Array<any>;
    message: string;
    success: boolean;

    constructor(data: Array<any>, message: string, success: boolean) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}

export interface CargarHoras {
    startTime: string;
}

export interface CargarTurno {
    turno: number;
}

export interface CargarMacroArea {
    descripcionMacroArea: string;
    macroArea_key: string;
}

export interface CargarArea {
    descripcionArea: string;
    area_key: string;
    macroArea_key: string;
}

export interface CargarCliente {
    d_cliente: string;
}

export interface CargarListado {
    d_nombre: string;
    numero_key: number;
    area_key: string;
}

export interface CargarVerificador {
    verificador_key: string;
    descripcionVerificador: string;
    macroArea_key: string;
}

export interface CargarRecorridaOperaciones {
    columnLine: string;
    tiporecorrida_key: number;
    linea_key: number;
}

export interface CargarTipoRecorridas {
    tipoRecorrida_key: number;
    d_tiporecorrida: string;
}

export class CargarDT {
    columnLine: string;
    tiporecorridakey: number;
    lineakey: number;
    identifier: string;

    constructor(columnLine: string, tiporecorridakey: number, lineakey: number, identifier: string) {
        this.columnLine = columnLine;
        this.tiporecorridakey = tiporecorridakey;
        this.lineakey = lineakey;
        this.identifier = identifier;
    }
}

export class CargarDTSelected {
    lineakey?: number;
    tiporecorridakey?: number;
    cantidadHllazgos?: number;

    constructor(lineakey?: number, tiporecorridakey?: number, cantidadHllazgos?: number) {
        this.lineakey = lineakey;
        this.tiporecorridakey = tiporecorridakey;
        this.cantidadHllazgos = cantidadHllazgos;
    }
}
