from django.shortcuts import get_object_or_404, render

from .models import NewsArticle


def list(request):
    articles = NewsArticle.objects.filter(is_published=True)
    return render(request, 'news/list.html', {'articles': articles})


def detail(request, slug):
    article = get_object_or_404(NewsArticle, slug=slug, is_published=True)
    return render(request, 'news/detail.html', {'article': article})
