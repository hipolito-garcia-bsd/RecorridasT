export enum progressAnimationEnum {
    decreasing = 'decreasing',
    increasing = 'increasing'
}

export enum typeNotification {
    error = 'error',
    info = 'info',
    success = 'success',
    warning = 'warning'
}

export interface NotificationsPB {
    type: typeNotification;
    message: string;
    title: string;
    html: boolean;
    closeBtn: boolean;
    timeOut: number;
    progressBar: boolean;
    progressAnimation: progressAnimationEnum;
    tapToDismiss: boolean;
}

export const configDefault: Partial<NotificationsPB> = {
    type: typeNotification.success,
    html: false,
    closeBtn: false,
    timeOut: 5000,
    progressBar: false,
    progressAnimation: progressAnimationEnum.decreasing,
    tapToDismiss: false
};
