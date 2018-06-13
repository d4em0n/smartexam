import os
import sys

import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "reactdjango.settings")
django.setup()


def menu():
    print("[1] User")
    print("[2] Pelajaran")
    print("[3] Jurusan")
    print("[4] Kelas")
    print("[5] Siswa")
    print("[6] Guru")
    return


def menu2():
    print("[1] Tambah")
    print("[2] Tampil")


def get_int(cap="> "):
    return int(input(cap))


def notimp():
    print("Not implemented")


def daftar_user():
    users = User.objects.all()
    for i, user in enumerate(users):
        status = None
        if user.is_guru:
            status = "Guru"
        elif user.is_siswa:
            status = "Siswa"
        print("{0}. {1} ({2})".format(i+1, user.username, status))
    return users


def daftar_guru():
    data = User.objects.filter(is_guru=True)
    for i, d in enumerate(data):
        print("{0}. {1} ({2})".format(i+1, d.username, d.guru.mengajar))
    return data


def daftar_siswa():
    data = User.objects.filter(is_siswa=True)
    for i, d in enumerate(data):
        print("{0}. {1} ({2})".format(i+1, d.username, d.siswa.kelas))
    return data


def daftar_pelajaran():
    data = Pelajaran.objects.all()
    for i, d in enumerate(data):
        print("{0}. {1}".format(i+1, d.nama))
    return data


def daftar_jurusan():
    data = Jurusan.objects.all()
    for i, d in enumerate(data):
        print("{0}. {1}".format(i+1, d.nama))
    return data


def daftar_kelas():
    data = Kelas.objects.all()
    for i, d in enumerate(data):
        print("{0}. {1} ({2})".format(i+1, d.nama, d.jurusan.nama))
    return data


def user():
    username = input("Nama: ")
    password = input("Password: ")
    user = User.objects.create_user(username, password=password)
    daftar_user()
    return user


def tambah_jurusan():
    print("Tambah jurusan")
    nama = input("Nama: ")
    jurusan = Jurusan(nama=nama, deskripsi=nama)
    jurusan.save()
    daftar_jurusan()
    return jurusan


def tambah_guru():
    list_user = daftar_user()
    c = get_int("Pilih user> ")
    user = list_user[c-1]
    list_pel = daftar_pelajaran()
    c = get_int("Pilih user> ")
    pel = list_pel[c-1]
    user.is_guru = True
    user.save()
    guru = Guru(user=user, mengajar=pel)
    guru.save()
    daftar_guru()
    return guru


def tambah_siswa():
    list_user = daftar_user()
    c = get_int("Pilih user> ")
    user = list_user[c-1]
    list_kelas = daftar_kelas()
    c = get_int("Pilih kelas>")
    kelas = list_kelas[c-1]
    user.is_siswa = True
    user.save()
    siswa = Siswa(user=user, kelas=kelas)
    siswa.save()
    daftar_siswa()
    return siswa


def tambah_pelajaran():
    print("Tambah pelajaran")
    pel = input("Nama: ")
    pelajaran = Pelajaran(nama=pel)
    pelajaran.save()
    daftar_pelajaran()
    return pelajaran


def tambah_kelas():
    print("Tambah kelas")
    nama = input("Nama kelas: ")
    list_j = daftar_jurusan()
    c = get_int("Jurusan: ")
    jurusan = list_j[c-1]
    kelas = Kelas(nama=nama, deskripsi=nama, jurusan=jurusan)
    kelas.save()


switch = {
    1: {
        1: user,
        2: daftar_user,
    },
    2: {
        1: tambah_pelajaran,
        2: daftar_pelajaran,
    },
    3: {
        1: tambah_jurusan,
        2: daftar_jurusan,
    },
    4: {
        1: tambah_kelas,
        2: daftar_kelas,
    },
    5: {
        1: tambah_siswa,
        2: daftar_siswa,
    },
    6: {
        1: tambah_guru,
        2: daftar_guru
    }
}


def main():
    while True:
        menu()
        c = get_int()
        if c not in switch.keys():
            notimp()
            continue
        menu2()
        d = get_int()
        switch[c][d]()


if __name__ == '__main__':
    from sekolah.models import *
    main()
