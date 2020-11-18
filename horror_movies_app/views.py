from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
import bcrypt
from django.views.decorators.csrf import csrf_exempt

from .models import *

def index(request):
    #* needs CSS work (register page)
    return render(request, 'horror_movies_app/index.html')

def login_page(request):
    #* needs a little more CSS work (login page)
    return render(request, 'horror_movies_app/login_page.html')

def register(request):
    if request.method == "POST":
        errors = Account.objects.basic_validator(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('/')
        else:
            print("User's password entered was " + request.POST['password'])
            hashed_pw = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt()).decode()
            account = Account.objects.create(user_name=request.POST['user_name'], email=request.POST['email'], password=hashed_pw)
            print("User's password has been changed to " + account.password)
    return redirect('/login_page')

def login(request):
    if request.method == "POST":
        accounts_with_email = Account.objects.filter(email=request.POST['email'])
        if accounts_with_email:
            account = accounts_with_email[0]
            if bcrypt.checkpw(request.POST['password'].encode(), account.password.encode()):
                request.session['account_id'] = account.id #IMPORTANT!!!
                return redirect('/homepage')
            else:
                print("Password didn't match")
                messages.error(request, "Incorrect name or password")
        else:
            print("Name not found")
            messages.error(request, "Incorrect name or password")
    return redirect('/login_page')

def homepage(request):
    if "account_id" in request.session:
        return render(request, 'horror_movies_app/homepage.html')

def logout(request):
    if request.session['account_id']:
        request.session.clear()
    return redirect('/login_page')

def user_profile(request, id):
    if 'account_id' in request.session:
        context = {
            'account_to_display': Account.objects.get(id=id)
        }
        return render(request, 'horror_movies_app/user_profile_page.html', context)

@csrf_exempt #! haven't currently figigured how to pass the token from JS file to HTML file
def already_seen(request):
    if 'account_id' in request.session:
        account_to_add = Account.objects.get(id=request.session['account_id'])
        #* adding movie to database first
        movie_to_add = Movie.objects.create(title=request.POST['title'], poster=request.POST['poster'], overview=request.POST['overview'], release_date=request.POST['release_date'], account_watched=account_to_add)
    return redirect(f'/user_profile/{account_to_add.id}')

def destroy(request, id):
    accounts_movie_to_delete = Account.objects.get(id=request.session['account_id'])
    movie_to_delete = Movie.objects.get(id=id)
    movie_to_delete.delete()
    return redirect(f'/user_profile/{accounts_movie_to_delete.id}')