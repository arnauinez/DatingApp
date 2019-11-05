import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    // The order is important Bof, the wild card is important to be at the end of the list
    { path: '', component: HomeComponent},
    {
        // If the following path were X and someone tries to acces to members the used URl would be: localhost/4200/Xmembers
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent}
        ]
    },
    // Its a wild card, every url that not matches takes the full URL and goes to home
    { path: '**', redirectTo: '', pathMatch: 'full'},
];
