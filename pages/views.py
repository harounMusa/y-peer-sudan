from django.shortcuts import render


def index(request):
    return render(request, 'pages/index.html')


def who_we_are(request):
    return render(request, 'pages/who-we-are.html')


def what_we_do(request):
    return render(request, 'pages/what-we-do.html')


def impact(request):
    return render(request, 'pages/impact.html')


def contact(request):
    return render(request, 'pages/contact.html')


def page_not_found(request, exception):
    return render(request, '404.html', status=404)


def server_error(request):
    return render(request, '500.html', status=500)
