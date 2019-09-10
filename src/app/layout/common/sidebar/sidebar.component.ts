import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';


declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/cargar',
        title: 'Cargar',
        type: 'link',
        icontype: 'apps'
    },
    {
        path: '/anular',
        title: 'Anular',
        type: 'link',
        icontype: 'apps'
    },
    {
        path: '/anuladas',
        title: 'Anuladas',
        type: 'link',
        icontype: 'apps'
    },
    // {
    //     path: '',
    //     title: 'RECORRIDAS',
    //     type: 'sub',
    //     icontype: 'apps',
    //     collapse: 'recorridas',
    //     children: [
    //         { path: 'cargar', title: 'Cargar', ab: 'C' },
    //         { path: 'anular', title: 'Anular', ab: 'A' }
    //     ]
    // }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;

    constructor() { }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }

    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

}
