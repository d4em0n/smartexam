from .models import *
from rest_framework import serializers
from rest_framework.relations import HyperlinkedIdentityField
from rest_framework.reverse import reverse
from django.contrib.auth.validators import UnicodeUsernameValidator


class ParameterisedHyperlinkedIdentityField(HyperlinkedIdentityField):
    """
    Represents the instance, or a property on the instance, using hyperlinking.

    lookup_fields is a tuple of tuples of the form:
        ('model_field', 'url_parameter')
    """
    lookup_fields = (('pk', 'pk'),)

    def __init__(self, *args, **kwargs):
        self.lookup_fields = kwargs.pop('lookup_fields', self.lookup_fields)
        super(ParameterisedHyperlinkedIdentityField, self).__init__(*args, **kwargs)

    def get_url(self, obj, view_name, request, format):
        """
        Given an object, return the URL that hyperlinks to the object.

        May raise a `NoReverseMatch` if the `view_name` and `lookup_field`
        attributes are not configured to correctly match the URL conf.
        """
        kwargs = {}
        for model_field, url_param in self.lookup_fields:
            attr = obj
            for field in model_field.split('.'):
                attr = getattr(attr, field)
            kwargs[url_param] = attr

        return reverse(view_name, kwargs=kwargs, request=request, format=format)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': False
            },
            'username': {
                # nggak pake uniquevalidator supaya bisa diupdate
                'validators': [UnicodeUsernameValidator()]
            },
            'id': {
                'read_only': False,
                'required': False
            }
        }


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_guru', 'is_siswa')


class JurusanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jurusan
        fields = ('nama',)


class KelasSerializer(serializers.ModelSerializer):
    jurusan = JurusanSerializer(read_only=True)

    class Meta:
        model = Kelas
        fields = ('nama', 'jurusan')


class JawabanSerializer(serializers.ModelSerializer):

    class Meta:
        model = Jawaban
        fields = ('id', 'text')


class PertanyaanSerializer(serializers.ModelSerializer):
    #jawaban = JawabanSerializer(many=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        """ JawabanSerializer harus mendapatkan context """
        self.fields['jawaban'] = JawabanSerializer(many=True, context=self.context)

    class Meta:
        model = Pertanyaan
        fields = ('id', 'text', 'jawaban')

class PertanyaanUrlSerializer(serializers.ModelSerializer):
    url = ParameterisedHyperlinkedIdentityField(view_name="sekolah:ujian-soal", lookup_fields=(('ujian.id_ujian', 'pk'), ('id', 'idp')), read_only=True)
    class Meta:
        model = Pertanyaan
        fields = ('url',)

class UjianSerializer(serializers.ModelSerializer):
    pembuat = serializers.CharField(source='pembuat.user.username', required=False)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)
    pelajaran = serializers.CharField(source='pembuat.mengajar.nama', required=False)
    url = ParameterisedHyperlinkedIdentityField(view_name="sekolah:ujian-detail", lookup_fields=(('id_ujian', 'pk'),), read_only=True)

    class Meta:
        model = Ujian
        fields = ('id', 'created_at', 'deskripsi', 'pembuat', 'pelajaran', 'id_ujian', 'url')
        extra_kwargs = {
            'created_at': {
                'required': False
            },
            'pelajaran': {
                'read_only': True,
                'required': False
            }
        }

    def validate_pembuat(self, pembuat):
        if not is_username_exists(pembuat):
            raise serializers.ValidationError("Pembuat tidak ada")
        return pembuat


def cek_kelas(kelas):
    if not Kelas.objects.filter(nama=kelas).exists():
        raise serializers.ValidationError("Kelas tidak ada")
    return kelas


def is_username_exists(username):
    return User.objects.filter(username=username).exists()


def cek_username(username):
    if is_username_exists(username):
        raise serializers.ValidationError({'user': {"username": "Username sudah ada"}})
    return username


class SiswaSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    is_siswa = serializers.BooleanField(read_only=True, default=True)
    kelas = serializers.CharField(max_length=32,
                                  source="kelas.nama",
                                  validators=[cek_kelas])

    class Meta:
        model = Siswa
        fields = ('user', 'kelas', 'is_siswa')

    def validate(self, data):
        if not self.instance:
            return cek_username(data['user']['username'])
        return data

    def create(self, validated_data):
        data_user = validated_data.pop('user')
        username = data_user.pop('username')
        email = data_user.pop('email')
        password = data_user.pop('password', None)
        user, created = User.objects.get_or_create(username=username, email=email)
        if created and password:
            user.set_password(password)
            user.save()

        data_kelas = validated_data.pop('kelas')
        kelas = Kelas.objects.get(nama=data_kelas['nama'])

        siswa = Siswa(user=user, kelas=kelas)
        siswa.save()
        return siswa

    def update(self, instance, validated_data):
        data_user = validated_data.pop('user')
        username = data_user.pop('username')
        email = data_user.pop('email')
        password = data_user.pop('password', None)
        if password:
            instance.user.set_password(password)

        instance.user.email = email
        instance.user.username = username
        instance.user.save()

        data_kelas = validated_data.pop('kelas')
        kelas = Kelas.objects.get(nama=data_kelas['nama'])

        instance.kelas = kelas
        instance.save()
        return instance


def cek_mengajar(pelajaran):
    if not Pelajaran.objects.filter(nama=pelajaran).exists():
        raise serializers.ValidationError("Pelajaran tidak ada")
    return pelajaran

class GuruSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    is_guru = serializers.BooleanField(read_only=True, default=True)
    mengajar = serializers.CharField(max_length=32, source="mengajar.nama", validators=[cek_mengajar])

    class Meta:
        model = Siswa
        fields = ('user', 'mengajar', 'is_guru')

    def validate(self, data):
        if not self.instance:
            return cek_username(data['user']['username'])
        return data

    def create(self, validated_data):
        data_user = validated_data.pop('user')
        username = data_user.pop('username')
        email = data_user.pop('email')
        password = data_user.pop('password', None)
        user, created = User.objects.get_or_create(username=username, email=email)
        if created and password:
            user.set_password(password)
            user.save()

        data_mengajar = validated_data.pop('mengajar')
        mengajar = Pelajaran.objects.get(nama=data_mengajar['nama'])
        guru = Guru(user=user, mengajar=mengajar)
        guru.save()
        return guru

    def update(self, instance, validated_data):
        data_user = validated_data.pop('user')
        username = data_user.pop('username')
        email = data_user.pop('email')
        password = data_user.pop('password', None)
        if password:
            instance.user.set_password(password)

        instance.user.email = email
        instance.user.username = username
        instance.user.save()

        data_mengajar = validated_data.pop('mengajar')
        mengajar = Pelajaran.objects.get(nama=data_mengajar['nama'])

        instance.mengajar = mengajar
        instance.save()
        return instance
