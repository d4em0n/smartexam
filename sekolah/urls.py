from django.urls import path, include
from django.conf.urls import url
from . import views

app_name = "sekolah"

urlpatterns = [
    url(r'^profile/?$', views.ProfileDetail.as_view(), name='profile'),
    url(r'^siswa/?$', views.SiswaList.as_view(), name='siswa'),
    url(r'^siswa/(?P<pk>[0-9]+)/?$', views.SiswaDetail.as_view()),
    url(r'^guru/?$', views.GuruList.as_view()),
    url(r'^guru/(?P<pk>[0-9]+)/?$', views.GuruDetail.as_view()),
    url(r'^ujian/?$', views.UjianList.as_view()),
    url(r'^ujian/(?P<id_ujian>[0-9a-f-]+)/?$', views.UjianDetail.as_view(), name='ujian-detail'),
    url(r'^ujian/(?P<id_ujian>[0-9a-f-]+)/pertanyaan/?$', views.PertanyaanList.as_view(), name='ujian-detail'),
    url(r'^ujian/(?P<id_ujian>[0-9a-f-]+)/pertanyaan/(?P<pk>[0-9]+)/?$', views.PertanyaanDetail.as_view(), name='ujian-soal'),
    url(r'^ujian/(?P<id_ujian>[0-9a-f-]+)/pertanyaan/(?P<id_pertanyaan>[0-9]+)/jawaban/?$', views.JawabanList.as_view(), name='ujian-soal'),
    url(r'^ujian/(?P<id_ujian>[0-9a-f-]+)/pertanyaan/(?P<id_pertanyaan>[0-9]+)/jawaban/(?P<pk>[0-9]+)/?$', views.JawabanDetail.as_view(), name='ujian-soal'),
    url(r'^ujian/(?P<id_ujian>[0-9a-f-]+)/pertanyaan/(?P<pk>[0-9]+)/jawaban/(?P<id_jawaban>[0-9]+)/set_true?$', views.SetJawabanBenar.as_view()),
    #url(r'^ujian/(?P<pk>[0-9]+)/?$', views.UjianDetail.as_view()),
]
