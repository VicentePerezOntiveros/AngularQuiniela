import { Ciudad } from './../../_interfaces/ciudad.model';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CiudadesRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public ConsultarCiudades = (route: string) => {
    return this.http.get<Ciudad[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createCiudad = (route: string, owner: Ciudad) => {
    return this.http.post<Ciudad>(this.createCompleteRoute(route, this.envUrl.urlAddress), owner, this.generateHeaders());
  }
  public updateCiudad = (route: string, owner: Ciudad) => {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), owner, this.generateHeaders());
  }
  public deleteCiudad = (route: string, owner: Ciudad) => {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress),owner, this.generateHeaders());
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
  public ConsultarCiudad = (route: string) => {
    return this.http.get<Ciudad>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
}