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


  // ============================================================
  //  PORTFOLIO — Algoritma 3 Layer
  //
  //  LAYER 1 (index.html):
  //    Tampilkan 6 item ber-is_featured=true lebih dulu.
  //    Fallback ke 6 item teratas jika kolom belum ada.
  //
  //  LAYER 2 (portfolio.html):
  //    Filter Category (All | Website | Design) +
  //    Sub-category pills yang muncul otomatis saat tab Design aktif.
  //    Isotope AND filter: item harus punya KEDUA class agar tampil.
  //
  //  LAYER 3 (modal):
  //    Related content — prioritas sub_category sama → category sama → random.
  // ============================================================

  document.addEventListener('DOMContentLoaded', function () {
    showSkeleton(6);

    // ── CONFIG ──────────────────────────────────────────────
    let SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkLnmP499Zk0UGdg7G26fYAbpjX5Rl1QYv1klqX-1uRCXBEsty19uGz8C8prwBSNdBOcuT0O7EZJSr/pub?gid=0&single=true&output=csv';
    let HERO_LIMIT = 6;
    let RELATED_LIMIT = 5;

    // ── STATE ────────────────────────────────────────────────
    let allData = [];
    let isoInstance = null;
    let activeCatFilter = '*';
    let activeSubFilter = null;
    let isIndexPage = document.body.classList.contains('index-page');

    // ── GUARD: hanya jalan jika ada .isotope-container ──────
    if (!document.querySelector('.isotope-container')) return;

    // ── INJECT CSS untuk sub-filter pills & badge ────────────
    let styleEl = document.createElement('style');
    styleEl.textContent = [
      '.sub-filter-bar{display:flex;flex-wrap:wrap;gap:12px14px;margin-bottom:1.2rem;',
      'opacity:0;transform:translateY(-10px);pointer-events:none;visibility:hidden;',
      'overflow: hidden;overflow: hidden;',
      'transition:opacity .35s ease,transform .35s ease;max-height .35s ease;}',
      '.sub-filter-bar.sub-visible{opacity:1;transform:translateY(0);pointer-events: auto;visibility: visible;max-height: 200px;}',
      '.sub-pill{cursor:pointer;display:inline-block;padding:7px 18px;margin: auto 10px;',
      'border-radius:999px;font-size:.82rem;font-weight:500;',
      'font-family:let(--heading-font);background:transparent;',
      'color:#1c6ea4;border:1.5px solid #a8cce8;',
      'transition:background .18s,border-color .18s,color .18s;user-select:none;}',
      '.sub-pill:hover{background:#e8f3fb;border-color:#1c6ea4;transform: translateY(-1px);}',
      '.sub-pill.sub-pill-active{background:#1c6ea4;border-color:#1c6ea4;color:#fff;}',
      '.portfolio-badge{display:inline-block;padding:3px 12px;border-radius:999px;',
      'font-size:.75rem;font-weight:600;font-family:let(--heading-font);',
      'letter-spacing:.03em;background:#e8f3fb;color:#1c6ea4;border:1px solid #a8cce8;}'
    ].join('');
    document.head.appendChild(styleEl);

    // ── FETCH DATA ───────────────────────────────────────────
    fetch(SHEET_URL)
      .then(function (res) { return res.text(); })
      .then(function (csvText) {
        allData = parseCSV(csvText);
        isIndexPage ? initLayerOne() : initLayerTwo();
      })
      .catch(function (err) {
        console.error('Gagal load portfolio dari Google Sheets:', err);
      });


    // ════════════════════════════════════════════════════════
    //  LAYER 1 — Hero / Index Page
    //  Tampilkan 6 item is_featured=true lebih dulu.
    //  Jika kolom belum ada atau kurang dari 6, fallback ke urutan atas.
    // ════════════════════════════════════════════════════════
    function initLayerOne() {
      let featured = allData.filter(function (p) {
        return p.is_featured === 'true' || p.is_featured === '1';
      });

      let heroItems;
      if (featured.length >= HERO_LIMIT) {
        heroItems = featured.slice(0, HERO_LIMIT);
      } else {
        let rest = allData.filter(function (p) {
          return !featured.find(function (f) { return f.id === p.id; });
        });
        heroItems = featured.concat(rest).slice(0, HERO_LIMIT);
      }

      renderItems(heroItems);

      // Isotope di index hanya untuk layout masonry — tanpa filter
      imagesLoaded(document.querySelector('.isotope-container'), function () {
        isoInstance = new Isotope('.isotope-container', {
          itemSelector: '.isotope-item',
          layoutMode: 'masonry'
        });
      });
    }


    // ════════════════════════════════════════════════════════
    //  LAYER 2 — Portfolio Page
    //  Render semua item, lalu aktifkan filter tabs + sub-pills.
    // ════════════════════════════════════════════════════════
    function initLayerTwo() {
      renderItems(allData);

      imagesLoaded(document.querySelector('.isotope-container'), function () {
        isoInstance = new Isotope('.isotope-container', {
          itemSelector: '.isotope-item',
          layoutMode: 'masonry',
          transitionDuration: '0.35s',
          stagger: 30
        });

        setupCategoryFilter();
      });
    }

    // ── Category filter handler ──────────────────────────────
    function setupCategoryFilter() {
      document.querySelectorAll('.portfolio-filters [data-filter]').forEach(function (li) {
        li.addEventListener('click', function () {

          // Update active tab
          document.querySelectorAll('.portfolio-filters [data-filter]')
            .forEach(function (el) { el.classList.remove('filter-active'); });
          this.classList.add('filter-active');

          activeCatFilter = this.getAttribute('data-filter');
          activeSubFilter = null;

          // Kelola sub-filter panel
          let subPanel = document.getElementById('subFilters');
          if (subPanel) {
            if (activeCatFilter !== '*') {
              // '.filter-design' → 'design'
              let cat = activeCatFilter.replace('.filter-', '');
              let hasSubs = allData.some(function (p) {
                return p.category === cat &&
                  p.sub_category &&
                  p.sub_category.trim() !== '';
              });

              if (hasSubs) {
                buildSubPills(cat, subPanel);
                // subPanel.style.display = 'flex';
                // double rAF → pastikan display:flex sudah diapply
                // sebelum class animasi ditambahkan
                requestAnimationFrame(function () {
                  requestAnimationFrame(function () {
                    buildSubPills(cat, subPanel);
                    subPanel.classList.add('sub-visible');
                  });
                });
              } else {
                hideSubPanel(subPanel);
              }
            } else {
              hideSubPanel(subPanel);
            }
          }

          applyFilter();
        });
      });
    }

    function hideSubPanel(panel) {
      panel.classList.remove('sub-visible');
      panel.innerHTML = '';
    }

    // ── Sub-category pills (dibangun dinamis dari data) ──────
    function buildSubPills(category, panel) {
      // Kumpulkan sub-kategori unik dari data
      let seen = {};
      let subs = [];
      allData.forEach(function (p) {
        if (p.category === category &&
          p.sub_category &&
          p.sub_category.trim() !== '' &&
          !seen[p.sub_category]) {
          seen[p.sub_category] = true;
          subs.push(p.sub_category.trim());
        }
      });

      panel.innerHTML =
        '<span class="sub-pill sub-pill-active" data-sub="">Semua</span>' +
        subs.map(function (sub) {
          return '<span class="sub-pill" data-sub="' + sub + '">' +
            formatLabel(sub) + '</span>';
        }).join('');

      panel.querySelectorAll('.sub-pill').forEach(function (pill) {
        pill.addEventListener('click', function () {
          panel.querySelectorAll('.sub-pill')
            .forEach(function (p) { p.classList.remove('sub-pill-active'); });
          this.classList.add('sub-pill-active');
          activeSubFilter = this.getAttribute('data-sub') || null;
          applyFilter();
        });
      });
    }

    // Isotope AND filter:
    // '.filter-design.filter-sub-design-character' (tanpa spasi = harus punya keduanya)
    function applyFilter() {
      if (!isoInstance) return;

      let filterStr;
      if (activeCatFilter === '*') {
        filterStr = '*';
      } else if (activeSubFilter) {
        filterStr = activeCatFilter + '.filter-sub-' + slugify(activeSubFilter);
      } else {
        filterStr = activeCatFilter;
      }

      isoInstance.arrange({ filter: filterStr });
    }


    // ════════════════════════════════════════════════════════
    //  RENDER ITEMS KE DOM
    //  Setiap item mendapat:
    //    .filter-{category}               → untuk tab filter
    //    .filter-sub-{slug(sub_category)} → untuk AND filter sub-category
    // ════════════════════════════════════════════════════════
    function renderItems(items) {
      let container = document.querySelector('.isotope-container');
      if (!container) return;
      container.innerHTML = '';

      items.forEach(function (item) {
        let catClass = item.category
          ? 'filter-' + item.category
          : '';
        let subClass = item.sub_category
          ? 'filter-sub-' + slugify(item.sub_category.trim())
          : '';

        let col = document.createElement('div');

        col.className = [
          'col-lg-4', 'col-md-6',
          'portfolio-item', 'isotope-item',
          catClass, subClass
        ].filter(Boolean).join(' ');

        let demoBtn = (item.demo_url && item.demo_url.trim() !== '')
          ? '<a href="' + item.demo_url + '" target="_blank" rel="noopener" ' +
          'class="portfolio-demo-btn" onclick="event.stopPropagation()">' +
          '<i class="bi bi-box-arrow-up-right"></i> Live Preview</a>'
          : '';

        col.innerHTML =
          '<img src="' + item.img + '"' +
          '     class="img-fluid portfolio-img"' +
          '     data-id="' + item.id + '"' +
          '     alt="' + escAttr(item.title) + '"' +
          '     loading="lazy">' +
          '<div class="portfolio-info">' +
          '  <div class="d-flex align-items-center justify-content-between gap-2">' +
          '    <h4 class="mb-0">' + item.title + '</h4>' +
          '    ' + demoBtn +
          '  </div>' +
          '  <p class="mt-1">' + (item.sub_category
            ? formatLabel(item.sub_category)
            : formatLabel(item.category)) +
          '  </p>' +
          '</div>';

        container.appendChild(col);
      });

      if (typeof AOS !== 'undefined') AOS.refresh();
    }

    function showSkeleton(count = 6) {
      let container = document.querySelector('.isotope-container');
      if (!container) return;

      container.innerHTML = '';

      for (let i = 0; i < count; i++) {
        let col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6';

        col.innerHTML = `
      <div class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-text"></div>
      </div>
    `;

        container.appendChild(col);
      }
    }

    // ════════════════════════════════════════════════════════
    //  LAYER 3 — Related Content (di dalam modal)
    //  Prioritas:
    //    1. sub_category sama   (paling relevan)
    //    2. category sama       (masih relevan)
    //    3. random fill         (pengisi jika kurang)
    // ════════════════════════════════════════════════════════
    function getRelatedItems(currentItem, limit) {
      limit = limit || RELATED_LIMIT;

      // 1. Sub-category sama
      let related = allData.filter(function (p) {
        return p.id !== currentItem.id &&
          p.sub_category &&
          currentItem.sub_category &&
          p.sub_category === currentItem.sub_category;
      });

      // 2. Category sama (jika masih kurang)
      if (related.length < limit) {
        allData.forEach(function (p) {
          if (p.id !== currentItem.id &&
            p.category === currentItem.category &&
            !related.find(function (r) { return r.id === p.id; })) {
            related.push(p);
          }
        });
      }

      // 3. Random fill (jika masih kurang)
      if (related.length < limit) {
        let rest = allData
          .filter(function (p) {
            return p.id !== currentItem.id &&
              !related.find(function (r) { return r.id === p.id; });
          })
          .sort(function () { return 0.5 - Math.random(); });
        related = related.concat(rest);
      }

      // Deduplikasi + potong sesuai limit
      let unique = [];
      let seen = {};
      for (let i = 0; i < related.length; i++) {
        if (!seen[related[i].id]) {
          seen[related[i].id] = true;
          unique.push(related[i]);
        }
        if (unique.length >= limit) break;
      }

      return unique;
    }


    // ════════════════════════════════════════════════════════
    //  MODAL — isi konten
    //  Bekerja dengan HTML modal yang sudah ada.
    //  Element opsional (null-safe, tidak error jika tidak ada):
    //    #portfolioModalSubcat → badge kategori + sub-kategori
    //    #portfolioModalDemo   → tombol link demo
    // ════════════════════════════════════════════════════════
    function fillModal(item) {
      let modalImg = document.getElementById('portfolioModalImg');
      let modalTitle = document.getElementById('portfolioModalTitle');
      let modalDesc = document.getElementById('portfolioModalDesc');
      let galleryEl = document.getElementById('portfolioModalGallery');
      let subcatEl = document.getElementById('portfolioModalSubcat'); // opsional
      let demoEl = document.getElementById('portfolioModalDemo');   // opsional

      if (!modalImg || !modalTitle || !modalDesc || !galleryEl) return;

      // Konten utama
      modalImg.src = item.img;
      modalImg.alt = item.title;
      modalTitle.textContent = item.title;
      modalDesc.textContent = item.description || '';

      // Badge kategori + sub-kategori (jika element ada di HTML)
      if (subcatEl) {
        let labels = [];
        if (item.category) labels.push(formatLabel(item.category));
        if (item.sub_category) labels.push(formatLabel(item.sub_category));
        subcatEl.innerHTML = labels
          .map(function (l) {
            return '<span class="portfolio-badge">' + l + '</span>';
          })
          .join('');
      }

      // Tombol demo (jika element ada di HTML)
      if (demoEl) {
        demoEl.innerHTML = item.demo_url
          ? '<a href="' + item.demo_url + '" target="_blank">Live Preview</i></a>'
          : '';
      }

      // LAYER 3: related items
      galleryEl.innerHTML = '';
      getRelatedItems(item, RELATED_LIMIT).forEach(function (rel) {
        galleryEl.innerHTML +=
          '<img src="' + rel.img + '"' +
          '     class="rounded-3"' +
          '     data-id="' + rel.id + '"' +
          '     alt="' + escAttr(rel.title) + '"' +
          '     title="' + escAttr(rel.title) + '">';
      });
    }


    // ════════════════════════════════════════════════════════
    //  EVENT DELEGATION — Modal
    //  Satu listener untuk dua jenis klik.
    // ════════════════════════════════════════════════════════
    document.addEventListener('click', function (e) {

      // Klik gambar di grid → buka modal
      if (e.target.matches('.portfolio-img')) {
        let id = parseInt(e.target.getAttribute('data-id'));
        let item = allData.find(function (p) { return p.id === id; });
        if (!item) return;

        fillModal(item);
        new bootstrap.Modal(document.getElementById('portfolioModal')).show();
        return;
      }

      // Klik related item di gallery → update isi modal + scroll ke atas
      if (e.target.matches('#portfolioModalGallery img')) {
        let id = parseInt(e.target.getAttribute('data-id'));
        let item = allData.find(function (p) { return p.id === id; });
        if (!item) return;

        fillModal(item);
        setTimeout(function () {
          let modalBody = document.querySelector('#portfolioModal .modal-body');
          if (modalBody) modalBody.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      }

    });

    // Reset modal saat ditutup
    let portfolioModalEl = document.getElementById('portfolioModal');
    if (portfolioModalEl) {
      portfolioModalEl.addEventListener('hidden.bs.modal', function () {
        let img = document.getElementById('portfolioModalImg');
        let ttl = document.getElementById('portfolioModalTitle');
        let dsc = document.getElementById('portfolioModalDesc');
        let gal = document.getElementById('portfolioModalGallery');
        let sub = document.getElementById('portfolioModalSubcat');

        if (img) img.src = '';
        if (ttl) ttl.textContent = '';
        if (dsc) dsc.textContent = '';
        if (gal) gal.innerHTML = '';
        if (sub) sub.innerHTML = '';
      });
    }


    // ════════════════════════════════════════════════════════
    //  Graphic Design Card Expand/Collapse
    //  (bagian price list — tidak berubah dari aslinya)
    // ════════════════════════════════════════════════════════
    document.querySelectorAll('.design-item').forEach(function (card) {
      card.addEventListener('click', function () {
        let col = this.closest('.card-col');
        let panel = col.querySelector('.detail-panel');
        let isActive = col.classList.contains('active-col');
        let isDesktop = window.innerWidth >= 768;

        // Reset semua
        document.querySelectorAll('.card-col').forEach(function (c) {
          c.classList.remove('active-col');
          if (isDesktop) c.style.order = '';

          let lc = c.querySelector('.left-content');
          if (lc) lc.classList.remove('d-flex', 'align-items-center', 'gap-4');

          let di = c.querySelector('.design-item');
          if (di) di.classList.remove('px-5');
        });

        document.querySelectorAll('.design-item')
          .forEach(function (c) { c.classList.remove('active'); });
        document.querySelectorAll('.detail-panel')
          .forEach(function (p) { p.classList.remove('open'); });

        if (!isActive) {
          col.classList.add('active-col');
          this.classList.add('active');
          panel.classList.add('open');

          if (isDesktop) {
            col.style.order = '-1';

            let leftContent = col.querySelector('.left-content');
            if (leftContent) {
              leftContent.classList.add('d-flex', 'align-items-center', 'gap-4');
            }

            this.classList.add('px-5');

            setTimeout(function () {
              let rect = col.getBoundingClientRect();
              let offset = 180;
              window.scrollTo({
                top: window.scrollY + rect.top - offset,
                behavior: 'smooth'
              });
            }, 100);
          }
        }
      });
    });


    // ════════════════════════════════════════════════════════
    //  CSV PARSER — sama persis dengan versi asli
    // ════════════════════════════════════════════════════════
    function parseCSV(csv) {
      let lines = csv.trim().split('\n');
      let headers = lines[0].split(',').map(function (h) {
        return h.trim().replace(/"/g, '');
      });

      return lines.slice(1).map(function (line) {
        let values = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          if (line[i] === '"') {
            inQuotes = !inQuotes;
          } else if (line[i] === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
          } else {
            current += line[i];
          }
        }
        values.push(current.trim());

        let item = {};
        headers.forEach(function (header, index) {
          item[header] = values[index] ? values[index].replace(/"/g, '') : '';
        });

        item.id = parseInt(item.id);
        item.img = convertDriveLink(item.img);
        item.demo_url = (item.demo_url && item.demo_url.trim() !== '')
          ? item.demo_url.trim()
          : null;

        return item;
      });
    }

    function convertDriveLink(url) {
      if (!url) return '';
      let match = url.match(/\/d\/(.*?)\//);
      return match ? 'https://lh3.googleusercontent.com/d/' + match[1] : url;
    }


    // ════════════════════════════════════════════════════════
    //  UTILS
    // ════════════════════════════════════════════════════════

    // "design_character" → "design-character"  (CSS class safe)
    function slugify(str) {
      if (!str) return '';
      return str.toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }

    // "design_character" → "Design Character"
    function formatLabel(str) {
      if (!str) return '';
      return str.replace(/[_-]/g, ' ')
        .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
    }

    // Escape untuk attribute HTML (anti-XSS)
    function escAttr(str) {
      if (!str) return '';
      return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

  });
})();