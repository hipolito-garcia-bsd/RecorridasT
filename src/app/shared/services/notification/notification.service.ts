import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationsPB, configDefault } from '../../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService
  ) { }

  showToastr(
    message?: string,
    title?: string,
    override?: Partial<NotificationsPB>
  ) {
    const merge = Object.assign({}, configDefault, override);
    // const obj = Object;
    // override = !override ? obj({ ...configDefault, ...override }) : configDefault; esto solamente une los dos

    this.toastr[merge.type](message, title, {
      enableHtml: merge.html,
      closeButton: merge.closeBtn,
      timeOut: merge.timeOut,
      progressBar: merge.progressBar,
      progressAnimation: merge.progressAnimation,
      tapToDismiss: merge.tapToDismiss
    });
  }
}
