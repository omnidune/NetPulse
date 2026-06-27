/**
 * NetPulse - Network Latency & Quality Diagnostics
 * Core Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Global Translation Variables & Helpers
    let currentLang = localStorage.getItem('lang') || 'en';
    const langNames = {
        bn: "বাংলা",
        de: "Deutsch",
        en: "English",
        gu: "ગુજરાતી",
        hi: "हिन्दी",
        ja: "日本語",
        ml: "മലയാളം",
        mr: "मराठी",
        pa: "ਪੰਜਾਬੀ",
        es: "Español",
        ta: "தமிழ்",
        te: "తెలుగు"
    };

    // Extend translations dynamically to handle formatting parameters
    if (window.translations) {
        window.translations.en["check.ws.result"] = "Echo: {echo}ms (Handshake: {hand}ms)";
        window.translations.en["check.downlink.cdn"] = "{speed} Mbps (CDN Fetch)";
        window.translations.en["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.en["check.downlink.unreported"] = "Downlink Unreported";
        window.translations.en["modal.grades.title"] = "Connection Performance Grades";
        window.translations.en["modal.grades.a.title"] = "Pristine & Excellent";
        window.translations.en["modal.grades.a.desc"] = "Perfect stability and ultra-low latency. Ideal for high-stakes gaming, virtual reality, 4K streaming, and real-time trading.";
        window.translations.en["modal.grades.b.title"] = "Good & Stable";
        window.translations.en["modal.grades.b.desc"] = "Highly responsive. Excellent for high-definition video conferencing, casual gaming, and standard remote office operations.";
        window.translations.en["modal.grades.c.title"] = "Fair & Acceptable";
        window.translations.en["modal.grades.c.desc"] = "Passable for browsing, checking email, and social media. You may encounter occasional buffer cycles or in-game latency spikes.";
        window.translations.en["modal.grades.df.title"] = "Poor & Unstable";
        window.translations.en["modal.grades.df.desc"] = "Critical latency or high packet loss. Connection will frequently experience disconnects, lag, and audio/video interruptions.";
        
        window.translations.es["check.ws.result"] = "Eco: {echo}ms (Conexión: {hand}ms)";
        window.translations.es["check.downlink.cdn"] = "{speed} Mbps (Descarga CDN)";
        window.translations.es["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.es["check.downlink.unreported"] = "Velocidad no reportada";
        window.translations.es["modal.grades.title"] = "Grados de rendimiento de conexión";
        window.translations.es["modal.grades.a.title"] = "Prístino y excelente";
        window.translations.es["modal.grades.a.desc"] = "Estabilidad perfecta y latencia ultra baja. Ideal para juegos competitivos, realidad virtual, transmisión 4K y trading en tiempo real.";
        window.translations.es["modal.grades.b.title"] = "Bueno y estable";
        window.translations.es["modal.grades.b.desc"] = "Altamente responsivo. Excelente para videoconferencias en alta definición, juegos casuales y operaciones estándar de oficina remota.";
        window.translations.es["modal.grades.c.title"] = "Regular y aceptable";
        window.translations.es["modal.grades.c.desc"] = "Aceptable para navegación, correo electrónico y redes sociales. Puede experimentar ciclos de almacenamiento en búfer ocasionales o picos de latencia en el juego.";
        window.translations.es["modal.grades.df.title"] = "Deficiente e inestable";
        window.translations.es["modal.grades.df.desc"] = "Latencia crítica o alta pérdida de paquetes. La conexión experimentará interrupciones frecuentes, retrasos y cortes de audio o video.";
        
        window.translations.de["check.ws.result"] = "Echo: {echo}ms (Handshake: {hand}ms)";
        window.translations.de["check.downlink.cdn"] = "{speed} Mbps (CDN-Abruf)";
        window.translations.de["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.de["check.downlink.unreported"] = "Geschwindigkeit nicht gemeldet";
        window.translations.de["modal.grades.title"] = "Verbindungsleistungsklassen";
        window.translations.de["modal.grades.a.title"] = "Hervorragend & exzellent";
        window.translations.de["modal.grades.a.desc"] = "Perfekte Stabilität und extrem niedrige Latenz. Ideal für kompetitives Gaming, VR, 4K-Streaming und Echtzeithandel.";
        window.translations.de["modal.grades.b.title"] = "Gut & stabil";
        window.translations.de["modal.grades.b.desc"] = "Sehr reaktionsschnell. Hervorragend geeignet für hochauflösende Videokonferenzen, Gelegenheitsspiele und Standard-Homeoffice-Arbeiten.";
        window.translations.de["modal.grades.c.title"] = "Mittelmäßig & akzeptabel";
        window.translations.de["modal.grades.c.desc"] = "Ausreichend für Surfen, E-Mails und soziale Medien. Es kann gelegentlich zu Pufferzeiten oder Latenzspitzen im Spiel kommen.";
        window.translations.de["modal.grades.df.title"] = "Schlecht & instabil";
        window.translations.de["modal.grades.df.desc"] = "Kritische Latenzzeit oder hoher Paketverlust. Die Verbindung leidet häufig unter Verbindungsabbrüchen, Verzögerungen sowie Audio-/Videounterbrechungen.";
        
        window.translations.hi["check.ws.result"] = "इको: {echo}ms (हैंडशेक: {hand}ms)";
        window.translations.hi["check.downlink.cdn"] = "{speed} Mbps (CDN फ़ेच)";
        window.translations.hi["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.hi["check.downlink.unreported"] = "डाउनलिंक असूचित";
        window.translations.hi["modal.grades.title"] = "कनेक्शन प्रदर्शन ग्रेड";
        window.translations.hi["modal.grades.a.title"] = "सर्वोत्तम और उत्कृष्ट";
        window.translations.hi["modal.grades.a.desc"] = "पूर्ण स्थिरता और बेहद कम विलंबता (लो पिंग)। ऑनलाइन गेमिंग, 4K स्ट्रीमिंग और रियल-टाइम ट्रेडिंग के लिए सर्वोत्तम।";
        window.translations.hi["modal.grades.b.title"] = "अच्छा और स्थिर";
        window.translations.hi["modal.grades.b.desc"] = "अत्यधिक प्रतिक्रियाशील। एचडी वीडियो कॉन्फ्रेंसिंग, सामान्य गेमिंग और रिमोट ऑफिस कार्यों के लिए बेहतरीन।";
        window.translations.hi["modal.grades.c.title"] = "साधारण और स्वीकार्य";
        window.translations.hi["modal.grades.c.desc"] = "ब्राउज़िंग, ईमेल और सोशल मीडिया के लिए ठीक। कभी-कभी बफरिंग या गेम में हल्की रुकावट देखने को मिल सकती है।";
        window.translations.hi["modal.grades.df.title"] = "खराब और अस्थिर";
        window.translations.hi["modal.grades.df.desc"] = "गंभीर विलंबता या उच्च पैकेट नुकसान। कनेक्शन में बार-बार डिस्कनेक्ट होना, भारी लैग और ऑडियो/वीडियो में रुकावटें आ सकती हैं।";
        
        window.translations.ja["check.ws.result"] = "応答: {echo}ms (接続: {hand}ms)";
        window.translations.ja["check.downlink.cdn"] = "{speed} Mbps (CDN取得)";
        window.translations.ja["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.ja["check.downlink.unreported"] = "下り速度取得不可";
        window.translations.ja["modal.grades.title"] = "接続品質評価基準";
        window.translations.ja["modal.grades.a.title"] = "最高評価 & 優秀";
        window.translations.ja["modal.grades.a.desc"] = "完璧な安定性と極限の低遅延。FPSゲームやクラウドゲーミング、4K配信、リアルタイム金融取引に最適です。";
        window.translations.ja["modal.grades.b.title"] = "良好 & 安定";
        window.translations.ja["modal.grades.b.desc"] = "優れた応答性。高画質なビデオ会議や一般的なネット利用、日常のリモートワーク作業に十分適しています。";
        window.translations.ja["modal.grades.c.title"] = "普通 & 許容可能";
        window.translations.ja["modal.grades.c.desc"] = "Web閲覧やSNS、メール送受信向け。ゲームの遅延や動画視聴時のバッファリングがたまに発生する可能性があります。";
        window.translations.ja["modal.grades.df.title"] = "低品質 & 不安定";
        window.translations.ja["modal.grades.df.desc"] = "深刻な遅延や高確率のパケットロス。切断、強烈なラグ、音声・ビデオ通話のプツプツとした途切れが多発します。";
        
        // Tamil (ta)
        window.translations.ta["check.ws.result"] = "எக்கோ: {echo}ms (இணைப்பு: {hand}ms)";
        window.translations.ta["check.downlink.cdn"] = "{speed} Mbps (CDN பதிவிறக்கம்)";
        window.translations.ta["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.ta["check.downlink.unreported"] = "பதிவிறக்கம் அளவிடப்படவில்லை";
        window.translations.ta["modal.grades.title"] = "இணைப்பு செயல்திறன் தரவரிசை";
        window.translations.ta["modal.grades.a.title"] = "சிறந்த மற்றும் மிகவும் நன்று";
        window.translations.ta["modal.grades.a.desc"] = "முழு ஸ்திரத்தன்மை மற்றும் மிகக் குறைந்த தாமதம். ஆன்லைன் கேமிங், 4K ஸ்ட்ரீமிங் மற்றும் நிகழ்நேர பயன்பாடுகளுக்கு சிறந்தது.";
        window.translations.ta["modal.grades.b.title"] = "நல்லது மற்றும் நிலையானது";
        window.translations.ta["modal.grades.b.desc"] = "விரைவான பதில். எச்டி வீடியோ அழைப்புகள் மற்றும் ரிமோட் அலுவலக பணிகளுக்கு சிறந்தது.";
        window.translations.ta["modal.grades.c.title"] = "சாதாரணமானது மற்றும் ஏற்கத்தக்கது";
        window.translations.ta["modal.grades.c.desc"] = "உலாவுதல் மற்றும் மின்னஞ்சல்களுக்கு போதுமானது. எப்போதாவது பஃபரிங் ஏற்படலாம்.";
        window.translations.ta["modal.grades.df.title"] = "மோசமானது மற்றும் நிலையற்றது";
        window.translations.ta["modal.grades.df.desc"] = "அதிக தாமதம் அல்லது பாக்கெட் இழப்பு. அடிக்கடி இணைப்பு துண்டிப்பு மற்றும் வீடியோ தடங்கல்கள் ஏற்படலாம்.";

        // Telugu (te)
        window.translations.te["check.ws.result"] = "ఎకో: {echo}ms (కనెక్షన్: {hand}ms)";
        window.translations.te["check.downlink.cdn"] = "{speed} Mbps (CDN డౌన్‌లోడ్)";
        window.translations.te["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.te["check.downlink.unreported"] = "డౌన్‌లోడ్ స్పీడ్ తెలియదు";
        window.translations.te["modal.grades.title"] = "కనెక్షన్ పనితీరు గ్రేడ్‌లు";
        window.translations.te["modal.grades.a.title"] = "అత్యుత్తమ మరియు అద్భుతమైన";
        window.translations.te["modal.grades.a.desc"] = "పూర్తి స్థిరత్వం మరియు చాలా తక్కువ జాప్యం. ఆన్‌లైన్ గేమింగ్, 4K స్ట్రీమింగ్ మరియు రియల్-టైమ్ యాప్స్ కొరకు ఉత్తమమైనది.";
        window.translations.te["modal.grades.b.title"] = "మంచిది మరియు స్థిరమైనది";
        window.translations.te["modal.grades.b.desc"] = "చాలా వేగవంతమైనది. హెచ్‌డీ వీడియో కాన్ఫరెన్స్‌లు మరియు రిమోట్ ఆఫీస్ పనులకు అద్భుతమైనది.";
        window.translations.te["modal.grades.c.title"] = "సాధారణ మరియు ఆమోదయోగ్యమైన";
        window.translations.te["modal.grades.c.desc"] = "బ్రౌజింగ్ మరియు ఈమెయిల్‌లకు సరిపోతుంది. కొన్నిసార్లు బఫరింగ్ సంభవించవచ్చు.";
        window.translations.te["modal.grades.df.title"] = "బాగోలేదు మరియు అస్థిరమైన";
        window.translations.te["modal.grades.df.desc"] = "తీవ్రమైన జాప్యం లేదా ప్యాకెట్ నష్టం. కనెక్షన్ తరచుగా డిస్‌కనెక్ట్ కావడం మరియు వీడియో అగిపోవడం జరుగుతుంది.";

        // Malayalam (ml)
        window.translations.ml["check.ws.result"] = "എക്കോ: {echo}ms (ബന്ധപ്പെടൽ: {hand}ms)";
        window.translations.ml["check.downlink.cdn"] = "{speed} Mbps (CDN ഡൗൺലോഡ്)";
        window.translations.ml["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.ml["check.downlink.unreported"] = "വേഗത ലഭ്യമല്ല";
        window.translations.ml["modal.grades.title"] = "കണക്ഷൻ പ്രവർത്തന നിലവാരം";
        window.translations.ml["modal.grades.a.title"] = "അതിശ്രേഷ്ഠം & മികച്ചത്";
        window.translations.ml["modal.grades.a.desc"] = "പൂർണ്ണ സ്ഥിരതയും വളരെ കുറഞ്ഞ ലേറ്റൻസിയും. ഓൺലൈൻ ഗെയിമിംഗ്, 4K സ്ട്രീമിംഗ് എന്നിവയ്ക്ക് ഏറ്റവും അനുയോജ്യം.";
        window.translations.ml["modal.grades.b.title"] = "നല്ലത് & സ്ഥിരതയുള്ളത്";
        window.translations.ml["modal.grades.b.desc"] = "വേഗതയേറിയ പ്രതികരണം. എച്ച്ഡി വീഡിയോ കോളുകൾക്കും ഓഫീസ് ജോലികൾക്കും മികച്ചത്.";
        window.translations.ml["modal.grades.c.title"] = "സാധാരണം & സ്വീകാര്യം";
        window.translations.ml["modal.grades.c.desc"] = "ബ്രൗസിംഗിനും ഇമെയിൽ അയക്കാനും മതിയാകും. ചിലപ്പോൾ ബഫറിംഗ് ഉണ്ടായേക്കാം.";
        window.translations.ml["modal.grades.df.title"] = "മോശം & അസ്ഥിരമാണ്";
        window.translations.ml["modal.grades.df.desc"] = "ഉയർന്ന ലേറ്റൻസി അല്ലെങ്കിൽ കൂടുതൽ പാക്കറ്റ് നഷ്ടം. കണക്ഷൻ അടിക്കടി തടസ്സപ്പെടാൻ സാധ്യതയുണ്ട്.";

        // Punjabi (pa)
        window.translations.pa["check.ws.result"] = "ਇਕੋ: {echo}ms (ਕਨੈਕਸ਼ਨ: {hand}ms)";
        window.translations.pa["check.downlink.cdn"] = "{speed} Mbps (CDN ਡਾਊਨਲੋਡ)";
        window.translations.pa["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.pa["check.downlink.unreported"] = "ਸਪੀਡ ਪਤਾ ਨਹੀਂ ਲੱਗੀ";
        window.translations.pa["modal.grades.title"] = "ਕਨੈਕਸ਼ਨ ਗੁਣਵੱਤਾ ਗ੍ਰੇਡ";
        window.translations.pa["modal.grades.a.title"] = "ਉੱਤਮ ਅਤੇ ਬਹੁਤ ਵਧੀਆ";
        window.translations.pa["modal.grades.a.desc"] = "ਪੂਰੀ ਸਥਿਰਤਾ ਅਤੇ ਬਹੁਤ ਘੱਟ ਦੇਰੀ। ਗੇਮਿੰਗ, 4K ਸਟ੍ਰੀਮਿੰਗ ਅਤੇ ਹੋਰ ਰੀਅਲ-ਟਾਈਮ ਵਰਤੋਂ ਲਈ ਉੱਤਮ।";
        window.translations.pa["modal.grades.b.title"] = "ਵਧੀਆ ਅਤੇ ਸਥਿਰ";
        window.translations.pa["modal.grades.b.desc"] = "ਤੇਜ਼ ਪ੍ਰਤੀਕਿਰਿਆ। ਐਚਡੀ ਵੀਡੀਓ ਕਾਲਾਂ ਅਤੇ ਰੀਮੋਟ ਦਫਤਰ ਦੇ ਕੰਮਾਂ ਲਈ ਵਧੀਆ।";
        window.translations.pa["modal.grades.c.title"] = "ਦਰਮਿਆਨਾ ਅਤੇ ਸਵੀਕਾਰਯੋਗ";
        window.translations.pa["modal.grades.c.desc"] = "ਵੈੱਬ ਬ੍ਰਾਊਜ਼ਿੰਗ ਅਤੇ ਈਮੇਲਾਂ ਲਈ ਠੀਕ ਹੈ। ਕਦੇ-ਕਦਾਈਂ ਬਫਰਿੰਗ ਹੋ ਸਕਦੀ ਹੈ।";
        window.translations.pa["modal.grades.df.title"] = "ਖਰਾਬ ਅਤੇ ਅਸਥਿਰ";
        window.translations.pa["modal.grades.df.desc"] = "ਗੰਭੀਰ ਦੇਰੀ ਜਾਂ ਉੱਚ ਪੈਕੇਟ ਨੁਕਸਾਨ। ਕਨੈਕਸ਼ਨ ਵਾਰ-ਵਾਰ ਟੁੱਟ ਸਕਦਾ ਹੈ ਅਤੇ ਵੀਡੀਓ ਰੁਕ ਸਕਦੀ ਹੈ।";

        // Marathi (mr)
        window.translations.mr["check.ws.result"] = "इको: {echo}ms (कनेक्शन: {hand}ms)";
        window.translations.mr["check.downlink.cdn"] = "{speed} Mbps (CDN डाउनलोड)";
        window.translations.mr["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.mr["check.downlink.unreported"] = "डाउनलोड गती कळाली नाही";
        window.translations.mr["modal.grades.title"] = "कनेक्शन गुणवत्ता श्रेणी";
        window.translations.mr["modal.grades.a.title"] = "सर्वोत्तम आणि उत्कृष्ट";
        window.translations.mr["modal.grades.a.desc"] = "पूर्ण स्थिरता आणि अत्यंत कमी विलंबता. ऑनलाइन गेमिंग, 4K स्ट्रीमिंग आणि रिअल-टाइम कामांसाठी सर्वोत्तम.";
        window.translations.mr["modal.grades.b.title"] = "चांगले आणि स्थिर";
        window.translations.mr["modal.grades.b.desc"] = "जलद प्रतिसाद. एचडी व्हिडिओ कॉन्फरन्स आणि रिमोट ऑफिस कामासाठी उत्तम.";
        window.translations.mr["modal.grades.c.title"] = "साधारण आणि स्वीकार्य";
        window.translations.mr["modal.grades.c.desc"] = "ब्राउझिंग आणि ईमेलसाठी योग्य. कधीकधी बफरिंगचा अनुभव येऊ शकतो.";
        window.translations.mr["modal.grades.df.title"] = "खराब आणि अस्थिर";
        window.translations.mr["modal.grades.df.desc"] = "गंभीर विलंबता किंवा उच्च पॅकेट गळती. वारंवार कनेक्शन तुटणे आणि व्हिडिओ व्यत्यय येऊ शकतो.";

        // Gujarati (gu)
        window.translations.gu["check.ws.result"] = "ઇકો: {echo}ms (કનેક્શન: {hand}ms)";
        window.translations.gu["check.downlink.cdn"] = "{speed} Mbps (CDN ડાઉનલોડ)";
        window.translations.gu["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.gu["check.downlink.unreported"] = "ડાઉનલોડ ઝડપ મળી નથી";
        window.translations.gu["modal.grades.title"] = "કનેક્શન પ્રદર્શન ગ્રેડ";
        window.translations.gu["modal.grades.a.title"] = "સર્વોત્તમ અને ઉત્કૃષ્ટ";
        window.translations.gu["modal.grades.a.desc"] = "સંપૂર્ણ સ્થિરતા અને ખૂબ ઓછી વિલંબતા. ઓનલાઇન ગેમિંગ, 4K સ્ટ્રીમિંગ અને રીઅલ-ટાઇમ કાર્યો માટે સર્વોત્તમ.";
        window.translations.gu["modal.grades.b.title"] = "સારું અને સ્થિર";
        window.translations.gu["modal.grades.b.desc"] = "ખૂબ ઝડપી પ્રતિસાદ. એચડી વિડિયો કોન્ફરન્સ અને રિમોટ ઓફિસના કાર્યો માટે ઉત્તમ.";
        window.translations.gu["modal.grades.c.title"] = "સામાન્ય અને સ્વીકાર્ય";
        window.translations.gu["modal.grades.c.desc"] = "બ્રાઉઝિંગ અને ઇમેઇલ માટે યોગ્ય. ક્યારેક બફરિંગ થઈ શકે છે.";
        window.translations.gu["modal.grades.df.title"] = "ખરાબ અને અસ્થિર";
        window.translations.gu["modal.grades.df.desc"] = "ગંભીર વિલંબતા અથવા ઉચ્ચ પેકેટ નુકસાન. કનેક્શન વારંવાર તૂટી શકે છે અને વિડિયોમાં અડચણ આવી શકે છે.";

        // Bengali (bn)
        window.translations.bn["check.ws.result"] = "ইকো: {echo}ms (সংযোগ: {hand}ms)";
        window.translations.bn["check.downlink.cdn"] = "{speed} Mbps (CDN ডাউনলোড)";
        window.translations.bn["check.downlink.browser"] = "{speed} Mbps ({type})";
        window.translations.bn["check.downlink.unreported"] = "ডাউনলোড গতি জানা যায়নি";
        window.translations.bn["modal.grades.title"] = "সংযোগ পারফরম্যান্সের গ্রেড";
        window.translations.bn["modal.grades.a.title"] = "আদিম ও চমৎকার";
        window.translations.bn["modal.grades.a.desc"] = "নিখুঁত স্থায়িত্ব এবং অতি-নিম্ন ল্যাটেন্সি। প্রতিযোগিতামূলক অনলাইন গেমিং, VR, 4K ভিডিও এবং রিয়েল-টাইম ট্রেডিংয়ের জন্য আদর্শ।";
        window.translations.bn["modal.grades.b.title"] = "ভালো ও স্থিতিশীল";
        window.translations.bn["modal.grades.b.desc"] = "খুবই প্রতিক্রিয়াশীল। হাই-ডেফিনিশন ভিডিও কল এবং রিমোট অফিসের কাজের জন্য চমৎকার।";
        window.translations.bn["modal.grades.c.title"] = "মোটামুটি ও গ্রহণযোগ্য";
        window.translations.bn["modal.grades.c.desc"] = "সাধারণ ব্রাউজিং এবং সোশ্যাল মিডিয়ার জন্য যথেষ্ট। তবে গেমিং বা ভিডিও স্ট্রিমিংয়ে মাঝে মাঝে বাফারিং হতে পারে।";
        window.translations.bn["modal.grades.df.title"] = "দুর্বল ও অস্থিতিশীল";
        window.translations.bn["modal.grades.df.desc"] = "মারাত্মক ল্যাটেন্সি বা উচ্চ প্যাকেট ক্ষতি। ঘন ঘন সংযোগ বিচ্ছিন্নতা, ল্যাগ এবং অডিও/ভিডিওতে ব্যাঘাত ঘটবে।";
    }

    function getTranslation(key, params = {}) {
        if (!window.translations) return '';
        const dict = window.translations[currentLang] || window.translations['en'];
        let text = dict[key] || window.translations['en'][key] || '';
        
        Object.keys(params).forEach(p => {
            text = text.replace(`{${p}}`, params[p]);
        });
        return text;
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        
        // Sync custom dropdown UI labels and states
        const currentLangLabel = document.getElementById('current-lang-label');
        if (currentLangLabel) {
            currentLangLabel.textContent = langNames[lang] || "English";
        }

        const items = document.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            if (item.getAttribute('data-lang') === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Translate annotated DOM nodes
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = getTranslation(key);
            if (translation) {
                if (el.tagName === 'INPUT' && el.placeholder) {
                    el.placeholder = translation;
                } else if (el.tagName === 'OPTION') {
                    el.textContent = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Toggle state text changes
        if (!isTesting) {
            if (pingData.length === 0) {
                globalStatusText.textContent = getTranslation('status.ready');
                if (chartConnectionStatus) chartConnectionStatus.textContent = getTranslation('status.ready');
                verdictDesc.textContent = getTranslation('verdict.default');
            } else {
                updateStatistics(pingData);
                if (chartConnectionStatus) chartConnectionStatus.textContent = getTranslation('status.ready');
            }
        } else {
            if (wasPausedByVisibility) {
                globalStatusText.textContent = getTranslation('status.paused');
                if (chartConnectionStatus) chartConnectionStatus.textContent = getTranslation('status.paused');
            } else {
                globalStatusText.textContent = getTranslation('status.testing');
                if (chartConnectionStatus) chartConnectionStatus.textContent = getTranslation('status.testing');
            }
        }
    }

    // DOM Elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const serverSelect = document.getElementById('server-select');
    const customServerWrapper = document.getElementById('custom-server-wrapper');
    const customServerInput = document.getElementById('custom-server-input');
    const testDurationSelect = document.getElementById('test-duration');
    const pingIntervalSelect = document.getElementById('ping-interval');
    const startTestBtn = document.getElementById('btn-start-test');
    
    // Status elements
    const globalStatusDot = document.getElementById('global-status-dot');
    const globalStatusText = document.getElementById('global-status-text');
    const currentPingDisplay = document.getElementById('current-ping-display');
    const pulseRings = [
        document.getElementById('pulse-ring-1'),
        document.getElementById('pulse-ring-2'),
        document.getElementById('pulse-ring-3')
    ];
    const gaugeProgress = document.getElementById('gauge-progress');

    // Metrics cards elements
    const statLatencyAvg = document.getElementById('stat-latency-avg');
    const statLatencyMin = document.getElementById('stat-latency-min');
    const statLatencyMax = document.getElementById('stat-latency-max');
    const latencyRating = document.getElementById('latency-rating');

    const statJitter = document.getElementById('stat-jitter');
    const statJitterConsistency = document.getElementById('stat-jitter-consistency');
    const jitterRating = document.getElementById('jitter-rating');

    const statLossPercent = document.getElementById('stat-loss-percent');
    const statLossCount = document.getElementById('stat-loss-count');
    const statSentCount = document.getElementById('stat-sent-count');
    const lossRating = document.getElementById('loss-rating');

    const statGrade = document.getElementById('stat-grade');
    const statQualityPct = document.getElementById('stat-quality-pct');
    const scoreProgressBar = document.getElementById('score-progress-bar');
    const scoreText = document.getElementById('score-text');

    // Diagnostic Verdicts & Checklist
    const verdictDesc = document.getElementById('verdict-desc');
    const checkWebsockets = document.getElementById('check-websockets');
    const checkWsValue = document.getElementById('check-ws-value');
    const checkBrowserType = document.getElementById('check-browsertype');
    const checkBrowserValue = document.getElementById('check-browser-value');
    const checkDnsLookup = document.getElementById('check-dns-lookup');
    const checkDnsValue = document.getElementById('check-dns-value');

    // Canvas Chart
    const canvas = document.getElementById('latency-chart');
    const chartConnectionStatus = document.getElementById('chart-connection-status');

    // CDN comparison
    const btnRunCdn = document.getElementById('btn-run-cdn-comparison');
    const nodesList = document.getElementById('nodes-comparison-list');

    // Modals
    const aboutModal = document.getElementById('about-modal');
    const linkShowAbout = document.getElementById('link-show-about');
    const btnCloseModal = document.getElementById('btn-close-modal');

    // App State Variables
    let isTesting = false;
    let pingData = []; // Array of { index, latency, status }
    let testIntervalId = null;
    let currentServerName = '';
    let currentServerUrl = '';
    let pingTimeoutLimit = 1500; // ms
    let continuousMode = false;
    let wasPausedByVisibility = false;
    let runPingIterationRef = null;
    let wakeLock = null; // Screen Wake Lock reference to keep screen active on mobile
    const MAX_CONTINUOUS_PINGS = 1200; // ~10 minutes safety cutoff at 500ms interval
    
    // Custom Canvas Chart Class Definition
    class LatencyChart {
        constructor(canvasElement) {
            this.canvas = canvasElement;
            this.ctx = this.canvas.getContext('2d');
            this.points = [];
            this.hoverIndex = -1;
            
            // Listen for window resize
            window.addEventListener('resize', () => this.resize());
            
            // Mouse move listener for hover tooltip
            this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            this.canvas.addEventListener('mouseleave', () => {
                this.hoverIndex = -1;
                this.draw();
            });
            
            this.resize();
        }

        resize() {
            const rect = this.canvas.parentElement.getBoundingClientRect();
            // Set canvas display size
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            
            // Handle high DPI retina screens
            const dpr = window.devicePixelRatio || 1;
            this.canvas.width = rect.width * dpr;
            this.canvas.height = Math.max(220, rect.height) * dpr;
            
            this.ctx.resetTransform();
            this.ctx.scale(dpr, dpr);
            
            this.width = rect.width;
            this.height = Math.max(220, rect.height);
            this.draw();
        }

        setData(points) {
            this.points = points;
            this.draw();
        }

        handleMouseMove(e) {
            if (this.points.length === 0) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            
            // Margins
            const paddingLeft = 50;
            const paddingRight = 20;
            const chartWidth = this.width - paddingLeft - paddingRight;
            
            // Find closest data point by X coordinate
            let closestDist = Infinity;
            let closestIdx = -1;
            
            this.points.forEach((pt, i) => {
                const x = paddingLeft + (i / Math.max(1, this.points.length - 1)) * chartWidth;
                const dist = Math.abs(mouseX - x);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIdx = i;
                }
            });
            
            // Set hover index if mouse is reasonably close (within 20px)
            if (closestIdx !== -1 && closestDist < 25) {
                if (this.hoverIndex !== closestIdx) {
                    this.hoverIndex = closestIdx;
                    this.draw();
                }
            } else {
                if (this.hoverIndex !== -1) {
                    this.hoverIndex = -1;
                    this.draw();
                }
            }
        }

        draw() {
            const ctx = this.ctx;
            const width = this.width;
            const height = this.height;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Margins
            const paddingLeft = 50;
            const paddingRight = 20;
            const paddingTop = 20;
            const paddingBottom = 35;
            const chartWidth = width - paddingLeft - paddingRight;
            const chartHeight = height - paddingTop - paddingBottom;
            
            if (chartWidth <= 0 || chartHeight <= 0) return;

            const isDark = document.body.classList.contains('dark-theme');
            const colorText = isDark ? '#8b92b6' : '#606780';
            const colorGrid = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
            const colorTimeoutLine = 'rgba(255, 23, 68, 0.35)';

            // Draw Y-Axis Grid Lines & Labels
            const yLines = [50, 100, 150];
            const maxPingVal = this.points.reduce((max, p) => p.latency > max ? p.latency : max, 150);
            const scaleMaxY = Math.ceil(maxPingVal / 50) * 50; // Dynamic scale max based on data
            
            ctx.save();
            ctx.strokeStyle = colorGrid;
            ctx.lineWidth = 1;
            ctx.fillStyle = colorText;
            ctx.font = '10px "Plus Jakarta Sans", sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            
            const gridValues = [];
            for (let v = 50; v <= scaleMaxY; v += v >= 200 ? 100 : 50) {
                gridValues.push(v);
            }
            if (gridValues.length > 5) {
                // Keep it simplified if scale is huge
                gridValues.length = 0;
                gridValues.push(100, 250, 500, 1000);
            }

            gridValues.forEach(val => {
                const y = height - paddingBottom - (val / scaleMaxY) * chartHeight;
                if (y >= paddingTop) {
                    ctx.beginPath();
                    ctx.moveTo(paddingLeft, y);
                    ctx.lineTo(width - paddingRight, y);
                    ctx.stroke();
                    ctx.fillText(val + ' ms', paddingLeft - 8, y);
                }
            });
            ctx.restore();

            // Draw Timeouts Threshold dashed line
            const timeoutY = height - paddingBottom - (500 / scaleMaxY) * chartHeight; // Draw threshold mark at 500ms
            if (timeoutY >= paddingTop) {
                ctx.save();
                ctx.strokeStyle = colorTimeoutLine;
                ctx.lineWidth = 1.5;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(paddingLeft, timeoutY);
                ctx.lineTo(width - paddingRight, timeoutY);
                ctx.stroke();
                ctx.restore();
            }

            if (this.points.length === 0) {
                // Draw empty state text
                ctx.fillStyle = colorText;
                ctx.font = '13px "Plus Jakarta Sans", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Waiting for diagnostic stream...', paddingLeft + chartWidth / 2, paddingTop + chartHeight / 2);
                return;
            }

            // Map data points to X, Y coordinates
            const coords = this.points.map((pt, i) => {
                const x = paddingLeft + (i / Math.max(1, this.points.length - 1)) * chartWidth;
                const latVal = pt.status === 'timeout' ? scaleMaxY : Math.min(pt.latency, scaleMaxY);
                const y = height - paddingBottom - (latVal / scaleMaxY) * chartHeight;
                return { x, y, pt, idx: i };
            });

            // Draw Filled Gradient under curve
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(coords[0].x, height - paddingBottom);
            coords.forEach(coord => {
                ctx.lineTo(coord.x, coord.y);
            });
            ctx.lineTo(coords[coords.length - 1].x, height - paddingBottom);
            ctx.closePath();
            
            const areaGrad = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
            if (isDark) {
                areaGrad.addColorStop(0, 'rgba(0, 242, 254, 0.25)');
                areaGrad.addColorStop(0.5, 'rgba(157, 78, 221, 0.1)');
                areaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            } else {
                areaGrad.addColorStop(0, 'rgba(0, 153, 255, 0.2)');
                areaGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            }
            ctx.fillStyle = areaGrad;
            ctx.fill();
            ctx.restore();

            // Draw Main Line Path
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(coords[0].x, coords[0].y);
            
            // Draw smooth standard lines or rounded joints
            for (let i = 1; i < coords.length; i++) {
                ctx.lineTo(coords[i].x, coords[i].y);
            }
            
            ctx.strokeStyle = isDark ? '#00f2fe' : '#0077b6';
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            // Add subtle glow
            if (isDark) {
                ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
                ctx.shadowBlur = 8;
            }
            ctx.stroke();
            ctx.restore();

            // Draw Points
            ctx.save();
            coords.forEach((coord, i) => {
                ctx.beginPath();
                if (coord.pt.status === 'timeout') {
                    ctx.arc(coord.x, coord.y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = '#ff1744';
                    ctx.fill();
                } else {
                    ctx.arc(coord.x, coord.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = isDark ? '#00f2fe' : '#0077b6';
                    ctx.fill();
                    ctx.strokeStyle = isDark ? '#07090e' : '#ffffff';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
            ctx.restore();

            // Draw Hover overlay line & Tooltip
            if (this.hoverIndex !== -1 && this.hoverIndex < coords.length) {
                const hoverCoord = coords[this.hoverIndex];
                
                ctx.save();
                // Vertical dashed hover line
                ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(hoverCoord.x, paddingTop);
                ctx.lineTo(hoverCoord.x, height - paddingBottom);
                ctx.stroke();
                
                // Draw larger highlight circle at node
                ctx.restore();
                ctx.save();
                ctx.beginPath();
                ctx.arc(hoverCoord.x, hoverCoord.y, 7, 0, Math.PI * 2);
                ctx.fillStyle = hoverCoord.pt.status === 'timeout' ? '#ff1744' : (isDark ? '#00f2fe' : '#0077b6');
                ctx.shadowColor = hoverCoord.pt.status === 'timeout' ? 'rgba(255, 23, 68, 0.6)' : 'rgba(0, 242, 254, 0.6)';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();

                // Draw Tooltip Box
                ctx.save();
                const latencyTxt = hoverCoord.pt.status === 'timeout' ? 'TIMEOUT' : `${hoverCoord.pt.latency} ms`;
                const titleTxt = `Ping #${hoverCoord.idx + 1}`;
                
                ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
                const w1 = ctx.measureText(latencyTxt).width;
                ctx.font = '10px "Plus Jakarta Sans", sans-serif';
                const w2 = ctx.measureText(titleTxt).width;
                const tooltipWidth = Math.max(w1, w2) + 20;
                const tooltipHeight = 44;
                
                // Position tooltip to avoid edges
                let tooltipX = hoverCoord.x + 12;
                if (tooltipX + tooltipWidth > width) {
                    tooltipX = hoverCoord.x - tooltipWidth - 12;
                }
                let tooltipY = hoverCoord.y - tooltipHeight / 2;
                if (tooltipY < paddingTop) tooltipY = paddingTop;
                if (tooltipY + tooltipHeight > height - paddingBottom) tooltipY = height - paddingBottom - tooltipHeight;
                
                // Draw background box
                ctx.fillStyle = isDark ? 'rgba(17, 20, 34, 0.95)' : 'rgba(255, 255, 255, 0.95)';
                ctx.strokeStyle = hoverCoord.pt.status === 'timeout' ? '#ff1744' : (isDark ? 'rgba(0, 242, 254, 0.3)' : 'rgba(0, 119, 182, 0.3)');
                ctx.lineWidth = 1;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
                ctx.shadowBlur = 8;
                
                // Rounded rectangle path
                const radius = 6;
                ctx.beginPath();
                ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, radius);
                ctx.fill();
                ctx.stroke();
                
                // Tooltip text
                ctx.shadowColor = 'transparent'; // Reset shadows for text
                ctx.fillStyle = colorText;
                ctx.font = '10px "Plus Jakarta Sans", sans-serif';
                ctx.fillText(titleTxt, tooltipX + 10, tooltipY + 16);
                
                ctx.fillStyle = hoverCoord.pt.status === 'timeout' ? '#ff1744' : (isDark ? '#ffffff' : '#151824');
                ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
                ctx.fillText(latencyTxt, tooltipX + 10, tooltipY + 32);
                ctx.restore();
            }
        }
    }

    // Initialize custom chart
    const latencyChart = new LatencyChart(canvas);

    // Initializer theme setting
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.add('dark-theme');
    }

    // Theme Toggle Handler
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
        latencyChart.resize();
        renderCdnComparison(); // Re-render CDN comparison bars with new theme variables
    });

    // Toggle custom server input
    serverSelect.addEventListener('change', () => {
        if (serverSelect.value === 'custom') {
            customServerWrapper.classList.remove('hidden');
        } else {
            customServerWrapper.classList.add('hidden');
        }
    });

    // Helper: Cache buster endpoint URL generator
    function getCacheBustedUrl(baseUrl) {
        try {
            const urlObj = new URL(baseUrl);
            urlObj.searchParams.set('np_rand', Math.random().toString(36).substring(2, 10));
            urlObj.searchParams.set('np_time', Date.now().toString());
            return urlObj.toString();
        } catch (e) {
            const sep = baseUrl.includes('?') ? '&' : '?';
            return `${baseUrl}${sep}np_time=${Date.now()}`;
        }
    }

    // Screen Wake Lock API Helpers to prevent screen sleep during test runs
    async function requestWakeLock() {
        if (!('wakeLock' in navigator)) return;
        try {
            if (wakeLock === null) {
                wakeLock = await navigator.wakeLock.request('screen');
                console.log('Screen Wake Lock acquired');
            }
        } catch (err) {
            console.warn(`Screen Wake Lock failed: ${err.name}, ${err.message}`);
        }
    }

    function releaseWakeLock() {
        if (wakeLock !== null) {
            try {
                wakeLock.release();
                wakeLock = null;
                console.log('Screen Wake Lock released');
            } catch (err) {
                console.warn('Failed to release Wake Lock:', err);
            }
        }
    }

    // Core Ping Engine
    async function pingServer(url, timeoutMs = 1500, noCors = false) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeoutMs);
        const start = performance.now();
        
        const fetchOptions = {
            method: 'HEAD',
            cache: 'no-store',
            signal: controller.signal
        };
        
        if (noCors) {
            fetchOptions.mode = 'no-cors';
        } else {
            fetchOptions.mode = 'no-cors'; // Opaque responses bypass CORS for latency calculation
        }

        try {
            await fetch(getCacheBustedUrl(url), fetchOptions);
            clearTimeout(id);
            const end = performance.now();
            return Math.round(end - start);
        } catch (error) {
            clearTimeout(id);
            if (error.name === 'AbortError') {
                throw new Error('Timeout');
            }
            // If DNS/Connection fails immediately, let's look at duration.
            // If duration > 20ms, it was a real connection request that got rejected/failed,
            // so we still count the roundtrip duration as the latency.
            const end = performance.now();
            const diff = end - start;
            if (diff > 15) {
                return Math.round(diff);
            }
            throw error;
        }
    }

    // Toggle Pulse ring animation and speed
    function updatePulseAnimation(pingVal, active = true) {
        pulseRings.forEach(ring => {
            if (active) {
                ring.classList.add('active');
                // Adjust speed based on ping value (faster pulse for lower latency)
                let duration = 2.0;
                if (pingVal < 40) duration = 1.0;
                else if (pingVal < 100) duration = 1.6;
                else if (pingVal < 250) duration = 2.4;
                else duration = 3.5;
                ring.style.animationDuration = `${duration}s`;
            } else {
                ring.classList.remove('active');
            }
        });
    }

    // Update gauge pointer
    function updateGaugeDisplay(pingVal, status = 'ok') {
        if (status === 'timeout') {
            currentPingDisplay.textContent = '---';
            currentPingDisplay.style.color = 'var(--status-danger)';
            gaugeProgress.style.strokeDashoffset = '596.9'; // Empty
            gaugeProgress.style.stroke = 'var(--status-danger)';
            return;
        }

        currentPingDisplay.textContent = pingVal;
        currentPingDisplay.style.color = '';

        // Map latency 0-300ms onto gauge progress (0ms = 100% full, 300ms+ = 0% full)
        const pct = Math.max(0, Math.min(1, 1 - (pingVal / 300)));
        const offset = 596.9 * (1 - pct);
        gaugeProgress.style.strokeDashoffset = offset;

        // Dynamically color coordinate stroke based on performance HSL (140 green to 0 red)
        const hue = pct * 140;
        gaugeProgress.style.stroke = `hsl(${hue}, 100%, 50%)`;
    }

    // Initialize/Reset Metrics dashboard
    function resetMetricsDisplay() {
        statLatencyAvg.textContent = '--';
        statLatencyMin.textContent = '--';
        statLatencyMax.textContent = '--';
        latencyRating.textContent = '--';
        latencyRating.className = 'badge';

        statJitter.textContent = '--';
        statJitterConsistency.textContent = '--';
        jitterRating.textContent = '--';
        jitterRating.className = 'badge';

        statLossPercent.textContent = '--';
        statLossCount.textContent = '--';
        statSentCount.textContent = '--';
        lossRating.textContent = '--';
        lossRating.className = 'badge';

        statGrade.textContent = '--';
        statGrade.style.color = '';
        statQualityPct.textContent = '0% Score';
        scoreProgressBar.style.width = '0%';
        scoreText.textContent = '--';
        scoreText.className = 'badge';
        
        verdictDesc.textContent = 'Please complete a network diagnostic run to receive a tailored connection summary.';

        // Checklist resets
        checkWebsockets.className = 'check-item pending';
        checkWsValue.textContent = 'Waiting...';
        checkBrowserType.className = 'check-item pending';
        checkBrowserValue.textContent = 'Waiting...';
        checkDnsLookup.className = 'check-item pending';
        checkDnsValue.textContent = 'Waiting...';
    }

    // Update real-time summary statistics
    function updateStatistics(liveData) {
        const totalAllPings = liveData.length;

        // Check if we are still in the warm-up phase (first 5 pings)
        if (totalAllPings <= 5) {
            statLatencyAvg.textContent = '--';
            latencyRating.textContent = getTranslation('rating.calibrating');
            latencyRating.className = 'badge badge-purple';

            statJitter.textContent = '--';
            statJitterConsistency.textContent = getTranslation('consistency.warming');
            jitterRating.textContent = getTranslation('rating.calibrating');
            jitterRating.className = 'badge badge-purple';

            statLossPercent.textContent = '--';
            statLossCount.textContent = '0';
            statSentCount.textContent = totalAllPings;
            lossRating.textContent = getTranslation('rating.calibrating');
            lossRating.className = 'badge badge-purple';

            statGrade.textContent = '--';
            statGrade.style.color = '';
            statQualityPct.textContent = getTranslation('rating.calibrating') + '...';
            scoreProgressBar.style.width = '0%';
            scoreText.textContent = '--';
            scoreText.className = 'badge';
            
            verdictDesc.textContent = getTranslation('verdict.gathering', { val: totalAllPings });
            return;
        }

        // Exclude the first 5 pings for calculations to ignore connection establishment/DNS overhead
        const calculationData = liveData.slice(5);
        const successes = calculationData.filter(d => d.status === 'ok');
        const totalPings = calculationData.length;
        const totalLoss = calculationData.filter(d => d.status === 'timeout').length;
        
        // Update Packet Loss Card
        const lossPct = Math.round((totalLoss / totalPings) * 100);
        statLossPercent.textContent = lossPct;
        statLossCount.textContent = totalLoss;
        statSentCount.textContent = totalPings;
        
        if (lossPct === 0) {
            lossRating.textContent = getTranslation('rating.zeroloss');
            lossRating.className = 'badge badge-cyan';
        } else if (lossPct < 4) {
            lossRating.textContent = getTranslation('rating.acceptable');
            lossRating.className = 'badge badge-purple';
        } else {
            lossRating.textContent = getTranslation('rating.unstable');
            lossRating.className = 'badge badge-red';
        }

        if (successes.length === 0) {
            statLatencyAvg.textContent = '---';
            statLatencyMin.textContent = '---';
            statLatencyMax.textContent = '---';
            return;
        }

        // Calculate Latency parameters
        const latencies = successes.map(d => d.latency);
        const sum = latencies.reduce((a, b) => a + b, 0);
        const avg = Math.round(sum / latencies.length);
        const min = Math.min(...latencies);
        const max = Math.max(...latencies);

        statLatencyAvg.textContent = avg;
        statLatencyMin.textContent = min;
        statLatencyMax.textContent = max;

        if (avg < 30) {
            latencyRating.textContent = getTranslation('rating.excellent');
            latencyRating.className = 'badge badge-cyan';
        } else if (avg < 75) {
            latencyRating.textContent = getTranslation('rating.good');
            latencyRating.className = 'badge badge-purple';
        } else if (avg < 150) {
            latencyRating.textContent = getTranslation('rating.moderate');
            latencyRating.className = 'badge badge-gold';
        } else {
            latencyRating.textContent = getTranslation('rating.high');
            latencyRating.className = 'badge badge-red';
        }

        // Calculate Jitter (average difference between consecutive pings)
        let jitter = 0;
        if (successes.length > 1) {
            let diffSum = 0;
            for (let i = 1; i < successes.length; i++) {
                diffSum += Math.abs(successes[i].latency - successes[i-1].latency);
            }
            jitter = Math.round(diffSum / (successes.length - 1));
        }
        statJitter.textContent = jitter;
        
        // Jitter Rating
        let consistencyLabel = getTranslation('rating.good');
        if (jitter < 4) {
            jitterRating.textContent = getTranslation('rating.excellent');
            jitterRating.className = 'badge badge-cyan';
            consistencyLabel = getTranslation('consistency.pristine');
        } else if (jitter < 12) {
            jitterRating.textContent = getTranslation('rating.good');
            jitterRating.className = 'badge badge-purple';
            consistencyLabel = getTranslation('consistency.highly');
        } else if (jitter < 25) {
            jitterRating.textContent = getTranslation('rating.moderate');
            jitterRating.className = 'badge badge-gold';
            consistencyLabel = getTranslation('consistency.variable');
        } else {
            jitterRating.textContent = getTranslation('rating.poor');
            jitterRating.className = 'badge badge-red';
            consistencyLabel = getTranslation('consistency.high');
        }
        statJitterConsistency.textContent = consistencyLabel;

        // Calculate Connection Quality Score (0-100)
        // Latency Score (capped at 250ms for 0 score)
        const scoreLatency = Math.max(0, 100 - (avg * 0.4)); 
        // Jitter Score (capped at 30ms for 0 score)
        const scoreJitter = Math.max(0, 100 - (jitter * 3.3));
        // Loss Score (capped at 10% loss for 0 score)
        const scoreLoss = Math.max(0, 100 - (lossPct * 10));

        // Aggregate Score (Weighting: 40% Latency, 30% Jitter, 30% Loss)
        const finalScore = Math.round((scoreLatency * 0.4) + (scoreJitter * 0.3) + (scoreLoss * 0.3));
        
        statQualityPct.textContent = `${finalScore}% ` + getTranslation('sub.pct');
        scoreProgressBar.style.width = `${finalScore}%`;

        // Calculate Grade Letters
        let grade = 'F';
        let gradeColor = 'var(--status-danger)';
        let scoreRating = 'POOR';
        let scoreRatingClass = 'badge badge-red';

        if (finalScore >= 95) { 
            grade = 'A+'; 
            gradeColor = 'var(--accent-cyan)'; 
            scoreRating = getTranslation('rating.pristine').toUpperCase(); 
            scoreRatingClass = 'badge badge-cyan'; 
        }
        else if (finalScore >= 85) { 
            grade = 'A'; 
            gradeColor = 'var(--status-success)'; 
            scoreRating = getTranslation('rating.excellent').toUpperCase(); 
            scoreRatingClass = 'badge badge-cyan'; 
        }
        else if (finalScore >= 72) { 
            grade = 'B'; 
            gradeColor = 'var(--status-success)'; 
            scoreRating = getTranslation('rating.good').toUpperCase(); 
            scoreRatingClass = 'badge badge-purple'; 
        }
        else if (finalScore >= 55) { 
            grade = 'C'; 
            gradeColor = 'var(--status-warning)'; 
            scoreRating = getTranslation('rating.fair').toUpperCase(); 
            scoreRatingClass = 'badge badge-gold'; 
        }
        else if (finalScore >= 40) { 
            grade = 'D'; 
            gradeColor = 'var(--status-warning)'; 
            scoreRating = getTranslation('rating.poor').toUpperCase(); 
            scoreRatingClass = 'badge badge-gold'; 
        }
        
        statGrade.textContent = grade;
        statGrade.style.color = gradeColor;
        scoreText.textContent = scoreRating;
        scoreText.className = scoreRatingClass;

        // Build Connection Verdict paragraph
        let verdict = '';
        if (grade.startsWith('A')) {
            verdict = getTranslation('verdict.excellent', { avg, jitter });
        } else if (grade === 'B') {
            verdict = getTranslation('verdict.good', { avg, jitter });
        } else if (grade === 'C') {
            verdict = getTranslation('verdict.fair', { avg });
        } else {
            verdict = getTranslation('verdict.poor', { avg, loss: lossPct });
        }
        verdictDesc.textContent = verdict;
    }

    // Main Test Launch Function
    async function startDiagnosticTest() {
        if (isTesting) return;
        
        isTesting = true;
        pingData = [];
        requestWakeLock(); // Prevent screen sleep during diagnostics
        resetMetricsDisplay();
        
        // Smooth scroll viewport to the top so the live gauge remains in full focus
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Fade out frosted welcome backdrop and glide diagnostics button to bottom-right corner
        const welcomeOverlay = document.getElementById('welcome-overlay');
        if (welcomeOverlay) {
            welcomeOverlay.classList.add('hidden');
        }
        startTestBtn.classList.remove('center-position');
        
        // Disable form inputs during test run
        serverSelect.disabled = true;
        customServerInput.disabled = true;
        testDurationSelect.disabled = true;
        pingIntervalSelect.disabled = true;

        startTestBtn.classList.add('testing');
        startTestBtn.querySelector('.btn-text').textContent = getTranslation('controls.stop');
        globalStatusDot.className = 'status-dot yellow';
        globalStatusText.textContent = getTranslation('status.testing');
        chartConnectionStatus.textContent = getTranslation('status.testing');
        chartConnectionStatus.style.background = 'rgba(255, 179, 0, 0.1)';
        chartConnectionStatus.style.color = 'var(--status-warning)';

        // Evaluate target server config
        let targetUrl = serverSelect.value;
        currentServerName = serverSelect.options[serverSelect.selectedIndex].text;
        
        if (targetUrl === 'custom') {
            targetUrl = customServerInput.value.trim();
            currentServerName = 'Custom Server';
            // Simple validation
            if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                alert('Please enter a valid URL beginning with http:// or https://');
                stopDiagnosticTest();
                return;
            }
        }
        
        currentServerUrl = targetUrl;
        const noCors = serverSelect.options[serverSelect.selectedIndex].dataset.nocors === 'true';

        // Select intervals
        const durationSecs = testDurationSelect.value;
        continuousMode = (durationSecs === 'continuous');
        const maxTestDurationMs = continuousMode ? Infinity : parseInt(durationSecs) * 1000;
        const intervalMs = parseInt(pingIntervalSelect.value);

        let pingCount = 0;
        const startTestTime = performance.now();

        // Start WebSocket Capability test concurrently
        runWebSocketTest();

        // Check browser capacity
        runBrowserDownlinkCheck();

        // Start CDN comparison check automatically after 2 seconds (combined test by default)
        setTimeout(() => {
            if (isTesting) {
                runCdnComparison();
            }
        }, 2000);

        // Trigger loop pinging
        const runPingIteration = async () => {
            if (!isTesting) return;

            // Safety limit cutoff to prevent rate-limit blocks and resource abuse in continuous mode
            if (continuousMode && pingCount >= MAX_CONTINUOUS_PINGS) {
                autoPauseContinuousTest();
                return;
            }

            // Check if test duration expired
            const elapsedTime = performance.now() - startTestTime;
            if (!continuousMode && elapsedTime >= maxTestDurationMs) {
                completeDiagnosticTest();
                return;
            }

            pingCount++;
            let latency = 0;
            let status = 'ok';

            try {
                latency = await pingServer(targetUrl, pingTimeoutLimit, noCors);
                // Update gauge and pulse animation speeds based on latest value
                updateGaugeDisplay(latency, 'ok');
                updatePulseAnimation(latency, true);
            } catch (err) {
                status = 'timeout';
                latency = 0;
                updateGaugeDisplay(0, 'timeout');
                updatePulseAnimation(0, false);
            }

            pingData.push({
                index: pingCount,
                latency: latency,
                status: status
            });

            // Update real-time statistics cards
            updateStatistics(pingData);
            
            // Re-render Line Chart
            latencyChart.setData(pingData);

            // Reschedule next ping
            if (isTesting) {
                testIntervalId = setTimeout(runPingIteration, intervalMs);
            }
        };

        // Cache the function reference globally for resuming on visibility changes
        runPingIterationRef = runPingIteration;

        // Fire first ping
        runPingIteration();
    }

    function stopDiagnosticTest() {
        if (!isTesting) return;
        clearTimeout(testIntervalId);
        isTesting = false;
        releaseWakeLock(); // Allow screen sleep when diagnostic is halted
        
        // Re-enable form fields
        serverSelect.disabled = false;
        customServerInput.disabled = false;
        testDurationSelect.disabled = false;
        pingIntervalSelect.disabled = false;

        startTestBtn.classList.remove('testing');
        startTestBtn.querySelector('.btn-text').textContent = getTranslation('controls.start');
        
        globalStatusDot.className = 'status-dot gray';
        globalStatusText.textContent = getTranslation('status.interrupted');
        chartConnectionStatus.textContent = getTranslation('status.interrupted');
        chartConnectionStatus.style.background = '';
        chartConnectionStatus.style.color = '';
        updatePulseAnimation(0, false);
    }

    function completeDiagnosticTest() {
        clearTimeout(testIntervalId);
        isTesting = false;
        releaseWakeLock(); // Allow screen sleep when diagnostic finishes

        // Re-enable form fields
        serverSelect.disabled = false;
        customServerInput.disabled = false;
        testDurationSelect.disabled = false;
        pingIntervalSelect.disabled = false;

        startTestBtn.classList.remove('testing');
        startTestBtn.querySelector('.btn-text').textContent = getTranslation('controls.start');
        
        globalStatusDot.className = 'status-dot green';
        globalStatusText.textContent = getTranslation('status.finished');
        chartConnectionStatus.textContent = getTranslation('status.ready');
        chartConnectionStatus.style.background = '';
        chartConnectionStatus.style.color = '';
        updatePulseAnimation(0, false);

        // Compute final statistics
        updateStatistics(pingData);
    }

    // Toggle test button trigger
    startTestBtn.addEventListener('click', () => {
        if (isTesting) {
            stopDiagnosticTest();
        } else {
            startDiagnosticTest();
        }
    });

    // Check browser downlink capability using Navigator connection object
    function runBrowserDownlinkCheck() {
        checkBrowserType.className = 'check-item loading';
        checkBrowserValue.textContent = getTranslation('check.calculating');

        setTimeout(async () => {
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            let downloadText = 'N/A';
            let successState = 'success';
            let speedMbps = null;

            // Attempt a real quick file fetch calculation to get download speed
            try {
                const testUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
                const sizeInBytes = 87 * 1024; // JQuery minified size is approx 87KB
                const startTime = performance.now();
                const response = await fetch(getCacheBustedUrl(testUrl), { cache: 'no-store' });
                await response.blob();
                const durationSec = (performance.now() - startTime) / 1000;
                
                if (durationSec > 0) {
                    const speedBps = sizeInBytes / durationSec;
                    speedMbps = (speedBps * 8) / (1024 * 1024);
                }
            } catch (e) {
                // fall back to default connection objects
            }

            if (speedMbps !== null) {
                downloadText = getTranslation('check.downlink.cdn', { speed: speedMbps.toFixed(1) });
                successState = 'success';
            } else if (conn && conn.downlink) {
                downloadText = getTranslation('check.downlink.browser', { speed: conn.downlink, type: conn.effectiveType || '4G' });
                successState = 'success';
            } else {
                downloadText = getTranslation('check.downlink.unreported');
                successState = 'warning';
            }

            checkBrowserType.className = `check-item ${successState}`;
            checkBrowserValue.textContent = downloadText;
        }, 1000);
    }

    // WebSocket Diagnostic
    function runWebSocketTest() {
        checkWebsockets.className = 'check-item loading';
        checkWsValue.textContent = getTranslation('check.connecting');

        // Connect to a public test socket server
        const wsUrl = 'wss://echo.websocket.events';
        const startWs = performance.now();
        let socket;
        
        try {
            socket = new WebSocket(wsUrl);
        } catch (e) {
            checkWebsockets.className = 'check-item danger';
            checkWsValue.textContent = getTranslation('check.failed');
            return;
        }

        const wsTimeoutId = setTimeout(() => {
            socket.close();
            checkWebsockets.className = 'check-item warning';
            checkWsValue.textContent = getTranslation('check.timeout');
        }, 5000);

        socket.onopen = () => {
            const handshakeTime = Math.round(performance.now() - startWs);
            
            // Measure message roundtrip echo time
            const startEcho = performance.now();
            socket.send('netpulse-ping');

            socket.onmessage = () => {
                const echoTime = Math.round(performance.now() - startEcho);
                clearTimeout(wsTimeoutId);
                socket.close();

                checkWebsockets.className = 'check-item success';
                checkWsValue.textContent = getTranslation('check.ws.result', { echo: echoTime, hand: handshakeTime });
            };
        };

        socket.onerror = () => {
            clearTimeout(wsTimeoutId);
            socket.close();
            checkWebsockets.className = 'check-item danger';
            checkWsValue.textContent = getTranslation('check.blocked');
        };
    }

    // Run parallel DNS Comparison to check CDN providers responsiveness
    async function runCdnComparison() {
        btnRunCdn.disabled = true;
        btnRunCdn.textContent = getTranslation('cdn.testing');

        const endpoints = [
            { id: 'cloudflare', name: 'Cloudflare Edge', url: 'https://cloudflare.com/cdn-cgi/trace' },
            { id: 'google', name: 'Google DNS API', url: 'https://dns.google' },
            { id: 'fastly', name: 'Fastly CDN Edge', url: 'https://fastly.com' },
            { id: 'aws', name: 'Amazon AWS Mumbai', url: 'https://s3.ap-south-1.amazonaws.com' }
        ];

        checkDnsLookup.className = 'check-item loading';
        checkDnsValue.textContent = getTranslation('check.testing');

        // Ping nodes in parallel, averages of 3 runs for each
        const results = await Promise.all(endpoints.map(async (endpoint) => {
            let sum = 0;
            let counts = 0;
            
            for (let i = 0; i < 3; i++) {
                try {
                    // Slight delay between node tests to prevent overlap congestion
                    await new Promise(r => setTimeout(r, 100));
                    const latency = await pingServer(endpoint.url, 1200, true);
                    sum += latency;
                    counts++;
                } catch (e) {
                    // skip timed out
                }
            }

            const avg = counts > 0 ? Math.round(sum / counts) : null;
            return { ...endpoint, latency: avg };
        }));

        // Render progress bar comparison chart
        renderCdnComparison(results);

        // Find fastest endpoint
        const validResults = results.filter(r => r.latency !== null);
        if (validResults.length > 0) {
            validResults.sort((a, b) => a.latency - b.latency);
            const bestNode = validResults[0];
            checkDnsLookup.className = 'check-item success';
            checkDnsValue.textContent = getTranslation('check.dns.result', { node: bestNode.name, ms: bestNode.latency });
        } else {
            checkDnsLookup.className = 'check-item danger';
            checkDnsValue.textContent = getTranslation('check.dns.failed');
        }

        btnRunCdn.disabled = false;
        btnRunCdn.textContent = getTranslation('cdn.test');
    }

    // Render comparison list bars
    function renderCdnComparison(resultsList = null) {
        // Fallback placeholders if no direct run was triggered
        const placeholderResults = [
            { name: 'Cloudflare CDN (Global)', latency: null },
            { name: 'Google Edge (dns.google)', latency: null },
            { name: 'Fastly CDN (Fastly)', latency: null },
            { name: 'Amazon Web Services (S3)', latency: null }
        ];

        const data = resultsList || placeholderResults;
        nodesList.innerHTML = '';

        data.forEach(node => {
            const nodeItem = document.createElement('div');
            nodeItem.className = 'node-item';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'node-name';
            nameSpan.textContent = node.name;

            const barContainer = document.createElement('div');
            barContainer.className = 'node-bar-container';

            const bar = document.createElement('div');
            bar.className = 'node-bar';

            const latencySpan = document.createElement('span');
            latencySpan.className = 'node-latency';

            if (node.latency === null) {
                bar.style.width = '0%';
                latencySpan.textContent = '-- ms';
            } else {
                // Calculate speed performance percentage (lower ping = higher bar percentage)
                // Let's assume 300ms is our worst baseline (0%) and 0ms is (100%)
                const percentage = Math.max(0, Math.round((1 - (node.latency / 300)) * 100));
                
                bar.style.width = `${percentage}%`;
                latencySpan.textContent = `${node.latency} ms`;

                // Set color theme on bar based on score
                let colorGrad = 'var(--primary-gradient)'; // Greenish/cyan default
                if (node.latency > 150) {
                    colorGrad = 'var(--danger-gradient)'; // red
                } else if (node.latency > 70) {
                    colorGrad = 'var(--warning-gradient)'; // orange/yellow
                }
                bar.style.background = colorGrad;
            }

            barContainer.appendChild(bar);
            nodeItem.appendChild(nameSpan);
            nodeItem.appendChild(barContainer);
            nodeItem.appendChild(latencySpan);
            nodesList.appendChild(nodeItem);
        });
    }

    btnRunCdn.addEventListener('click', runCdnComparison);

    // Modals Control
    linkShowAbout.addEventListener('click', (e) => {
        e.preventDefault();
        aboutModal.classList.remove('hidden');
    });

    btnCloseModal.addEventListener('click', () => {
        aboutModal.classList.add('hidden');
    });

    // Click outside modal content closes it
    aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.classList.add('hidden');
        }
    });

    // Handle escape key closing modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (aboutModal && !aboutModal.classList.contains('hidden')) {
                aboutModal.classList.add('hidden');
            }
            if (welcomeModal && !welcomeModal.classList.contains('hidden')) {
                welcomeModal.classList.add('hidden');
                localStorage.setItem('np_lang_selected', 'true'); // Accept defaults on escape
            }
        }
    });

    // Safety auto-pause function for continuous tests
    function autoPauseContinuousTest() {
        clearTimeout(testIntervalId);
        isTesting = false;
        releaseWakeLock(); // Allow screen sleep on auto-pause

        // Re-enable form fields
        serverSelect.disabled = false;
        customServerInput.disabled = false;
        testDurationSelect.disabled = false;
        pingIntervalSelect.disabled = false;

        startTestBtn.classList.remove('testing');
        startTestBtn.querySelector('.btn-text').textContent = getTranslation('controls.start');
        
        globalStatusDot.className = 'status-dot yellow';
        globalStatusText.textContent = getTranslation('status.autopaused');
        chartConnectionStatus.textContent = getTranslation('status.autopaused');
        chartConnectionStatus.style.background = '';
        chartConnectionStatus.style.color = '';
        updatePulseAnimation(0, false);

        // Compute final statistics
        updateStatistics(pingData);

        alert('Continuous test auto-paused after 1,200 pings (~10 minutes) to conserve battery and network bandwidth.');
    }

    // Page Visibility change handling to pause/resume tests
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (isTesting) {
                // Pause continuous or timed testing on tab change to conserve CPU/Battery
                wasPausedByVisibility = true;
                clearTimeout(testIntervalId);
                releaseWakeLock(); // Release lock when page is hidden
                
                globalStatusDot.className = 'status-dot yellow';
                globalStatusText.textContent = getTranslation('status.paused');
                chartConnectionStatus.textContent = getTranslation('status.paused');
                chartConnectionStatus.style.background = 'rgba(255, 179, 0, 0.1)';
                chartConnectionStatus.style.color = 'var(--status-warning)';
                updatePulseAnimation(0, false);
            }
        } else {
            if (wasPausedByVisibility) {
                wasPausedByVisibility = false;
                globalStatusDot.className = 'status-dot yellow';
                globalStatusText.textContent = getTranslation('status.resuming');
                chartConnectionStatus.textContent = getTranslation('cdn.testing');
                chartConnectionStatus.style.background = 'rgba(255, 179, 0, 0.1)';
                chartConnectionStatus.style.color = 'var(--status-warning)';
                
                // Restart ping iteration loop
                const intervalMs = parseInt(pingIntervalSelect.value);
                if (runPingIterationRef) {
                    testIntervalId = setTimeout(runPingIterationRef, intervalMs);
                }
                requestWakeLock(); // Re-acquire lock when page is visible and active again
            }
        }
    });

    // Custom dropdown menu functionality
    const langDropdown = document.getElementById('language-dropdown');
    const dropdownTrigger = document.getElementById('dropdown-trigger');

    if (dropdownTrigger && langDropdown) {
        // Toggle language menu
        dropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = langDropdown.classList.toggle('open');
            dropdownTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Click options items to select language
        const dropdownItems = langDropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const selectedLang = e.currentTarget.getAttribute('data-lang');
                setLanguage(selectedLang);
                langDropdown.classList.remove('open');
                dropdownTrigger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on clicking outside
        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('open');
                dropdownTrigger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Set initial language from local storage preference or browser default
    setLanguage(currentLang);

    // Welcome Language Selector Popup for first-time visitors
    const welcomeModal = document.getElementById('lang-welcome-modal');
    if (welcomeModal) {
        const isFirstTime = !localStorage.getItem('np_lang_selected');
        if (isFirstTime) {
            welcomeModal.classList.remove('hidden');
            
            const welcomeBtns = welcomeModal.querySelectorAll('.welcome-lang-btn');
            welcomeBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const selectedLang = e.currentTarget.getAttribute('data-lang');
                    setLanguage(selectedLang);
                    localStorage.setItem('np_lang_selected', 'true');
                    welcomeModal.classList.add('hidden');
                });
            });
        }
    }

    // Run-once initial setups
    renderCdnComparison(); // Renders nodes in empty state
});
