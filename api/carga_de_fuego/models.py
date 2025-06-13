from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Material(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    poder_calorifico = models.FloatField()

    def __str__(self):
        return self.nombre

class Objeto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    material = models.ForeignKey(Material, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre} de {self.material}'

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    admin = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.apellido} {self.nombre} ({self.email})'
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

class Riesgo(models.Model):
    id = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=100)

    def __str__(self):
        return self.tipo

class TipoDeMaterial(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre

class Ventilacion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class ObjetoSector(models.Model):
    id = models.AutoField(primary_key=True)
    objeto = models.ForeignKey('Objeto', on_delete=models.CASCADE)
    sector = models.ForeignKey('Sector', on_delete=models.CASCADE)
    cantidad = models.IntegerField()

    def __str__(self):
        return f'{self.objeto} en {self.sector} ({self.cantidad})'

class UsuarioSector(models.Model):
    id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey('Usuario', on_delete=models.CASCADE)
    sector = models.ForeignKey('Sector', on_delete=models.CASCADE)

class Sector(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    empresa = models.CharField(max_length=100)
    fecha = models.DateField()
    actividad = models.CharField(max_length=100)
    largo = models.FloatField()
    ancho = models.FloatField()
    objetos = models.ManyToManyField(Objeto, through='ObjetoSector', related_name='sectores')
    material_predominante = models.ForeignKey('Material', on_delete=models.CASCADE)
    riesgo = models.ForeignKey('Riesgo', on_delete=models.CASCADE)
    tipo_de_material = models.ForeignKey('TipoDeMaterial', on_delete=models.CASCADE)
    ventilacion = models.ForeignKey('Ventilacion', on_delete=models.CASCADE)
    usuarios = models.ManyToManyField(Usuario, through='UsuarioSector', related_name='sectores')

    def __str__(self):
        return f'Sector: {self.nombre}, Empresa: {self.empresa}, Actividad: {self.actividad}'

class PotencialExtintor(models.Model):
    id = models.AutoField(primary_key=True)
    potencial = models.FloatField()
    carga_de_fuego_minima = models.FloatField()
    carga_de_fuego_maxima = models.FloatField(blank=True, null=True)
    tipo_de_material = models.ForeignKey('TipoDeMaterial', on_delete=models.CASCADE)
    riesgo = models.ForeignKey('Riesgo', on_delete=models.CASCADE)

    def __str__(self):
        return f'Potencial: {self.potencial}, Tipo de Material: {self.tipo_de_material}, Riesgo: {self.riesgo}'

class Resistencia(models.Model):
    id = models.AutoField(primary_key=True)
    resistencia = models.FloatField()
    carga_de_fuego_minima = models.FloatField()
    carga_de_fuego_maxima = models.FloatField(blank=True, null=True)
    ventilacion = models.ForeignKey('Ventilacion', on_delete=models.CASCADE)    
    riesgo = models.ForeignKey('Riesgo', on_delete=models.CASCADE)

    def __str__(self):
        return f'Resistencia: {self.resistencia}, Ventilación: {self.ventilacion}, Riesgo: {self.riesgo}'

# Create your models here.
