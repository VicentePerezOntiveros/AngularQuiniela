import { Component, OnInit } from '@angular/core';
import { Ciudad } from './../../_interfaces/ciudad.model';
import { CiudadesRepositoryService } from './../../shared/services/ciudades-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ciudad-list',
  templateUrl: './ciudad-list.component.html',
  styleUrls: ['./ciudad-list.component.css']
})
export class CiudadListComponent implements OnInit {
  ciudades: Ciudad[];
  errorMessage: string = '';
  
  constructor(private repository: CiudadesRepositoryService,private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCiudades();
  }

  private getAllCiudades = () => {
    const apiAddress: string = 'api/Catalogo/ConsultarCiudades?IdEstado=10';
    this.repository.ConsultarCiudades(apiAddress)
    .subscribe({
      next: (own: Ciudad[]) => this.ciudades = own,
      error: (err: HttpErrorResponse) =>{
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
      //this.ciudades = own;
    })
  }

  public getCiudadDetails = (id) => { 
    const detailsUrl: string = `/ciudad/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/ciudad/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

}
