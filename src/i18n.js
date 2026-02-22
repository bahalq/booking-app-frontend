// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// src/i18n.js
const resources = {
  en: {
    translation: {
      p1: "Play your game on top-notch turfs, hassle-free booking, and ultimate sports experiences await!",
      p2: "Book, Play, Win - Turf Life!",

      login: "Log in",
      logout: "Log out",
      email: "Email",
      password: "Password",
      emailRequired: "Email is required",
      passwordRequired: "Password is required",
      invalidLogin: "Email or password is incorrect",
      home: "Home",

      Mon: "Mon",
      Tue: "Tue",
      Wed: "Wed",
      Thu: "Thu",
      Fri: "Fri",
      Sat: "Sat",
      Sun: "Sun",

      from: "From",
      to: "To",

      locationPicker: "Pick Ground Location on Map",

      imageUpload: "Upload Images",

      groundName: "Ground Name",
      groundWidth: "Width (m)",
      groundHeight: "Height (m)",
      groundLength: "Length (m)",
      groundDescription: "Ground Description",
      pricePerHour: "Price per hour (dirham)",
      selected: "Selected",
      saveGround: "Save Ground",

      addGround: "Add Ground",
      viewAllGrounds: "View All Grounds",
      viewAllClients: "View All Clients",
      viewAllBookings: "View All Bookings",
      dashboard: "Dashboard",

      signup: "Sign up",
      chooseRole: "Choose your role",
      admin: "Admin",
      client: "Client",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone number",
      email: "Email",
      password: "Password",

      roleRequired: "Role is required",
      roleRule: "Please choose a role (Admin or Client)",

      firstNameInvalid: "First name not valid",
      firstNameRule:
        "First name must contain only letters and be between 2 and 20 characters",

      lastNameInvalid: "Last name not valid",
      lastNameRule:
        "Last name must contain only letters and be between 2 and 20 characters",

      phoneInvalid: "Phone number not valid",
      phoneRule:
        "Phone number must start with 06, 07, or +212 and contain 10 digits",

      emailInvalid: "Email not valid",
      emailRule: "Please enter a valid email address",

      passwordInvalid: "Password is not valid",
      passwordRule:
        "Password must contain at least 1 uppercase letter and 1 number",

      emailExists: "Email already exists",
      genericError: "Something went wrong. Please try again later.",

      errors: {
        unauthorized: "You are not authorized to perform this action",
        field_required: "{{field}} is required",
        invalid_data: "Invalid data sent",
        server_error: "Server error, please try again later",
      },

      viewGrounds: "My Grounds",
      noGrounds: "No grounds added yet",
      loading: "Loading...",
      delete: "Delete",
      viewOnMap: "View on Google Maps",

      fields: {
        name: "Ground name",
        width: "Width",
        size: "Dimensions",
        height: "Height",
        length: "Length",
        description: "Description",
        price: "Price",
        location: "Location",
        schedule: "Schedule",
        days: "Availability days",
      },

      confirm: {
        deleteGround: "Are you sure you want to delete this ground?",
      },

      edit: "Edit",
      images: "Images",
      next: "Next",
      previous: "Previous",
      editGround: "Edit Ground",
      update: "Update",
      cancel: "Cancel",
      
      messages: {
        ground_added: "Ground added successfully",
      },
    },
  },

  ar: {
    translation: {
      p1: "استمتع بلعبتك على ملاعب عشبية من الدرجة الأولى، وحجز خالٍ من المتاعب، وتجارب رياضية لا مثيل لها في انتظارك!",
      p2: "احجز، العب، اربح - حياة الملاعب!",

      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      emailRequired: "البريد الإلكتروني مطلوب",
      passwordRequired: "كلمة المرور مطلوبة",
      invalidLogin: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      home: "الرئيسية",

      Mon: "الاثنين",
      Tue: "الثلاثاء",
      Wed: "الأربعاء",
      Thu: "الخميس",
      Fri: "الجمعة",
      Sat: "السبت",
      Sun: "الأحد",

      from: "من",
      to: "إلى",

      imageUpload: "رفع الصور",
      locationPicker: "اختر موقع الملعب على الخريطة",

      groundName: "اسم الملعب",
      groundWidth: "العرض (متر)",
      groundHeight: "الارتفاع (متر)",
      groundLength: "الطول (متر)",
      groundDescription: "وصف الملعب",
      pricePerHour: "السعر لكل ساعة (درهم)",
      selected: "الموقع المختار",
      saveGround: "حفظ الملعب",

      addGround: "إضافة ملعب",
      viewAllGrounds: "عرض جميع الملاعب",
      viewAllClients: "عرض جميع الزبائن",
      viewAllBookings: "عرض جميع الحجوزات",
      dashboard: "لوحة التحكم",

      signup: "إنشاء حساب",
      chooseRole: "اختر الدور",
      admin: "مشرف",
      client: "زبون",
      firstName: "الاسم",
      lastName: "النسب",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",

      roleRequired: "الدور مطلوب",
      roleRule: "يرجى اختيار الدور (مشرف أو زبون)",

      firstNameInvalid: "الاسم غير صالح",
      firstNameRule: "يجب أن يحتوي الاسم على حروف فقط ومن 2 إلى 20 حرفاً",

      lastNameInvalid: "النسب غير صالح",
      lastNameRule: "يجب أن يحتوي النسب على حروف فقط ومن 2 إلى 20 حرفاً",

      phoneInvalid: "رقم الهاتف غير صالح",
      phoneRule: "يجب أن يبدأ بـ 06 أو 07 أو +212 ويتكون من 10 أرقام",

      emailInvalid: "البريد الإلكتروني غير صالح",
      emailRule: "يرجى إدخال بريد إلكتروني صحيح",

      passwordInvalid: "كلمة المرور غير صالحة",
      passwordRule: "يجب أن تحتوي كلمة المرور على حرف كبير ورقم واحد على الأقل",

      emailExists: "البريد الإلكتروني موجود مسبقاً",
      genericError: "حدث خطأ ما. المرجو المحاولة مرة أخرى.",

      viewGrounds: "ملاعبـي",
      noGrounds: "لم يتم إضافة أي ملعب بعد",
      loading: "جارٍ التحميل...",
      delete: "حذف",
      viewOnMap: "عرض الموقع على Google Maps",

      errors: {
        unauthorized: "غير مصرح لك بتنفيذ هذه العملية",
        field_required: "{{field}} مطلوب",
        invalid_data: "البيانات المرسلة غير صحيحة",
        server_error: "خطأ في الخادم، المرجو المحاولة لاحقاً",
      },

      fields: {
        name: "اسم الملعب",
        width: "العرض",
        size: "الأبعاد",
        height: "الارتفاع",
        length: "الطول",
        description: "الوصف",
        price: "السعر",
        location: "الموقع",
        schedule: "التوقيت",
        days: "أيام التوفر",
      },

      confirm: {
        deleteGround: "هل أنت متأكد أنك تريد حذف هذا الملعب؟",
      },

      messages: {
        ground_added: "تمت إضافة الملعب بنجاح",
      },
    },
  },
  fr: {
    translation: {
      p1: "Jouez sur des terrains de première qualité, réservez sans tracas et vivez des expériences sportives ultimes !",
      p2: "Réservez, jouez, gagnez - Turf Life !",

      login: "Se connecter",
      logout: "déconnexion",
      email: "Adresse e-mail",
      password: "Mot de passe",
      emailRequired: "L’adresse e-mail est obligatoire",
      passwordRequired: "Le mot de passe est obligatoire",
      invalidLogin: "E-mail ou mot de passe incorrect",
      home: "Accueil",

      Mon: "Lun",
      Tue: "Mar",
      Wed: "Mer",
      Thu: "Jeu",
      Fri: "Ven",
      Sat: "Sam",
      Sun: "Dim",

      from: "De",
      to: "À",

      imageUpload: "Télécharger les images",
      locationPicker: "Choisir l'emplacement du terrain sur la carte",

      groundName: "Nom du terrain",
      groundWidth: "Largeur (m)",
      groundHeight: "Hauteur (m)",
      groundLength: "Longueur (m)",
      groundDescription: "Description du terrain",
      pricePerHour: "Prix par heure (dirham)",
      selected: "Sélectionné",
      saveGround: "Enregistrer le terrain",

      addGround: "Ajouter un terrain",
      viewAllGrounds: "Voir tous les terrains",
      viewAllClients: "Voir tous les clients",
      viewAllBookings: "Voir toutes les réservations",
      dashboard: "Tableau de bord",

      signup: "Créer un compte",
      chooseRole: "Choisissez votre rôle",
      admin: "Administrateur",
      client: "Client",
      firstName: "Prénom",
      lastName: "Nom",
      phone: "Numéro de téléphone",

      roleRequired: "Le rôle est obligatoire",
      roleRule: "Veuillez choisir un rôle (Administrateur ou Client)",

      firstNameInvalid: "Prénom non valide",
      firstNameRule:
        "Le prénom doit contenir uniquement des lettres et entre 2 et 20 caractères",

      lastNameInvalid: "Nom non valide",
      lastNameRule:
        "Le nom doit contenir uniquement des lettres et entre 2 et 20 caractères",

      phoneInvalid: "Numéro de téléphone non valide",
      phoneRule:
        "Le numéro doit commencer par 06, 07 ou +212 et contenir 10 chiffres",

      emailInvalid: "Adresse e-mail non valide",
      emailRule: "Veuillez entrer une adresse e-mail valide",

      passwordInvalid: "Mot de passe non valide",
      passwordRule:
        "Le mot de passe doit contenir au moins une lettre majuscule et un chiffre",

      emailExists: "Cette adresse e-mail existe déjà",
      genericError: "Une erreur est survenue. Veuillez réessayer plus tard.",

      viewGrounds: "Mes terrains",
      noGrounds: "Aucun terrain ajouté pour le moment",
      loading: "Chargement...",
      delete: "Supprimer",
      viewOnMap: "Voir sur Google Maps",

      errors: {
        unauthorized: "Vous n’êtes pas autorisé à effectuer cette action",
        field_required: "{{field}} est obligatoire",
        invalid_data: "Données envoyées non valides",
        server_error: "Erreur du serveur, veuillez réessayer plus tard",
      },

      fields: {
        name: "Nom du terrain",
        size: "Dimensions",
        width: "Largeur",
        height: "Hauteur",
        length: "Longueur",
        description: "Description",
        price: "Prix",
        location: "Localisation",
        schedule: "Horaire",
        days: "Jours de disponibilité",
      },

      confirm: {
        deleteGround: "Voulez-vous vraiment supprimer ce terrain ?",
      },
      messages: {
        ground_added: "Terrain ajouté avec succès",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: navigator.language.startsWith("fr")
    ? "fr"
    : navigator.language.startsWith("ar")
      ? "ar"
      : "en",
  interpolation: { escapeValue: false },
});

export default i18n;
