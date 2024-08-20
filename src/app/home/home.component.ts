import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initFAQToggle();

  }

  private initFAQToggle(): void {
    document.querySelectorAll<HTMLElement>('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        const parent = faqItem.parentNode as HTMLElement;
        if (parent) {
          parent.classList.toggle('faq-active');
        }
      });
    });
  }

  
}
