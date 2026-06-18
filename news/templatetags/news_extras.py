from django import template

register = template.Library()

CATEGORY_AR = {
    'announcement': 'إعلان',
    'training': 'تدريب',
    'partnership': 'شراكة',
    'impact': 'تأثير',
    'event': 'فعالية',
    'media': 'إعلام',
}

@register.filter
def category_ar(value):
    return CATEGORY_AR.get(value, value)
