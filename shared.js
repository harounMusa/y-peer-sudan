(function() {
  'use strict';

  // --- i18n system ---
  var i18n = {
    lang: localStorage.getItem('lang') || 'en',
    dict: {},
    register: function(t) { for (var k in t) { i18n.dict[k] = t[k]; } },
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
    'nav.impact': { en: 'Impact', ar: 'تأثيرنا' },
    'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
    'footer.contact': { en: 'Contact', ar: 'اتصل بنا' },
    'footer.links': { en: 'Links', ar: 'روابط' },
    'footer.commitment': { en: 'Y-PEER Sudan is committed to safeguarding, inclusion, and transparency in all our programs. We believe in the power of youth to lead, educate, and transform communities.', ar: 'تلتزم Y-PEER السودان بالحماية والشمولية والشفافية في جميع برامجنا. نحن نؤمن بقدرة الشباب على القيادة والتعليم وتحويل المجتمعات.' },
    'footer.copyright': { en: '&copy; 2026 Y-PEER Sudan. All rights reserved.', ar: '&copy; ٢٠٢٦ Y-PEER السودان. جميع الحقوق محفوظة.' },
    'footer.safeguarding': { en: 'Committed to <span class="text-accent">safeguarding</span>, <span class="text-primary">inclusion</span>, and <span class="text-purple">transparency</span>', ar: 'ملتزمون بـ <span class="text-accent">الحماية</span> و <span class="text-primary">الشمولية</span> و <span class="text-purple">الشفافية</span>' }
  });

  var page = location.pathname.split('/').pop() || 'index.html';
  var PAGES = [
    { href: 'index.html', key: 'nav.home' },
    { href: 'who-we-are.html', key: 'nav.who-we-are' },
    { href: 'what-we-do.html', key: 'nav.what-we-do' },
    { href: 'impact.html', key: 'nav.impact' },
    { href: 'contact.html', key: 'nav.contact' }
  ];

  function navLink(href, key) {
    var active = href === page;
    return '<a href="' + href + '" class="nav-link text-sm font-medium ' + (active ? 'text-white' : 'text-gray-300 hover:text-white') + ' transition-colors">' + i18n.t(key) + '</a>';
  }

  function mobileLink(href, key) {
    return '<a href="' + href + '" class="block py-3 text-gray-300 hover:text-primary font-medium transition">' + i18n.t(key) + '</a>';
  }

  var logo = '<svg class="w-9 h-9 lg:w-11 lg:h-11 group-hover:scale-105 transition-transform" viewBox="0 0 44 44" fill="none">' +
    '<circle cx="22" cy="22" r="20" fill="#1b134b" stroke="#fa7a04" stroke-width="2.5"/>' +
    '<circle cx="22" cy="22" r="16" fill="none" stroke="#fa7a04" stroke-width="1" opacity="0.3"/>' +
    '<circle cx="15" cy="14" r="3.5" fill="#fa7a04"/>' +
    '<circle cx="29" cy="14" r="3.5" fill="#fa7a04"/>' +
    '<circle cx="22" cy="26" r="3.5" fill="#4cfdf1"/>' +
    '<line x1="17.5" y1="17" x2="20.5" y2="24" stroke="#8f6bf7" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="26.5" y1="17" x2="23.5" y2="24" stroke="#8f6bf7" stroke-width="2" stroke-linecap="round"/>' +
    '</svg>';

  function buildHeader() {
    var langLabel = i18n.lang === 'en' ? 'عربي' : 'English';
    var navLinks = PAGES.map(function(p) { return navLink(p.href, p.key); }).join('');
    var mobileLinks = PAGES.map(function(p) { return mobileLink(p.href, p.key); }).join('');
    return '<header class="fixed top-0 left-0 w-full z-50 bg-dark/95 backdrop-blur-sm border-b border-white/10">' +
      '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">' +
        '<div class="flex items-center justify-between h-16 lg:h-20">' +
          '<a href="index.html" class="flex items-center gap-3 group">' + logo + '<span class="text-white font-bold text-lg lg:text-xl tracking-tight">Y-PEER <span class="text-primary">Sudan</span></span></a>' +
          '<nav class="hidden lg:flex items-center gap-6">' + navLinks +
            '<button id="lang-toggle" class="px-3 py-1.5 border border-primary/40 text-primary hover:bg-primary hover:text-white rounded-full text-xs font-semibold transition-all duration-300">' + langLabel + '</button>' +
          '</nav>' +
          '<button id="menu-btn" class="lg:hidden text-white p-2" aria-label="Toggle menu">' +
            '<svg id="menu-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>' +
            '<svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div id="mobile-menu" class="lg:hidden hidden">' +
        '<nav class="px-4 pb-4 space-y-2 bg-dark/95 backdrop-blur-sm border-t border-white/10">' + mobileLinks +
          '<button id="lang-toggle-mobile" class="w-full mt-2 px-3 py-2 border border-primary/40 text-primary hover:bg-primary hover:text-white rounded-full text-xs font-semibold transition-all duration-300">' + langLabel + '</button>' +
        '</nav>' +
      '</div>' +
    '</header>';
  }

  function buildFooter() {
    var footerLogo = logo.replace('group-hover:scale-105 transition-transform', '');
    var linkItems = PAGES.map(function(p) { return '<li><a href="' + p.href + '" class="text-gray-400 hover:text-primary transition-colors">' + i18n.t(p.key) + '</a></li>'; }).join('');
    return '<footer class="bg-dark border-t border-white/10">' +
      '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">' +
        '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-12">' +
          '<div>' +
            '<div class="flex items-center gap-3">' + footerLogo + '<span class="text-white font-bold text-lg">Y-PEER <span class="text-primary">Sudan</span></span></div>' +
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
        '</div>' +
        '<div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">' +
          '<p>' + i18n.t('footer.copyright') + '</p>' +
          '<p class="text-center sm:text-right">' + i18n.t('footer.safeguarding') + '</p>' +
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
