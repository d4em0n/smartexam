from django.shortcuts import render, get_object_or_404
from sekolah.serializers import *
from sekolah.models import *
from rest_framework import generics
from django.http import Http404
from rest_framework import permissions
from .permissions import *


class ProfileDetail(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        if user.is_guru:
            return user.guru
        elif user.is_siswa:
            return user.siswa
        else:
            return user

    def get_serializer_class(self):
        if self.request.user.is_guru:
            return GuruSerializer
        elif self.request.user.is_siswa:
            return SiswaSerializer
        else:
            return UserSerializer

    def get_object(self):
        return self.get_queryset()


class SiswaList(generics.ListCreateAPIView):
    queryset = Siswa.objects.all()
    serializer_class = SiswaSerializer


class SiswaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Siswa.objects.all()
    serializer_class = SiswaSerializer
#   permission_classes = (IsOwnerOrReadOnly,)


# Create your views here.
class GuruList(generics.ListCreateAPIView):
    queryset = Guru.objects.all()
    serializer_class = GuruSerializer


class GuruDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Guru.objects.all()
    serializer_class = GuruSerializer
#   permission_classes = (IsOwnerOrReadOnly,)


class UjianList(generics.ListCreateAPIView):
    serializer_class = UjianSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Ujian.objects.all()
        user = self.request.user
        if user.is_guru:
            return queryset.filter(pembuat__user=user)
        elif user.is_siswa:
            return queryset.filter(pembuat__kelas_ajar=user.siswa.kelas)
        else:
            return queryset

class UjianPertanyaanList(generics.ListCreateAPIView):
    serializer_class = PertanyaanUrlSerializer

    def get_queryset(self):
        queryset = Pertanyaan.objects.all()
        pk = self.kwargs['pk']
        return queryset.filter(ujian__id_ujian=pk)
#   permission_classes = (IsOwnerOrReadOnly,)


class PertanyaanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pertanyaan.objects.all()
    serializer_class = PertanyaanSerializer

    def get_object(self):
        queryset = self.get_queryset()
        id_ujian = self.kwargs['pk']
        id_pertanyaan = self.kwargs['idp']
        print(id_pertanyaan)
        return get_object_or_404(queryset, id=id_pertanyaan, ujian__id_ujian=id_ujian)
