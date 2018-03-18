import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CookieService } from '../../../../services/browser/cookie.service';
import { Group } from '../../models/group.model';
import { COOKIES } from '../../../../config/keys.config';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminUserService } from '../../services/admin.user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'sc-admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class AdminUserComponent {
  @Input() public user: User;
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>();
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private adminUserService: AdminUserService
  ) { }

  onClickEdit() {
    this.edit.emit(this.user.username);
  }

  onClickDelete() {
    this.adminUserService
    .deleteUser(
      this.cookieService.getCookie(COOKIES.username),
      this.cookieService.getCookie(COOKIES.accessToken),
      this.user.username
    )
    .subscribe(
      response => this.handleDeleteResponse(response),
      error => this.handleErrorResponse(error)
    )
  }

  private handleDeleteResponse(response) {
    this.delete.emit(true);
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = `Erreur : ${error.statusText}`;
  }
}
