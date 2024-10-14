# text2sqlapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('translate/', views.translate_to_sql, name='translate_to_sql'),  # The translate_to_sql view

]
