from django.urls import path, include
from rest_framework import routers
from carga_de_fuego import views

router = routers.DefaultRouter()
router.register(r'material', views.MaterialView, basename='material')
router.register(r'objeto', views.ObjetoView, basename='objeto')
router.register(r'usuario', views.UsuarioView, basename='usuario')
router.register(r'riesgo', views.RiesgoView, basename='riesgo')
router.register(r'tipo_de_material', views.TipoDeMaterialView, basename='tipo_de_material')
router.register(r'ventilacion', views.VentilacionView, basename='ventilacion')
router.register(r'objeto_sector', views.ObjetoSectorView, basename='objeto_sector')
router.register(r'sector', views.SectorView, basename='sector')
router.register(r'potencial_extintor', views.PotencialExtintorView, basename='potencial_extintor')
router.register(r'resistencia', views.ResistenciaView, basename='resistencia')

urlpatterns = [
    path('api/', include(router.urls)),
]