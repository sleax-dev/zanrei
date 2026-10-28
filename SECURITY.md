# Güvenlik politikası

Zanrei yönetici yetkisiyle çalışır ve Windows ayarlarını değiştirir. Güvenlik sorunlarını ciddiye alıyoruz.

## Açık bildirme
Güvenlik açıklarını **herkese açık issue olarak açma.** GitHub'ın özel bildirim özelliğini kullan:

**Security → Report a vulnerability** (bu depoda `https://github.com/thesleax/zanrei/security/advisories/new`)

Bildirimde şunları yaz:
- Sorunun ne olduğu ve etkisi
- Nasıl yeniden üretileceği (sürüm, Windows sürümü, adımlar)
- Varsa önerdiğin çözüm

## Kapsam
Özellikle şunlar önemlidir:
- Yönetici yetkisinin kötüye kullanılması (komut enjeksiyonu, yol aşma)
- Geri yükleme günlüğünün bozulması veya geri almanın kullanıcının sisteminde beklenmeyen değişiklik yapması
- Kullanıcının bilgisi dışında sistem değişikliği yapılması

## Desteklenen sürümler
Yalnızca en son yayımlanan sürüm düzeltme alır.
