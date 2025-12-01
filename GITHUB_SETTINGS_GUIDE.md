# دليل تحويل المشروع من Public إلى Private على GitHub

## الخطوات:

### 1. اذهب إلى صفحة المشروع على GitHub
   - افتح المستودع: `https://github.com/moodyshaheen/eliete-stpro`

### 2. اذهب إلى Settings
   - اضغط على تبويب **Settings** في أعلى الصفحة (بجانب Code, Issues, Pull requests)

### 3. ابحث عن قسم "Danger Zone"
   - اسكرول لأسفل حتى تصل إلى قسم **Danger Zone** (في نهاية الصفحة)
   - هذا القسم باللون الأحمر

### 4. اضغط على "Change visibility"
   - ستجد خيار **Change visibility**
   - اضغط عليه

### 5. اختر Private
   - ستظهر نافذة منبثقة
   - اختر **Change to private**
   - اكتب اسم المستودع للتأكيد: `moodyshaheen/eliete-stpro`

### 6. تأكيد التغيير
   - اضغط على **I understand, change repository visibility**

## ملاحظات مهمة:

⚠️ **تحذيرات:**
- بعد التحويل إلى Private، لن يتمكن أحد من رؤية المشروع إلا أنت والمساهمين
- GitHub Pages سيبقى يعمل (إذا كان لديك GitHub Pro أو Team)
- إذا كان لديك GitHub Free، GitHub Pages سيتوقف عن العمل للمشاريع Private

## خيارات GitHub Pages للمشاريع Private:

### مع GitHub Free:
- ❌ GitHub Pages غير متاح للمشاريع Private
- ✅ يمكنك استخدام خدمات بديلة مثل:
  - Netlify (مجاني)
  - Vercel (مجاني)
  - Cloudflare Pages (مجاني)

### مع GitHub Pro ($4/شهر):
- ✅ GitHub Pages متاح للمشاريع Private
- ✅ يمكنك نشر المشروع بشكل خاص

## بدائل مجانية للنشر:

### 1. Netlify
```bash
# سحب المشروع
git clone https://github.com/moodyshaheen/eliete-stpro.git
cd elite-store

# بناء المشروع
cd frontend
npm install
npm run build

# رفع مجلد dist على Netlify
```

### 2. Vercel
```bash
# ربط المشروع مباشرة من GitHub
# Vercel سيبني المشروع تلقائياً
```

### 3. Cloudflare Pages
```bash
# ربط المشروع من GitHub
# Cloudflare سيبني المشروع تلقائياً
```

