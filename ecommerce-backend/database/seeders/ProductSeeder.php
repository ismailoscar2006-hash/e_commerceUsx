<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all()->keyBy('name');

        // SMARTPHONES (20+ products)
        $this->createProducts($categories['Smartphones'], [
            ['Apple iPhone 15 Pro Max 256GB', 'Latest Apple flagship with A17 Pro chip, OLED display and professional camera system', 14999.99, 35],
            ['Apple iPhone 15 Pro 128GB', 'Premium smartphone with advanced camera and performance', 12999.99, 45],
            ['Apple iPhone 15 256GB', 'Latest generation iPhone with improved display and camera', 10999.99, 55],
            ['Samsung Galaxy S24 Ultra 512GB', 'Ultimate flagship with AI features, titanium design and excellent camera', 16499.99, 28],
            ['Samsung Galaxy S24 Pro 256GB', 'Professional smartphone with 6.8" display and Snapdragon 8 Gen 3', 13499.99, 42],
            ['Samsung Galaxy S24 128GB', 'Powerful flagship with great performance and display', 11499.99, 50],
            ['Samsung Galaxy A55 128GB', 'Mid-range phone with good performance and battery', 5999.99, 65],
            ['Xiaomi 14 Ultra 512GB', 'Premium phone with Snapdragon 8 Gen 3 and Leica camera', 8999.99, 40],
            ['Xiaomi 14 256GB', 'Flagship with excellent camera and performance', 7499.99, 52],
            ['Xiaomi 13 128GB', 'Previous gen flagship, still powerful and affordable', 5499.99, 60],
            ['Huawei P60 Pro 512GB', 'Premium smartphone with advanced camera technology', 9999.99, 32],
            ['Huawei P60 256GB', 'Flagship with excellent performance and camera', 8499.99, 48],
            ['OnePlus 12 256GB', 'Performance-focused phone with Snapdragon 8 Gen 3', 6999.99, 58],
            ['Motorola Edge 50 Pro 256GB', 'Premium Android phone with curved display', 6499.99, 55],
            ['Google Pixel 8 Pro 256GB', 'Google flagship with best computational photography', 11999.99, 38],
            ['Google Pixel 8 128GB', 'Excellent camera and AI features at lower price', 9999.99, 45],
            ['Oppo Find X8 Pro 512GB', 'Premium phone with advanced camera and design', 9499.99, 35],
            ['Vivo X200 256GB', 'High performance phone with good display', 7999.99, 50],
            ['Nothing Phone 2 256GB', 'Distinctive design with glyph interface', 5999.99, 52],
            ['Sony Xperia 1 VI 256GB', 'Professional phone with 4K display and cinema focus', 10999.99, 25],
        ]);

        // LAPTOPS (20+ products)
        $this->createProducts($categories['Laptops'], [
            ['Apple MacBook Pro 16" M4 Max 1TB', 'Ultimate laptop with M4 Max chip and exceptional performance', 24999.99, 12],
            ['Apple MacBook Pro 14" M4 512GB', 'Powerful laptop with M4 chip for professionals', 19999.99, 18],
            ['Apple MacBook Air M3 512GB 15"', 'Excellent value ultra-thin laptop with M3 performance', 14999.99, 25],
            ['Apple MacBook Air M3 256GB 13"', 'Compact and powerful MacBook Air', 12999.99, 32],
            ['Dell XPS 16 i9-14900HX RTX 4090', 'Premium Windows laptop with latest Intel and RTX 4090', 22999.99, 10],
            ['Dell XPS 15 i7-14700HX RTX 4080', 'Professional laptop with excellent performance', 18999.99, 15],
            ['HP Spectre x360 16" i9 RTX 4090', 'Premium 2-in-1 laptop with excellent display', 20999.99, 12],
            ['Lenovo ThinkPad X1 Extreme i9', 'Business laptop with great keyboard and performance', 17999.99, 18],
            ['Asus ROG Zephyrus G16 i9 RTX 4090', 'Gaming laptop with incredible performance', 21999.99, 14],
            ['Asus VivoBook 16" Ryzen 7', 'Good value laptop for creators', 9999.99, 35],
            ['Acer Swift 3 OLED i7', 'Lightweight laptop with OLED display', 8999.99, 38],
            ['MSI GS15 Stealth i9 RTX 4090', 'Ultra-thin gaming laptop with high performance', 19999.99, 11],
            ['Razer Blade 16 i9 RTX 4090', 'Premium gaming laptop with sleek design', 22999.99, 9],
            ['Samsung Galaxy Book4 Pro i9', 'Premium ultrabook with excellent display', 14999.99, 20],
            ['Huawei MateBook X Pro i9', 'Premium ultrabook with excellent build quality', 13999.99, 22],
            ['LG Gram 17" Ultra-light i7', 'Extremely lightweight laptop for travel', 11999.99, 28],
            ['Infinix InBook Air 12 Pro', 'Budget-friendly ultrabook', 4999.99, 45],
            ['Honor MagicBook Pro 16" i7', 'Performance laptop at good price', 8999.99, 35],
            ['Realme Book Prime i7', 'Budget ultrabook', 5499.99, 42],
            ['Chuwi LapBook Pro 16" i7', 'Affordable 16" laptop', 5999.99, 40],
            ['Jumper EZbook X3 Air', 'Budget portable laptop', 3999.99, 50],
        ]);

        // DESKTOP COMPUTERS (15+ products)
        $this->createProducts($categories['Desktop Computers'], [
            ['Dell XPS Desktop i9-14900K RTX 4090', 'Premium desktop for creators and professionals', 19999.99, 8],
            ['HP Z2 Tower G9 Xeon RTX 6000', 'Workstation-class desktop for professionals', 18999.99, 6],
            ['Asus ProArt PA System i9 RTX 4080', 'Professional desktop for content creation', 17999.99, 7],
            ['Lenovo ThinkCentre M70 i7', 'Business desktop with reliability', 8999.99, 18],
            ['Dell OptiPlex 7090 i9', 'Enterprise desktop solution', 9999.99, 15],
            ['Apple Mac Studio M2 Ultra 128GB', 'Powerful desktop for professionals', 16999.99, 10],
            ['Apple Mac Mini M4 512GB', 'Compact powerful desktop', 7999.99, 22],
            ['iMac 27" M4 1TB', 'All-in-one desktop with great display', 12999.99, 14],
            ['iMac 24" M4 512GB', 'Compact all-in-one with elegant design', 9999.99, 20],
            ['MSI Infinite X3 i9 RTX 4090', 'High-end gaming and content creation desktop', 15999.99, 9],
            ['Corsair One i200 i9 RTX 4080', 'Liquid-cooled high-performance desktop', 14999.99, 8],
            ['NZXT H7 Flow i7 RTX 4070', 'Stylish gaming desktop', 9999.99, 16],
            ['Alienware Aurora R16 i9 RTX 4090', 'Premium gaming desktop', 16999.99, 7],
            ['CyberPowerPC Elite i7 RTX 4070', 'Gaming desktop at good price', 8999.99, 20],
            ['ABS Computer PC i7 RTX 4070', 'Affordable gaming computer', 7999.99, 25],
        ]);

        // GAMING PCS (18+ products)
        $this->createProducts($categories['Gaming PCs'], [
            ['ASUS ROG Gaming PC i9-14900K RTX 4090', 'Top-tier gaming desktop with maximum performance', 24999.99, 6],
            ['Alienware Aurora R16 i9 RTX 4090', 'Premium gaming desktop with excellent thermals', 22999.99, 8],
            ['MSI MEG Aegis Ti5 i9 RTX 4090', 'High-end gaming with premium components', 21999.99, 7],
            ['Corsair Graphite Series 780T i9', 'Enthusiast gaming PC with liquid cooling', 19999.99, 9],
            ['NZXT Streaming PC i9 RTX 4080', 'Gaming and streaming optimized PC', 15999.99, 11],
            ['Skytech Prism II i9 RTX 4080', 'High-performance gaming PC', 14999.99, 13],
            ['CyberPowerPC Gamer Master i7 RTX 4080', 'Excellent gaming PC at mid-range price', 11999.99, 16],
            ['iBuyPower Element 260 i7 RTX 4070', 'Good gaming PC for budget', 8999.99, 22],
            ['ABS Computer Stratos i7 RTX 4070', 'Affordable gaming desktop', 7999.99, 26],
            ['Ironside Computer i9 RTX 4090', 'Custom-built high-end gaming PC', 20999.99, 8],
            ['CLX SET Gaming PC i7 RTX 4070', 'Pre-built gaming computer', 10999.99, 18],
            ['AVA Computers Elite i9 RTX 4080', 'Gaming PC with custom cooling', 16999.99, 10],
            ['Scan 3XS Gaming Rig i9 RTX 4090', 'UK-built gaming PC', 23999.99, 5],
            ['Maingear Rush i9 RTX 4090', 'Custom gaming PC', 22999.99, 6],
            ['Digital Storm Bolt i9 RTX 4090', 'Custom-designed gaming desktop', 21999.99, 7],
            ['ABS Stratos Aqua i9 RTX 4080', 'Liquid-cooled gaming PC', 17999.99, 9],
            ['Falcon Northwest Tiki i9 RTX 4090', 'Compact gaming PC with high performance', 19999.99, 8],
            ['Velocious Gaming System i7 RTX 4070', 'Gaming PC at good value', 9999.99, 20],
        ]);

        // TABLETS (15+ products)
        $this->createProducts($categories['Tablets'], [
            ['Apple iPad Pro 12.9" M4 1TB WiFi', 'Premium tablet with M4 chip and excellent display', 11999.99, 18],
            ['Apple iPad Pro 11" M4 512GB WiFi', 'Portable iPad Pro with great performance', 9999.99, 25],
            ['Apple iPad Air 11" M2 256GB WiFi', 'Premium air model with M2 performance', 7999.99, 28],
            ['Apple iPad 11" M4 128GB WiFi', 'Standard iPad with great value', 5999.99, 35],
            ['Apple iPad Mini 7 128GB WiFi', 'Compact powerful tablet', 4999.99, 32],
            ['Samsung Galaxy Tab S10 Ultra 1TB WiFi', 'Premium Android tablet with S Pen', 8999.99, 16],
            ['Samsung Galaxy Tab S10+ 512GB WiFi', 'Large Android tablet with AMOLED', 6999.99, 22],
            ['Samsung Galaxy Tab S10 256GB WiFi', 'Mid-size tablet', 5999.99, 28],
            ['Samsung Galaxy Tab A9 128GB WiFi', 'Budget tablet for entertainment', 2999.99, 45],
            ['Xiaomi Pad 7 512GB WiFi', 'Premium Android tablet', 4999.99, 30],
            ['Xiaomi Pad 6S Pro 256GB WiFi', 'High-performance tablet', 4499.99, 32],
            ['OnePlus Pad Pro 256GB WiFi', 'Performance Android tablet', 5999.99, 26],
            ['Lenovo Tab P12 Pro Gen 2 256GB WiFi', 'Professional tablet', 5499.99, 28],
            ['Huawei MatePad Pro 12.2" 512GB WiFi', 'Premium tablet with HarmonyOS', 6999.99, 20],
            ['Microsoft Surface Pro 10 512GB WiFi', 'Hybrid tablet/laptop', 7999.99, 22],
        ]);

        // SMART WATCHES (15+ products)
        $this->createProducts($categories['Smart Watches'], [
            ['Apple Watch Ultra 2 49mm', 'Premium rugged smartwatch with long battery', 3999.99, 28],
            ['Apple Watch Series 9 45mm', 'Latest Apple watch with always-on display', 2999.99, 35],
            ['Apple Watch SE 3', 'Affordable Apple watch', 1999.99, 42],
            ['Samsung Galaxy Watch 7 Classic 47mm', 'Premium smartwatch with rotating bezel', 2999.99, 32],
            ['Samsung Galaxy Watch 7 45mm', 'Latest Galaxy watch', 2499.99, 38],
            ['Samsung Galaxy Watch FE', 'Budget-friendly Galaxy watch', 1499.99, 45],
            ['Xiaomi Watch S1 Pro', 'Premium smartwatch with AMOLED', 1999.99, 35],
            ['Garmin Epix Gen 2', 'Sports watch with AMOLED display', 2999.99, 25],
            ['Garmin Fenix 7X', 'Premium sports smartwatch', 3499.99, 22],
            ['Fitbit Sense 2', 'Health-focused smartwatch', 1999.99, 38],
            ['Huawei Watch 4 Pro', 'Premium smartwatch', 1999.99, 32],
            ['OnePlus Watch 2', 'Performance smartwatch', 1499.99, 40],
            ['Fossil Gen 6 Wellness', 'Fashion smartwatch', 1399.99, 42],
            ['Mobvoi TicWatch Pro 5', 'Dual display smartwatch', 1999.99, 35],
            ['Amazfit GTR 4', 'Budget sports watch', 999.99, 50],
        ]);

        // HEADPHONES (18+ products)
        $this->createProducts($categories['Headphones'], [
            ['Apple AirPods Pro 2 with USB-C', 'Premium wireless headphones with ANC', 1999.99, 42],
            ['Apple AirPods Max', 'Spatial audio headphones', 8999.99, 15],
            ['Sony WH-1000XM5', 'Industry-leading noise cancellation headphones', 3499.99, 35],
            ['Sony WH-CH720N', 'Budget Sony headphones with ANC', 1299.99, 50],
            ['Bose QuietComfort Ultra', 'Premium Bose headphones', 3999.99, 28],
            ['Bose QuietComfort 45', 'Previous generation Bose', 2999.99, 38],
            ['Sennheiser Momentum 4', 'Premium headphones with excellent battery', 2999.99, 32],
            ['Audio-Technica ATH-M50xBT2', 'Professional wireless headphones', 1999.99, 40],
            ['JBL Tour Pro 2', 'Premium JBL headphones', 2499.99, 35],
            ['Beats Studio Pro', 'Apple-owned premium headphones', 3499.99, 30],
            ['Shure AONIC 50', 'Premium wireless headphones', 2999.99, 28],
            ['Anker Soundcore Space Q45', 'Budget headphones with ANC', 1299.99, 52],
            ['Soundcore Life Q35', 'Mid-range headphones', 999.99, 55],
            ['Realme Buds Studio', 'Affordable wireless headphones', 799.99, 60],
            ['OnePlus Pad Pro', 'Budget option', 699.99, 65],
            ['Xiaomi Headphones', 'Budget-friendly option', 599.99, 70],
            ['JBL Tune 760NC', 'Affordable JBL headphones', 1299.99, 48],
            ['Razer Opus 3 Pro', 'Gaming-focused headphones', 1999.99, 38],
        ]);

        // EARBUDS (18+ products)
        $this->createProducts($categories['Earbuds'], [
            ['Apple AirPods Pro 2nd Generation', 'Premium wireless earbuds with ANC', 1999.99, 48],
            ['Apple AirPods 3', 'Mid-range Apple earbuds', 1299.99, 55],
            ['Apple AirPods 2', 'Budget Apple earbuds', 999.99, 60],
            ['Sony WF-C700N', 'Compact Sony earbuds with ANC', 1299.99, 50],
            ['Sony LinkBuds S', 'Premium compact earbuds', 1499.99, 45],
            ['Bose QuietComfort Ultra Earbuds', 'Premium Bose earbuds', 2499.99, 32],
            ['Bose QuietComfort Earbuds II', 'Excellent Bose earbuds', 1999.99, 38],
            ['Samsung Galaxy Buds3 Pro', 'Premium Samsung earbuds', 1999.99, 40],
            ['Samsung Galaxy Buds3', 'Standard Galaxy earbuds', 1299.99, 48],
            ['Nothing Ear', 'Transparent design earbuds', 999.99, 55],
            ['Xiaomi Buds 5 Pro', 'Premium Xiaomi earbuds', 1299.99, 45],
            ['Soundcore Space A40', 'Budget earbuds with ANC', 699.99, 65],
            ['JBL Tour Pro 2 Earbuds', 'Premium JBL earbuds', 1999.99, 38],
            ['Anker Soundcore Liberty 4', 'Affordable good quality earbuds', 799.99, 60],
            ['Realme Buds Air 6D', 'Budget earbuds', 599.99, 70],
            ['Oppo Enco X2', 'Premium earbuds', 1499.99, 42],
            ['OnePlus Buds Pro 2', 'Performance earbuds', 1299.99, 46],
            ['Huawei Freebuds Pro 3', 'Premium Huawei earbuds', 1399.99, 44],
        ]);

        // SPEAKERS (15+ products)
        $this->createProducts($categories['Speakers'], [
            ['Apple HomePod Pro', 'Premium smart speaker', 3999.99, 28],
            ['Apple HomePod mini', 'Compact smart speaker', 1999.99, 40],
            ['Google Nest Audio', 'Smart speaker with Google Assistant', 1499.99, 45],
            ['Google Nest Hub Max', 'Smart display speaker', 2499.99, 35],
            ['Amazon Echo Studio', 'Premium Alexa speaker', 1999.99, 42],
            ['Amazon Echo Dot 5th Gen', 'Budget smart speaker', 999.99, 55],
            ['JBL PartyBox Ultimate', 'Premium party speaker', 9999.99, 8],
            ['JBL Link Portable', 'Portable JBL speaker', 2999.99, 32],
            ['Sony ULT Tower', 'Premium Sony speaker', 3999.99, 25],
            ['Bose SoundLink Max', 'Premium portable speaker', 3999.99, 28],
            ['Bose SoundLink Flex', 'Mid-range portable speaker', 2499.99, 35],
            ['Beats Pill', 'Compact wireless speaker', 1999.99, 38],
            ['UE Boom 3', 'Portable party speaker', 1999.99, 40],
            ['Sonos One', 'Smart wireless speaker', 1999.99, 42],
            ['Samsung Galaxy Home Mini', 'Budget smart speaker', 999.99, 50],
        ]);

        // MONITORS (18+ products)
        $this->createProducts($categories['Monitors'], [
            ['Apple Pro Display XDR 6K', 'Premium professional display', 19999.99, 8],
            ['LG UltraFine 27UP550', 'Professional 4K monitor', 4999.99, 15],
            ['Dell U3425WE 34.5" Ultrawide', 'Premium ultrawide monitor', 5999.99, 12],
            ['ASUS ProArt PA348QV 34"', 'Professional video editing monitor', 4999.99, 14],
            ['BenQ SW240 24"', 'Color-accurate monitor', 3499.99, 18],
            ['Dell S2721DGF 27" 240Hz', 'Gaming monitor with high refresh', 2999.99, 25],
            ['LG 27GN950 27" 240Hz', 'Premium gaming monitor', 2999.99, 22],
            ['ASUS ROG Swift PG27AQN 27" 360Hz', 'Extreme gaming monitor', 4999.99, 15],
            ['MSI Oculux GN251PQS 25" 360Hz', 'Competitive gaming monitor', 2499.99, 28],
            ['Samsung Odyssey G9 49"', 'Ultra-wide gaming monitor', 4499.99, 12],
            ['LG 27UP550 4K 60Hz', 'Affordable 4K monitor', 2999.99, 20],
            ['Dell S2722DC 27" USB-C', 'Versatile USB-C monitor', 3499.99, 18],
            ['ASUS PA278QV 27"', 'Budget professional monitor', 2499.99, 22],
            ['BenQ PD2700U 27" 4K', 'Photography monitor', 3499.99, 16],
            ['LG 27GN800 27" 144Hz', 'Affordable gaming monitor', 1999.99, 32],
            ['Dell S2722DGM 27" 165Hz', 'Good gaming monitor', 2499.99, 25],
            ['ASUS VA24EHE 24"', 'Budget office monitor', 999.99, 45],
            ['LG 24UD58 24" 4K', 'Budget 4K monitor', 1999.99, 28],
        ]);

        // KEYBOARDS (18+ products)
        $this->createProducts($categories['Keyboards'], [
            ['Apple Magic Keyboard with Touch ID', 'Premium wireless keyboard', 3999.99, 25],
            ['Logitech MX Keys S', 'Premium wireless keyboard for professionals', 1899.99, 35],
            ['Corsair K95 Platinum XT', 'Premium mechanical gaming keyboard', 2999.99, 18],
            ['Razer Pro Type Ultra', 'Professional wireless keyboard', 1999.99, 28],
            ['SteelSeries Apex Pro', 'Adjustable mechanical keyboard', 2499.99, 22],
            ['Keychron K2 Pro', 'Compact mechanical keyboard', 999.99, 45],
            ['Leopold FC900R', 'Premium mechanical keyboard', 1499.99, 32],
            ['Ducky One 3 Mini', 'Compact gaming keyboard', 1299.99, 38],
            ['GMMK Pro', 'Customizable mechanical keyboard', 1399.99, 35],
            ['Varmilo VA108M', 'Premium quality keyboard', 1799.99, 28],
            ['iKBC F108 RGB', 'Quality mechanical keyboard', 999.99, 42],
            ['Filco Majestouch', 'Classic premium keyboard', 1299.99, 36],
            ['HHKB Professional', 'Premium compact keyboard', 2299.99, 24],
            ['Microsoft Ergonomic Keyboard', 'Ergonomic wireless keyboard', 799.99, 48],
            ['Anker Mechanical Keyboard', 'Budget mechanical keyboard', 599.99, 55],
            ['Logitech K840', 'Mechanical gaming keyboard', 1499.99, 32],
            ['SteelSeries Apex 3', 'Budget gaming keyboard', 799.99, 50],
            ['Razer DeathStalker V2', 'Low-profile gaming keyboard', 1699.99, 30],
        ]);

        // MICE (18+ products)
        $this->createProducts($categories['Mice'], [
            ['Logitech MX Master 3S', 'Premium wireless mouse', 1299.99, 38],
            ['Apple Magic Mouse', 'Premium wireless mouse', 999.99, 42],
            ['Razer Pro Click', 'Professional wireless mouse', 1099.99, 35],
            ['SteelSeries Rival 3 Pro', 'Gaming mouse', 899.99, 45],
            ['Corsair Dark Core RGB Pro', 'Premium gaming mouse', 1299.99, 32],
            ['Finalmouse Ultralight 2', 'Lightweight gaming mouse', 799.99, 40],
            ['Logitech G Pro X Superlight 2', 'Professional gaming mouse', 999.99, 38],
            ['ASUS ROG Chakram Core', 'Gaming mouse with joystick', 599.99, 50],
            ['BenQ EC2', 'Esports mouse', 699.99, 48],
            ['Zowie FK2', 'Competitive gaming mouse', 599.99, 52],
            ['Microsoft Pro IntelliMouse', 'Classic professional mouse', 699.99, 46],
            ['Anker Ergonomic Mouse', 'Budget ergonomic mouse', 399.99, 65],
            ['Logitech MK470 Combo', 'Keyboard and mouse combo', 699.99, 50],
            ['Razer Basilisk V3', 'Gaming mouse with features', 1099.99, 36],
            ['SteelSeries Sensei Ten', 'Esports mouse', 899.99, 40],
            ['Glorious Model O Wireless', 'Gaming mouse', 699.99, 48],
            ['Corsair M65 RGB Ultra', 'Gaming mouse with side buttons', 999.99, 38],
            ['Mad Catz R.A.T. 8+', 'Customizable gaming mouse', 799.99, 42],
        ]);

        // PRINTERS (12+ products)
        $this->createProducts($categories['Printers'], [
            ['Canon imagePROGRAF PRO-1100', 'Professional photo printer', 7999.99, 6],
            ['Epson SureColor P9000', 'Premium photo printer', 5999.99, 8],
            ['HP LaserJet Enterprise M607', 'Professional laser printer', 3999.99, 12],
            ['Brother HL-L8360CDW', 'Color laser printer', 2499.99, 18],
            ['Canon imageCLASS MF445dw', 'Multifunction color printer', 1999.99, 22],
            ['Epson WorkForce Pro WF-C5790', 'Multifunction printer', 1699.99, 25],
            ['HP OfficeJet Pro 9025e', 'All-in-one printer', 1499.99, 28],
            ['Brother MFC-L9550CDWT', 'Multifunction color printer', 1799.99, 24],
            ['Canon pixma TR8520', 'Home photo printer', 999.99, 35],
            ['Epson Expression Photo XP-15000', 'Home photo printer', 1199.99, 32],
            ['HP Envy Photo 7920', 'Home all-in-one printer', 799.99, 40],
            ['Xerox VersaLink C405', 'Commercial color printer', 2999.99, 14],
        ]);

        // CAMERAS (18+ products)
        $this->createProducts($categories['Cameras'], [
            ['Canon EOS R5 Mark II', 'Professional mirrorless camera', 8999.99, 10],
            ['Sony a1 II', 'Premium mirrorless camera', 8499.99, 12],
            ['Nikon Z9', 'Professional flagship camera', 7999.99, 11],
            ['Canon EOS R6 Mark II', 'Full-frame mirrorless camera', 4999.99, 18],
            ['Sony a7R V', 'High-resolution mirrorless camera', 5999.99, 15],
            ['Nikon Z8', 'Premium mirrorless camera', 6499.99, 13],
            ['Canon EOS R8', 'Entry full-frame mirrorless', 3499.99, 22],
            ['Sony a6700', 'APS-C mirrorless camera', 2999.99, 25],
            ['Nikon Z fc II', 'Entry mirrorless camera', 1999.99, 28],
            ['Canon PowerShot G7 X Mark III', 'Compact premium camera', 1499.99, 32],
            ['Sony RX100 VII', 'Premium compact camera', 1799.99, 30],
            ['GoPro HERO12 Black', 'Action camera', 1999.99, 35],
            ['DJI Osmo Action 4', 'Action camera', 999.99, 42],
            ['Insta360 ONE X2', '360 action camera', 999.99, 38],
            ['Fujifilm X-T5', 'Premium mirrorless camera', 1999.99, 26],
            ['Pentax K-3 III', 'Professional DSLR', 2499.99, 20],
            ['Panasonic S1H', 'Video-focused mirrorless', 3999.99, 14],
            ['Leica Q3', 'Premium compact camera', 4999.99, 12],
        ]);

        // NETWORKING (15+ products)
        $this->createProducts($categories['Networking'], [
            ['Apple AirPort Extreme', 'Premium WiFi 6E router', 1999.99, 22],
            ['ASUS ROG Rapture GT-AX12000', 'Gaming WiFi 6 router', 2499.99, 18],
            ['Netgear Nighthawk AXE7800', 'WiFi 6E router', 1999.99, 20],
            ['TP-Link Archer AXE300', 'WiFi 6E router', 1299.99, 25],
            ['UniFi Dream Machine Pro', 'Professional networking', 2999.99, 14],
            ['Ubiquiti Unifi 6E Pro', 'Professional WiFi 6E', 1799.99, 18],
            ['Eero Pro 6E', 'Mesh WiFi 6E system', 1499.99, 22],
            ['Google Nest WiFi Pro', 'Mesh WiFi 6E system', 1299.99, 28],
            ['Amazon eero Pro 6', 'Mesh WiFi 6 system', 999.99, 32],
            ['Synology RT6300', 'Mesh WiFi 6 router', 999.99, 30],
            ['Linksys Velop Pro 6E', 'Mesh WiFi 6E', 1199.99, 26],
            ['D-Link Eagle Pro AI M32', 'Budget mesh router', 799.99, 38],
            ['Tenda AX12 Pro', 'Budget WiFi 6 router', 699.99, 42],
            ['TP-Link Archer C6U', 'Budget WiFi 5 router', 599.99, 48],
            ['Netgear CM1200', 'Modem/Router combo', 1299.99, 24],
        ]);

        // STORAGE DEVICES (15+ products)
        $this->createProducts($categories['Storage Devices'], [
            ['Samsung 990 Pro 4TB NVMe SSD', 'Premium NVMe SSD', 2999.99, 18],
            ['Crucial P5 Plus 2TB NVMe', 'High-speed NVMe SSD', 1299.99, 28],
            ['Western Digital Black SN850X 4TB', 'Gaming NVMe SSD', 1999.99, 22],
            ['Kingston FURY Renegade 2TB', 'Premium NVMe SSD', 1499.99, 25],
            ['Samsung 870 EVO 4TB SSD', 'SATA SSD', 1999.99, 20],
            ['Crucial MX500 2TB SSD', 'Reliable SATA SSD', 1099.99, 26],
            ['WD Red Pro 12TB HDD', 'NAS storage drive', 2999.99, 10],
            ['Seagate Barracuda Pro 14TB', 'Performance HDD', 2499.99, 12],
            ['WD Blue 4TB HDD', 'Consumer storage drive', 699.99, 35],
            ['Seagate Expansion 10TB', 'External storage drive', 1499.99, 20],
            ['WD Elements 8TB', 'External HDD', 999.99, 25],
            ['Seagate Backup Plus 5TB', 'Portable external drive', 799.99, 28],
            ['SanDisk Extreme Portable SSD 2TB', 'Rugged external SSD', 1299.99, 22],
            ['Samsung T5 2TB External SSD', 'Premium external SSD', 1099.99, 26],
            ['LaCie 1TB rugged USB-C', 'Durable portable drive', 699.99, 32],
        ]);

        // POWER BANKS (15+ products)
        $this->createProducts($categories['Power Banks'], [
            ['Anker 737 65W Power Bank 55000mAh', 'High-capacity fast charging', 1299.99, 28],
            ['Anker 533 100W Power Bank 49200mAh', 'Premium power bank', 999.99, 32],
            ['Baseus Super Energy 100W', 'Fast charging power bank', 899.99, 35],
            ['RAVPower RP-PB054 65W', 'Premium power bank', 1199.99, 26],
            ['Anker PowerCore 26800mAh', 'High-capacity portable charger', 799.99, 38],
            ['Omni 20 Plus 20000mAh', 'Portable power bank', 699.99, 42],
            ['Belkin Boost Charge 20K', 'Premium power bank', 599.99, 45],
            ['Samsung Wireless Charger Pad 15W', 'Wireless charging pad', 299.99, 55],
            ['Anker 3-in-1 Wireless Charger', 'Multi-device wireless charger', 499.99, 48],
            ['Mophie Wireless Charging Pad', 'Premium wireless charger', 399.99, 50],
            ['Nitecore NB2800 28000mAh', 'Heavy-duty power bank', 899.99, 32],
            ['ZMI Aura 30000mAh', 'Large capacity power bank', 699.99, 40],
            ['Xiaomi Redmi 20000mAh', 'Budget power bank', 399.99, 60],
            ['ROMOSS Zeus 50000mAh', 'Ultra high capacity', 1099.99, 28],
            ['Poweradd 20000mAh', 'Budget portable charger', 299.99, 65],
        ]);

        // CHARGERS (15+ products)
        $this->createProducts($categories['Chargers'], [
            ['Anker 747 Charger 150W GaN', 'Premium multi-port charger', 1299.99, 22],
            ['RAVPower RP-PC128 140W GaN Charger', 'High-power charger', 999.99, 25],
            ['Apple 140W USB-C Power Adapter', 'Official Apple charger', 1599.99, 18],
            ['Belkin 68W Dual USB-C Charger', 'Premium dual charger', 699.99, 32],
            ['Anker 65W Charger 2-port USB-C', 'Fast charging compact', 599.99, 38],
            ['Nitecore UMS4 Quad Charger', 'Battery charger', 699.99, 28],
            ['Samsung 45W Super Fast Charger', 'Samsung fast charger', 299.99, 50],
            ['OnePlus Warp Charge 65W', 'Fast charging adapter', 399.99, 45],
            ['Xiaomi 120W HyperCharge', 'Ultra-fast charger', 699.99, 35],
            ['Baseus 100W GaN Charger', 'Multi-port charger', 799.99, 30],
            ['Anker 30W PowerIQ Charger', 'Compact fast charger', 399.99, 48],
            ['Belkin Boost Charge 30W USB-C', 'Travel charger', 399.99, 50],
            ['Mophie 30W USB-C', 'Premium compact charger', 499.99, 42],
            ['Spigen USB-C Charger 45W', 'Budget fast charger', 299.99, 60],
            ['Anker Nano Charger 20W', 'Compact charger', 199.99, 70],
        ]);

        // COMPUTER ACCESSORIES (20+ products)
        $this->createProducts($categories['Computer Accessories'], [
            ['ASUS ProArt USB-C Hub', 'Premium USB hub', 1299.99, 18],
            ['Anker 7-in-1 USB Hub', 'Multi-port USB hub', 399.99, 45],
            ['Elgato Thunderbolt 3 Pro Dock', 'Professional dock', 2499.99, 12],
            ['Lenovo Thinkpad USB-C Hub', 'Business dock', 999.99, 24],
            ['Belkin USB 3.0 Hub 7-port', 'Basic USB hub', 399.99, 48],
            ['Plugable USB 3.0 Hub 7-port', 'Powered USB hub', 399.99, 46],
            ['Twelve South BackPack', 'MacBook stand', 499.99, 35],
            ['Rain Design mStand', 'Aluminum laptop stand', 599.99, 32],
            ['Joby GorillaPod', 'Flexible tripod', 299.99, 50],
            ['Manfrotto Befree Advanced', 'Professional tripod', 1299.99, 16],
            ['AmazonBasics Laptop Stand', 'Budget laptop stand', 199.99, 60],
            ['Lamicall Phone Stand', 'Phone holder', 199.99, 65],
            ['3M Monitor Riser', 'Monitor stand', 399.99, 40],
            ['Autonomous SmartDesk Pro', 'Electric standing desk', 4999.99, 8],
            ['Autonomous SmartDesk', 'Standing desk', 2999.99, 12],
            ['IKEA Bekant Standing Desk', 'Budget standing desk', 999.99, 18],
            ['Beskar Desk Pad', 'Mouse pad', 299.99, 55],
            ['Logitech G PowerPlay', 'Wireless charging mouse pad', 499.99, 35],
            ['Herman Miller Aeron Chair', 'Premium office chair', 7999.99, 6],
            ['Steelcase Leap', 'Professional ergonomic chair', 5999.99, 8],
        ]);

        // GAMING ACCESSORIES (20+ products)
        $this->createProducts($categories['Gaming Accessories'], [
            ['SCUF Impact Controller', 'Premium gaming controller', 1799.99, 20],
            ['8BitDo Pro 2 Controller', 'Professional gaming controller', 999.99, 32],
            ['Microsoft Xbox Wireless Controller', 'Official Xbox controller', 499.99, 50],
            ['PlayStation DualSense Controller', 'PS5 controller', 599.99, 48],
            ['Nintendo Pro Controller', 'Switch pro controller', 499.99, 45],
            ['Turtle Beach Stealth 600 Headset', 'Gaming headset', 899.99, 35],
            ['HyperX Cloud Flight', 'Wireless gaming headset', 1099.99, 28],
            ['SteelSeries Arctis Nova Pro', 'Premium gaming headset', 1999.99, 20],
            ['Razer Kiyo Pro Webcam', 'Gaming webcam', 999.99, 30],
            ['Elgato Facecam', 'Professional webcam', 799.99, 32],
            ['Rode NT1 Microphone', 'Professional microphone', 1499.99, 24],
            ['Blue Yeti USB Microphone', 'Budget streaming mic', 699.99, 40],
            ['Corsair Scimitar Pro RGB', 'MMO gaming mouse', 999.99, 35],
            ['Razer Naga Pro', 'MMO gaming mouse', 1299.99, 30],
            ['SteelSeries QcK Gaming Mousepad', 'Gaming mouse pad', 399.99, 50],
            ['ASUS ROG Sheath Gaming Mousepad', 'Large gaming mouse pad', 499.99, 45],
            ['Elgato Stream Deck Pedal', 'Foot pedal controller', 799.99, 24],
            ['Focusrite Scarlett 2i2', 'Audio interface', 1399.99, 18],
            ['Behringer U-Phoria UMC202HD', 'Budget audio interface', 699.99, 28],
            ['Native Instruments Traktor S2', 'DJ controller', 3999.99, 10],
        ]);

        // Create remaining users with carts
        $users = \App\Models\User::where('role', 'client')->get();
        foreach ($users as $user) {
            if (!$user->cart) {
                \App\Models\Cart::create(['user_id' => $user->id]);
            }
        }
    }

    private function createProducts($category, $productsData)
    {
        $categoryImageMap = [
            'Smartphones' => 'smartphones',
            'Laptops' => 'laptops',
            'Desktop Computers' => 'desktops',
            'Gaming PCs' => 'gaming-pcs',
            'Tablets' => 'tablets',
            'Smart Watches' => 'smartwatches',
            'Headphones' => 'headphones',
            'Earbuds' => 'earbuds',
            'Speakers' => 'speakers',
            'Monitors' => 'monitors',
            'Keyboards' => 'keyboards',
            'Mice' => 'mice',
            'Printers' => 'printers',
            'Cameras' => 'cameras',
            'Networking' => 'networking',
            'Storage Devices' => 'storage',
            'Power Banks' => 'powerbanks',
            'Chargers' => 'chargers',
            'Computer Accessories' => 'accessories',
            'Gaming Accessories' => 'gaming-accessories',
        ];

        $folder = $categoryImageMap[$category->name] ?? 'products';

        foreach ($productsData as $data) {
            [$name, $description, $price, $stock] = $data;

            // Create slug from product name
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
            $imagePath = "products/{$folder}/{$slug}.jpg";

            Product::create([
                'category_id' => $category->id,
                'name' => $name,
                'description' => $description,
                'price' => $price,
                'stock' => $stock,
                'image' => $imagePath,
            ]);
        }
    }
}
