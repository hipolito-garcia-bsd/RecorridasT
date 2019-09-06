export class NavMode {
    title: string;
    path: string;
    icon?: string;
    children?: Array<NavMode>;

    constructor(title: string, path: string, icon: string, children: Array<NavMode>) {
        this.title = title;
        this.path = path;
        this.icon = icon;
        this.children = children;
    }
}