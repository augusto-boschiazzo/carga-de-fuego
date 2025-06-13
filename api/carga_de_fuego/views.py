from .models import *
from .serializer import *
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
import jwt
from django.conf import settings
from datetime import datetime, timedelta

# Create your views here.
class MaterialView(viewsets.ModelViewSet):
    serializer_class = MaterialSerializer
    queryset = Material.objects.all()

class ObjetoView(viewsets.ModelViewSet):
    serializer_class = ObjetoSerializer
    queryset = Objeto.objects.all()

    @action(detail=False, methods=['get'])
    def populated(self, request):
        objetos = self.get_queryset().select_related('material')
        data = []
        for objeto in objetos:
            item = self.get_serializer(objeto).data
            if hasattr(objeto, 'material'):
                item['material'] = MaterialSerializer(objeto.material).data
            data.append(item)
        return Response(data)

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


class LoginAPIView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=400)

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response({'error': 'Invalid email or password.'}, status=400)

        if not usuario.check_password(password):
            return Response({'error': 'Invalid email or password.'}, status=400)

        payload = {
            'user_id': usuario.id,
            'exp': datetime.now() + timedelta(hours=1),
            'iat' : datetime.now()
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return Response({'accessToken': token, 'userId': usuario.id, 'email': usuario.email, 'isAdmin': usuario.admin}, status=200)