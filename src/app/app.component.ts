import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initMobileNav();
    this.initMobileNavDropdowns();
    this.initScrollTopButton();
    this.initScrolledClass();
    this.initScrollspy();
    this.correctScrollingOnLoad();
  }
  private initMobileNav(): void {
    const mobileNavToggleBtn = document.querySelector<HTMLElement>('.mobile-nav-toggle');
    const navmenu = document.querySelector<HTMLElement>('.navmenu');
  
    function mobileNavToggle() {
      if (mobileNavToggleBtn && navmenu) {
        console.log('Mobile nav toggle button clicked');
        document.querySelector('body')?.classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
        navmenu.classList.toggle('mobile-nav-active');
      } else {
        console.error('Mobile nav toggle button or nav menu not found');
      }
    }
  
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
    } else {
      console.error('Mobile nav toggle button not found');
    }
  }

  private initMobileNavDropdowns(): void {
    document.querySelectorAll<HTMLElement>('.navmenu .toggle-dropdown').forEach((navmenu) => {
      navmenu.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = navmenu.parentNode as HTMLElement;
        if (parent) {
          parent.classList.toggle('active');
          const nextSibling = parent.nextElementSibling as HTMLElement;
          if (nextSibling) {
            nextSibling.classList.toggle('dropdown-active');
          }
        }
        e.stopImmediatePropagation();
      });
    });
  }

  private initScrollTopButton(): void {
    const scrollTop = document.querySelector<HTMLElement>('.scroll-top');

    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }

    if (scrollTop) {
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  private initScrolledClass(): void {
    function toggleScrolled() {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector<HTMLElement>('#header');
      if (!selectHeader || (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top'))) return;
      if (selectBody) {
        window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
      }
    }

    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);
  }

  

  private initScrollspy(): void {
    const navmenulinks = document.querySelectorAll<HTMLElement>('.navmenu a');

    function navmenuScrollspy() {
      navmenulinks.forEach((navmenulink) => {
        if (!(navmenulink instanceof HTMLAnchorElement)) return;
        if (!navmenulink.hash) return;
        const section = document.querySelector(navmenulink.hash) as HTMLElement;
        if (!section) return;
        const position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll<HTMLElement>('.navmenu a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      });
    }

    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);
  }

  private correctScrollingOnLoad(): void {
    window.addEventListener('load', () => {
      if (window.location.hash) {
        const section = document.querySelector(window.location.hash) as HTMLElement;
        if (section) {
          setTimeout(() => {
            const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop, 10),
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    });
  }
}
