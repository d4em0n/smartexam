from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Pelajaran)
admin.site.register(Guru)
admin.site.register(Jurusan)
admin.site.register(Kelas)
admin.site.register(Siswa)
admin.site.register(Ujian)
admin.site.register(Pertanyaan)
admin.site.register(Jawaban)
admin.site.register(AmbilUjian)
admin.site.register(JawabanSiswa)
admin.site.register(KelasAjar)


# Register your models here.
