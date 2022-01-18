import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {configProperties} from 'src/environments/environment';

@Injectable()
export class ConfigService {

  configUrl = configProperties.configPath;
  private configSettings: any = null;

  constructor(private http: HttpClient) {
  }

  get GSuiteClientID() {
    return this.configSettings.gsuite_client_id;
  }

  get settings() {
    return this.configSettings;
  }

  public load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.configUrl).subscribe((response: any) => {
        this.configSettings = response;
        resolve(true);
      });
    });
  }
}
