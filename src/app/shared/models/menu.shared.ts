import { NavMode } from './nav.model';

const ROUTES: Array<NavMode> = [
    new NavMode('RECORRIDAS', '', 'dashboard', [
        new NavMode('CARGAR', '/cargar', 'backup', [
            // new NavMode('Cargar1', '/Cargar1', 'backup', []),
            // new NavMode('Cargar2', '/Cargar2', 'backup', [
            //     new NavMode('Cargar1', '/Cargar1', 'backup', []),
            //     new NavMode('Cargar2', '/Cargar2', 'backup', [])
            // ])
        ]),
        new NavMode('ANULAR', '/anular', 'cancel', []),
        new NavMode('ANULADAS', '/anuladas', 'cancel_presentation', [])
    ]),
    new NavMode('MINOR VIEW', '/', 'tv', [])
];
export {
    ROUTES
};
