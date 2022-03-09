import { Injectable } from '@angular/core';
import { NotificationType } from '../enum/notification-type.enum';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notify(type: NotificationType, message: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    
    Toast.fire({
      icon: type,
      title: message
    })
  }
}
