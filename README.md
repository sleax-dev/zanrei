# Zanrei

## İsim
zan (斬, kesmek) + rei (霊, ruh). Okunuşu: ZAN-ray.

## Renkler
- Zemin `#0B0B10`
- Yüzey `#16161D`
- Metin `#F4F1EA`
- Marka vurgusu `#FF6A1A` (sadece buton/logo)
- İkincil `#2074BA`
- Durum renkleri (markadan ayrı): iyi `#3DDC97`, uyarı `#FFC94D`, kötü `#FF4D4D`

## Hedef
Windows 10 / 11 (32 ve 64 bit), tek `setup.exe`. Windows 8.1 ve eskisi desteklenmez: WebView2 109'da durdu, Rust'ın standart Windows hedefleri Windows 10 ister.
32 bit (i686) derleme iki mimaride de çalıştığı için tek kurulum yeter. 64 bit Windows'ta WOW64 yönlendirmesi kodda ele alınır (`crates/core/src/platform/windows.rs`).

## Yapı
- `crates/core` — işletim sisteminden bağımsız çekirdek: sistem tespiti, geri yükleme günlüğü, ayarlar. OS'e dokunan her şey `Platform` trait'inden geçer; macOS/Linux için sadece yeni bir `Platform` yazılır.
- `src-tauri` — Tauri 2 kabuğu (komutlar, pencere, Mica, kurulum paketi).
- `src` — React 19 + Fluent UI v9 + Motion arayüzü, `src/i18n/locales` altında 10 dil.

## Geri yükleme (zorunlu)
Hiçbir değişiklik, bir anlık görüntü (snapshot) olmadan yapılamaz. Snapshot = Windows geri yükleme noktası + uygulamanın kendi kayıt defteri günlüğü. Günlük, değişiklikten önce yazılır; uygulama yarıda kesilse bile geri alınabilir.

## Otomasyon seviyeleri
- Manuel: sen seçmedikçe hiçbir şey yapılmaz.
- Önerilen: güvenli iyileştirmeler önerilir, her birini sen onaylarsın.
- Otomatik: güvenli iyileştirmeler kendiliğinden uygulanır, her zaman önce snapshot alınır.

## Geliştirme
```
npm install
npm run tauri dev      # Windows'ta, yönetici olmayan terminalde çalışır
cargo test -p zanrei-core
```
Sürüm: `v0.1.0` gibi bir etiket gönderilince GitHub Actions kurulum dosyasını Releases'e yükler.

## Yol haritası
1. Temel (bu sürüm): kurulum sihirbazı, donanım tespiti, geri yükleme, arayüz kabuğu.
2. Risk seviyeli Windows tweak kataloğu (Güvenli / Orta / İleri), Edge kaldırma.
3. Oyun algılama, oyuna özel grafik ayarları, NVIDIA / AMD / Intel (eski kartlar dahil).
4. Arka planda çalışma ve Windows ile açılış (yönetici uygulaması olduğu için zamanlanmış görev gerekir).
