import { Component, OnInit } from '@angular/core';
import { Liga } from 'src/app/_interfaces/liga.model';
import {LigasRepositoryService } from '../../shared/services/ligas-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-liga-list',
  templateUrl: './liga-list.component.html',
  styleUrls: ['./liga-list.component.css']
})
export class LigaListComponent implements OnInit {
  ligas: Liga[];
  errorMessage: string = '';

  ligaForm: FormGroup;

  constructor(private repository: LigasRepositoryService,private errorHandler: ErrorHandlerService,
    private router: Router) { }


  ngOnInit(): void {
    this.ligaForm = new FormGroup({
      nombreLiga: new FormControl('', [Validators.required, Validators.maxLength(60)])
  })
  }

  validateControl = (controlName: string) => {
    if (this.ligaForm.get(controlName).invalid && this.ligaForm.get(controlName).touched)
      return true;
    
    return false;
  } 

  hasError = (controlName: string, errorName: string) => {
    if (this.ligaForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  BuscarLiga = (ligaFormValue) => {
    if (this.ligaForm.valid)
      this.executeLigaBuscar(ligaFormValue);
  }

  private executeLigaBuscar = (ligaFormValue) => {
    const liga: Liga = {
      nombreLiga: ligaFormValue.nombreCiudad
    }

    const apiAddress: string = 'api/Catalogos/BuscarLigas';
    this.repository.ConsultarLigas(apiAddress, liga)
    .subscribe({
      next: (own: Liga[]) => this.ligas = own,
      error: (err: HttpErrorResponse) =>{
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
      //this.ciudades = own;
    })
  }

}
