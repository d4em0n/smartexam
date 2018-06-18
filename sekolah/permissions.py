from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_staff

class IsPembuatUjianOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        pk = self.request.pk
        print(pk)
        if request.method in permissions.SAFE_METHOD:
            return True
        return request.user.is_guru and request.user.guru.ujian_set.filter(id_ujian=pk).exists()
