from django.urls import path, include
from rest_framework import routers
from carga_de_fuego import views

router = routers.DefaultRouter()
router.register(r'materiales', views.MaterialView, basename='materiales')
router.register(r'objetos', views.ObjetoView, basename='objetos')
router.register(r'usuarios', views.UsuarioView, basename='usuarios')
router.register(r'riesgos', views.RiesgoView, basename='riesgos')
router.register(r'tipos_de_materiales', views.TipoDeMaterialView, basename='tipos_de_materiales')
router.register(r'objetos_sectores', views.ObjetoSectorView, basename='objetos_sectores')
router.register(r'ventilaciones', views.VentilacionView, basename='ventilaciones')
router.register(r'sectores', views.SectorView, basename='sectores')
router.register(r'potenciales_extintores', views.PotencialExtintorView, basename='potenciales_extintores')
router.register(r'resistencias', views.ResistenciaView, basename='resistencias')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/', views.LoginAPIView.as_view(), name='login'),
]