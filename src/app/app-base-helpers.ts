import { NgxUiLoaderConfig } from 'ngx-ui-loader';

export function fullScreenElemet() {
    // tslint:disable-next-line: only-arrow-functions deprecation
    $('.maximizar').click( () => {
        alert('Maximizar este elemento');
        // $('').addClass('fullscreen');
    });
}

export const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: '#2ef700',
    bgsOpacity: 0.5,
    bgsPosition: 'bottom-right',
    bgsSize: 60,
    bgsType: 'rectangle-bounce',
    blur: 5,
    fgsColor: '#FFAA00',
    fgsPosition: 'center-center',
    fgsSize: 90,
    fgsType: 'rectangle-bounce',
    gap: 24,
    // logoPosition: 'center-center',
    // logoSize: 120,
    // logoUrl: 'assets/images/logo.jpg',
    masterLoaderId: 'master',
    overlayBorderRadius: '0',
    overlayColor: 'rgba(255,254,254,0.87)',
    pbColor: '#FFAA00',
    pbDirection: 'ltr',
    pbThickness: 5,
    hasProgressBar: true,
    text: 'RECORRIDAS',
    textColor: '#000000',
    textPosition: 'center-center'
};
