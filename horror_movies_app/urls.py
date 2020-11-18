from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('register_user', views.register),
    path('login_page', views.login_page),
    path('login', views.login),
    path('homepage', views.homepage),
    path('logout', views.logout),
    path('user_profile/<int:id>', views.user_profile),
    path('already_seen', views.already_seen),
    path('movies/<int:id>/destroy', views.destroy)
]