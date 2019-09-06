export class Error {
    errorType: errorsType;
    message?: string;

    constructor(errorType: errorsType, message?: string) {
        this.errorType = errorType;
        this.message = message;
    }
}

export enum errorsType {
    required = 'required',
    minlength = 'minlength',
    maxlength = 'maxlength',
    email = 'email'
}

export const errorConfig = {
    required: 'El campo es requerido',
    minlength: 'Caracteres mínimos',
    maxlength: 'Caracteres máximos',
    email: 'Email incorrecto'
};

export const httpStatus = {
    // Respuestas satisfactorias
    100: 'Continue',
    101: 'Switching Protocol',
    102: 'Processing (WebDAV)',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status (WebDAV)',
    208: 'Multi-Status (WebDAV)',
    226: 'IM Used',
    // Redirecciones
    300: 'Multiple Choice',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    306: 'unused',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    // Errores de cliente
    400: ['Bad Request', 'Ocurrio un problema al interpretar la solicitud'],
    401: ['Unauthorized', 'no se encuentra autenticado'],
    402: 'Payment Required',
    403: ['Forbidden', 'no se encuentra autenticado'],
    404: ['Not Found', 'No se pudo obtener el contenido solicitado'],
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'Im a teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Entity (WebDAV)',
    423: 'Locked (WebDAV)',
    424: 'Failed Dependency (WebDAV)',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: ['Too Many Requests', 'Se mandaron varias solicitudes'],
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    // Errores de servidor
    500: ['Internal Server Error', 'Ocurrio un problema al procesar la solicitud'],
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    510: 'Not Extended',
    511: 'Network Authentication Required'
};
