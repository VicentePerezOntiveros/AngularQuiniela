import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { CiudadesRepositoryService } from './../../shared/services/ciudades-repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ciudad } from './../../_interfaces/ciudad.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Estado } from 'src/app/_interfaces/estado.model';

@Component({
  selector: 'app-ciudad-update',
  templateUrl: './ciudad-update.component.html',
  styleUrls: ['./ciudad-update.component.css']
})
export class CiudadUpdateComponent implements OnInit {
  ciudad: Ciudad;
  errorMessage: string = '';
  ciudadForm: FormGroup;
  bsModalRef?: BsModalRef;
  constructor(private repository: CiudadesRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService,
    private activeRoute: ActivatedRoute,) { }

  

  ngOnInit(): void {
    this.ciudadForm = new FormGroup({
      nombreCiudad: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      //dateOfBirth: new FormControl('', [Validators.required]),
      idEstado: new FormControl('', [Validators.required]),
      inicialesCiudad: new FormControl('', [Validators.required, Validators.maxLength(100)])
  });
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
  redirectToCiudadList = () => {
    this.router.navigate(['/ciudad/list']);
  }

  updateCiudad = (ciudadFormValue) => {
    if (this.ciudadForm.valid)
      this.executeCiudadUpdate(ciudadFormValue);
  }

  private executeCiudadUpdate = (ciudadFormValue) => {
    const estado: Estado = {
      idEstado: ciudadFormValue.idEstado
    }
    const id: number = this.activeRoute.snapshot.params['id'];
    const owner: Ciudad = {
      idCiudad: id,
      nombreCiudad: ciudadFormValue.nombreCiudad,
      //dateOfBirth: this.datePipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd'),
      inicialesCiudad: ciudadFormValue.inicialesCiudad,
      estado: estado
    }
    const apiUrl = 'api/Catalogo/ActualizarCiudad';
    this.repository.updateCiudad(apiUrl, owner)
    .subscribe({
      next: (ciu: Ciudad) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Ciudad: ${owner.nombreCiudad} UPDATED successfully`,
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

}
