export class ResponseGeneric {
    data: Array<any> | any;
    message: string;
    success: boolean;

    constructor(data: Array<any> | any, message: string, success: boolean) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}