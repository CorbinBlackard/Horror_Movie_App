from django.db import models
import re

class AccountManager(models.Manager):
    def basic_validator(self, requestPOST):
        errors = {}
        if len(requestPOST['user_name']) < 3:
            errors['user_name'] = "Name is too short"
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        if not EMAIL_REGEX.match(requestPOST['email']):
            errors['email'] = "Invalid email address"
        if len(requestPOST['password']) < 8:
            errors['password'] = "Password is too short"
        if requestPOST['password'] != requestPOST['password_conf']:
            errors['no_match'] = "Password and Password Confirmation must match"
        return errors

class Account(models.Model):
    user_name = models.TextField()
    email = models.TextField()
    password = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    objects = AccountManager()

class Movie(models.Model):
    title = models.TextField()
    poster = models.TextField()
    overview = models.TextField()
    release_date = models.TextField()
    account_watched = models.ForeignKey(Account, related_name="movies_watched", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

class User(models.Model):
    name = models.TextField()
    profile_pic = models.TextField()
    account_that_owns = models.ForeignKey(Account, related_name="users", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

