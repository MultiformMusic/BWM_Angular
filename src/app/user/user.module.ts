import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserComponent } from "./user.component";
import { UserService } from "./shared/user.service";
import { Routes, RouterModule } from "@angular/router";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { AuthGuard } from "../auth/shared/auth.guard";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../auth/shared/auth.service";
import { FormsModule } from "@angular/forms";


const routes: Routes = [
    { path: 'users', 
     component: UserComponent,
     children: [
         { path: 'profile', component: UserDetailComponent, canActivate: [AuthGuard] },
     ]
    }
];


@NgModule({
    
    imports: [CommonModule, 
              HttpClientModule,
              FormsModule,
              RouterModule.forChild(routes)
              ],
    declarations: [UserComponent, UserDetailComponent],
    providers: [UserService, AuthService]
})
export class UserModule {}
