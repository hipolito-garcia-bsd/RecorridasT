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
}

export interface CargarRecorridaOperaciones {
    column1: string;
    tiporecorrida_key: number;
    linea_key: number;
}

export interface CargarTipoRecorridas {
    tipoRecorrida_key: number;
    d_tiporecorrida: string;
}

export class CargarHallazgos {
    numero: number;

    constructor(numero: number) {
        this.numero = numero;
    }

    public static getHallazgos(cantidas: number): Array<CargarHallazgos> {
        const result: Array<CargarHallazgos> = [];
        for (let i = 1; i <= cantidas; i++) {
            result.push({ numero: i });
        }
        return result;
    }
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


export interface CargarFilters {
    param: string;
    value: string;
}

export class CargarSaveModel {
    username: string;
    fecha: string;
    month: string;
    year: string;
    horaIni: string;
    horaFin: string;
    turno: string;
    area: string;
    cliente: string;
    listado: string;
    verificador: string;
    list: Array<{ quantity: number, filters: Array<CargarFilters> }>;

    constructor(model: CargarSaveModel) {
        this.username = model.username;
        this.fecha = model.fecha;
        this.month = model.month;
        this.year = model.year;
        this.horaIni = model.horaIni;
        this.horaFin = model.horaFin;
        this.turno = model.turno;
        this.area = model.area;
        this.cliente = model.cliente;
        this.listado = model.listado;
        this.verificador = model.verificador;
        this.list = model.list;
    }
}
