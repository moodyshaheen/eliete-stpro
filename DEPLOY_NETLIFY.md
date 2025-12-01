# دليل نشر المشروع على Netlify (للمشاريع Private)

## الخطوات:

### 1. إنشاء حساب على Netlify
   - اذهب إلى: https://www.netlify.com
   - سجل حساب جديد (مجاني تماماً)
   - يمكنك التسجيل باستخدام GitHub مباشرة

### 2. ربط المشروع
   - بعد تسجيل الدخول، اضغط على **"Add new site"** → **"Import an existing project"**
   - اختر **"Deploy with GitHub"**
   - سجل دخول بحساب GitHub
   - اختر المستودع: `eliete-stpro`

### 3. إعدادات البناء (Build Settings)

#### للموقع الرئيسي (Frontend):
   - **Base directory:** `frontend`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `frontend/dist`
   - اضغط **"Deploy site"**

#### للوحة الإدارة (Admin) - موقع منفصل:
   - اضغط **"Add new site"** مرة أخرى
   - اختر نفس المستودع: `eliete-stpro`
   - **Base directory:** `admin`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `admin/dist`
   - اضغط **"Deploy site"**

### 4. تغيير اسم الموقع (اختياري)
   - بعد النشر، يمكنك تغيير اسم الموقع
   - اذهب إلى **Site settings** → **Change site name**
   - اختر اسم مثل: `elite-store` أو `your-store-name`

### 5. النتيجة:
   - **الموقع الرئيسي:** `https://your-site-name.netlify.app`
   - **لوحة الإدارة:** `https://your-admin-site-name.netlify.app`

## ملاحظات:

✅ **Netlify مجاني تماماً**
✅ **يعمل مع المشاريع Private**
✅ **نشر تلقائي عند كل push**
✅ **SSL مجاني (HTTPS)**
✅ **يمكن ربط domain مخصص**

## إعدادات إضافية:

### إضافة Environment Variables (إذا احتجت):
   - اذهب إلى **Site settings** → **Environment variables**
   - أضف المتغيرات المطلوبة (مثل API URLs)

### إعدادات Domain مخصص:
   - اذهب إلى **Domain settings**
   - يمكنك إضافة domain خاص بك

