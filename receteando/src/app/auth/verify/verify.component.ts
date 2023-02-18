import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit {

  constructor(private router:Router, private userService: UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    const code = this.route.snapshot.queryParams['code'];
    
    this.userService.verifyUser(code).subscribe({
      next:(resp) =>{
        console.log(resp);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Muchas gracias por verificar tu cuenta. Ya puede acceder a recteando.',
          showConfirmButton: true,
          timer: 3500
        });
        this.router.navigate(['/auth/login']);
      },
      error:(error) =>{
        Swal.fire({
          title: 'Error!',
          text: `${error.error.message}`,
          icon: 'error'
        });
        this.router.navigate(['/']);
      }
    });
  }

}
