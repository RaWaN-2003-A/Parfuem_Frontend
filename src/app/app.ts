import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component'; // إذا كنتِ تستخدمين الفوتر أيضاً

@Component({
  selector: 'app-root',
  standalone: true,
  // السر كله في هذا السطر: يجب أن نضع المكونات هنا ليتعرف عليها الـ HTML
  imports: [RouterOutlet, NavComponent, FooterComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Parfuem_Frontend';
}