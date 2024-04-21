import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { CreatearticleComponent } from './components/createarticle/createarticle.component';
import { AboutComponent } from './components/about/about.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AuthorComponent } from './components/author/author.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'create', component: CreatearticleComponent,   canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'article/:id', component: DetailComponent },

    { path: 'privacy', component: PrivacyComponent },
    { path: 'author/:id', component: AuthorComponent,   canActivate: [AuthGuard] },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: '**', component: NotfoundComponent },
];
