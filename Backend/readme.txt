1)Install python and configure for Vscode(extension:python)
2)Create virtual environment:-
  python -m venv any_name_you_like
3)Activate virtual environment:-
  any_name_you_like\scripts\activate
3)While virtual environment is active, 
  pip install django djangorestframework Pillow
  Pillow is used for image processing
4)locate manage.py inside root inventory folder, then
  python manage.py makemigrations (enter)
  python manage.py migrate        (enter)
  pytohn manage.py runserver      (enter)
5)Now your server is up and running!!
