import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup/signup.component';
import { AboutComponent } from './about/about/about.component';
import { ContactComponent } from './contact/contact/contact.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { UserdashboardComponent } from './userdashboard/userdashboard/userdashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UsernavbarComponent } from './usernavbar/usernavbar/usernavbar.component';

export const routes: Routes = [
    {
        
        path:'',
        component:NavbarComponent,
        children:[
            {path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent }
            
        ]
    },
    {path:'userdashboard',component:UserdashboardComponent,
        children:[
            {path:'userprofile',component:UserprofileComponent}
        ]
    },
    { path: '**', redirectTo: '/home' }
    

];
