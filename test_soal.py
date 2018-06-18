import os
import sys
import code

import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "reactdjango.settings")
django.setup()


def add_pertanyaan(ujian, text):
    return Pertanyaan.objects.get_or_create(text=text, ujian=ujian)[0]


def add_jawaban(pertanyaan, jawaban):
    return Jawaban.objects.get_or_create(pertanyaan=pertanyaan, text=jawaban)[0]


def add_tanya_jawab(ujian, tanya, jawab):
    p = add_pertanyaan(ujian, tanya)
    for j in jawab:
        add_jawaban(p, j)
    return p


def main():
    ujian = Ujian.objects.last()
    ser = UjianSerializer(ujian)
    data_json = str(JSONRenderer().render(ser.data), 'utf-8')
    print(data_json)


if __name__ == '__main__':
    from sekolah.models import *
    from sekolah.serializers import *
    from rest_framework.renderers import JSONRenderer
    #main()
    code.interact(local=globals())
