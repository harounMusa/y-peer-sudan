from datetime import date

from django.db import models


class NewsArticle(models.Model):
    CATEGORY_CHOICES = [
        ('announcement', 'Announcement'),
        ('training', 'Training'),
        ('partnership', 'Partnership'),
        ('impact', 'Impact'),
        ('event', 'Event'),
        ('media', 'Media'),
    ]

    title_en = models.CharField(max_length=200)
    title_ar = models.CharField(max_length=200)
    summary_en = models.TextField()
    summary_ar = models.TextField()
    body_en = models.TextField()
    body_ar = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='announcement')
    image = models.ImageField(upload_to='news/', blank=True, null=True)
    published_date = models.DateField(default=date.today)
    is_published = models.BooleanField(default=False)
    slug = models.SlugField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_date']

    def __str__(self):
        return self.title_en
