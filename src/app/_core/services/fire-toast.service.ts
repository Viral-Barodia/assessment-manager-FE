import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FireToastService {

  constructor() { }

  fireSuccessToast(title: string) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  fireErrorToast(title: string) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
