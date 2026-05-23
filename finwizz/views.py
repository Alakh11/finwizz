from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def about_us(request):
    return render(request, 'about-us.html') 

# Services
def personal_loan(request):
    return render(request, 'services/personal-loan.html')

def business_loan(request):
    return render(request, 'services/business-loan.html')
def home_loan(request):
    return render(request, 'services/home-loan.html')


def commercial_loan(request):
    return render(request, 'services/commercial-property-loan.html')

def lap_loan(request):
    return render(request, 'services/loan-agnist-property.html')

def doctors_loan(request):
    return render(request, 'services/loan-for-doctors.html')

def used_car_loan(request):
    return render(request, 'services/used-car-loan.html')

def credit_card(request):
    return render(request, 'services/credit-card.html')

# Tools & Resources
def emi_calculator(request):
    return render(request, 'emi-calculator.html')

def branch_locator(request):
    return render(request, 'branch-locator.html')

def blogs(request):
    return render(request, 'blogs.html')

def careers(request):
    return render(request, 'careers.html')

# Contact
def contact_us(request):
    return render(request, 'contact-us.html')

def apply_loans(request):
    return render(request, 'apply-for-loans.html')

