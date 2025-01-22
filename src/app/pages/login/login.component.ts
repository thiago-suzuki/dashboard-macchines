import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent  implements OnInit {
  constructor(
    public router: Router,
    public alertController: AlertController,
    private authService: AuthService
  ) { }

  errorMessage = '';
  hasError: boolean = false;
  loginData: any = {
    username : '',
    password : ''
  };
  isLoading: boolean = false;

  async ngOnInit() {   
  }

  login(){
    if (!this.loginData.username || !this.loginData.password) {
      this.showError('Preencha os campos para continuar');
      return;
    }

    this.isLoading = true; 

    this.authService.login({
      username : this.loginData.username,
      password : this.loginData.password
    })
    .then(async (user: any) => {
      this.isLoading = false;
      this.router.navigateByUrl('/list-macchines', { replaceUrl: true });
    }, (err) => {
      this.isLoading = false;
      this.showError('Usuário ou senha incorretos')
    })
  }
  showError(message: any){
    this.errorMessage = message
    this.hasError = true;
    setTimeout(()=> {
      this.hasError = false;
    }, 5000)
  }
}
