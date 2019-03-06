
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/token.interceptor';
import { AuthComponent } from './auth.component';


const routes: Routes = [

    { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

  ],

  // AuthGaurd = vérifie si utilisateur authentifié (permet de protéger les routes)
  // HTTP_INTERCEPTORS = rajoute le token dans header si présent dans localStorage
  providers: [AuthService, 
              AuthGuard,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true
              }],

})
export class AuthModule { }
