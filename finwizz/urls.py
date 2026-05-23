from django.urls import path
from . import views

urlpatterns = [
    # Main Pages
    path('', views.home, name='home'),
    path('index.html', views.home, name='home_html'),
    path('about-us/', views.about_us, name='about_us'),
    
    # Services - Loans
    path('services/personal-loan/', views.personal_loan, name='personal_loan'),
    path('services/business-loan/', views.business_loan, name='business_loan'),
    path('services/home-loan/', views.home_loan, name='home_loan'),
    
    path('services/commercial-property-loan/', views.commercial_loan, name='commercial_loan'),
    path('services/loan-agnist-property-lap/', views.lap_loan, name='lap_loan'),
    path('services/loan-for-doctors/', views.doctors_loan, name='doctors_loan'),
    path('services/used-car-loan/', views.used_car_loan, name='used_car_loan'),
    path('services/credit-card/', views.credit_card, name='credit_card'),
    

    # Tools & Resources
    path('emi-calculator/', views.emi_calculator, name='emi_calculator'),
    path('branch-locator/', views.branch_locator, name='branch_locator'),
    path('blogs/', views.blogs, name='blogs'),
    path('careers/', views.careers, name='careers'),

    # Contact & Application
    path('contact-us/', views.contact_us, name='contact_us'),
    path('apply-for-loans/', views.apply_loans, name='apply_loans'),
]