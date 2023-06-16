import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Muchas gracias por verificar tu cuenta. Ya puede acceder a Receteando.',
          showConfirmButton: true,
          confirmButtonColor: '#476E61',
          timer: 3500
        });
        this.router.navigate(['/auth/login']);
      },
      error:(error) =>{
        Swal.fire({
          title: 'Error!',
          text: `${error.error.message}`,
          icon: 'error',
          confirmButtonColor: '#476E61'
        });
        this.router.navigate(['/']);
      }
    });
  }

}
