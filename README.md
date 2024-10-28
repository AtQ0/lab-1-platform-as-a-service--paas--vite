/*==============*/
/*=== LÄNKAR ===*/
/*==============*/

Link to frontend, that is being served by backend:
https://lab-1-platform-as-a-service-paas-vite.onrender.com/

Link to API:
https://lab-1-platform-as-a-service-paas-vite.onrender.com/api


/*=====================*/
/*=== Vad är en CDN ===*/
/*=====================*/
En CDN (Content Delivery Network) är ett nätverk av servrar som ligger utspridda på olika platser runt om på jorden och hjälper till att ladda webbinnehåll snabbare genom att skicka det från en server som ligger nära användaren. Istället för att allt hämtas från en enda server (som kan vara långt borta och seg), så cachar en CDN data som bilder, videos, CSS, och JavaScript-filer och levererar dem från servrar som är närmare, vilket gör att sidan laddas snabbare.

Varför använda en CDN?
-Snabbare laddning: Allt hämtas från närmaste server så det går snabbare.
-Mindre tryck på huvudsidan: Avlastar huvudservern eftersom kopior av innehållet ligger utspridda på flera ställen.
-Mer pålitligt: Om en server går ner kan en annan ta över, så din sida ligger alltid uppe.
-Bra vid mycket trafik: Kan hantera stora trafikmängder genom att dela upp förfrågningar på flera servrar.
-Några populära CDNs är Cloudflare, Amazon CloudFront och Akamai.

Render använder sig tex. utav Cloudflares CDN.

/*=========================================*/
/*=== Vad är Monitorerings webbtjänster ===*/
/*=========================================*/
En monitoreringswebbtjänst hjälper till att hålla koll på hälsa, prestanda och tillgänglighet för backend-webbtjänster, som exempelvis API och webbapplikationer. Övervakningen omfattar att kontrollera om tjänsterna är aktiva, spåra svarstider, felprocent, samt CPU- och minnesanvändning. Dessa mätvärden är viktiga att ha koll på för att kunna utvärder huruvida tjänsterna fungerar optimalt och för att eventuella problem ska upptäckas och åtgärdas snabbt.

Många monitoreringsverktyg erbjuder funktioner som:
-Tillgänglighet: Kontrollerar regelbundet om en webbtjänst är aktiv och skickar varningar om den går ner.
-Prestanda: Samlar in data om svarstider och systemresurser, vilket hjälper till att identifiera flaskhalsar.
-Larm och aviseringar: Ger utvecklare möjlighet att få meddelanden via e-post eller andra plattformar när något går fel.

Exempel på verktyg för övervakning:
-Pingdom: Ett verktyg som spårar tillgänglighet och responstid, skickar aviseringar om tjänster går ner.
-Scout APM: Fokuserar på applikationsprestanda och hjälper till att identifiera och åtgärda kodproblem..
