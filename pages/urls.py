from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('who-we-are/', views.who_we_are, name='who-we-are'),
    path('what-we-do/', views.what_we_do, name='what-we-do'),
    path('impact/', views.impact, name='impact'),
    path('contact/', views.contact, name='contact'),
]
