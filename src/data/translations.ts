export type Language = 'latin' | 'cyrillic' | 'english';

export interface TranslationDictionary {
  // Navigation
  nav: {
    bosh_sahifa: string;
    kurslar: string;
    yangi: string;
    profil: string;
    sozlamalar: string;
  };
  // Dashboard / Bosh sahifa
  dashboard: {
    greeting: string;
    subtitle: string;
    continueCardTitle: string;
    continueCardEmpty: string;
    continueCardDesc: string;
    goToCourses: string;
    overallProgress: string;
    completedLessons: string;
    remainingLessons: string;
    streakTitle: string;
    streakSubtitle: string;
    streakDays: string;
    yourProgress: string;
    viewDetails: string;
    grammar: string;
    writing: string;
    spelling: string;
    achievementsTitle: string;
    viewAll: string;
    quickAccess: string;
    recentActivity: string;
    noDataTitle: string;
    noDataDesc: string;
  };
  // Kurslar
  courses: {
    title: string;
    placeholderTitle: string;
    placeholderDesc: string;
    comingSoonNote: string;
    trackGrammar: string;
    trackWriting: string;
    levelsTitle: string;
  };
  // Yangi
  newContent: {
    title: string;
    subtitle: string;
    tabLessons: string;
    tabExercises: string;
    tabRecommendations: string;
    tabUpdates: string;
    emptyLessonsTitle: string;
    emptyLessonsDesc: string;
    emptyExercisesTitle: string;
    emptyExercisesDesc: string;
    emptyRecsTitle: string;
    emptyRecsDesc: string;
    emptyUpdatesTitle: string;
    emptyUpdatesDesc: string;
  };
  // Profil
  profile: {
    title: string;
    editProfile: string;
    accountInfo: string;
    level: string;
    progressOverview: string;
    overall: string;
    grammar: string;
    writing: string;
    spelling: string;
    activityTitle: string;
    dailyActivity: string;
    weeklyActivity: string;
    streak: string;
    achievements: string;
    resultsHistory: string;
    noHistory: string;
    clearHistory: string;
  };
  // Sozlamalar
  settings: {
    title: string;
    tabGeneral: string;
    tabLearning: string;
    tabNotifications: string;
    tabAppearance: string;
    tabLanguage: string;
    tabSecurity: string;
    tabHelp: string;
    tabAbout: string;
    
    // General
    accountDetails: string;
    userName: string;
    defaultLevel: string;
    dailyGoal: string;
    startupTab: string;
    resetPreferences: string;
    
    // Learning
    exerciseDifficulty: string;
    easy: string;
    medium: string;
    hard: string;
    exercisesPerSession: string;
    showExplanations: string;
    repeatIncorrect: string;
    
    // Notifications
    lessonReminders: string;
    dailyReminder: string;
    newMaterialsNotification: string;
    progressResultsNotification: string;
    appUpdatesNotification: string;
    
    // Appearance
    themeMode: string;
    lightMode: string;
    darkMode: string;
    systemMode: string;
    uiScale: string;
    normalScale: string;
    compactScale: string;
    largeScale: string;
    reducedAnimations: string;
    
    // Security
    changePassword: string;
    exportData: string;
    importData: string;
    clearData: string;
    deleteAccount: string;
    confirmClearDataTitle: string;
    confirmClearDataMessage: string;
    confirmDeleteAccountTitle: string;
    confirmDeleteAccountMessage: string;
    
    // Help
    faq: string;
    contactSupport: string;
    reportProblem: string;
    sendFeedback: string;
    troubleshooting: string;
    
    // About
    appName: string;
    version: string;
    description: string;
    developer: string;
    terms: string;
    privacy: string;
    licenses: string;
  };
  // Common UI
  common: {
    save: string;
    cancel: string;
    confirm: string;
    close: string;
    back: string;
    search: string;
    enabled: string;
    disabled: string;
    success: string;
    minutes: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  latin: {
    nav: {
      bosh_sahifa: 'Bosh sahifa',
      kurslar: 'Kurslar',
      yangi: 'Yangi',
      profil: 'Profil',
      sozlamalar: 'Sozlamalar',
    },
    dashboard: {
      greeting: 'Assalomu alaykum,',
      subtitle: "Bugun ham o'rganish uchun ajoyib kun.",
      continueCardTitle: 'O‘rganishni davom ettiring',
      continueCardEmpty: 'Hozircha faol dars mavjud emas',
      continueCardDesc: "O'quv dasturi yuklangandan so'ng bu yerda oxirgi darsingiz ko'rinadi.",
      goToCourses: "Kurslarni ko'rish",
      overallProgress: 'Umumiy progress',
      completedLessons: 'Bajarilgan darslar',
      remainingLessons: 'Qolgan darslar',
      streakTitle: 'KETMA-KETLIK',
      streakSubtitle: "Har kuni o'rganish — muvaffaqiyat kaliti!",
      streakDays: 'kun',
      yourProgress: 'SIZNING PROGRESSINGIZ',
      viewDetails: 'Batafsil',
      grammar: 'Grammatika',
      writing: 'Yozuv',
      spelling: 'Imlo',
      achievementsTitle: 'YUTUQLARINGIZ',
      viewAll: "Barchasini ko'rish",
      quickAccess: 'Tezkor o‘tish',
      recentActivity: 'So‘nggi faoliyat',
      noDataTitle: 'Hozircha o‘quv ma’lumotlari yo‘q',
      noDataDesc: "O'quv dasturi taqdim etilgach, natijalaringiz shu yerda aks etadi.",
    },
    courses: {
      title: 'Kurslar',
      placeholderTitle: 'O‘quv dasturi tez orada yuklanadi',
      placeholderDesc: "Ushbu bo'limda O'zbek tili grammatikasi, yozuv va imlo bo'yicha mukammal darslar mundarijasi joylashtiriladi.",
      comingSoonNote: "Darslar va mashqlar moduli alohida taqdim etilishi kutilmoqda.",
      trackGrammar: 'Grammatika',
      trackWriting: 'Yozuv',
      levelsTitle: 'O‘quv darajalari',
    },
    newContent: {
      title: 'Yangi',
      subtitle: "Yangi darslar, mashqlar va platforma yangiliklari.",
      tabLessons: 'Yangi darslar',
      tabExercises: 'Yangi mashqlar',
      tabRecommendations: 'Tavsiyalar',
      tabUpdates: 'Yangilanishlar',
      emptyLessonsTitle: 'Hozircha yangi darslar mavjud emas',
      emptyLessonsDesc: "Yangi o'quv materiallari tayyorlanmoqda. Tez orada qo'shiladi.",
      emptyExercisesTitle: 'Hozircha yangi mashqlar mavjud emas',
      emptyExercisesDesc: "Amaliy topshiriqlar va mashqlar to'plami tez orada e'lon qilinadi.",
      emptyRecsTitle: 'Tavsiyalar hozircha yo‘q',
      emptyRecsDesc: "O'quv jarayoni boshlangach, bilimlaringizga mos shaxsiy tavsiyalar beriladi.",
      emptyUpdatesTitle: 'Platforma yangilanishlari',
      emptyUpdatesDesc: "Ilovaning yangi versiyalari va texnik yangiliklari shu yerda e'lon qilinadi.",
    },
    profile: {
      title: 'Profil',
      editProfile: 'Profilni tahrirlash',
      accountInfo: 'Hisob ma’lumotlari',
      level: 'Daraja',
      progressOverview: 'Progress ko‘rsatkichlari',
      overall: 'Umumiy progress',
      grammar: 'Grammatika',
      writing: 'Yozuv',
      spelling: 'Imlo',
      activityTitle: 'Faollik',
      dailyActivity: 'Kunlik faollik',
      weeklyActivity: 'Haftalik faollik',
      streak: 'Ketma-ketlik',
      achievements: 'Yutuqlar',
      resultsHistory: 'Natijalar tarixi',
      noHistory: 'Hozircha bajarilgan faoliyatlar tarixi yo‘q',
      clearHistory: 'Tarixni tozalash',
    },
    settings: {
      title: 'Sozlamalar',
      tabGeneral: 'Umumiy',
      tabLearning: "O'rganish sozlamalari",
      tabNotifications: 'Bildirishnomalar',
      tabAppearance: "Ko'rinish",
      tabLanguage: 'Til',
      tabSecurity: "Ma'lumot va xavfsizlik",
      tabHelp: "Yordam va qo'llab-quvvatlash",
      tabAbout: 'Ilova haqida',
      accountDetails: 'Hisob ma’lumotlari',
      userName: 'Foydalanuvchi ismi',
      defaultLevel: 'Boshlang‘ich daraja',
      dailyGoal: 'Kunlik o‘rganish maqsadi',
      startupTab: 'Ilovani ochganda birinchi ko‘rinish',
      resetPreferences: 'Sozlamalarni dastlabki holatga qaytarish',
      exerciseDifficulty: 'Mashqlar murakkabligi',
      easy: 'Oson',
      medium: "O'rta",
      hard: 'Qiyin',
      exercisesPerSession: 'Sessiyadagi mashqlar soni',
      showExplanations: 'Javobdan so‘ng tushuntirishni ko‘rsatish',
      repeatIncorrect: 'Xato berilgan savollarni takrorlash',
      lessonReminders: 'Dars eslatmalari',
      dailyReminder: 'Kunlik o‘rganish eslatmasi',
      newMaterialsNotification: 'Yangi materiallar haqida xabar',
      progressResultsNotification: 'Progress va natijalar xabarnomasi',
      appUpdatesNotification: 'Ilova yangilanishlari',
      themeMode: 'Mavzu (Theme)',
      lightMode: 'Yorug‘ rejim',
      darkMode: 'Tungi rejim',
      systemMode: 'Tizim rejimi',
      uiScale: 'Interfeys o‘lchami',
      normalScale: 'Standard',
      compactScale: 'Ixcham',
      largeScale: 'Katta',
      reducedAnimations: 'Animatsiyalarni kamaytirish',
      changePassword: 'Parolni o‘zgartirish',
      exportData: 'Ma’lumotlarni yuklab olish (JSON)',
      importData: 'Ma’lumotlarni tiklash (Import)',
      clearData: 'O‘quv ma’lumotlarini tozalash',
      deleteAccount: 'Hisobni o‘chirish',
      confirmClearDataTitle: 'O‘quv ma’lumotlarini tozalaysizmi?',
      confirmClearDataMessage: 'Barcha o‘quv ma’lumotlaringiz o‘chiriladi. Davom etishni xohlaysizmi?',
      confirmDeleteAccountTitle: 'Hisobni o‘chirasizmi?',
      confirmDeleteAccountMessage: 'Hisobingiz va barcha saqlangan sozlamalaringiz butunlay o‘chiriladi. Davom etasizmi?',
      faq: 'Ko‘p beriladigan savollar (FAQ)',
      contactSupport: 'Qo‘llab-quvvatlash xizmati',
      reportProblem: 'Muammo haqida xabar berish',
      sendFeedback: 'Fikr va taklif bildirish',
      troubleshooting: 'Nosozliklarni bartaraf etish',
      appName: 'O‘zbek Tili Platformasi',
      version: 'Versiya 1.1',
      description: 'O‘zbek tili va grammatikasini o‘rganish uchun zamonaviy akademik va funksional platforma.',
      developer: 'Ishlab chiquvchi: Google AI Studio',
      terms: 'Foydalanish shartlari',
      privacy: 'Maxfiylik siyosati',
      licenses: 'Ochiq kodli litsenziyalar',
    },
    common: {
      save: 'Saqlash',
      cancel: 'Bekor qilish',
      confirm: 'Tasdiqlash',
      close: 'Yopish',
      back: 'Orqaga',
      search: 'Qidirish...',
      enabled: 'Yoqilgan',
      disabled: 'O‘chirilgan',
      success: 'Muvaffaqiyatli saqlandi',
      minutes: 'daqiqa',
    },
  },
  cyrillic: {
    nav: {
      bosh_sahifa: 'Бош саҳифа',
      kurslar: 'Курслар',
      yangi: 'Янги',
      profil: 'Профиль',
      sozlamalar: 'Созламалар',
    },
    dashboard: {
      greeting: 'Ассалому алайкум,',
      subtitle: 'Бугун ҳам ўрганиш учун ажойиб кун.',
      continueCardTitle: 'Ўрганишни давом эттиринг',
      continueCardEmpty: 'Ҳозирча фаол дарс мавжуд эмас',
      continueCardDesc: 'Ўқув дастури юклангандан сўнг бу येथे охирги дарсингиз кўринади.',
      goToCourses: 'Курсларни кўриш',
      overallProgress: 'Умумий прогресс',
      completedLessons: 'Бажарилган дарслар',
      remainingLessons: 'Қолган дарслар',
      streakTitle: 'КЕТМА-КЕТЛИК',
      streakSubtitle: 'Ҳар куни ўрганиш — муваффақият калити!',
      streakDays: 'кун',
      yourProgress: 'СИЗНИНГ ПРОГРЕССИНГИЗ',
      viewDetails: 'Батафсил',
      grammar: 'Грамматика',
      writing: 'Ёзув',
      spelling: 'Имло',
      achievementsTitle: 'ЮТУҚЛАРИНГИЗ',
      viewAll: 'Барчасини кўриш',
      quickAccess: 'Тезкор ўтиш',
      recentActivity: 'Сўнгги фаолият',
      noDataTitle: 'Ҳозирча ўқув маълумотлари йўқ',
      noDataDesc: 'Ўқув дастури тақдим этилгач, натижаларингиз шу येथे акс этади.',
    },
    courses: {
      title: 'Курслар',
      placeholderTitle: 'Ўқув дастури тез орада юкланади',
      placeholderDesc: 'Ушбу бўлимда Ўзбек тили грамматикаси, ёзув ва имло бўйича мукаммал дарслар мундарижаси жойлаштирилади.',
      comingSoonNote: 'Дарслар ва машқлар модули алоҳида тақдим этилиши кутилмоқда.',
      trackGrammar: 'Грамматика',
      trackWriting: 'Ёзув',
      levelsTitle: 'Ўқув даражалари',
    },
    newContent: {
      title: 'Янги',
      subtitle: 'Янги дарслар, машқлар ва платформа янгиликлари.',
      tabLessons: 'Янги дарслар',
      tabExercises: 'Янги машқлар',
      tabRecommendations: 'Тавсиялар',
      tabUpdates: 'Янгиланишлар',
      emptyLessonsTitle: 'Ҳозирча янги дарслар мавжуд эмас',
      emptyLessonsDesc: 'Янги ўқув материаллари тайёрланмоқда. Тез орада қўшилади.',
      emptyExercisesTitle: 'Ҳозирча янги машқлар мавжуд эмас',
      emptyExercisesDesc: 'Амалий топшириқлар ва машқлар тўплами тез орада эълон қилинади.',
      emptyRecsTitle: 'Тавсиялар ҳозирча йўқ',
      emptyRecsDesc: 'Ўқув жараёни бошлангач, билимларингизга мос шахсий тавсиялар берилади.',
      emptyUpdatesTitle: 'Платформа янгиланишлари',
      emptyUpdatesDesc: 'Илованинг янги версиялари ва техник янгиликлари шу येथे эълон қилинади.',
    },
    profile: {
      title: 'Профиль',
      editProfile: 'Профильни таҳрирлаш',
      accountInfo: 'Ҳисоб маълумотлари',
      level: 'Даража',
      progressOverview: 'Прогресс кўрсаткичлари',
      overall: 'Умумий прогресс',
      grammar: 'Грамматика',
      writing: 'Ёзув',
      spelling: 'Имло',
      activityTitle: 'Фаоллик',
      dailyActivity: 'Кунлик фаоллик',
      weeklyActivity: 'Ҳафталик фаоллик',
      streak: 'Кетма-кетлик',
      achievements: 'Ютуқлар',
      resultsHistory: 'Натижалар тарихи',
      noHistory: 'Ҳозирча бажарилган фаолиятлар тарихи йўқ',
      clearHistory: 'Тарихни тозалаш',
    },
    settings: {
      title: 'Созламалар',
      tabGeneral: 'Умумий',
      tabLearning: 'Ўрганиш созламалари',
      tabNotifications: 'Билдиришномалар',
      tabAppearance: 'Кўриниш',
      tabLanguage: 'Тил',
      tabSecurity: 'Маълумот ва хавфсизлик',
      tabHelp: 'Ёрдам ва қўллаб-қувватлаш',
      tabAbout: 'Илова ҳақида',
      accountDetails: 'Ҳисоб маълумотлари',
      userName: 'Фойдаланувчи исми',
      defaultLevel: 'Бошланғич даража',
      dailyGoal: 'Кунлик ўрганиш мақсади',
      startupTab: 'Иловани очганда биринчи кўриниш',
      resetPreferences: 'Созламаларни дастлабки ҳолатга қайтариш',
      exerciseDifficulty: 'Машқлар мураккаблиги',
      easy: 'Осон',
      medium: 'Ўрта',
      hard: 'Қийин',
      exercisesPerSession: 'Сессиядаги машқлар сони',
      showExplanations: 'Жавобдан сўнг тушунтиришни кўрсатиш',
      repeatIncorrect: 'Хато берилган саволларни такрорлаш',
      lessonReminders: 'Дарс эслатмалари',
      dailyReminder: 'Кунлик ўрганиш эслатмаси',
      newMaterialsNotification: 'Янги материаллар ҳақида хабар',
      progressResultsNotification: 'Прогресс ва натижалар хабарномаси',
      appUpdatesNotification: 'Илова янгиланишлари',
      themeMode: 'Мавзу (Theme)',
      lightMode: 'Ёруғ режим',
      darkMode: 'Тунги режим',
      systemMode: 'Тизим режими',
      uiScale: 'Интерфейс ўлчами',
      normalScale: 'Стандарт',
      compactScale: 'Ихчам',
      largeScale: 'Катта',
      reducedAnimations: 'Анимацияларни камайтириш',
      changePassword: 'Паролни ўзгартириш',
      exportData: 'Маълумотларни юклаб олиш (JSON)',
      importData: 'Маълумотларни тиклаш (Import)',
      clearData: 'Ўқув маълумотларини тозалаш',
      deleteAccount: 'Ҳисобни ўчириш',
      confirmClearDataTitle: 'Ўқув маълумотларини тозалайсизми?',
      confirmClearDataMessage: 'Барча ўқув маълумотларингиз ўчирилади. Давом этишни хоҳлайсизми?',
      confirmDeleteAccountTitle: 'Ҳисобни ўчирасизми?',
      confirmDeleteAccountMessage: 'Ҳисобингиз ва барча сақланган созламаларингиз бутунлай ўчирилади. Давом этасизми?',
      faq: 'Кўп бериладиган саволлар (FAQ)',
      contactSupport: 'Қўллаб-қувватлаш хизмати',
      reportProblem: 'Муаммо ҳақида хабар бериш',
      sendFeedback: 'Фикр ва таклиф билдириш',
      troubleshooting: 'Носозликларни бартараф этиш',
      appName: 'Ўзбек Тили Платформаси',
      version: 'Версия 1.1',
      description: 'Ўзбек тили ва грамматикасини ўрганиш учун замонавий академик ва функционал платформа.',
      developer: 'Ишлаб чиқувчи: Google AI Studio',
      terms: 'Фойдаланиш шартлари',
      privacy: 'Махфийлик сиёсати',
      licenses: 'Очиқ кодли лицензиялар',
    },
    common: {
      save: 'Сақлаш',
      cancel: 'Бекор қилиш',
      confirm: 'Тасдиқлаш',
      close: 'Ёпиш',
      back: 'Орқага',
      search: 'Қидириш...',
      enabled: 'Ёқилган',
      disabled: 'Ўчирилган',
      success: 'Муваффақиятли сақланди',
      minutes: 'дақиқа',
    },
  },
  english: {
    nav: {
      bosh_sahifa: 'Dashboard',
      kurslar: 'Courses',
      yangi: 'New',
      profil: 'Profile',
      sozlamalar: 'Settings',
    },
    dashboard: {
      greeting: 'Welcome back,',
      subtitle: 'Today is another great day to learn Uzbek.',
      continueCardTitle: 'Continue Learning',
      continueCardEmpty: 'No active lesson at the moment',
      continueCardDesc: 'Your last accessed lesson will appear here once curriculum is loaded.',
      goToCourses: 'Explore Courses',
      overallProgress: 'Overall Progress',
      completedLessons: 'Completed Lessons',
      remainingLessons: 'Remaining Lessons',
      streakTitle: 'LEARNING STREAK',
      streakSubtitle: 'Consistent daily practice leads to mastery!',
      streakDays: 'days',
      yourProgress: 'YOUR PROGRESS',
      viewDetails: 'View Details',
      grammar: 'Grammar',
      writing: 'Writing',
      spelling: 'Spelling',
      achievementsTitle: 'YOUR ACHIEVEMENTS',
      viewAll: 'View All',
      quickAccess: 'Quick Access',
      recentActivity: 'Recent Activity',
      noDataTitle: 'No learning data available yet',
      noDataDesc: 'Your practice metrics and history will be recorded here once lessons begin.',
    },
    courses: {
      title: 'Courses',
      placeholderTitle: 'Curriculum & Lessons Coming Soon',
      placeholderDesc: 'This section will house structured courses in Uzbek Grammar, Writing, and Spelling.',
      comingSoonNote: 'The educational curriculum module will be integrated separately in the next phase.',
      trackGrammar: 'Grammar',
      trackWriting: 'Writing',
      levelsTitle: 'Proficiency Levels',
    },
    newContent: {
      title: 'New',
      subtitle: 'Latest updates, exercises, and platform announcements.',
      tabLessons: 'New Lessons',
      tabExercises: 'New Exercises',
      tabRecommendations: 'Recommendations',
      tabUpdates: 'Updates',
      emptyLessonsTitle: 'No new lessons available right now',
      emptyLessonsDesc: 'New instructional materials are currently being prepared.',
      emptyExercisesTitle: 'No exercises available right now',
      emptyExercisesDesc: 'Practical task sets and drills will be released soon.',
      emptyRecsTitle: 'No recommendations yet',
      emptyRecsDesc: 'Personalized recommendations will appear as you start learning.',
      emptyUpdatesTitle: 'Platform Updates',
      emptyUpdatesDesc: 'Version releases and technical announcements will be listed here.',
    },
    profile: {
      title: 'Profile',
      editProfile: 'Edit Profile',
      accountInfo: 'Account Information',
      level: 'Proficiency Level',
      progressOverview: 'Progress Overview',
      overall: 'Overall',
      grammar: 'Grammar',
      writing: 'Writing',
      spelling: 'Spelling',
      activityTitle: 'Activity',
      dailyActivity: 'Daily Activity',
      weeklyActivity: 'Weekly Activity',
      streak: 'Learning Streak',
      achievements: 'Achievements',
      resultsHistory: 'Results History',
      noHistory: 'No activity history recorded yet',
      clearHistory: 'Clear History',
    },
    settings: {
      title: 'Settings',
      tabGeneral: 'General',
      tabLearning: 'Learning Preferences',
      tabNotifications: 'Notifications',
      tabAppearance: 'Appearance',
      tabLanguage: 'Language',
      tabSecurity: 'Data & Security',
      tabHelp: 'Help & Support',
      tabAbout: 'About Application',
      accountDetails: 'Account Details',
      userName: 'User Display Name',
      defaultLevel: 'Default Learning Level',
      dailyGoal: 'Daily Goal',
      startupTab: 'App Startup Screen',
      resetPreferences: 'Reset All Preferences',
      exerciseDifficulty: 'Exercise Difficulty',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      exercisesPerSession: 'Exercises Per Session',
      showExplanations: 'Show Explanations After Answer',
      repeatIncorrect: 'Repeat Incorrectly Answered Questions',
      lessonReminders: 'Lesson Reminders',
      dailyReminder: 'Daily Learning Reminder',
      newMaterialsNotification: 'New Materials Alerts',
      progressResultsNotification: 'Progress & Score Updates',
      appUpdatesNotification: 'Application Updates',
      themeMode: 'Theme Mode',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      systemMode: 'System Preference',
      uiScale: 'UI Scaling',
      normalScale: 'Standard',
      compactScale: 'Compact',
      largeScale: 'Large',
      reducedAnimations: 'Reduced Motion / Animations',
      changePassword: 'Change Password',
      exportData: 'Export User Data (JSON)',
      importData: 'Import User Data',
      clearData: 'Clear Local Learning Data',
      deleteAccount: 'Delete Account',
      confirmClearDataTitle: 'Clear learning data?',
      confirmClearDataMessage: 'All your local learning progress and activity will be permanently erased. Do you wish to continue?',
      confirmDeleteAccountTitle: 'Delete Account?',
      confirmDeleteAccountMessage: 'Your profile and all stored preferences will be completely deleted. Do you wish to continue?',
      faq: 'Frequently Asked Questions (FAQ)',
      contactSupport: 'Contact Support',
      reportProblem: 'Report an Issue',
      sendFeedback: 'Send Feedback',
      troubleshooting: 'Troubleshooting Guide',
      appName: 'Uzbek Language Platform',
      version: 'Version 1.1',
      description: 'A modern, academic application shell for learning the Uzbek language and grammar.',
      developer: 'Developer: Google AI Studio',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      licenses: 'Open Source Licenses',
    },
    common: {
      save: 'Save Changes',
      cancel: 'Cancel',
      confirm: 'Confirm',
      close: 'Close',
      back: 'Back',
      search: 'Search...',
      enabled: 'Enabled',
      disabled: 'Disabled',
      success: 'Saved successfully',
      minutes: 'minutes',
    },
  },
};
