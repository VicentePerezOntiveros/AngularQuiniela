import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { Liga } from 'src/app/_interfaces/liga.model';

@Injectable({
  providedIn: 'root'
})
export class LigasRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public ConsultarLigas = (route: string,  liga: Liga) => {
    return this.http.post<Liga[]>(this.createCompleteRoute(route, this.envUrl.urlAddress), liga, this.generateHeaders());
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
