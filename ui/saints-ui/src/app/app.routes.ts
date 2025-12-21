import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Liturgy } from './pages/liturgy/liturgy';
import { Resources } from './pages/resources/resources';
import { Impressum } from './pages/impressum/impressum';
import { Datenschutz } from './pages/datenschutz/datenschutz';
import { Uptime } from './pages/uptime/uptime';
import { LoginComponent } from './components/login/login';
import { AdminComponent } from './components/admin/admin';
import { EditorComponent } from './components/editor/editor';
import { authGuard } from './guards/auth.guard';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'liturgy', component: Liturgy },
  { path: 'resources', component: Resources },
  { path: 'impressum', component: Impressum },
  { path: 'datenschutz', component: Datenschutz },
  { path: 'uptime', component: Uptime },
  
  // Blog routes
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:slug', component: BlogPostComponent },
  
  // Admin routes
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard', component: AdminComponent, canActivate: [authGuard] },
  { path: 'admin/editor', component: EditorComponent, canActivate: [authGuard] },
  { path: 'admin/editor/:id', component: EditorComponent, canActivate: [authGuard] },
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  
  // Catch-all
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}