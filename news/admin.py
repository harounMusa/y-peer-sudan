from django.contrib import admin

from .models import NewsArticle


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'category', 'published_date', 'is_published')
    list_filter = ('category', 'is_published', 'published_date')
    search_fields = ('title_en', 'title_ar', 'summary_en', 'summary_ar')
    prepopulated_fields = {'slug': ('title_en',)}
    fieldsets = (
        ('English', {
            'fields': ('title_en', 'summary_en', 'body_en')
        }),
        ('Arabic / العربية', {
            'fields': ('title_ar', 'summary_ar', 'body_ar')
        }),
        ('Meta', {
            'fields': ('category', 'image', 'published_date', 'is_published', 'slug')
        }),
    )
