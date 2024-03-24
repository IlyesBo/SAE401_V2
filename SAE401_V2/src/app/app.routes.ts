import { Routes } from '@angular/router';
import { BoxComponent } from './components/box/box.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { IntroComponent } from './components/intro/intro.component';
import { PanierComponent } from './components/panier/panier.component';
import { PromoComponent } from './components/promo/promo.component';

export const routes: Routes = [
    { path: 'home', component: BoxComponent },
    { path: 'specialite', component: FooterComponent },
    { path: 'etudiant', component:  HeaderComponent },
    { path: 'etudianthorsparis', component:  IntroComponent },
    { path: 'etudiantparis', component: PanierComponent },
    { path: 'formetudiant', component:  PromoComponent },

  
];
