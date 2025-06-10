from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializer import *

# Create your views here.
class MaterialView(viewsets.ModelViewSet):
    serializer_class = MaterialSerializer
    queryset = Material.objects.all()

class ObjetoView(viewsets.ModelViewSet):
    serializer_class = ObjetoSerializer
    queryset = Objeto.objects.all()

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class RiesgoView(viewsets.ModelViewSet):
    serializer_class = RiesgoSerializer
    queryset = Riesgo.objects.all()

class TipoDeMaterialView(viewsets.ModelViewSet):
    serializer_class = TipoDeMaterialSerializer
    queryset = TipoDeMaterial.objects.all()

class VentilacionView(viewsets.ModelViewSet):
    serializer_class = VentilacionSerializer
    queryset = Ventilacion.objects.all()

class ObjetoSectorView(viewsets.ModelViewSet):
    serializer_class = ObjetoSectorSerializer
    queryset = ObjetoSector.objects.all()

class SectorView(viewsets.ModelViewSet):
    serializer_class = SectorSerializer
    queryset = Sector.objects.all()

class PotencialExtintorView(viewsets.ModelViewSet):
    serializer_class = PotencialExtintorSerializer
    queryset = PotencialExtintor.objects.all()

class ResistenciaView(viewsets.ModelViewSet):
    serializer_class = ResistenciaSerializer
    queryset = Resistencia.objects.all()