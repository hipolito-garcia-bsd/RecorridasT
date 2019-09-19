export const enum ExtendedType {
    excel = 'excel',
    pdf = 'pdf',
    copy = 'copy',
    csv = 'csv',
    excelHtml5 = 'excelHtml5',
    pdfHtml5 = 'pdfHtml5',
    copyHtml5 = 'copyHtml5',
    csvHtml5 = 'csvHtml5',
    excelFlash = 'excelFlash',
    pdfFlash = 'pdfFlash',
    copyFlash = 'copyFlash',
    csvFlash = 'csvFlash'
}

const doom = {
    header: '<"row"<"col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12"l><"col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12"f>>',
    body: '<"row"<"col-12"tr>>',
    footer: '<"row"<"col-3"i>><"row"<"col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"B><"col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"p>>'
};

export const DtOptionsDefault: any = {
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
    processing: true,
    deferLoading: 0,
    deferRender: true,
    language: {
        processing: 'Procesando...',
        lengthMenu: 'Mostrar _MENU_ registros',
        zeroRecords: 'No se encontraron resultados',
        emptyTable: 'Ningún dato disponible en esta tabla',
        info: '_START_ a _END_ de _TOTAL_ registro(s)',
        infoEmpty: '0 a 0 de 0 registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros)',
        infoPostFix: '',
        search: 'Buscar:',
        url: '',
        thousands: ',',
        loadingRecords: 'Cargando...',
        paginate: {
            first: 'Primero',
            last: 'Último',
            next: 'Siguiente',
            previous: 'Anterior'
        },
        aria: {
            sortAscending: ': Activar para ordenar la columna de manera ascendente',
            sortDescending: ': Activar para ordenar la columna de manera descendente'
        }
    },
    dom: `${doom.header}${doom.body}${doom.footer}`,
    buttons: [
        {
            extend: ExtendedType.excelHtml5,
            text: 'Excel',
            messageTop: '',
            className: 'buttonsDownloadDT'
        },
        {
            extend: ExtendedType.csvHtml5,
            text: 'Cvs',
            messageTop: '',
            className: 'buttonsDownloadDT'
        },
        {
            extend: ExtendedType.pdfHtml5,
            text: 'Pdf',
            messageTop: '',
            className: 'buttonsDownloadDT'
        }
    ],
    destroy: true,
    autoWidth: true
};
