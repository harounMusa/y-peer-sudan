# Y-PEER Khartoum — Django Web Application

## TECH_STACK
- **Backend:** Django 5.2 (Python), SQLite (dev) / PostgreSQL (prod), Gunicorn
- **Frontend:** HTML5, Tailwind CSS v3.4.17 (CDN), Vanilla JS (`shared.js`)
- **Static Assets:** Whitenoise (production), Django `runserver` (dev)
- **Config:** python-decouple (`.env` file)

## SYSTEM_FLOW
```
Browser → Nginx/Apache → Gunicorn → Django → SQLite/PostgreSQL
                                 ↕
              Whitenoise serves static files
```

## ARCHITECTURE
```
Y-peer/
├── ypeer/                 # Django project config
│   ├── settings.py        # Settings (env-based)
│   ├── urls.py            # Root URLconf + error handlers
│   └── wsgi.py            # WSGI for gunicorn
├── pages/                 # Static page app
│   ├── views.py           # index, who-we-are, what-we-do, impact, contact, error views
│   ├── urls.py            # Page routes
│   └── templates/pages/   # *.html templates
├── news/                  # News app (Django models + admin)
│   ├── models.py          # NewsArticle model
│   ├── admin.py           # Admin config
│   ├── views.py           # list + detail views
│   ├── urls.py            # News routes
│   └── templates/news/    # list.html, detail.html
├── templates/             # Project-level templates
│   ├── 404.html           # Custom 404
│   └── 500.html           # Custom 500
├── static/                # Static files (JS, images)
│   ├── js/shared.js       # Shared JS (i18n engine, header/footer, nav)
│   └── images/            # main-logo-1/2/3.svg
├── media/                 # User-uploaded files (news images)
├── staticfiles/           # Collected static files (production)
├── _archive/              # Stale static HTML files (pre-Django)
├── .env.example           # Environment variable template
├── requirements.txt       # Python dependencies
└── manage.py              # Django management script
```

## PRODUCTION DEPLOYMENT
1. Copy `.env.example` to `.env` and set `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS`
2. `pip install -r requirements.txt`
3. `python manage.py migrate`
4. `python manage.py collectstatic`
5. `python manage.py createsuperuser`
6. Run via gunicorn: `gunicorn ypeer.wsgi`
7. Point nginx/apache at gunicorn socket

## DEVELOPMENT
- `python manage.py runserver` — serves pages at `/`, `/who-we-are/`, etc.
- Admin at `/admin/` (credentials: admin/admin123)
- Media and static files served automatically when `DEBUG=True`

## KEY FEATURES
- **i18n:** Client-side Arabic/English toggle with `localStorage` persistence, RTL switching
- **Header/Footer:** Rendered by `shared.js` with active-nav detection, mobile hamburger menu
- **Footer Shapes:** 13-shape geometric banner using brand palette
- **News:** Django admin for CRUD, bilingual fields (title_en/ar, body_en/ar), `/news/` list + detail
- **Brand identity:** Y-PEER color palette, Poppins/Cairo headings, arch border-radius, `.ypeer-card` class
