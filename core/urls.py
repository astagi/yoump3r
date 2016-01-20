from django.conf.urls import url

from .views import PlaylistCreateView

urlpatterns = [
    url(r'^$', PlaylistCreateView.as_view()),
]