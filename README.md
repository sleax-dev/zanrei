# Zanrei

[![Build](https://github.com/thesleax/zanrei/actions/workflows/release.yml/badge.svg)](https://github.com/thesleax/zanrei/actions/workflows/release.yml)
[![Release](https://img.shields.io/github/v/release/thesleax/zanrei?include_prereleases)](https://github.com/thesleax/zanrei/releases)
![Platform](https://img.shields.io/badge/platform-Windows%2010%20%7C%2011-0078D4)

Windows için, her adımı geri alınabilir çalışan bir sistem optimizasyon uygulaması.

Zanrei bilgisayarının donanımını tespit eder, buna göre ne yapılabileceğini çıkarır ve değişiklikleri yalnızca bir geri yükleme noktası aldıktan sonra uygular. Yaptığı her şey uygulamanın içinden geri alınabilir.

> **Durum: erken geliştirme (v0.1).** Bu sürüm temeli içerir: kurulum sihirbazı, donanım tespiti, zorunlu geri yükleme sistemi ve arayüz. Windows ayarlarını değiştiren optimizasyonlar, Edge kaldırma ve oyun/ekran kartı profilleri henüz yok ([yol haritası](#yol-haritası)). Uygulama gerçek Windows donanımlarında kapsamlı olarak sınanmadı.

## İçindekiler
- [Özellikler](#özellikler)
- [Gereksinimler](#gereksinimler)
- [Kurulum](#kurulum)
- [Geri yükleme nasıl çalışır](#geri-yükleme-nasıl-çalışır)
- [Otomasyon seviyeleri](#otomasyon-seviyeleri)
- [Mimari](#mimari)
- [Geliştirme](#geliştirme)
- [Dil ve platform ekleme](#dil-ve-platform-ekleme)
- [Bilinen sınırlar](#bilinen-sınırlar)
- [Yol haritası](#yol-haritası)
- [Katkı ve güvenlik](#katkı-ve-güvenlik)

## Özellikler

Bu sürümde çalışanlar:

- **Kurulum sihirbazı.** İlk açılışta dil seçimi, donanım taramasının sonucu, geri yükleme noktası oluşturma ve otomasyon seviyesi seçimi.
- **Donanım tespiti.** İşletim sistemi sürümü ve derlemesi, işlemci (fiziksel çekirdek ve iş parçacığı), bellek, ekran kartları (NVIDIA / AMD / Intel, sürücü sürümü), diskler (SSD/HDD, boş alan). Sanal ekran bağdaştırıcıları (RDP, Hyper-V) listeden elenir.
- **Performans sınıfı.** Donanımdan türetilen üç sınıf: eski, orta, yüksek. İleride önerilerin neye göre seçileceğini bu sınıf belirleyecek.
- **Zorunlu geri yükleme.** Hiçbir değişiklik, önceden alınmış bir anlık görüntü (snapshot) olmadan yapılamaz. Ayrıntılar aşağıda.
- **Geri alma ekranı.** Anlık görüntüleri listeler, tek tıkla geri alır, Windows'un kendi Sistem Geri Yükleme aracını açar.
- **10 arayüz dili.** İngilizce, Türkçe, İspanyolca, Almanca, Fransızca, Portekizce, Rusça, Çince (Basitleştirilmiş), Japonca, Arapça (sağdan sola düzen dahil). Dil, Windows'un dilinden seçilir; kurulum sihirbazında ve ayarlarda değiştirilebilir.
- **Windows 11 görünümü.** Fluent UI bileşenleri, Windows 11'de Mica arka plan. Windows 10'da Mica yoktur, düz koyu arka plan kullanılır.

## Gereksinimler

| | |
|---|---|
| İşletim sistemi | Windows 10 veya Windows 11 |
| Mimari | 32 bit ve 64 bit (tek kurulum dosyası ikisinde de çalışır) |
| Yetki | Yönetici. Geri yükleme noktası ve sistem kayıt defteri değişiklikleri için gerekir; uygulama açılırken Windows yönetici izni ister. |
| WebView2 | Gerekir. Yüklü değilse kurulum, Microsoft'un küçük yükleyicisini indirir (internet bağlantısı gerekir). |
| Sistem Geri Yükleme | Windows'ta kapalı olabilir. Zanrei ilk geri yükleme noktasını alırken onu sistem sürücüsü için açar. Grup ilkesiyle engellenmişse nokta oluşturulamaz ve Zanrei hiçbir şeyi değiştirmez. |

**Windows 8.1 ve öncesi desteklenmez.** Microsoft, WebView2 desteğini 109 sürümünde bitirdi, Rust'ın standart Windows hedefleri de Windows 10 gerektiriyor. Kurulum dosyası 32 bit (i686) derlenir çünkü 32 bit uygulama hem 32 bit hem 64 bit Windows'ta çalışır.

## Kurulum

1. [Releases](https://github.com/thesleax/zanrei/releases) sayfasından en güncel `Zanrei_<sürüm>_x86-setup.exe` dosyasını indir.
2. Çalıştır. Kurulum sırasında dil seçebilirsin.
3. İlk açılışta kurulum sihirbazı başlar.

Kurulum dosyası henüz kod imzalı değil. Windows SmartScreen ilk çalıştırmada "bilinmeyen yayımcı" uyarısı verebilir; **Daha fazla bilgi → Yine de çalıştır** ile devam edilir.

## Geri yükleme nasıl çalışır

Bir anlık görüntü iki parçadan oluşur:

1. **Windows geri yükleme noktası.** PowerShell ile oluşturulur. Windows normalde 24 saat içinde ikinci bir nokta oluşturmayı sessizce atlar; Zanrei bu sınırı yalnızca kendi çağrısı süresince kaldırır ve önceki değeri geri koyar.
2. **Zanrei günlüğü.** Uygulamanın değiştirdiği her kayıt defteri değerinin eski hali, uygulama veri klasöründeki `snapshots` altında JSON olarak saklanır.

Güvence veren kurallar:

- Geri yükleme noktası oluşturulamazsa anlık görüntü de oluşturulmaz. Çağıran taraf devam edemez.
- Bir değer değişmeden **önce** eski hali günlüğe yazılır. Uygulama değişikliğin ortasında kapansa bile günlük eksiksizdir.
- Aynı değer bir anlık görüntüde birden çok kez değişirse en baştaki orijinal değer saklanır.
- Geri alma, kayıtları sondan başa doğru işler. Önceden var olmayan bir değer silinir, var olan eski haline döndürülür. Tek bir kayıt başarısız olursa diğerleri yine geri alınır, hata sonunda raporlanır.
- Geri alınmış bir anlık görüntüye yeni değişiklik yazılamaz.
- Tam sistem geri dönüşü için uygulamadan Windows Sistem Geri Yükleme açılabilir (yeniden başlatma gerektirir).

Günlük şimdilik yalnızca kayıt defteri değerlerini (sayı, metin) kapsar. Servisler, zamanlanmış görevler ve dosya değişiklikleri tweak kataloğu eklenirken günlüğe katılacak.

## Otomasyon seviyeleri

Kurulumda ve Ayarlar'da seçilir:

| Seviye | Davranış |
|---|---|
| Manuel | Sen seçmedikçe hiçbir şey uygulanmaz. |
| Önerilen | Güvenli iyileştirmeler önerilir, her birini sen onaylarsın. (Varsayılan) |
| Otomatik | Güvenli iyileştirmeler kendiliğinden uygulanır, her seferinde önce yeni bir anlık görüntü alınır. |

Seçim şimdi kaydediliyor; uygulanacak iyileştirmeler tweak kataloğu ile birlikte gelecek. Katalogdaki her öğe risk seviyesi taşıyacak ve en yüksek seviye hiçbir zaman otomatik uygulanmayacak.

## Mimari

```
zanrei/
├── crates/core/        İşletim sisteminden bağımsız çekirdek (Rust)
│   └── src/
│       ├── platform/   OS'e dokunan her şey burada: Platform trait'i,
│       │               windows.rs (gerçek uygulama), other.rs (Windows dışı yer tutucu)
│       ├── system.rs   Donanım tespiti ve performans sınıfı
│       ├── restore.rs  Anlık görüntü deposu ve kayıt defteri günlüğü
│       └── settings.rs Kullanıcı ayarları (atomik yazım)
├── src-tauri/          Tauri 2 kabuğu: komutlar, pencere, Mica, yönetici manifesti, NSIS kurulumu
├── src/                Arayüz: React 19, TypeScript, Fluent UI v9, Motion
│   ├── i18n/           i18next kurulumu ve dil dosyaları
│   ├── pages/          Kurulum sihirbazı, genel bakış, geri yükleme, ayarlar
│   └── components/
└── .github/workflows/  Test ve sürüm derlemesi
```

Tasarım kararları:

- **Tüm sistem erişimi `Platform` trait'inden geçer.** Çekirdek mantık (günlük, geri alma, ayarlar, sınıflandırma) işletim sisteminden bağımsızdır ve Linux'ta bile test edilebilir.
- **32 bit süreç, 64 bit Windows.** Tek kurulum için uygulama 32 bit derlenir; 64 bit Windows'ta kayıt defteri ve `System32` yönlendirmesini aşmak için 64 bit kayıt defteri görünümü ve `Sysnative` yolu açıkça kullanılır.
- **PowerShell girdileri komuta gömülmez.** Dışarıdan gelen metinler ortam değişkeniyle geçer.
- **Ağır işler arayüz iş parçacığında çalışmaz.** PowerShell ve disk işlemleri ayrı iş parçacığında yürür.

## Geliştirme

Gerekenler: Node.js 22, Rust (stable), `i686-pc-windows-msvc` hedefi, Visual Studio Build Tools (C++), WebView2.

```powershell
npm install
npm run tauri dev                      # geliştirme (yönetici olmayan terminalde çalışır)
npx tsc                                # arayüz tip kontrolü
cargo test -p zanrei-core              # çekirdek testleri (Windows dışında da çalışır)
cargo fmt --all --check                # biçim
cargo clippy -p zanrei-core -- -D warnings

rustup target add i686-pc-windows-msvc
npm run tauri build -- --target i686-pc-windows-msvc --bundles nsis
```

Kurulum dosyası `target/i686-pc-windows-msvc/release/bundle/nsis/` altında oluşur. Release derlemeleri yönetici manifestini gömer; debug derlemeleri gömmez, böylece `tauri dev` normal terminalden açılır.

**Sürüm çıkarmak:** `CHANGELOG.md`'yi ve `version` alanlarını (`package.json`, `src-tauri/tauri.conf.json`, `src-tauri/Cargo.toml`) güncelle, sonra `v0.1.0` gibi bir etiket gönder. GitHub Actions önce testleri çalıştırır, geçerse kurulum dosyasını derleyip Releases'e yükler.

## Dil ve platform ekleme

**Yeni dil:** `src/i18n/locales/en.ts` dosyasını kopyalayıp çevir, dosyanın başına `import type { Locale } from "./en"` ve sonuna `satisfies Locale` ekle (eksik anahtar derleme hatası verir), sonra `src/i18n/index.ts` içindeki iki listeye (`resources`, `LANGUAGES`) satırını ekle. Sağdan sola yazılan diller için `RTL` listesine ekle. Çeviriler şimdilik yapay zekâ taslağıdır, ana dili konuşanların gözden geçirmesi bekleniyor.

**Yeni işletim sistemi:** `crates/core/src/platform/` altında yeni bir `Platform` uygulaması yaz ve `platform::current()` içinde seçilmesini sağla. Çekirdek ve arayüz değişmez. Tauri tarafında pencere efekti ve yönetici yetkisi o platforma göre ayarlanmalı.

## Bilinen sınırlar

- Windows 8.1 ve öncesi desteklenmez (yukarıya bak).
- Kurulum dosyası kod imzalı değil.
- Ekran kartı belleği (VRAM) Windows'un verdiği 32 bit alandan okunuyor; 4 GB üstü kartlarda yanlış görünebilir. Ekran kartı profilleri eklenirken kayıt defterinden doğru değer okunacak.
- Performans sınıfı basit eşiklerle hesaplanıyor (bellek, çekirdek sayısı, SSD, ayrık ekran kartı) ve gerçek donanım verisiyle ayarlanacak.
- Anlık görüntü günlüğü yalnızca kayıt defteri değerlerini kapsar.
- Çeviriler gözden geçirilmedi.
- Uygulama Windows'ta uçtan uca henüz sınanmadı; çekirdek mantık testleri ve derleme kontrolleri dışında doğrulama yapılmadı.

## Yol haritası

1. **Temel** (bu sürüm): kurulum sihirbazı, donanım tespiti, geri yükleme, arayüz.
2. **Windows iyileştirmeleri:** risk seviyeli (güvenli / orta / ileri) tweak kataloğu, her öğe için açıklama ve geri alma; Microsoft Edge kaldırma.
3. **Oyunlar ve ekran kartları:** yüklü oyunları algılama (Steam, Epic ve diğer mağazalar), oyuna özel grafik ve sistem ayarları; NVIDIA, AMD ve Intel için sürücü ve profil ayarları, eski ekran kartları ve eski bilgisayarlar için ayrı profiller.
4. **Arka plan:** sistem tepsisinde çalışma, Windows ile birlikte açılma (yönetici uygulaması olduğu için zamanlanmış görev ile), her ikisi de ayarlardan kapatılabilir.
5. **Dağıtım:** kod imzalama, otomatik güncelleme.

## Katkı ve güvenlik

- Katkı vermek için [CONTRIBUTING.md](CONTRIBUTING.md).
- Güvenlik açığı bildirmek için [SECURITY.md](SECURITY.md). Zanrei sistem ayarlarını değiştirdiği için bu konuyu ciddiye alıyoruz.
- Değişiklik geçmişi: [CHANGELOG.md](CHANGELOG.md).

## Lisans

Henüz belirlenmedi.
