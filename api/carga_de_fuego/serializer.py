from rest_framework import serializers
from .models import *

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'

class ObjetoSerializer(serializers.ModelSerializer):
    material = MaterialSerializer(read_only=True)

    material_id = serializers.PrimaryKeyRelatedField(
        source='material',
        queryset=Material.objects.all(),
        write_only=True
    )

    class Meta:
        model = Objeto
        fields = '__all__'
        read_only_fields = ['id']

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = '__all__'
        read_only_fields = ['id']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        usuario = Usuario(**validated_data)

        usuario.set_password(password)
        usuario.save()
        return usuario
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)
        instance.save()
        return instance

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
    objeto = ObjetoSerializer(read_only=True)
    objeto_id = serializers.PrimaryKeyRelatedField(
        source='objeto',
        queryset=Objeto.objects.all(),
        write_only=True
    )

    class Meta:
        model = ObjetoSector
        fields = ['id', 'objeto', 'objeto_id', 'sector', 'cantidad']

class SectorSerializer(serializers.ModelSerializer):
    material_predominante = MaterialSerializer(read_only=True)
    material_predominante_id = serializers.PrimaryKeyRelatedField(
        source='material_predominante',
        queryset=Material.objects.all(),
        write_only=True
    )

    riesgo = RiesgoSerializer(read_only=True)
    riesgo_id = serializers.PrimaryKeyRelatedField(
        source='riesgo',
        queryset=Riesgo.objects.all(),
        write_only=True
    )

    tipo_de_material = TipoDeMaterialSerializer(read_only=True)
    tipo_de_material_id = serializers.PrimaryKeyRelatedField(
        source='tipo_de_material',
        queryset=TipoDeMaterial.objects.all(),
        write_only=True
    )

    ventilacion = VentilacionSerializer(read_only=True)
    ventilacion_id = serializers.PrimaryKeyRelatedField(
        source='ventilacion',
        queryset=Ventilacion.objects.all(),
        write_only=True
    )

    objetos = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True
    )

    objeto_sector_set = ObjetoSectorSerializer(many=True, read_only=True)

    class Meta:
        model = Sector
        fields = [
            'id', 'nombre', 'empresa', 'fecha', 'actividad',
            'largo', 'ancho', 'material_predominante', 'material_predominante_id',
            'riesgo', 'riesgo_id', 'tipo_de_material', 'tipo_de_material_id',
            'ventilacion', 'ventilacion_id', 'objetos', 'objeto_sector_set'
        ]
        read_only_fields = ['objeto_sector_set']

    def create(self, validated_data):
        objetos_ids = validated_data.pop('objetos', [])
        sector = Sector.objects.create(**validated_data)

        for objeto_id in objetos_ids:
            ObjetoSector.objects.create(
                objeto_id=objeto_id,
                sector=sector,
                cantidad=1
            )
        
        return sector

class PotencialExtintorSerializer(serializers.ModelSerializer):
    tipo_de_material = TipoDeMaterialSerializer(read_only=True)
    tipo_de_material_id = serializers.PrimaryKeyRelatedField(
        source='tipo_de_material',
        queryset=TipoDeMaterial.objects.all(),
        write_only=True
    )

    riesgo = RiesgoSerializer(read_only=True)
    riesgo_id = serializers.PrimaryKeyRelatedField(
        source='riesgo',
        queryset=Riesgo.objects.all(),
        write_only=True
    )

    class Meta:
        model = PotencialExtintor
        fields = '__all__'

class ResistenciaSerializer(serializers.ModelSerializer):
    ventilacion = VentilacionSerializer(read_only=True)
    ventilacion_id = serializers.PrimaryKeyRelatedField(
        source='ventilacion',
        queryset=Ventilacion.objects.all(),
        write_only=True
    )

    riesgo = RiesgoSerializer(read_only=True)
    riesgo_id = serializers.PrimaryKeyRelatedField(
        source='riesgo',
        queryset=Riesgo.objects.all(),
        write_only=True
    )

    class Meta:
        model = Resistencia
        fields = '__all__'
