export const DtOptionsDefault: Partial<DataTables.Settings> = {
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
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
    dom: '<"row"<"col-6"l><"col-6"f>><"row"<"col-12"tr>><"row"<"col-3"i><"col-9"B>><"row"<"col-12"p>>',
    buttons: [
        {
            extend: 'excelHtml5',
            text: 'Excel',
            messageTop: ''
        },
        {
            extend: 'csvHtml5',
            text: 'Cvs',
            messageTop: ''
        },
        {
            extend: 'pdfHtml5',
            text: 'Pdf',
            messageTop: ''
        }
    ]
};
