export const SIGNUP_URL = "/sign-up";
export const SIGNIN_URL = "/sign-in";
export const ADD_NEW_LISTING_URL = "/add-new-listing";
export const NOTFOUND_URL = "/random";

export const Email = {
    NoAt: "authtester.com",
    Registered: "yuliia.petriv@rubygarage.org",
    DeactivatedByAdmin: "yuliia.petriv+2@rubygarage.org",
    DeactivatedByUser: "yuliia.petriv+1@rubygarage.org",
    Long: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt@tester.com",
    New: "yuliia.petriv+10@rubygarage.org",
};

export const Password = {
    Moderate: "1Password",
    Strong: "1Password!",
    Short: "12345",
    Long: "qwertyuiopasdfghjklzxcvbnm1234567890qwertyuiopasdfghjklzxcvbnm1234567890q",
    Registered: "password",
    WithSpecialSymbols: "E$&@#*$Y*#732y#&*FWPEsaвыфвфывфыв",
    Invalid: "invalidpass",
};

export const FullName = {
    FirstName: "Jane",
    LastName: "Smith",
    WithSpaces: "   ",
};

export const Dates = {
    InvalidDate: "00000",
    Format: "DD/MM/YYYY",
};

export const PhoneNumber = {
    RegisteredInput: "212 380 2502",
    RegisteredOutput: "+1 212 380 2502",
    ValidUSInput: "212 355 8902",
    ValidUSResult: "+1 212 355 8902",
    ValidCAInput: "+15818888660",
    ValidCAResult: "+1 581 888 8660",
    InvalidInput: "000000000",
    InvalidResult: "+1 000000000",
};

export const PhoneCode = {
    Ukraine: "+380",
    NorthAmerica: "+1",
};

export const CountryCode = {
    Ukraine: "UA",
    NorthAmerica: "US",
};

export const CommonTexts = {
    SignIn: "Sign In",
    SignUp: "Sign Up",
    FirstNameLabel: "First Name",
    LastNameLabel: "Last Name",
    DateOfBirthLabel: "Date Of Birth",
    PhoneNumberLabel: "Phone Number",
    EmailLabel: "Email",
    PasswordLabel: "Password",
    BlankFieldError: "Can't be blank",
    InvalidEmailFormatError: "Email has a wrong format",
    AlreadyRegisteredEmailError:
        "This email is already used for another account",
    AlreadyRegisteredPhoneNumberError: "Phone number is already taken",
    ShortPasswordError: "Use a minimum password length of 6 or more characters",
    LongPasswordError: "Must be equal or less than 72 characters",
    LongEmailError: "Must be equal or less than 255 characters",
    PasswordHint:
        "Use a minimum password length of 6 or more characters, including capital letters and numbers",
    DateOfBirthHint:
        "To sign up, you need to be at least 18. Your date of birth won`t be shared with other people",
    NextButton: "Next",
    CloseButton: "Close",
};

export const SignupTexts = {
    MainHeader: "Sign up to getting started",
    HaveAnAccount: "Already have an account?",
    Agreements:
        " By signing up, I agree to Luxorts Terms of Service and Privacy Policy.",
    UnderageUserError: "You must be at least 18 years old to create an account",
};

export const SigninTexts = {
    MainHeader: "Welcome back!",
    SubHeader: "Enter your details to proceed further.",
    HaveAnAccount: "Don't have an account yet?",
    ForgotPassword: "Forgot password?",
    SignIn: "Sign In",
    InvalidCombinationError: "Invalid Email or Password",
    AccountIsBeingDeactivatedByAdminNotification:
        "Looks like you are trying to log in into an account which was previously deactivated by the administrator. Please, contact support for further details.",
    AccountIsBeingDeactivatedByUserNotification:
        "Looks like you are trying to log in into an account which was previously deactivated by you. You still can reactivate this account if you want it.",
};

export const ForgotPasswordTexts = {
    MainHeader: "Recover your password",
    NewPassword: "New password",
    ContinueWithANewPassword: "Continue with a new password",
    ResetPassLinkExpired:
        "Looks like this reset password link is expired or it was already used.",
    ResetSuccess: "A link to reset your password has been emailed to you.",
};

export const NotFoundTexts = {
    Message: "This page could not be found.",
};

export const AddNewListingTexts = {
    PropertyTypeStep: "Property type",
    PropertyTypeStepHeader: "What kind of place are you listing?",
    TypeOfPlaceSectionHeader: "Type of place guests will have",
    EntirePlace: "Entire place",
    PrivateRoom: "Private room",
    SharedRoom: "Shared room",
    BedType: "Double",
    BathType: "Bathtub",
    Country: "United States",
    State: "California",
    City: "Sacramento",
    Street: "1701 Burnett Way",
    ZipCode: "95818",
    BedroomAmenityGroup: "Bedroom & laundry",
    BathroomAmenityGroup: "Bathroom",
    KitchenAmenityGroup: "Kitchen & dining",
};
