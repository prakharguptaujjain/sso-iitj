import os
import sys
import django

# Set the Django project's base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Set up the Django environment
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sso_iitj.settings")
django.setup()

from user_profiles.models import StudentProfile

def search_username(token):
    try:
        profile = StudentProfile.objects.get(token=token)
        return profile.username
    except StudentProfile.DoesNotExist:
        return None

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python search.py <token>')
        sys.exit(1)
    
    token = sys.argv[1]
    username = search_username(token)
    if username:
        print(username)
    else:
        print("None")
