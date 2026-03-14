/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Aug 15 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  // document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
  //   let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
  //   let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
  //   let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

  //   let initIsotope;
  //   imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
  //     initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
  //       itemSelector: '.isotope-item',
  //       layoutMode: layout,
  //       filter: filter,
  //       sortBy: sort
  //     });
  //   });

  //   isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
  //     filters.addEventListener('click', function () {
  //       isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
  //       this.classList.add('filter-active');
  //       initIsotope.arrange({
  //         filter: this.getAttribute('data-filter')
  //       });
  //       if (typeof aosInit === 'function') {
  //         aosInit();
  //       }
  //     }, false);
  //   });

  // });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  // Update JS buatan sendiri
  // Portfolio Modal
  // const portfolioModal = document.getElementById('portfolioModal');

  // portfolioModal.addEventListener('show.bs.modal', function (event) {
  //   const trigger = event.relatedTarget;

  //   const imgSrc = trigger.getAttribute('src');
  //   const title = trigger.getAttribute('data-title');
  //   const desc = trigger.getAttribute('data-description');

  //   document.getElementById('portfolioModalImg').src = imgSrc;
  //   document.getElementById('portfolioModalTitle').textContent = title;
  //   document.getElementById('portfolioModalDesc').textContent = desc;
  // });
  // Portfolio Modal - gunakan event delegation
  // Ganti ini
  document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // Portfolio JSON Load & Render
    // =============================================
    let data = [];

    async function loadPortfolio() {
      try {
        const response = await fetch('assets/data/portfolio.json');
        data = await response.json();

        const isIndexPage = document.body.classList.contains('index-page');
        const limit = isIndexPage ? 6 : null;

        renderPortfolio(data, limit);

        const container = document.querySelector('.isotope-container');

        // Keduanya butuh Isotope, bedanya portfolio.html punya filter
        imagesLoaded(container, function () {
          const iso = new Isotope(container, {
            itemSelector: '.isotope-item',
            layoutMode: 'masonry'
          });

          // Filter handler hanya untuk portfolio.html
          if (!isIndexPage) {
            document.querySelectorAll('.isotope-filters li').forEach(function (btn) {
              btn.addEventListener('click', function () {
                document.querySelector('.isotope-filters .filter-active')
                  .classList.remove('filter-active');
                this.classList.add('filter-active');
                iso.arrange({ filter: this.getAttribute('data-filter') });
              });
            });
          }
        });

      } catch (error) {
        console.error('Gagal load portfolio.json:', error);
      }
    }

    function renderPortfolio(data, limit = null) {
      const container = document.querySelector('.isotope-container');
      if (!container) return;
      container.innerHTML = '';

      // Potong data jika ada limit
      const items = limit ? data.slice(0, limit) : data;

      items.forEach(item => {
        const col = document.createElement('div');
        col.className = `col-lg-4 col-md-6 portfolio-item isotope-item filter-${item.category}`;
        col.innerHTML = `
      <img src="${item.img}" 
           class="img-fluid portfolio-img"
           data-id="${item.id}"
           data-title="${item.title}"
           data-description="${item.description}"
           data-gallery="${item.gallery.join(',')}"
           data-demo="${item.demo_url || ''}">
      <div class="portfolio-info">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    `;
        container.appendChild(col);
      });

      if (typeof AOS !== 'undefined') AOS.refresh();
    }

    loadPortfolio();

    // =============================================
    // Portfolio Modal
    // =============================================

    function fillModal(item) {
      const modalImg = document.getElementById('portfolioModalImg');
      const modalTitle = document.getElementById('portfolioModalTitle');
      const modalDesc = document.getElementById('portfolioModalDesc');
      const galleryEl = document.getElementById('portfolioModalGallery');
      const demoEl = document.getElementById('portfolioModalDemo');

      if (!modalImg || !modalTitle || !modalDesc || !galleryEl) return;

      // Isi konten utama
      modalImg.src = item.img;
      modalTitle.textContent = item.title;
      modalDesc.textContent = item.description;

      // Isi gallery dari id related items
      galleryEl.innerHTML = '';
      if (item.gallery && item.gallery.length > 0) {
        item.gallery.forEach(relatedId => {
          const relatedItem = data.find(p => p.id === relatedId);
          if (!relatedItem) return;
          galleryEl.innerHTML += `
        <img src="${relatedItem.img}"
             class="rounded-3"
             data-id="${relatedItem.id}"
             alt="${relatedItem.title}"
             title="${relatedItem.title}">`;
        });
      }

      // Demo
      if (demoEl) {
        demoEl.innerHTML = item.demo_url
          ? `<a href="${item.demo_url}" target="_blank" class="btn btn-primary mt-3">Lihat Demo</a>`
          : '';
      }
    }

    // Satu listener untuk semua klik — portfolio img & gallery img
    document.addEventListener('click', function (e) {

      // Klik gambar portfolio → buka modal
      if (e.target.matches('.portfolio-img')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const item = data.find(p => p.id === id);
        if (!item) return;

        fillModal(item);
        const modal = new bootstrap.Modal(document.getElementById('portfolioModal'));
        modal.show();
        return;
      }

      // Klik gambar gallery → update konten + scroll ke atas
      if (e.target.matches('#portfolioModalGallery img')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const item = data.find(p => p.id === id);
        if (!item) return;

        fillModal(item);

        setTimeout(() => {
          const modalBody = document.querySelector('#portfolioModal .modal-body');
          if (modalBody) modalBody.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
        return;
      }

    });

    // Reset modal saat ditutup
    const portfolioModal = document.getElementById('portfolioModal');
    if (portfolioModal) {
      portfolioModal.addEventListener('hidden.bs.modal', function () {
        document.getElementById('portfolioModalImg').src = '';
        document.getElementById('portfolioModalTitle').textContent = '';
        document.getElementById('portfolioModalDesc').textContent = '';
        document.getElementById('portfolioModalGallery').innerHTML = '';
      });
    }

    // =============================================
    // Graphic Design Card Expand/Collapse
    // =============================================
    document.querySelectorAll('.design-item').forEach(card => {
      card.addEventListener('click', function () {
        const col = this.closest('.card-col');
        const panel = col.querySelector('.detail-panel');
        const isActive = col.classList.contains('active-col');
        const isDesktop = window.innerWidth >= 768;

        // Reset semua
        document.querySelectorAll('.card-col').forEach(c => {
          c.classList.remove('active-col');
          if (isDesktop) c.style.order = '';

          const lc = c.querySelector('.left-content');
          if (lc) lc.classList.remove('d-flex', 'align-items-center', 'gap-4');

          const di = c.querySelector('.design-item');
          if (di) di.classList.remove('px-5');
        });

        document.querySelectorAll('.design-item').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.detail-panel').forEach(p => p.classList.remove('open'));

        if (!isActive) {
          col.classList.add('active-col');
          this.classList.add('active');
          panel.classList.add('open');

          if (isDesktop) {
            col.style.order = '-1';

            const leftContent = col.querySelector('.left-content');
            if (leftContent) leftContent.classList.add('d-flex', 'align-items-center', 'gap-4');

            this.classList.add('px-5');

            setTimeout(() => {
              const rect = col.getBoundingClientRect();
              const offset = 180;
              window.scrollTo({
                top: window.scrollY + rect.top - offset,
                behavior: 'smooth'
              });
            }, 100);
          }
        }
      });
    });

  });
})();