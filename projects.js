/* ===== Edit videos here: the homepage and /portfolio both read this file ===== */
const SHOWREEL_VIMEO_ID = "1190852100"; // My 2025 showreel
// Unlisted Vimeo videos only play on other sites with their private key (the "h" in the share link).
// Add each one here as  "video id": "key"  — find it in Vimeo under Share > Copy link (vimeo.com/ID/KEY).
const VIMEO_KEYS = {
  "1190852100": "329607f518",   // Showreel
  "1190721386": "e29d82646b",   // Langease AI
};
const A = "assets/";
const V = id => "https://vumbnail.com/" + id + "_medium.jpg";   // Vimeo thumbnail, only for videos with no local image
// Add vimeo:"ID" to any project to make it play.
const PROJECTS = [
  {t:"Serlzo", ind:"SaaS", type:"Explainers", img:V("1190702972"), vimeo:"1190702972"},
  {t:"Applai", ind:"SaaS", type:"Explainers", img:A+"thumbs/APPLAI.webp", vimeo:"1190694647"},
  {t:"FroggyTalk Explainer", ind:"Telecom", type:"Explainers", img:V("1190720025"), vimeo:"1190720025"},
  {t:"Langease AI", ind:"SaaS", type:"Product demos", img:A+"thumbs/Langease.webp", vimeo:"1190721386"},
  {t:"Attrove", ind:"SaaS", type:"Product demos", img:A+"thumbs/Attrove.webp", vimeo:"1190693529"},
  {t:"Konna", ind:"SaaS", type:"Product demos", img:A+"thumbs/Konna.webp", vimeo:"1190719821"},
  {t:"New FroggyTalk App", ind:"Telecom", type:"App promos", img:V("1190710199"), vimeo:"1190710199"},
  {t:"FroggyTalk Eritrea", ind:"Telecom", type:"App promos", img:V("1190853338"), vimeo:"1190853338"},
  {t:"Krunch It", ind:"App", type:"App promos", img:A+"thumbs/Krunch-it.webp", vimeo:"1190717948"},
  {t:"Product Pointers", ind:"Education", type:"Course promos", img:A+"thumbs/PRODUCT-POINTERS.webp", vimeo:"1190717759"},
  {t:"DWM 1.0", ind:"Education", type:"Course promos", img:A+"thumbs/DWM-1.0.webp", vimeo:"1190704732"},
  {t:"DWM 2.0", ind:"Education", type:"Course promos", img:A+"thumbs/DWMR.webp", vimeo:"1190721260"},
  {t:"DSG 2.0", ind:"Education", type:"Course promos", img:A+"thumbs/DSG-2.0.webp", vimeo:"1190696822"},
  {t:"Mastering Portfolio & Resume", ind:"Education", type:"Course promos", img:A+"thumbs/MASTERING-PORTFOLIO-RESUME.webp", vimeo:"1190695627"},
  {t:"Fun Aflames", ind:"Education", type:"Course promos", img:A+"thumbs/Fun-a-flames.webp", vimeo:"1190717995"},
  {t:"Serlzo New Feature", ind:"SaaS", type:"How-to videos", img:V("1190710396"), vimeo:"1190710396"},
  {t:"Zibacoin", ind:"Web3", type:"How-to videos", img:A+"thumbs/Zibacoin.webp", vimeo:"1190697796"},
  {t:"Poli", ind:"Stationery", type:"Brand identity", img:A+"thumbs/Poli.webp", vimeo:"1190703584"}
];
