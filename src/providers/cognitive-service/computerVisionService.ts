import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class computerVisionService {

  constructor(public http: Http) { }


   getAlerts(blob) {

        let headers = new Headers({ 'Content-Type': 'application/octet-stream', 'Prediction-Key' : 'edd3305821f746ef8702558ef984cb97'})
        let options = new RequestOptions({ headers: headers })

        return this.http.post('https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/4308642c-585f-456f-8d73-aa343a4e624e/image?iterationId=10a0c664-2868-4126-984d-91d061a447ce', blob, options)

    // make the application key an env var when we can




  }

  processData(data) {
    for(var prediction in data['Predictions']){
      if (prediction['Tag'] == "pedestrian" && prediction['Probability'] > .4){
        return "Pedestrians ahead";
      }
      else if(prediction['Tag'] == "stop_sign" && prediction['Probability'] > .4){
        return "Stop sign ahead";
      }
      else if(prediction['Tag'] == "red_light" && prediction['Probability'] > .4){
        return "Red light ahead";
      }
      else {
        return null
      }
    }
  }
}
