import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLang = localStorage.getItem('language');
const defaultLanguage = savedLang || 'en';

const languageResources = {
  en: {
    translation: {
      dir: 'ltr',
      CTA: 'Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%',
      shop: 'ShopNow!',

      headerLinks: {
        home: 'Home',
        contact: 'Contact',
        about: 'About',
        signup: 'Signup',
        login: 'Login',
        myAccount: 'My Account',
      },

      personOperations: {
        manageMyAccount: 'Manage My Account',
        myOrder: 'My Orders',
        myCancellations: 'My Cancellations',
        myReviews: 'My Reviews',
        logout: 'Logout',
      },

      searchInput: 'Search...',

      heroSection: {
        categoriesLinks: {
          womenFashion: "Women's Fashion",
          menFashion: "Men's Fashion",
          homeLifestyle: 'Home & Lifestyle',
          medicine: 'Medicine',
          sportsOutdoor: 'Sports & Outdoor',
          babyToys: "Baby's & Toys",
          groceriesPets: 'Groceries & Pets',
          healthBeauty: 'Health & Beauty',
        },
        bannerTitle: {
          iphone14Series: 'iPhone 14 Series',
          upTo10OffVoucher: 'Up to 10% off Voucher',
          shopNow: 'Shop Now',
        },
      },

      FlashSales: {
        todays: 'Today’s',
        flashSales: 'Flash Sales',
      },

      bestSelling: {
        thisMonth: 'This Month',
        bestSellingProducts: 'Best Selling Products',
      },

      allProducts: {
        ourProducts: 'Our Products',
        exploreOurProducts: 'Explore Our Products',
      },

      category: {
        subTitle: 'Categories',
        title: 'Browse By Category',
        categories: {
          phones: 'Phones',
          computers: 'Computers',
          smartwatch: 'SmartWatch',
          camera: 'Camera',
          headphones: 'HeadPhones',
          gaming: 'Gaming',
          playStation: 'Play station',
          device: 'Device',
        },
      },

      offer: {
        greenTitle: 'Categories',
        title: 'Enhance Your Listening Experience',
        buyNow: 'Buy Now!',
      },

      featuredGallery: {
        subTitle: 'Featured',
        title: 'New Arrival',
        playStation: {
          title: 'PlayStation 5',
          description: 'Black and White version of the PS5 coming out on sale.',
        },
        womenCollections: {
          title: 'Women’s Collections',
          description: 'Featured woman collections that give you another vibe.',
        },
        speakers: {
          title: 'Speakers',
          description: 'Amazon wireless speakers',
        },
        perfume: {
          title: 'Perfume',
          description: 'GUCCI INTENSE OUD EDP',
        },
      },

      services: {
        services1: {
          title: 'FREE AND FAST DELIVERY',
          description: 'Free delivery for all orders over $140 ',
        },

        services2: {
          title: '24/7 CUSTOMER SERVICE',
          description: 'Friendly 24/7 customer support',
        },
        services3: {
          title: 'MONEY BACK GUARANTEE',
          description: 'We return money within 30 days',
        },
      },

      wishlist: {
        title: 'Wishlist',
        justForYou: 'Just for you',
      },

      cart: {
        header: {
          cart: 'Cart',
          product: 'Product',
          price: 'Price',
          quantity: 'Quantity',
          subtotal: 'Subtotal',
        },
        couponCode: 'Coupon Code',
        cartStatus: 'Your Cart Is Empty!',
        cartTotal: 'Cart Total',
        total: 'Total',
        shipping: 'Shipping',
        free: 'Free',
      },

      checkout: {
        title: 'Checkout',
        billingDetails: 'Billing Details',
        firstName: 'First Name',
        company: 'Company Name',
        country: 'Country',
        address: 'Street Address',
        city: 'Town / City',
        phone: 'Phone',
        email: 'Email Address',
        apartment: 'Apartment, floor, etc. (optional)',
        methods: 'Payment Methods',
        bank: 'Bank (Visa)',
        cash: 'Cash on Delivery',
        couponCode: 'Coupon Code',
        saveInformation:
          ' Save this information for faster check-out next time',
      },

      productDetailsPage: {
        inStock: 'In Stock',
        relatedItems: 'Related Items',
        colors: 'Colors',
        size: 'Size',
        reviews: 'Reviews',
        review: 'Review',
        freeDelivery: 'Free Delivery',
        enterPostalCode: 'Enter your postal code for Delivery Availability',
        returnDelivery: 'Return Delivery',
        free30Days: 'Free 30 Days Delivery Returns.Details',
      },

      buttons: {
        addToCart: 'Add to Cart',
        removeFromCart: 'Remove from Cart',
        viewAllProductsButton: 'View All Products',
        moveAllToBagButton: 'Move All to Bag',
        removeAllToBagButton: 'Remove All to Bag',
        seeAllButton: 'See All',
        buyNowButton: 'Buy Now',
        exploreByCategory: 'Explore By Category',
        sendMessage: 'Send Massage',
        createAccount: 'Create Account',
        applyCouponButton: 'Apply Coupon',
        processToCheckoutButton: 'Process to checkout',
        placeOrderButton: 'Place Order',
        backToHomePageLink: 'Back to home page',
        returnToShopLink: 'Return to Shop',
        updateCartButton: 'Update Cart',
      },

      aboutPage: {
        title: 'About',
        story: 'Our Story',
        paragraph1:
          'Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.',
        paragraph2:
          'Exclusive has more than 1 Million products to offer, growing at a very fast rate. Exclusive offers a diverse assortment in categories ranging from consumer.',
        card1: 'Sellers active on our site',
        card2: 'Monthly Product Sales',
        card3: 'Customers active on our site',
        card4: 'Annual gross sale on our site',
      },

      contactPage: {
        call: 'Call To Us',
        available: 'We are available 24/7, 7 days a week.',
        phone: 'Phone',
        write: 'Write To US',
        fillForm: 'Fill out our form and we will contact you within 24 hours.',
        emails: 'Emails',
        yourName: 'Your Name',
        yourEmail: 'Your Email',
        yourPhone: 'Your Phone Number',
        yourMessage: 'Your Message',
      },

      footer: {
        subscribe: 'Subscribe',
        offer: 'Get 10% off your first order',
        enterEmail: 'Enter your email',
        support: 'Support',
        address: '111 Bijoy sarani, Dhaka, DH 1515, Bangladesh',
        account: 'Account',
        myAccount: 'My Account',
        login: 'Login',
        register: '/ Register',
        cart: 'Cart',
        wishlist: 'Wishlist',
        shop: 'Shop',
        quickLinks: 'Quick Links',
        privacy: 'Privacy Policy',
        usage: 'Terms Of Use',
        FAQ: 'FAQ',
        contact: 'Contact',
        downloadApp: 'Download App',
        save: 'Save $3 with App New User Only',
        copyrights: '© Copyright Rimel 2022. All rights reserved',
      },
    },
  },

  ar: {
    translation: {
      dir: 'rtl',
      CTA: 'تخفيضات الصيف لجميع ملابس السباحة وتوصيل سريع مجاني - خصم 50%',
      shop: 'تسوق الآن!',

      headerLinks: {
        home: 'الرئيسية',
        contact: 'اتصل بنا',
        about: 'عنا',
        signup: 'تسجيل',
        login: 'تسجيل الدخول',
        myAccount: 'حسابي',
      },

      personOperations: {
        manageMyAccount: 'إدارة حسابي',
        myOrder: 'طلبي',
        myCancellations: 'إلغاءاتي',
        myReviews: 'مراجعاتي',
        logout: 'تسجيل الخروج',
      },

      searchInput: 'بحث...',

      heroSection: {
        categoriesLinks: {
          womenFashion: 'أزياء السيدات',
          menFashion: 'أزياء الرجال',
          homeLifestyle: 'المنزل ونمط الحياة',
          sportsOutdoor: 'الرياضة والأنشطة الخارجية',
          babyToys: 'ألعاب الأطفال',
          medicine: 'الطب',
          groceriesPets: 'البقالة والحيوانات الأليفة',
          healthBeauty: 'الصحة والجمال',
        },
        bannerTitle: {
          iphone14Series: 'سلسلة iPhone 14',
          upTo10OffVoucher: 'قسيمة خصم تصل إلى 10%',
          shopNow: 'تسوق الآن',
        },
      },

      FlashSales: {
        todays: 'اليوم',
        flashSales: 'عروض الفلاش',
      },

      bestSelling: {
        thisMonth: 'هذا الشهر',
        bestSellingProducts: 'أفضل المنتجات مبيعًا',
      },

      allProducts: {
        ourProducts: 'منتجاتنا',
        exploreOurProducts: 'استكشاف منتجاتنا',
      },

      category: {
        subTitle: 'الفئات',
        title: 'تصفح حسب الفئة',
        categories: {
          phones: 'الهواتف',
          computers: 'الحواسيب',
          smartwatch: 'الساعة الذكية',
          camera: 'الكاميرا',
          headphones: 'سماعات الرأس',
          gaming: 'الألعاب',
          playStation: 'البلايستشن',
          device: 'الجهاز',
        },
      },

      offer: {
        greenTitle: 'الفئات',
        title: 'تعزيز تجربة الاستماع الخاصة بك',
        buyNow: 'اشتري الآن!',
      },

      featuredGallery: {
        subTitle: 'المميزة',
        title: 'جديد',
        playStation: {
          title: 'بلاي ستيشن 5',
          description: 'نسخة بالأبيض والأسود من PS5 ستطرح للبيع.',
        },
        womenCollections: {
          title: 'مجموعات النساء',
          description: 'مجموعات النساء المميزة التي تعطيك إحساسًا مختلفًا.',
        },
        speakers: {
          title: 'السماعات',
          description: 'السماعات اللاسلكية من أمازون',
        },
        perfume: {
          title: 'العطور',
          description: 'GUCCI INTENSE OUD EDP',
        },
      },

      services: {
        services1: {
          title: 'توصيل سريع ومجاني',
          description:
            'توصيل مجاني لجميع الطلبات التي تزيد قيمتها عن 140 دولار',
        },
        services2: {
          title: 'خدمة العملاء على مدار الساعة',
          description: 'دعم عملاء ودود على مدار الساعة',
        },
        services3: {
          title: 'ضمان استعادة الأموال',
          description: 'نقوم بإعادة الأموال خلال 30 يومًا',
        },
      },

      wishlist: {
        title: 'قائمة الرغبات',
        justForYou: 'فقط من أجلك',
      },

      cart: {
        header: {
          cart: 'سلة التسوق',
          product: 'المنتج',
          price: 'السعر',
          quantity: 'الكمية',
          subtotal: 'الإجمالي الفرعي',
        },
        couponCode: 'كود القسيمة',
        cartStatus: 'سلة التسوق فارغة!',
        cartTotal: 'إجمالي السلة',
        total: 'الإجمالي',
        subtotal: 'الإجمالي الفرعي',
        shipping: 'الشحن',
        free: 'مجاني',
      },

      checkout: {
        billingDetails: 'تفاصيل الفاتورة',
        firstName: 'الاسم الأول',
        company: 'اسم الشركة',
        country: 'البلد',
        address: 'عنوان الشارع',
        city: 'المدينة / البلدة',
        phone: 'الهاتف',
        email: 'عنوان البريد الإلكتروني',
        apartment: 'الشقة، الطابق، إلخ. (اختياري)',
        methods: 'طرق الدفع',
        bank: 'البنك (فيزا)',
        cash: 'الدفع عند الاستلام',
        saveInformation: 'حفظ هذه المعلومات لتسليم المتابعة في المرة التالية',
      },

      productDetailsPage: {
        relatedItems: 'منتجات ذات صلة',
        inStock: 'متوفر في المخزون',
        colors: 'الألوان',
        size: 'الحجم',
        reviews: 'المراجعات',
        review: 'مراجعة',
        freeDelivery: 'توصيل مجاني',
        enterPostalCode: 'أدخل الرمز البريدي لتوافر التوصيل',
        returnDelivery: 'إرجاع التوصيل',
        free30Days: 'إرجاع مجاني لمدة 30 يومًا. التفاصيل',
      },

      buttons: {
        addToCart: 'أضف إلى السلة',
        removeFromCart: 'إزالة من السلة',
        viewAllProductsButton: 'عرض جميع المنتجات',
        moveAllToBagButton: 'نقل الكل إلى الحقيبة',
        removeAllToBagButton: 'حذف الكل إلى الحقيبة',
        seeAllButton: 'عرض الكل',
        buyNowButton: 'اشتري الآن',
        exploreByCategory: 'استكشاف حسب الفئة',
        sendMessage: 'إرسال رسالة',
        createAccount: 'إنشاء حساب',
        applyCouponButton: 'تطبيق القسيمة',
        processToCheckoutButton: 'الانتقال إلى الدفع',
        placeOrderButton: 'تقديم الطلب',
        backToHomePageLink: 'العودة إلى الصفحة الرئيسية',
        returnToShopLink: 'العودة إلى المتجر',
        updateCartButton: 'تحديث السلة',
      },

      aboutPage: {
        title: 'عنا',
        story: 'قصتنا',
        paragraph1:
          'تم إطلاق Exclusive في عام 2015، وهو السوق الرائد للتسوق عبر الإنترنت في جنوب آسيا مع وجود نشط في بنغلاديش. بدعم من مجموعة واسعة من الحلول التسويقية والبيانات والخدمات المخصصة، يضم Exclusive 10500 بائع و300 علامة تجارية ويخدم 3 ملايين عميل في جميع أنحاء المنطقة.',
        paragraph2:
          'يقدم Exclusive أكثر من مليون منتج، وينمو بسرعة كبيرة. يقدم Exclusive مجموعة متنوعة في الفئات بدءًا من المستهلك.',
        card1: 'البائعون النشطون على موقعنا',
        card2: 'مبيعات المنتجات الشهرية',
        card3: 'العملاء النشطون على موقعنا',
        card4: 'إجمالي المبيعات السنوية على موقعنا',
      },

      contactPage: {
        call: 'اتصل بنا',
        available: 'نحن متاحون 24/7، 7 أيام في الأسبوع.',
        phone: 'الهاتف',
        write: 'اكتب لنا',
        fillForm: 'املأ النموذج وسنتصل بك خلال 24 ساعة.',
        emails: 'البريد الإلكتروني',
        yourName: 'اسمك',
        yourEmail: 'بريدك الإلكتروني',
        yourPhone: 'رقم هاتفك',
        yourMessage: 'رسالتك',
      },

      footer: {
        subscribe: 'اشترك',
        offer: 'احصل على خصم 10% على طلبك الأول',
        enterEmail: 'أدخل بريدك الإلكتروني',
        support: 'الدعم',
        address: '111 بيجوي ساراني، دكا، DH 1515، بنغلاديش',
        account: 'الحساب',
        myAccount: 'حسابي',
        login: 'تسجيل الدخول',
        register: 'التسجيل',
        cart: 'السلة',
        wishlist: 'قائمة الرغبات',
        shop: 'التسوق',
        quickLinks: 'روابط سريعة',
        privacy: 'سياسة الخصوصية',
        usage: 'شروط الاستخدام',
        FAQ: 'الأسئلة الشائعة',
        contact: 'اتصل بنا',
        downloadApp: 'تحميل التطبيق',
        save: 'وفر 3 دولارات مع التطبيق فقط للمستخدمين الجدد',
        copyrights: '© حقوق النشر Rimel 2022. جميع الحقوق محفوظة',
      },
    },
  },
};

// Initialize i18n
i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  resources: languageResources,
  keySeparator: '.',
  interpolation: { escapeValue: false },
});

export default i18n;
