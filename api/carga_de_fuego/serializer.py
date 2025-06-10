from rest_framework import serializers
from .models import *

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'

class ObjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objeto
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class RiesgoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Riesgo
        fields = '__all__'

class TipoDeMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDeMaterial
        fields = '__all__'

class VentilacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventilacion
        fields = '__all__'

class ObjetoSectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjetoSector
        fields = '__all__'

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'

class PotencialExtintorSerializer(serializers.ModelSerializer):
    class Meta:
        model = PotencialExtintor
        fields = '__all__'

class ResistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resistencia
        fields = '__all__'
