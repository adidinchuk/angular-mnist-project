import { Injectable } from '@angular/core';
import { DigitsConfig } from '../config'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DigitsApiService {

  constructor(private http: HttpClient) { }

  //Autoencoder endpoint to clean data before classification processing
  runAutoencoder(data): Observable<any> {
    return this.http.post(DigitsConfig.API_ENDPOINT_PROXY + DigitsConfig.AUTOENCODER_MODEL + ':' + DigitsConfig.TF_METHOD_NAME, {
      "instances": [data]
    })
  }

  //classification endpoint to classify a 784 vector into a 0-9 digit
  runClassification(data): Observable<any> {
    return this.http.post(DigitsConfig.API_ENDPOINT_PROXY + DigitsConfig.CLASSIFICATION_MODEL + ':' + DigitsConfig.TF_METHOD_NAME, {
      "instances": [data]
    })
  }

}
