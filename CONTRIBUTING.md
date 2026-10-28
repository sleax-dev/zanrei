# Katkı rehberi

Zanrei sistem ayarlarını değiştirir. Bu yüzden her katkıda tek bir öncelik var: **kullanıcı yaptığı her şeyi geri alabilmeli.**

## Başlamadan önce
- Büyük bir değişiklik düşünüyorsan önce bir issue aç, yaklaşımı konuşalım.
- Geliştirme ortamı ve komutlar için [README](README.md#geliştirme) bölümüne bak.

## Kurallar

1. **Sistemi değiştiren her şey anlık görüntüden geçer.** Kayıt defteri değerleri `restore::Store::reg_set` ile yazılır. Bu fonksiyonu atlayan doğrudan `Platform::reg_set` çağrısı kabul edilmez.
2. **İşletim sistemine dokunan kod yalnızca `crates/core/src/platform/` altında olur.** Çekirdek ve arayüz işletim sisteminden bağımsız kalır.
3. **Paylaşılan bir şeyi değiştirmeden önce kullananları ara.** Bir fonksiyonun, ayarın veya bağımlılığın başka çağıranları varsa hepsini kontrol et. Tek bir yol için yapılan düzeltme diğerlerini bozmamalı. Mümkünse paylaşılanı değiştirmek yerine dar kapsamlı yeni bir şey ekle.
4. **Mantık içeren kod test bırakır.** Dallanma, ayrıştırma, geri alma gibi işler için en küçük çalışan testi ekle. `restore.rs` içindeki testler örnektir (sahte `Platform` ile).
5. **Dışarıdan gelen metin komuta gömülmez.** PowerShell'e girdiler ortam değişkeniyle geçer.
6. **Kullanıcıya görünen metinler çeviri dosyalarından gelir.** Arayüze sabit metin yazma; `src/i18n/locales/en.ts` içine anahtar ekle, diğer dil dosyaları derleme hatası verecektir.

## Pull request göndermeden önce

```powershell
npx tsc
cargo fmt --all --check
cargo clippy -p zanrei-core -- -D warnings
cargo test -p zanrei-core
```

Windows'ta ayrıca uygulamayı `npm run tauri dev` ile açıp değiştirdiğin akışı elle dene. Windows'ta denemediğin bir değişiklikse PR açıklamasında açıkça yaz.

## Commit mesajları
Kısa bir özet satırı, gerekirse boş satırdan sonra neden yaptığını anlatan paragraf. Ne yaptığını değil, neden yaptığını yaz.
