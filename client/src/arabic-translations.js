// Arabic translations for the application

export const translations = {
  // Case Status
  status: {
    'Open': 'مفتوحة',
    'In Progress': 'قيد التنفيذ',
    'Pending': 'معلقة',
    'Closed': 'مغلقة',
    'Won': 'مكسوبة',
    'Lost': 'خاسرة',
    'Settled': 'تسوية'
  },
  
  // Case Types
  caseTypes: {
    'Criminal': 'جنائية',
    'Civil': 'مدنية',
    'Family': 'أحوال شخصية',
    'Corporate': 'تجارية',
    'Real Estate': 'عقارية',
    'Immigration': 'هجرة',
    'Intellectual Property': 'ملكية فكرية',
    'Labor': 'عمالية',
    'Tax': 'ضريبية',
    'Other': 'أخرى'
  },
  
  // Priority
  priority: {
    'Low': 'منخفضة',
    'Medium': 'متوسطة',
    'High': 'عالية',
    'Urgent': 'عاجلة'
  },
  
  // User Roles
  roles: {
    'admin': 'مدير النظام',
    'lawyer': 'محامي',
    'paralegal': 'مساعد قانوني'
  },
  
  // Common phrases
  common: {
    'Loading': 'جاري التحميل',
    'Save': 'حفظ',
    'Cancel': 'إلغاء',
    'Delete': 'حذف',
    'Edit': 'تعديل',
    'View': 'عرض',
    'Create': 'إنشاء',
    'Update': 'تحديث',
    'Search': 'بحث',
    'Filter': 'تصفية',
    'All': 'الكل',
    'No data': 'لا توجد بيانات',
    'Success': 'نجح',
    'Error': 'خطأ',
    'Confirm': 'تأكيد',
    'Yes': 'نعم',
    'No': 'لا'
  }
};

// Helper function to get translation
export const translate = (category, key) => {
  return translations[category]?.[key] || key;
};

export default translations;
