import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { CiudadesRepositoryService } from './../../shared/services/ciudades-repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ciudad } from './../../_interfaces/ciudad.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CiudadForCreation } from 'src/app/_interfaces/CiudadForCreation.model';
import { Estado } from 'src/app/_interfaces/estado.model';

@Component({
  selector: 'app-ciudad-create',
  templateUrl: './ciudad-create.component.html',
  styleUrls: ['./ciudad-create.component.css']
})
export class CiudadCreateComponent implements OnInit {
  estados: Estado[];
  errorMessage: string = '';
  ciudadForm: FormGroup;
  bsModalRef?: BsModalRef;
  constructor(private repository: CiudadesRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.ciudadForm = new FormGroup({
      nombreCiudad: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      //dateOfBirth: new FormControl('', [Validators.required]),
      //idEstado: new FormControl('', [Validators.required]),
      inicialesCiudad: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      idEstadoCombo: new FormControl('', [Validators.required])
  });

  this.getEstados();
}

private getEstados = () => {
  const apiUrl: string = 'api/Catalogo/ConsultarEstados'; 
  this.repository.ConsultarEstados(apiUrl)
  .subscribe({
    next: (estados: Estado[]) => this.estados = estados,
    error: (err: HttpErrorResponse) => {
      this.errorHandler.handleError(err);
      this.errorMessage = this.errorHandler.errorMessage;
    }
  })
}


validateControl = (controlName: string) => {
  if (this.ciudadForm.get(controlName).invalid && this.ciudadForm.get(controlName).touched)
    return true;
  
  return false;
} 
hasError = (controlName: string, errorName: string) => {
  if (this.ciudadForm.get(controlName).hasError(errorName))
    return true;
  
  return false;
}

createCiudad = (ciudadFormValue) => {
  if (this.ciudadForm.valid)
    this.executeCiudadCreation(ciudadFormValue);
}

private executeCiudadCreation = (ciudadFormValue) => {
  /*const estado: Estado = {
    idEstado: ciudadFormValue.idEstadoCombo
    //idEstado: ciudadFormValue.idEstado,
    //idEstado: ciudadFormValue.idEstadoCombo
  }*/

  const estado: Estado = ciudadFormValue.idEstadoCombo
  

  const owner: CiudadForCreation = {
    nombreCiudad: ciudadFormValue.nombreCiudad,
    //dateOfBirth: this.datePipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd'),
    inicialesCiudad: ciudadFormValue.inicialesCiudad,
    estado: estado
  }
  const apiUrl = 'api/Catalogo/InsertarCiudad';
  this.repository.createCiudad(apiUrl, owner)
  .subscribe({
    next: (ciu: Ciudad) => {
      const config: ModalOptions = {
        initialState: {
          modalHeaderText: 'Success Message',
          modalBodyText: `Ciudad: ${ciu.nombreCiudad} created successfully`,
          okButtonText: 'OK'
        }
      };
      this.bsModalRef = this.modal.show(SuccessModalComponent, config);
      this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToCiudadList());
    },
    error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
    }
  })
}

redirectToCiudadList = () => {
  this.router.navigate(['/ciudad/list']);
}

}

