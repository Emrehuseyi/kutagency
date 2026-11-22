# Çikolata Kuşağı — Premium Web Demo V2

Çikolata Kuşağı için hazırlanmış mobil uyumlu, sinematik statik web sitesi demosudur.

## İçerik

- Ana sayfa: 11,6 saniyelik çikolata akış videosu ve özgün marka logosu
- İnteraktif menü: ürün arama, kategori filtreleri, ürün detayları
- Şubeler: şehir seçimi, şube bilgileri ve harita arama bağlantıları
- Franchise: form verilerini tarayıcıda bir başvuru özeti hâline getirir
- Masaüstü, tablet ve telefon görünümleri

## Vercel ile yayımlama

Bu kaynak kodu `cikolata-kusagi-v2` dalında tutulur; ajansın `main` dalına dokunulmaz.

1. Vercel'de yeni bir proje açıp GitHub üzerinden bu depoyu seçin.
2. Projenin Production Branch ayarını **`cikolata-kusagi-v2`** olarak belirleyin. KUT Agency'nin mevcut Vercel projesini değiştirmeyin; ayrı proje oluşturun.
3. Root Directory: proje kökü (`./`). Framework: **Other**.
4. Build Command: `npm run build`; Output Directory: `dist` (`vercel.json` içinde ayarlı).
5. Ortam değişkeni veya haricî paket gerekli değildir.

Yerel test için Node.js 20+ ile `npm run build` komutunu çalıştırın, ardından `dist/` klasörünü statik web sunucusuyla açın.

## Medya dosyaları

`media/part-000.bin` ... `part-015.bin` parçaları, toplam 21 görsel/video dosyasını içeren sıkıştırılmış paketin ardışık parçalarıdır. `build.mjs` derleme sırasında bunları birleştirerek `dist/images/` ve `dist/assets/` klasörlerine açar. Harici medya sunucusu kullanılmaz.

## Demo sınırları

- Franchise formu doğrudan bir veritabanına veya alıcıya gönderim yapmaz; yerel özet üretir.
- Bazı ürün görselleri konsepte yöneliktir. Fiyatlar, şube adresleri, marka izinleri ve KVKK metinleri yayından önce işletme tarafından onaylanmalıdır.
- Demo `robots` yönergeleriyle arama motorlarından saklanır.
