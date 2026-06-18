(function() {
  'use strict';

  // --- i18n system ---
  var i18n = {
    lang: localStorage.getItem('lang') || 'en',
    dict: {},
    register: function(a, b) {
      if (b === undefined) {
        for (var k in a) { i18n.dict[k] = a[k]; }
      } else {
        for (var lang in b) {
          for (var k in b[lang]) {
            if (!i18n.dict[k]) i18n.dict[k] = {};
            i18n.dict[k][lang] = b[lang][k];
          }
        }
      }
    },
    t: function(k) {
      var e = i18n.dict[k];
      if (!e) return k;
      return e[i18n.lang] || e['en'] || k;
    },
    setLang: function(l) {
      i18n.lang = l;
      localStorage.setItem('lang', l);
      document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = l;
      document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (!i18n.dict[key]) return;
        if (el.tagName === 'META') {
          el.content = i18n.t(key);
        } else {
          el.innerHTML = i18n.t(key);
        }
      });
      document.querySelectorAll('[data-lang]').forEach(function(el) {
        el.classList.toggle('hidden', el.getAttribute('data-lang') !== l);
      });
      var h = document.getElementById('header');
      var f = document.getElementById('footer');
      if (h) { h.innerHTML = buildHeader(); }
      if (f) { f.innerHTML = buildFooter(); }
      var tb = document.getElementById('lang-toggle');
      if (tb) { tb.textContent = l === 'en' ? 'عربي' : 'English'; }
    },
    toggle: function() { i18n.setLang(i18n.lang === 'en' ? 'ar' : 'en'); }
  };

  i18n.register({
    'nav.home': { en: 'Home', ar: 'الرئيسية' },
    'nav.who-we-are': { en: 'Who We Are', ar: 'من نحن' },
    'nav.what-we-do': { en: 'What We Do', ar: 'ماذا نفعل' },
    'nav.news': { en: 'News', ar: 'الأخبار' },
    'nav.impact': { en: 'Impact', ar: 'تأثيرنا' },
    'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
    'brand.name': { en: 'Y-PEER <span class="text-primary">Khartoum</span>', ar: 'Y-PEER <span class="text-primary">الخرطوم</span>' },
    'footer.contact': { en: 'Contact Us', ar: 'اتصل بنا' },
    'footer.links': { en: 'Quick Links', ar: 'روابط سريعة' },
    'footer.follow': { en: 'Follow Us', ar: 'تابعنا' },
    'footer.commitment': { en: 'Y-PEER Khartoum is committed to safeguarding, inclusion, and transparency in all our programs. We believe in the power of youth to lead, educate, and transform communities.', ar: 'تلتزم Y-PEER الخرطوم بالحماية والشمولية والشفافية في جميع برامجنا. نحن نؤمن بقدرة الشباب على القيادة والتعليم وتحويل المجتمعات.' },
    'footer.copyright': { en: '&copy; 2026 Y-PEER Khartoum. All rights reserved.', ar: '&copy; ٢٠٢٦ Y-PEER الخرطوم. جميع الحقوق محفوظة.' },
  });

  var path = location.pathname;
  var page = path.replace(/^\//, '').split('/')[0] || '';

  var PAGES = [
    { href: '/', slug: '', key: 'nav.home' },
    { href: '/who-we-are/', slug: 'who-we-are', key: 'nav.who-we-are' },
    { href: '/what-we-do/', slug: 'what-we-do', key: 'nav.what-we-do' },
    { href: '/news/', slug: 'news', key: 'nav.news' },
    { href: '/impact/', slug: 'impact', key: 'nav.impact' },
    { href: '/contact/', slug: 'contact', key: 'nav.contact' }
  ];

  function navLink(entry) {
    var active = entry.slug === page;
    return '<a href="' + entry.href + '" class="nav-link text-sm font-medium ' + (active ? 'text-white' : 'text-gray-300 hover:text-white') + ' transition-colors">' + i18n.t(entry.key) + '</a>';
  }

  function mobileLink(entry) {
    return '<a href="' + entry.href + '" class="block py-3 text-gray-300 hover:text-primary font-medium transition">' + i18n.t(entry.key) + '</a>';
  }

  var logo = '<img src="/static/images/main-logo-1.svg" class="w-9 h-9 lg:w-11 lg:h-11 group-hover:scale-105 transition-transform" alt="Y-PEER Khartoum">';

  function buildHeader() {
    var langLabel = i18n.lang === 'en' ? 'عربي' : 'English';
    var navEntries = PAGES.map(function(p) { return navLink(p); }).join('');
    var mobileEntries = PAGES.map(function(p) { return mobileLink(p); }).join('');
    return '<header class="fixed top-0 left-0 w-full z-50 bg-dark/95 backdrop-blur-sm border-b border-white/10">' +
      '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">' +
        '<div class="flex items-center justify-between h-16 lg:h-20">' +
          '<a href="/" class="flex items-center gap-3 group">' + logo + '<span class="text-white font-bold text-lg lg:text-xl tracking-tight">' + i18n.t('brand.name') + '</span></a>' +
          '<nav class="hidden lg:flex items-center gap-6">' + navEntries +
            '<button id="lang-toggle" class="px-3 py-1.5 border border-primary/40 text-primary hover:bg-primary hover:text-white rounded-full text-xs font-semibold transition-all duration-300">' + langLabel + '</button>' +
          '</nav>' +
          '<button id="menu-btn" class="lg:hidden text-white p-2" aria-label="Toggle menu">' +
            '<svg id="menu-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>' +
            '<svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div id="mobile-menu" class="lg:hidden hidden">' +
        '<nav class="px-4 pb-4 space-y-2 bg-dark/95 backdrop-blur-sm border-t border-white/10">' + mobileEntries +
          '<button id="lang-toggle-mobile" class="w-full mt-2 px-3 py-2 border border-primary/40 text-primary hover:bg-primary hover:text-white rounded-full text-xs font-semibold transition-all duration-300">' + langLabel + '</button>' +
        '</nav>' +
      '</div>' +
    '</header>';
  }

  function buildFooter() {
    var footerLogo = logo.replace('group-hover:scale-105 transition-transform', '');
    var linkItems = PAGES.map(function(p) { return '<li><a href="' + p.href + '" class="text-gray-400 hover:text-primary transition-colors">' + i18n.t(p.key) + '</a></li>'; }).join('');
    var socialLinks = [
      { url: 'https://facebook.com/YPeerKhartoum', label: 'Facebook', icon: '<circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 6.5h-2a3 3 0 00-3 3V12H8v2.5h2V22h2.5v-7.5h2.5L15 12h-2.5V9.5a.5.5 0 01.5-.5h2V6.5z" fill="currentColor"/>' },
      { url: 'https://twitter.com/ypeerkhartoum', label: 'X', icon: '<path d="M18 5l-5 6.5L18 19h-3.5l-3.5-5-4 5H4l5-6.5L4.5 5H8l3 4.5L14.5 5H18z" fill="currentColor"/>' },
      { url: 'https://instagram.com/ypeerkhartoum', label: 'Instagram', icon: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>' },
    ];
    var socialHtml = socialLinks.map(function(s) {
      return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300" aria-label="' + s.label + '"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' + s.icon + '</svg></a>';
    }).join('');
    var shapesHtml = '<div style="position:relative;width:100%;height:150px;background:#1b134b;overflow:hidden;display:block">' +
      '<div style="position:absolute;left:0;bottom:0;width:25%;height:100%;background:#8f6bf7;border-top-left-radius:80px"></div>' +
      '<div style="position:absolute;left:6%;bottom:0;width:10%;height:40%;background:#4cfdf1;border-top-left-radius:50px;border-top-right-radius:50px;z-index:2"></div>' +
      '<div style="position:absolute;left:20%;bottom:0;width:12%;height:50%;background:#fa7a04;border-top-left-radius:100px;z-index:3"></div>' +
      '<div style="position:absolute;left:35%;top:0;width:15%;height:80%;background:#4cfdf1;border-bottom-right-radius:80px;z-index:1"></div>' +
      '<div style="position:absolute;left:50%;bottom:0;width:15%;height:100%;background:#fff;display:flex;align-items:center;justify-content:center;z-index:2">' +
        '<div style="width:35px;height:35px;background:#1b134b"></div>' +
      '</div>' +
      '<div style="position:absolute;left:65%;bottom:0;width:15%;height:60%;background:#8f6bf7;z-index:2"></div>' +
      '<div style="position:absolute;left:68%;top:20%;width:30px;height:30px;background:#4cfdf1"></div>' +
      '<div style="position:absolute;right:0;bottom:0;width:20%;height:100%;background:#1b134b;z-index:1"></div>' +
      '<div style="position:absolute;right:0;top:0;width:15%;height:85%;background:#fff;border-bottom-left-radius:120px;z-index:2"></div>' +
      '<div style="position:absolute;right:17%;bottom:25%;width:15px;height:15px;background:#fff;border-radius:50%;z-index:3"></div>' +
      '<div style="position:absolute;right:0;bottom:0;width:15%;height:60%;background:#fa7a04;clip-path:polygon(100% 0,100% 100%,0 100%);z-index:4"></div>' +
      '<div style="position:absolute;right:5%;bottom:15%;width:15px;height:15px;background:#4cfdf1;border-radius:50%;z-index:5"></div>' +
    '</div>';
    return '<footer class="bg-dark border-t border-white/10">' +
      shapesHtml +
      '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-10">' +
        '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">' +
          '<div>' +
            '<div class="flex items-center gap-3">' + footerLogo + '<span class="text-white font-bold text-lg">' + i18n.t('brand.name') + '</span></div>' +
            '<p class="mt-4 text-gray-400 text-sm leading-relaxed">' + i18n.t('footer.commitment') + '</p>' +
          '</div>' +
          '<div>' +
            '<h4 class="text-white font-semibold text-lg mb-4">' + i18n.t('footer.contact') + '</h4>' +
            '<ul class="space-y-3 text-sm text-gray-400">' +
              '<li class="flex items-center gap-3"><svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><a href="mailto:ypeerkhartoum@gmail.com" class="hover:text-accent transition-colors">ypeerkhartoum@gmail.com</a></li>' +
              '<li class="flex items-center gap-3"><svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg><span>Khartoum, Sudan</span></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4 class="text-white font-semibold text-lg mb-4">' + i18n.t('footer.links') + '</h4>' +
            '<ul class="space-y-3 text-sm">' + linkItems + '</ul>' +
          '</div>' +
          '<div>' +
            '<h4 class="text-white font-semibold text-lg mb-4">' + i18n.t('footer.follow') + '</h4>' +
            '<div class="flex items-center gap-3">' + socialHtml + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">' +
          '<p>' + i18n.t('footer.copyright') + '</p>' +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  document.getElementById('header').innerHTML = buildHeader();
  document.getElementById('footer').innerHTML = buildFooter();

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('#menu-btn');
    if (btn) {
      var menu = document.getElementById('mobile-menu');
      var open = document.getElementById('menu-icon-open');
      var close = document.getElementById('menu-icon-close');
      var hidden = menu.classList.toggle('hidden');
      open.classList.toggle('hidden', !hidden);
      close.classList.toggle('hidden', hidden);
    }
    var link = e.target.closest('#mobile-menu a');
    if (link) {
      document.getElementById('mobile-menu').classList.add('hidden');
      document.getElementById('menu-icon-open').classList.remove('hidden');
      document.getElementById('menu-icon-close').classList.add('hidden');
    }
    var langBtn = e.target.closest('#lang-toggle, #lang-toggle-mobile');
    if (langBtn) { i18n.toggle(); }
  });

  i18n.setLang(i18n.lang);
})();
