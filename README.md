hack13
======

To get the local database running you need to have pip installed
Next navigate to tm/travelmap
Now execute:

sudo pip install -r dependencies.pip
sudo pip install django-categories
python manage.py syncdb
python manage.py migrate
python manage.py populate

To start the server execute:
python manage.py runserver
