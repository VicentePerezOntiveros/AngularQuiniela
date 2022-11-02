import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ciudad } from './../../_interfaces/ciudad.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CiudadesRepositoryService } from './../../shared/services/ciudades-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Component({
  selector: 'app-ciudad-details',
  templateUrl: './ciudad-details.component.html',
  styleUrls: ['./ciudad-details.component.css']
})
export class CiudadDetailsComponent implements OnInit {
  ciudad: Ciudad
  errorMessage: string = '';

  constructor(private repository: CiudadesRepositoryService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
    ) { }

  ngOnInit() {
    this.ConsultarCiudad();
  }
  ConsultarCiudad = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
//    this.errorMessage = id;
    const apiUrl: string = `api/Catalogo/ConsultarCiudad?IdCiudad=${id}`; //Se ponen comillas invertidas ` ` para inyectar la variable id 
    this.repository.ConsultarCiudad(apiUrl)
    .subscribe({
      next: (own: Ciudad) => this.ciudad = own,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }
}
