import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/shared/models/pages/user/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public userInfo: UserInfo;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userInfo = this.userService.getUserInfoData;
  }

}
