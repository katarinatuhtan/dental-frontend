import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private handleBeforeUnload = () => {
    const forms = document.getElementsByTagName('form');
    for (const form of Array.from(forms)) {
      form.reset();
    }
  };

  ngOnInit(): void {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  ngAfterViewInit(): void {
    this.initFAQToggle();
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
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
