from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.decorators.cache import never_cache
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.permissions import AllowAny

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("user_module.urls")),
    path("", include("books.urls")),
    # never_cache keeps browsers/proxies from serving a stale schema after you
    # add or change an endpoint.
    path(
        "api/schema/",
        never_cache(
            SpectacularAPIView.as_view(
                permission_classes=[AllowAny],
                authentication_classes=[],
            )
        ),
        name="schema",
    ),
    path(
        "api/docs/",
        never_cache(
            SpectacularSwaggerView.as_view(
                url_name="schema",
                permission_classes=[AllowAny],
                authentication_classes=[],
            )
        ),
        name="swagger-ui",
    ),
]

# Serve uploaded media during local development (DEBUG only).
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
