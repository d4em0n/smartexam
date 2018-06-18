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
    permission_classes = (permissions.IsAuthenticated, IsGuruOrReadOnly)

    def get_queryset(self):
        queryset = Ujian.objects.all()
        user = self.request.user
        if user.is_guru:
            return queryset.filter(pembuat__user=user)
        elif user.is_siswa:
            return queryset.filter(pembuat__kelas_ajar=user.siswa.kelas)
        else:
            return queryset

    def perform_create(self, serializer):
        serializer.save(pembuat=self.request.user.guru)


class UjianDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UjianSerializer
    permissions_classes = (permissions.IsAuthenticated, IsGuruOrReadOnly)
    lookup_field = 'id_ujian'

    def get_queryset(self):
        queryset = Ujian.objects.all()
        user = self.request.user
        if user.is_guru:
            return queryset.filter(pembuat__user=user)
        elif user.is_siswa:
            return queryset.filter(pembuat__kelas_ajar=user.siswa.kelas)
        else:
            return queryset


class PertanyaanList(generics.ListCreateAPIView):
    permissions_classes = (permissions.IsAuthenticated, IsGuruOrReadOnly)

    def get_queryset(self):
        queryset = Pertanyaan.objects.all()
        user = self.request.user
        id_ujian = self.kwargs['id_ujian']
        if user.is_guru:
            return queryset.filter(ujian__pembuat__user=user, ujian__id_ujian=id_ujian)
        elif user.is_siswa:
            return queryset.filter(ujian__pembuat__kelas_ajar=user.siswa.kelas, ujian__id_ujian=id_ujian)
        else:
            return queryset

    def get_serializer_context(self):
        return {'request': self.request}

    def get_serializer_class(self):
        try:
            _ = self.request.query_params['full']
            return FullPertanyaanSerializer
        except KeyError:
            pass
        return PertanyaanSerializer

    def perform_create(self, serializer):
        id_ujian = self.kwargs['id_ujian']
        print(id_ujian)
        ujian = Ujian.objects.get(id_ujian=id_ujian)
        serializer.save(ujian=ujian)
#   permission_classes = (IsOwnerOrReadOnly,)


class PertanyaanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pertanyaan.objects.all()
    serializer_class = PertanyaanSerializer
    permissions_classes = (permissions.IsAuthenticated, IsGuruOrReadOnly)

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        queryset = Pertanyaan.objects.all()
        user = self.request.user
        id_ujian = self.kwargs['id_ujian']
        if user.is_guru:
            return queryset.filter(ujian__pembuat__user=user, ujian__id_ujian=id_ujian)
        elif user.is_siswa:
            return queryset.filter(ujian__pembuat__kelas_ajar=user.siswa.kelas, ujian__id_ujian=id_ujian)
        else:
            return queryset


class JawabanList(generics.ListCreateAPIView):
    serializer_class = JawabanSerializer
    permissions_classes = (permissions.IsAuthenticated, IsGuruOrReadOnly)

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        queryset = Jawaban.objects.all()
        id_ujian = self.kwargs['id_ujian']
        id_pertanyaan = self.kwargs['id_pertanyaan']
        user = self.request.user
        if user.is_guru:
            return queryset.filter(pertanyaan_id=id_pertanyaan, pertanyaan__ujian__pembuat__user=user, pertanyaan__ujian__id_ujian=id_ujian)
        elif user.is_siswa:
            return queryset.filter(pertanyaan_id=id_pertanyaan, pertanyaan__ujian__pembuat__kelas_ajar=user.siswa.kelas, pertanyaan__ujian__id_ujian=id_ujian)
        else:
            return queryset

    def perform_create(self, serializer):
        id_pertanyaan = self.kwargs['id_pertanyaan']
        pertanyaan = Pertanyaan.objects.get(id=id_pertanyaan)
        serializer.save(pertanyaan=pertanyaan)


class JawabanDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JawabanSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        queryset = Jawaban.objects.all()
        id_ujian = self.kwargs['id_ujian']
        id_pertanyaan = self.kwargs['id_pertanyaan']
        return queryset.filter(pertanyaan__id=id_pertanyaan, pertanyaan__ujian__id_ujian=id_ujian)
