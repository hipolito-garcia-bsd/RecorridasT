export class UserInfo {
    nombre: string;
    sigla: string;
    tumbnail: string;
    nombreSubst?: string;

    constructor(nombre: string, sigla: string, tumbnail: string) {
        this.nombre = nombre;
        this.sigla = sigla;
        this.tumbnail = tumbnail;
        if (nombre) {
            const index = nombre.indexOf('\\');
            const subst = nombre.substring(index + 1, nombre.length);
            this.nombreSubst = subst;
        } else {
            this.nombreSubst = '';
        }
    }
}
