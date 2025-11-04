import { Injectable } from '@angular/core';
import { AppConstants } from "../../app.constant";
import { HttpClientService } from "../http-client/http-client.service";
import { contactModel } from "../../model/contact.model";

@Injectable({
  providedIn: 'root'
})
export class MdmService {

  BASE_URL: string;

  constructor(
    private httpClient: HttpClientService,
  ) {
    this.BASE_URL = AppConstants.BASE_API_URL
  }

  getEmailOtp(data: any) {
    return this.httpClient.postNoAuth(AppConstants.BASE_API_URL + '/send-otp', data);
  }

  submitContactDetails(data: any) {
    return this.httpClient.postNoAuth(AppConstants.BASE_API_URL + '/contact-form', data);
  }

  professionalDetails(data: any) {
    return this.httpClient.postNoAuth(AppConstants.BASE_API_URL + '/professional-details', data);
  }
}
