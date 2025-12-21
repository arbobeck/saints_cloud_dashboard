import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Navbar, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
