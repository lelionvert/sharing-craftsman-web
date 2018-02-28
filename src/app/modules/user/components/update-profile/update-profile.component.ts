import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../../forms/profile.form';
import { MAX_IMAGE_SIZE, ACCEPTED_EXTENSIONS, ACCEPTED_MIMES } from '../../../../config/app.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';

@Component({
  selector: 'sc-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  public model: Profile;
  public errorMessage: string;

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.model = new Profile();
  }

  updateProfile() {
    this.userService
    .updateProfile(
      this.cookieService.getCookie(COOKIES.username), 
      this.cookieService.getCookie(COOKIES.token),
      this.model.toJSON()
    )
    .subscribe(
      response => this.handleUpdateProfileResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (this.isValidFile(file)) {
        const formData: FormData = new FormData();
        formData.append('picture', file, file.name);
        this.model.picture = file.name;
        this.userService
          .uploadPicture(this.cookieService.getCookie(COOKIES.username), this.cookieService.getCookie(COOKIES.token), formData)
          .subscribe(
            response => this.handleUploadResponse(response),
            error => this.handleErrorResponse(error)
          );
      }
    }
  }

  private isValidFile(file: File) {
    if (file.size > MAX_IMAGE_SIZE)
      return false;

    const extension = file.name.split('.');
    const isExtensionAccepted = ACCEPTED_EXTENSIONS.find(accepted => accepted === extension[extension.length - 1].toLowerCase())
    if (!isExtensionAccepted)
      return false;

    const isMimeAccepted = ACCEPTED_MIMES.find(accepted => accepted.mime === file.type);
    if (!isMimeAccepted)
      return false;

    const doesMimeCorrespondToExtension = isMimeAccepted.extensions.find(ext => ext === extension[extension.length - 1].toLocaleLowerCase());
    if (!doesMimeCorrespondToExtension)
      return false;

    return true;
  }

  private handleUpdateProfileResponse(response) {
    
  }

  private handleUploadResponse(response) {
  
  }

  private handleErrorResponse(error) {
    this.errorMessage = `Erreur lors de la mise à jour du compte : ${error.statusText}`;
  }
}
