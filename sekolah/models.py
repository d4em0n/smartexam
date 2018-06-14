from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime, timedelta
import uuid

class User(AbstractUser):
    is_siswa = models.BooleanField(default=False)
    is_guru = models.BooleanField(default=False)


class Pelajaran(models.Model):
    nama = models.CharField(max_length=30)

    def __str__(self):
        return self.nama


class Guru(models.Model):
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                primary_key=True,
                                related_name="guru")
    mengajar = models.ForeignKey(Pelajaran,
                                 on_delete=models.SET_NULL,
                                 null=True,
                                 blank=True)
    kelas_ajar = models.ManyToManyField("Kelas", through='KelasAjar')

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        if self.user.is_guru is False or self.user.is_siswa:
            self.user.is_siswa = False
            self.user.is_guru = True
            self.user.save()
        super(Guru, self).save(*args, **kwargs)

class Jurusan(models.Model):
    nama = models.CharField(max_length=32, unique=True)

    def __str__(self):
        return self.nama


class Kelas(models.Model):
    nama = models.CharField(max_length=32, unique=True)
    jurusan = models.ForeignKey(Jurusan, on_delete=models.CASCADE)
    wali_kelas = models.OneToOneField(Guru,
                                      on_delete=models.SET_NULL,
                                      null=True)

    def __str__(self):
        return self.nama

class KelasAjar(models.Model):
    guru = models.ForeignKey(Guru, on_delete=models.CASCADE)
    kelas = models.ForeignKey(Kelas, on_delete=models.CASCADE)



class Siswa(models.Model):
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                primary_key=True,
                                related_name="siswa")
    kelas = models.ForeignKey(Kelas, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        if self.user.is_siswa is False or self.user.is_guru:
            self.user.is_siswa = True
            self.user.is_teacher = False
            self.user.save()
        super(Siswa, self).save(*args, **kwargs)


class Ujian(models.Model):
    deskripsi = models.CharField(max_length=128)
    id_ujian = models.UUIDField(default=uuid.uuid4, unique=True)
    pembuat = models.ForeignKey(Guru, on_delete=models.CASCADE)
    is_akitf = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.deskripsi


class Pertanyaan(models.Model):
    ujian = models.ForeignKey(Ujian,
                              on_delete=models.CASCADE,
                              related_name='pertanyaan')
    text = models.CharField('Pertanyaan', max_length=255)

    def __str__(self):
        return self.text


class Jawaban(models.Model):
    pertanyaan = models.ForeignKey(Pertanyaan,
                                   on_delete=models.CASCADE,
                                   related_name='jawaban')
    text = models.CharField('Jawaban', max_length=255)
    is_benar = models.BooleanField('Jawaban benar', default=False)

    def __str__(self):
        return self.text


def getNext2Hours():
    return datetime.now() + timedelta(hours=2)


class AmbilUjian(models.Model):
    siswa = models.ForeignKey(Siswa,
                              on_delete=models.CASCADE,
                              related_name='ujian_diambil')
    ujian = models.ForeignKey(Ujian,
                              on_delete=models.CASCADE,
                              related_name='ujian_diambil')
    nilai = models.FloatField()
    # default now
    created_at = models.DateTimeField(default=datetime.now)
    # default is next 2 hours
    finish_at = models.DateTimeField(default=getNext2Hours)


class JawabanSiswa(models.Model):
    siswa = models.ForeignKey(Siswa,
                              on_delete=models.CASCADE,
                              related_name='jawaban_ujian')
    jawaban = models.ForeignKey(Jawaban,
                                on_delete=models.CASCADE,
                                related_name='+')
