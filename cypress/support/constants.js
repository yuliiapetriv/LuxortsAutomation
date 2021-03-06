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
    BackButton: "Back",
    CloseButton: "Close",
    AddButton: "Add",
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
    SaveAndExitButton: "Save and exit",
    PropertyTypeStep: "Property type",
    AccommodationStep: "Accommodation",
    LocationStep: "Location",
    AmenitiesStep: "Amenities",
    CapabilitiesStep: "Capabilities",
    ServicesStep: "Services",
    PhotosStep: "Photos",
    DescriptionStep: "Description",
    PropertyTypeStepHeader: "What kind of place are you listing?",
    TypeOfPlaceSectionSubHeader: "Type of place guests will have",
    EntirePlace: "Entire place",
    PrivateRoom: "Private room",
    SharedRoom: "Shared room",
    AccommodationStepHeader: "How many guests can your place accommodate?",
    AccommodationDescription:
        "Check that you have enough beds to accommodate all your guests comfortably.",
    NumberOfGuests: "Number of guests you will accommodate?",
    NumberOfBedrooms: "How many bedrooms can your guests use?",
    NumberOfBeds: "How many beds can your guests use?",
    NumberOfBathrooms: "How many bathrooms can your guests use?",
    BedType: "Double",
    BathType: "Bathtub",
    CountryLabel: "Country",
    StreetLabel: "Street",
    ApartmentLabel: "Suite, Apartment Number (Optional)",
    CityLabel: "City",
    StateLabel: "State/Region",
    ZipCodeLabel: "Zip Code",
    Country: "United States",
    State: "California",
    City: "Sacramento",
    Street: "1701 Burnett Way",
    ZipCode: "95818",
    AmenitiesStepHeader: "What amenities do you offer for guests?",
    AdditionalAmenitiesTitle: "Additional amenities",
    AmenityTitlePlaceholder: "Enter amenity title",
    AmenityDescriptionPlaceholder: "Describe amenity",
    BedroomAmenityGroup: "Bedroom & laundry",
    BathroomAmenityGroup: "Bathroom",
    KitchenAmenityGroup: "Kitchen & dining",
    CapabilitiesStepHeader: "What capabilities do you offer for guests?",
    AdditionalCapabilitiesTitle: "Additional capabilities",
    CapabilityTitlePlaceholder: "Enter capability title",
    CapabilityDescriptionPlaceholder: "Describe capability",
    ServicesStepHeader: "What services do you offer for guests?",
    AdditionalServicesTitle: "Additional services",
    ServiceTitlePlaceholder: "Enter service title",
    ServiceDescriptionPlaceholder: "Describe service",
    PhotosStepHeader: "Upload listing photos",
    PhotosStepDescription:
        "Image format: JPG or PNG. Photo quality: Min. 1024 x 683, Max. 3840 x 2160.",
    DescriptionStepHeader: "Describe your place",
    DescriptionStepDescription:
        "Catch guests' attention with a listing title and description that highlights what makes your place special.",
    ListingTitleLabel: "Listing Title",
    ListingTitle: "Newly Remodeled Cottage in the Heart of Sacramento",
    ListingHiddenTitleLabel: "Hidden Title",
    ListingHiddenTitleALertMessage: "This title will be visible only to you",
    ListingHiddenTitle: "4101 Warren Ave",
    ListingDecriptionLabel: "Description",
    ListingDecription:
        "Kick back and relax in this calm, stylish newly remodeled cottage. With a perfect mix of vintage and modern amenities, this cottage is a unique space that has been thoughtfully curated and designed for guests.",
    PriorNotify: "Same day",
    BookInAdvance: "3 Months In Advance",
    BookingApprovalPolicy: "Instant Book",
    CancellationPolicy: "Moderate",
    PublishModalWindowTitle: "Congrats! Your listing is now being reviewed",
    PublishListingButton: "Publish listing",
    GoToListingsButton: "Go to Listings",
};
