from django.conf.urls import include, url
from django.contrib import admin
from django.utils.translation import ugettext_lazy

urlpatterns = [
    url(r'^$', include('core.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include('api.urls')),
]
