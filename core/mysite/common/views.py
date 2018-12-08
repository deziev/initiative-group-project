from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.http.response import Http404
from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.hashers import check_password


from common.models import User
from common.forms import UserForm, LoginForm, SignUpForm


def admin_required(function):

    def wrapper(request, *args, **kwargs):
        user = request.user
        if user.is_authenticated:
            if user.is_superuser:
                return function(request, *args, **kwargs)
            else:
                raise Http404
        else:
            return redirect("common:login")
    return wrapper


@login_required
def home(request):
    return render(request, 'index.html')



@login_required
def profile(request):
    profile = "active"
    user = request.user
    user_obj = User.objects.get(id=user.id)
    return render(request, "profile.html", {'user_obj': user_obj, 'profile' : profile})


def login_crm(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/')
    if request.method == 'POST':
        form = LoginForm(request.POST, request=request)
        if form.is_valid():
            user = authenticate(username=request.POST.get('email'), password=request.POST.get('password'))
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponseRedirect('/')
                else:
                    return render(request, "login.html", {"error": True, "message": "Your Account is InActive. Please Contact Administrator"})
            else:
                return render(request, "login.html", {"error": True, "message": "Your Account is not Found. Please Contact Administrator"})
        else:
            return render(request, "login.html", {"error": True, "message": "Your username and password didn't match. Please try again."})
    return render(request, 'login.html')


def forgot_password(request):
    return render(request, 'forgot_password.html')


def logout_crm(request):
    logout(request)
    request.session.flush()
    return redirect("common:login")


@admin_required
def users_list(request):
    users_nav = "active"
    users_list = User.objects.all()
    page = request.POST.get('per_page')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    username = request.POST.get('username')
    email = request.POST.get('email')
    active_users = User.objects.filter(is_active=True)
    inactive_users = User.objects.filter(is_active=False)
    if first_name:
        users_list = users_list.filter(first_name__icontains=first_name)
    if last_name:
        users_list = users_list.filter(last_name__icontains=last_name)
    if username:
        users_list = users_list.filter(username__icontains=username)
    if email:
        users_list = users_list.filter(email__icontains=email)
    return render(request, "list.html", {
        'users': users_list, 'active_users': active_users,
        'per_page': page, 'inactive_users': inactive_users,
        'users_nav' : users_nav,
    })


@admin_required
def create_user(request):
    user_form = UserForm()
    if request.method == 'POST':
        user_form = UserForm(request.POST)
        if user_form.is_valid():
            user = user_form.save(commit=False)
            if request.POST.get("password"):
                user.set_password(request.POST.get("password"))
            user.save()
            return redirect("common:users_list")
        else:
            return render(request, 'create.html', {'user_form': user_form, "errors": user_form.errors})
    else:
        return render(request, 'create.html', {'user_form': user_form})


@admin_required
def view_user(request, user_id):
    users_list = User.objects.all()
    user_obj = User.objects.filter(id=user_id)
    active_users = User.objects.filter(is_active=True)
    inactive_users = User.objects.filter(is_active=False)
    return render(request, "list.html", {
        'users': users_list, 'user_obj': user_obj,
        'active_users': active_users, 'inactive_users': inactive_users
    })


def edit_user(request, user_id):
    user_obj = get_object_or_404(User, id=user_id)
    user_form = UserForm(instance=user_obj)
    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=user_obj)
        if user_form.is_valid():
            user_form.save()
            return redirect("common:profile")
        else:
            return render(request, 'create.html', {'user_form': user_form, "errors": user_form.errors})
    else:
        return render(request, 'create.html', {'user_form': user_form, 'user_obj': user_obj})


@admin_required
def remove_user(request, user_id):
    user_obj = get_object_or_404(User, id=user_id)
    user_obj.delete()
    return redirect("common:users_list")


def sign_up(request):
    user_form = SignUpForm()
    if request.method == 'POST':
        user_form = SignUpForm(request.POST)
        print("try")
        if user_form.is_valid():
            print("YO")
            user = user_form.save(commit=False)
            if request.POST.get("password"):
                user.set_password(request.POST.get("password"))
            user.save()
            return redirect("common:home")
        else:
            return render(request, 'signup.html', {'user_form': user_form, "errors": user_form.errors})
    else:
        return render(request, 'signup.html', {'user_form': user_form})

# from django.shortcuts import render
# from django.http import HttpResponse
# import pyrebase
# from django.contrib import auth
# import time

# config = {
#   "apiKey": "AIzaSyBQ8MJ9C3QZlBMqQJkjyd6-JFbY4j0ldpw",
#   "authDomain": "dasein-e0028.firebaseapp.com",
#   "databaseURL": "https://dasein-e0028.firebaseio.com",
#   "storageBucket": "dasein-e0028.appspot.com",
#   "messagingSenderId": "835924764891",
# }

# firebase = pyrebase.initialize_app(config)
# database=firebase.database()
# storage=firebase.storage()
# authen = firebase.auth()

# def index(request):
# 	return render(request,'adx/index.html')

# def about(request):
# 	return render(request,'adx/about.html')

# def signIn(request):
# 	return render(request, "adx/signIn.html")

# def post_signin(request):
# 	email=request.POST.get('email')
# 	passw = request.POST.get("pass")
# 	try:
# 		user = auth.refresh(user['refreshToken'])
# 	except:
# 		try:
# 			user = authen.sign_in_with_email_and_password(email,passw)
# 			session_id=user['idToken']
# 			request.session['uid']=str(session_id)
# 		except:
# 			message="invalid credentials"
# 			return render(request,"adx/signIn.html",{"messg":message})
# 	ad_list = []
# 	companyID = email
# 	companyID = companyID.replace('@', '')
# 	companyID = companyID.replace('.', '')
# 	user_zones_keys = database.child("users").child(companyID).child("zones").get()
# 	try:
# 		for ad in user_zones_keys.each():
# 			ad_list.append(database.child('zones').child(ad.val()).get().val())
# 	except:
# 		ad_list = []
# 	name = database.child("users").child(companyID).child('details').child('name').get().val()
# 	status = database.child("users").child(companyID).child('details').child('status').get().val()
# 	return render(request,'adx/index.html', {'context': ad_list, 'name': name, 'status': status})

# def signup(request):
# 	return render(request, "adx/signup.html")

# def postsignup(request):
# 	name=request.POST.get('name')
# 	email=request.POST.get('email')
# 	passw=request.POST.get('pass')
# 	vendor=request.POST.get('vendor')
# 	ID = email.replace('@', '')
# 	ID = ID.replace('.', '')
# 	try:
# 		user=authen.create_user_with_email_and_password(email,passw)
# 	except:
# 		message="Unable to create account try again"
# 		return render(request,"adx/signup.html",{"messg":message})
# 	data={"name":name,"status":vendor}
# 	database.child("users").child(ID).child("details").set(data)
# 	return render(request,"adx/signIn.html")

# def create(request):
# 	return render(request,'adx/create.html')

# from werkzeug.utils import secure_filename

# def post_create(request):
# 	title = request.POST.get('title')
# 	coordinatearea = request.POST.get('coordinate-area')
# 	#enddate = request.POST.get('enddate')
# 	created_on = time.time()
# 	idtoken = request.session['uid']
# 	a = authen.get_account_info(idtoken)
# 	a = a['users']
# 	a = a[0]
# 	companyID = a['email']
# 	companyID = companyID.replace('@', '')
# 	companyID = companyID.replace('.', '')
# 	zoneID = str(companyID) + str(coordinatearea) + str(created_on)
# 	zoneID = zoneID.replace('/', '')
# 	zoneID = zoneID.replace('.', '')
# 	data = {
# 	"title":title,
# 	'coordinatearea':coordinatearea,
# 	'companyID' : companyID,
# 	'zoneID': zoneID,
# 	'created_on' : created_on,
# 	}
# 	ad_list = []
# 	if(coordinatearea==None):
# 		print('no long')
# 	else:
# 		database.child('zones').child(zoneID).set(data)
# 		database.child('users').child(companyID).child('zones').child(zoneID).set(zoneID)
# 	user_zones_keys = database.child("users").child(companyID).child("zones").get()
# 	for ad in user_zones_keys.each():
# 		ad_list.append(database.child('zones').child(ad.val()).get().val())
# 	name = database.child("users").child(companyID).child('details').child('name').get().val()
# 	status = database.child("users").child(companyID).child('details').child('status').get().val()
# 	return render(request,'adx/index.html', {'context': ad_list, 'name': name, 'status': status})

# def log_out(request):
# 	auth.logout(request)
# 	return render(request,'adx/signIn.html')