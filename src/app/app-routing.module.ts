import {Routes , RouterModule} from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthguardService } from "./services/authguard.service";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { SuccessfullComponent } from "./successfull/successfull.component";
import { ProfileComponent } from "./profile/profile.component";
import { AddItemComponent } from "./add-item/add-item.component";

const routes : Routes = [
    {path : "" , component : LandingPageComponent},
    {path : "home" , component : HomeComponent , canActivate : [AuthguardService]},
    {path : "landing" , component : LandingPageComponent , canActivate : [AuthguardService]},
    {path : "products" , component : ProductsComponent , canActivate : [AuthguardService]},
    {path : "cart" , component : CartComponent , canActivate : [AuthguardService]},
    {path : "checkout" , component : CheckoutComponent},
    {path : "successfull" , component : SuccessfullComponent},
    {path : "profile" , component : ProfileComponent},
    {path : "add-item" , component : AddItemComponent},
    {path : "signup" , component : RegisterComponent},
    {path : "login" , component : LoginComponent}
]

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule{}