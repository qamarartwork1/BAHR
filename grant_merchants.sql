-- بحر: صلاحية ناقصة لتعديل بيانات المحل من لوحة الإدارة
-- الوضع الحالي: authenticated يستطيع تعديل name و phone فقط في جدول merchants.
-- المطلوب: السماح بتعديل owner_name و address و owner_id (ربط المحل بحساب التاجر).
-- آمن لأن:
--   * الأعمدة الحساسة status تبقى بدون صلاحية مباشرة (تغيير الحالة عبر admin_set_merchant_status فقط)
--   * سياسة merchants_owner_update تشترط owner_id = auth.uid() فلا يستطيع تاجر نقل ملكية محله لغيره
--   * المشرف وحده يعدّل أي محل عبر سياسة merchants_admin
grant update (owner_name, address, owner_id) on public.merchants to authenticated;
