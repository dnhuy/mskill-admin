export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'home',
    access: 'canDashboard',
    component: './dashboard',
  },
  {
    path: '/learning_packages',
    name: 'learning_packages',
    icon: 'read',
    access: 'canLearningPackages',
    routes: [
      {
        path: '/learning_packages/combo_course',
        name: 'combo_course',
        access: 'canComboCourse',
        routes: [
          {
            path: '/learning_packages/combo_course',
            component: './learningPackages/comboCourse',
          },
          {
            path: '/learning_packages/combo_course/add_combo_course',
            name: 'add_combo_course',
            component: './learningPackages/comboCourse/addComboCourse',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
      {
        path: '/learning_packages/api_course',
        name: 'api_course',
        access: 'canApiCourse',
        routes: [
          {
            path: '/learning_packages/api_course',
            component: './learningPackages/apiCourse',
          },
          {
            path: '/learning_packages/api_course/add_api_course',
            name: 'add_api_course',
            component: './learningPackages/apiCourse/addApiCourse',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
    ],
  },
  {
    path: '/video_course',
    name: 'video_course',
    icon: 'playCircle',
    access: 'canVideoCourse',
    routes: [
      {
        path: '/video_course/mobiedu_course',
        name: 'mobiedu_course',
        access: 'canMobieduCourse',
        routes: [
          {
            path: '/video_course/mobiedu_course',
            component: './videoCourse/mobieduCourse',
          },
          {
            path: '/video_course/mobiedu_course/add_mobiedu_course',
            name: 'add_mobiedu_course',
            component: './videoCourse/mobieduCourse/addMobieduCourse',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
      {
        path: '/video_course/unica_course',
        name: 'unica_course',
        access: 'canUnicaCourse',
        routes: [
          {
            path: '/video_course/unica_course',
            component: './videoCourse/unicaCourse',
          },
          {
            path: '/video_course/unica_course/add_unica_course',
            name: 'add_unica_course',
            component: './videoCourse/unicaCourse/addUnicaCourse',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
    ],
  },
  {
    path: '/course_filter',
    name: 'course_filter',
    icon: 'search',
    access: 'canCourseFilter',
    routes: [
      {
        path: '/course_filter/course_category',
        name: 'course_category',
        access: 'canCourseCategory',
        routes: [
          {
            path: '/course_filter/course_category',
            component: './courseFilter/courseCategory',
          },
          {
            path: '/course_filter/course_category/add_course_category',
            name: 'add_course_category',
            component: './courseFilter/courseCategory/addCourseCategory',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
      {
        path: '/course_filter/course_subject',
        name: 'course_subject',
        access: 'canCourseSubject',
        routes: [
          {
            path: '/course_filter/course_subject',
            component: './courseFilter/courseSubject',
          },
          {
            path: '/course_filter/course_subject/add_course_subject',
            name: 'add_course_subject',
            component: './courseFilter/courseSubject/addCourseSubject',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
      {
        path: '/course_filter/exam_gate_subject',
        name: 'exam_gate_subject',
        access: 'canExamGateSubject',
        routes: [
          {
            path: '/course_filter/exam_gate_subject',
            component: './courseFilter/examGateSubject',
          },
          {
            path: '/course_filter/exam_gate_subject/add_exam_gate_subject',
            name: 'add_exam_gate_subject',
            component: './courseFilter/examGateSubject/addExamGateSubject',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
      {
        path: '/course_filter/price_range',
        name: 'price_range',
        access: 'canPriceRange',
        routes: [
          {
            path: '/course_filter/price_range',
            component: './courseFilter/priceRange',
          },
          {
            path: '/course_filter/price_range/add_price_range',
            name: 'add_price_range',
            component: './courseFilter/priceRange/addPriceRange',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
    ],
  },
  {
    path: '/content_provider',
    name: 'content_provider',
    icon: 'usergroupAdd',
    access: 'canContentProvider',
    routes: [
      {
        path: '/content_provider/cp_mobifone',
        name: 'cp_mobifone',
        access: 'canCpMobifone',
        component: './contentProvider/cpMobifone',
      },
      {
        path: '/content_provider/services',
        name: 'services',
        access: 'canServices',
        component: './contentProvider/services',
      },
      {
        path: '/content_provider/package',
        name: 'package',
        access: 'canPackage',
        component: './contentProvider/package',
      },
      {
        path: '/content_provider/teacher_profile',
        name: 'teacher_profile',
        access: 'canTeacherProfile',
        routes: [
          {
            path: '/content_provider/teacher_profile',
            component: './contentProvider/teacherProfile',
          },
          {
            path: '/content_provider/teacher_profile/add_teacher',
            name: 'add_teacher',
            component: './contentProvider/teacherProfile/addTeacher',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
    ],
  },
  {
    path: '/solution_manager',
    name: 'solution_manager',
    icon: 'flag',
    access: 'canSolutionManager',
    routes: [
      {
        path: '/solution_manager/package_solution',
        name: 'package_solution',
        access: 'canPackageSolution',
        routes: [
          {
            path: '/solution_manager/package_solution',
            component: './solutionManager/packageSolution',
          },
          {
            path: '/solution_manager/package_solution/add_package_solution',
            name: 'add_package_solution',
            component: './solutionManager/packageSolution/addPackageSolution',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
      {
        path: '/solution_manager/solution',
        name: 'solution',
        access: 'canSolution',
        routes: [
          {
            path: '/solution_manager/solution',
            component: './solutionManager/solution',
          },
          {
            path: '/solution_manager/solution/add_solution',
            name: 'add_solution',
            component: './solutionManager/solution/addSolution',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
    ],
  },
  {
    path: '/exam_gate',
    name: 'exam_gate',
    icon: 'form',
    access: 'canExamGate',
    routes: [
      {
        path: '/exam_gate',
        component: './examGate',
      },
      {
        path: '/exam_gate/add_exam_gate',
        name: 'add_exam_gate',
        component: './examGate/addExamGate',
      },
      {
        component: './404',
      },
    ],
    hideChildrenInMenu: true,
  },
  {
    path: '/sms_brandname',
    name: 'sms_brandname',
    icon: 'message',
    access: 'canSmsBrandname',
    component: './smsBrandname',
  },
  {
    path: '/media_camplain',
    name: 'media_camplain',
    icon: 'schedule',
    access: 'canMediaCamplain',
    routes: [
      {
        path: '/media_camplain/sms',
        name: 'sms',
        access: 'canSms',
        component: './mediaCamplain/sms',
      },
      {
        path: '/media_camplain/report_channel',
        name: 'report_channel',
        access: 'canReportChannel',
        component: './mediaCamplain/reportChannel',
      },
      {
        path: '/media_camplain/ctkm_mobifone',
        name: 'ctkm_mobifone',
        access: 'canCtkmMobifone',
        component: './mediaCamplain/ctkmMobifone',
      },
      {
        path: '/media_camplain/promotion',
        name: 'promotion',
        access: 'canPromotion',
        routes: [
          {
            path: '/media_camplain/promotion',
            component: './mediaCamplain/promotion',
          },
          {
            path: '/media_camplain/promotion/add_promotion',
            name: 'add_promotion',
            component: './mediaCamplain/promotion/addPromotion',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
    ],
  },
  {
    path: '/customer_manager',
    name: 'customer_manager',
    icon: 'smile',
    access: 'canCustomerManager',
    routes: [
      {
        path: '/customer_manager/customer',
        name: 'customer',
        access: 'canCustomer',
        routes: [
          {
            path: '/customer_manager/customer',
            component: './customerManager/customer',
          },
          {
            path: '/customer_manager/customer/detail_customer',
            name: 'detail_customer',
            component: './customerManager/customer/detailCustomer',
          },
          {
            path: '/customer_manager/customer/transaction_history',
            name: 'transaction_history',
            component: './customerManager/customer/transactionHistory',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
      {
        path: '/customer_manager/sub_mobifone',
        name: 'sub_mobifone',
        access: 'canSubMobifone',
        component: './customerManager/subMobifone',
      },
      {
        path: '/customer_manager/sub_out_net',
        name: 'sub_out_net',
        access: 'canSubOutNet',
        component: './customerManager/subOutNet',
      },
      {
        path: '/customer_manager/white_list',
        name: 'white_list',
        access: 'canWhiteList',
        routes: [
          {
            path: '/customer_manager/white_list',
            component: './customerManager/whiteList',
          },
          {
            path: '/customer_manager/white_list/add_white_list',
            name: 'add_white_list',
            component: './customerManager/whiteList/addWhiteList',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
      {
        path: '/customer_manager/data_form',
        name: 'data_form',
        access: 'canDataForm',
        component: './customerManager/dataForm',
      },
    ],
  },
  {
    path: '/payment_channel',
    name: 'payment_channel',
    icon: 'creditCard',
    access: 'canPaymentChannel',
    component: './paymentChannel',
  },
  {
    path: '/order',
    name: 'order',
    icon: 'shopping',
    access: 'canOrder',
    routes: [
      {
        path: '/order',
        component: './order',
      },
      {
        path: '/order/add_order',
        name: 'add_order',
        component: './order/addOrder',
      },
      {
        component: './404',
      },
    ],
    hideChildrenInMenu: true,
  },
  {
    path: '/revenue',
    name: 'revenue',
    icon: 'dollar',
    access: 'canRevenue',
    routes: [
      {
        path: '/revenue/telecommunication_mobifone',
        name: 'telecommunication_mobifone',
        access: 'canTelecommunicationMobifone',
        component: './revenue/telecommunicationMobifone',
      },
      {
        path: '/revenue/telecommunication_out_net',
        name: 'telecommunication_out_net',
        access: 'canTelecommunicationOutNet',
        component: './revenue/telecommunicationOutNet',
      },
      {
        path: '/revenue/online_channel',
        name: 'online_channel',
        access: 'canOnlineChannel',
        component: './revenue/onlineChannel',
      },
      {
        path: '/revenue/synthesize',
        name: 'synthesize',
        access: 'canSynthesize',
        component: './revenue/synthesize',
      },
    ],
  },
  {
    path: '/for_control',
    name: 'for_control',
    icon: 'checkCircle',
    access: 'canForControl',
    routes: [
      {
        path: '/for_control/cp',
        name: 'cp',
        access: 'canCpForControl',
        component: './forControl/cpForControl',
      },
      {
        path: '/for_control/inet',
        name: 'inet',
        access: 'canInet',
        component: './forControl/inet',
      },
      {
        path: '/for_control/agent',
        name: 'agent',
        access: 'canAgent',
        component: './forControl/agent',
      },
    ],
  },
  {
    path: '/statistic',
    name: 'statistic',
    icon: 'calculator',
    access: 'canStatistic',
    routes: [
      {
        path: '/statistic/content_report',
        name: 'content_report',
        access: 'canContentReport',
        component: './statistic/contentReport',
      },
      {
        path: '/statistic/order_report',
        name: 'order_report',
        access: 'canOrderReport',
        component: './statistic/orderReport',
      },
      {
        path: '/statistic/revenue_report',
        name: 'revenue_report',
        access: 'canRevenueReport',
        component: './statistic/revenueReport',
      },
      {
        path: '/statistic/customer_report',
        name: 'customer_report',
        access: 'canCustomerReport',
        component: './statistic/customerReport',
      },
      {
        path: '/statistic/use_report',
        name: 'use_report',
        access: 'canUseReport',
        component: './statistic/useReport',
      },
      {
        path: '/statistic/platform_report',
        name: 'platform_report',
        access: 'canPlatformReport',
        component: './statistic/platformReport',
      },
    ],
  },
  {
    path: '/posts',
    name: 'posts',
    icon: 'fontSize',
    access: 'canPosts',
    routes: [
      {
        path: '/posts/post_category',
        name: 'post_category',
        access: 'canPostCategory',
        routes: [
          {
            path: '/posts/post_category',
            component: './posts/postCategory',
          },
          {
            path: '/posts/post_category/add_post_category',
            name: 'add_post_category',
            component: './posts/postCategory/addPostCategory',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
      {
        path: '/posts/post',
        name: 'post',
        access: 'canPost',
        routes: [
          {
            path: '/posts/post',
            component: './posts/post',
          },
          {
            path: '/posts/post/add_post',
            name: 'add_post',
            component: './posts/post/addPost',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
    ],
  },
  {
    path: '/support',
    name: 'support',
    icon: 'question',
    access: 'canSupport',
    routes: [
      {
        path: '/support/guide',
        name: 'guide',
        access: 'canGuide',
        routes: [
          {
            path: '/support/guide/category_tutorial',
            name: 'category_tutorial',
            access: 'canCategoryTutorial',
            routes: [
              {
                path: '/support/guide/category_tutorial',
                component: './support/guide/categoryTutorial',
              },
              {
                path: '/support/guide/category_tutorial/add_category_tutorial',
                name: 'add_category_tutorial',
                component: './support/guide/categoryTutorial/addCategoryTutorial',
              },
              {
                component: './404',
              },
            ],
            hideChildrenInMenu: true,
          },
          {
            path: '/support/guide/faq_tutorial',
            name: 'faq_tutorial',
            access: 'canFaqTutorial',
            routes: [
              {
                path: '/support/guide/faq_tutorial',
                component: './support/guide/faqTutorial',
              },
              {
                path: '/support/guide/faq_tutorial/add_faq_tutorial',
                name: 'add_faq_tutorial',
                component: './support/guide/faqTutorial/addFaqTutorial',
              },
              {
                component: './404',
              },
            ],
            hideChildrenInMenu: true,
          },
        ],
      },
      {
        path: '/support/faq',
        name: 'faq',
        access: 'canFaq',
        routes: [
          {
            path: '/support/faq/category_question',
            name: 'category_question',
            access: 'canCategoryQuestion',
            routes: [
              {
                path: '/support/faq/category_question',
                component: './support/faq/categoryQuestion',
              },
              {
                path: '/support/faq/category_question/add_category_question',
                name: 'add_category_question',
                component: './support/faq/categoryQuestion/addCategoryQuestion',
              },
              {
                component: './404',
              },
            ],
            hideChildrenInMenu: true,
          },
          {
            path: '/support/faq/faq_question',
            name: 'faq_question',
            access: 'canFaqQuestion',
            routes: [
              {
                path: '/support/faq/faq_question',
                component: './support/faq/faqQuestion',
              },
              {
                path: '/support/faq/faq_question/add_faq_question',
                name: 'add_faq_question',
                component: './support/faq/faqQuestion/addFaqQuestion',
              },
              {
                component: './404',
              },
            ],
            hideChildrenInMenu: true,
          },
        ],
      },
      {
        path: '/support/errors',
        name: 'errors',
        access: 'canErrors',
        component: './support/errors',
      },
    ],
  },
  {
    path: '/promotion',
    name: 'promotion',
    icon: 'percentage',
    access: 'canPromotion',
    routes: [
      {
        path: '/promotion/mobifone_promotion',
        name: 'mobifone_promotion',
        access: 'canMobifonePromotion',
        component: './promotion/mobifonePromotion',
      },
      {
        path: '/promotion/online_promotion',
        name: 'online_promotion',
        access: 'canOnlinePromotion',
        component: './promotion/onlinePromotion',
      },
      {
        path: '/promotion/sub_promotion',
        name: 'sub_promotion',
        access: 'canSubPromotion',
        component: './promotion/subPromotion',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'user',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/role',
        name: 'role',
        access: 'canRole',
        routes: [
          {
            path: '/admin/role',
            component: './admin/role',
          },
          {
            path: '/admin/role/add_role',
            name: 'add_role',
            component: './admin/role/addRole',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
      {
        path: '/admin/user',
        name: 'user',
        access: 'canUser',
        routes: [
          {
            path: '/admin/user',
            component: './admin/user',
          },
          {
            path: '/admin/user/add_user',
            name: 'add_user',
            component: './admin/user/addUser',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
    ],
  },
  {
    path: '/web_setting',
    name: 'web_setting',
    icon: 'global',
    access: 'canWebSetting',
    routes: [
      {
        path: '/web_setting/landing_page',
        name: 'landing_page',
        access: 'canLandingPage',
        component: './webSetting/landingPage',
      },
      {
        path: '/web_setting/header_footer',
        name: 'header_footer',
        access: 'canHeaderFooter',
        routes: [
          {
            path: '/web_setting/header_footer/header',
            name: 'header',
            access: 'canHeader',
            component: './webSetting/headerFooter/header',
          },
          {
            path: '/web_setting/header_footer/footer',
            name: 'footer',
            access: 'canFooter',
            component: './webSetting/headerFooter/footer',
          },
        ],
      },
      {
        path: '/web_setting/banner_popup',
        name: 'banner_popup',
        access: 'canBannerPopup',
        routes: [
          {
            path: '/web_setting/banner_popup/banner',
            name: 'banner',
            access: 'canBanner',
            component: './webSetting/bannerPopup/banner',
          },
          {
            path: '/web_setting/banner_popup/popup',
            name: 'popup',
            access: 'canPopup',
            component: './webSetting/bannerPopup/popup',
          },
        ],
      },
      {
        path: '/web_setting/tag',
        name: 'tag',
        access: 'canTag',
        component: './webSetting/tag',
      },
      {
        path: '/web_setting/feedback',
        name: 'feedback',
        access: 'canFeedback',
        component: './webSetting/feedback',
      },
      {
        path: '/web_setting/short_link',
        name: 'short_link',
        access: 'canShortLink',
        component: './webSetting/shortLink',
      },
    ],
  },
  {
    path: '/customer_service',
    name: 'customer_service',
    icon: 'customerService',
    access: 'canCustomerService',
    routes: [
      {
        path: '/customer_service/cskh_user',
        name: 'cskh_user',
        access: 'canCskhUser',
        component: './customerService/cskhUser',
      },
      {
        path: '/customer_service/errors_statistical',
        name: 'errors_statistical',
        access: 'canErrorsStatistical',
        component: './customerService/errorsStatistical',
      },
    ],
  },
  {
    path: '/notification_manager',
    name: 'notification_manager',
    icon: 'notification',
    access: 'canNotificationManager',
    routes: [
      {
        path: '/notification_manager/notification_template',
        name: 'notification_template',
        access: 'canNotificationTemplate',
        component: './notificationManager/notificationTemplate',
      },
      {
        path: '/notification_manager/notification',
        name: 'notification',
        access: 'canNotification',
        routes: [
          {
            path: '/notification_manager/notification',
            component: './notificationManager/notification',
          },
          {
            path: '/notification_manager/notification/add_notification',
            name: 'add_notification',
            component: './notificationManager/notification/addNotification',
          },
          {
            component: './404',
          },
        ],
        hideChildrenInMenu: true,
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
