/* ==========================================================
   HOUSE OF AL MAHRAH: STORE SETTINGS AND PRODUCTS
   Edit this file to update prices, stock, colours and products.
   You do not need to touch any other file.
   ========================================================== */

const STORE = {
  name: "House of Al Mahrah",
  whatsapp: "918446561779",          // country code + number, no + or spaces
  instagram: "https://instagram.com/asharism._",
  email: "hello@houseofalmahrah.com",
  currency: "₹",
  sitewideDiscount: 0,               // e.g. 15 puts EVERYTHING on 15% off (festival sale). 0 = off.
  lowStockAt: 3                      // shows "Few left" when total stock is this or less
};

/* HOW TO ADD A PRODUCT
   1. Put the photo in images/
   2. Find its category section in PRODUCTS below (===== ABAYAS =====, etc.)
   3. Copy any product block in that section, paste it under the others, and edit it.
      Set category: to one of the ids in CATEGORIES (abayas, kaftans, tunics, activewear).
   4. Every product block except the last one in the file ends with a comma. */

/* PRODUCT PAGES AND PHOTOS (see HOW-TO-ADD-PRODUCTS.txt for the full guide)
   images: [...]          -> all photos of the product. The FIRST one is the cover on the shop grid.
   longDescription: [...] -> paragraphs shown on the product page.
   highlights: [...]      -> bullet list on the product page.
   fabric / care          -> shown on the product page.
   colours: add  image: "images/xyz.jpg"  to a colour so its photo opens when that colour is tapped. */

/* STOCK PER COLOUR (optional)
   Give a colour its own  sizes: { S: 2, M: 0 }  to track stock for that colour separately
   (see the newer products). If a colour has no sizes, the product-level  sizes  is used.
   Product-level  sizes  can be left out when every colour has its own. */

/* HOW STOCK WORKS
   sizes: { S: 4, M: 0 }  -> number of pieces left in each size.
   0 = that size is greyed out. If every size is 0 the product shows "Sold out".
   madeToOrder: true      -> ignores stock; every size can be requested.
   badge: "New" / "Bestseller" / "" -> small tag on the photo.
   PRICES AND DISCOUNTS: price is always the ORIGINAL (MRP) price. Then optionally add ONE of:
     discount: 20       -> 20% off. The sale price is worked out for you (rounded to the nearest 10).
     salePrice: 6999    -> you choose the exact sale price. The % off is worked out for you.
   The site shows: sale price, crossed-out original price, "% OFF" tag, and "You save" amount.
   noSale: true         -> keeps one product out of a site-wide sale.
   hidden: true           -> hides a product without deleting it.
   crop: true             -> zooms the photo in (use for photos with extra background). */

/* CATEGORIES (these appear in the hamburger menu and filter buttons)
   To add a new category: add one line below, then give products  category: "<id>".
   Menu order follows the order of this list. A category with no visible products is hidden automatically. */
const CATEGORIES = [
  { id: "abayas", name: "Abayas", arabic: "عبايات" },
  { id: "kaftans", name: "Kaftans", arabic: "قفاطين" },
  { id: "tunics", name: "Tunics", arabic: "تونيك" },
  { id: "coords", name: "Co-ord Sets", arabic: "أطقم" },
  { id: "casual", name: "Casual & Layers", arabic: "كاجوال" },
  { id: "activewear", name: "Modest Activewear", arabic: "ملابس رياضية" }
];

const PRODUCTS = [
  /* ===== ABAYAS ===== */
  {
    id: "noor-cape-abaya",
    category: "abayas",
    name: "Noor Cape Abaya",
    arabic: "نور",
    description: "Ivory satin abaya with a draped cape, beaded yoke and embroidered hem.",
    price: 9800, salePrice: 8900, badge: "Bestseller",
    images: ["images/noor-cape-abaya.jpg", "images/noor-cape-abaya-2.jpg", "images/noor-cape-abaya-3.jpg"], crop: false, madeToOrder: true, hidden: false, outOfStock: false,
    longDescription: ["The Noor Cape Abaya is cut from lustrous ivory satin and falls in a long, fluid line from the shoulder. A draped cape back adds movement as you walk.", "A pointed yoke of beaded embroidery frames the neckline, and botanical motifs in silver thread rise from the hem. It is made for weddings, Eid and evenings when you want to be remembered."],
    highlights: ["Draped cape back", "Beaded embroidered yoke", "Floral embroidery at the hem", "Full-length, relaxed fit", "Made to order in your size"],
    fabric: "Lustrous satin with a soft lining",
    gsm: 210, fit: "Flowing, relaxed fit with a draped cape back. Full length.", includes: "Abaya with attached cape",
    care: "Dry clean recommended. Store hung, away from direct sunlight.",
    colours: [{ name: "Ivory", hex: "#F3EBDD" }, { name: "Champagne", hex: "#D9C29A" }, { name: "Sand", hex: "#C8B08A" }],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }
  },

  /* ===== KAFTANS ===== */
  {
    id: "rose-kaftan",
    category: "kaftans",
    name: "Rose Zardozi Kaftan",
    arabic: "وردة",
    description: "Dusty rose satin kaftan with bell sleeves and embroidered borders.",
    price: 7400, badge: "New",
    images: ["images/rose-kaftan.jpg", "images/rose-kaftan-2.jpg", "images/rose-kaftan-3.jpg"], crop: false, madeToOrder: true, hidden: false, outOfStock: false,
    longDescription: ["A dusty rose satin kaftan with a gentle shine and a straight, easy shape. Bell sleeves open softly at the wrist and are finished with scalloped embroidery.", "Embroidered motifs are scattered across the body and gather along the side slits and hem. Wear it for festive days and family gatherings."],
    highlights: ["Bell sleeves with scalloped embroidery", "V-neck with embroidered yoke", "Side slits for easy movement", "Embroidered borders", "Made to order in your size"],
    fabric: "Soft satin with fine embroidery",
    gsm: 200, fit: "Straight, easy fit with side slits. Full length.", includes: "Kaftan",
    care: "Dry clean recommended. Iron on low heat on the reverse side.",
    colours: [{ name: "Dusty rose", hex: "#C99AAE" }, { name: "Burgundy", hex: "#6E1F32" }, { name: "Sage", hex: "#A5AD94" }],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }
  },

  /* ===== TUNICS ===== */
  {
    id: "layla-lace-tunic",
    category: "tunics",
    name: "Layla Lace Tunic",
    arabic: "ليلى",
    description: "Lace-trimmed tunic with pearl buttons and a ruffled hem.",
    price: 4200, badge: "",
    images: ["images/layla-lace-tunic-2.jpg", "images/layla-lace-tunic-3.jpg"], crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A light tunic in soft white with lace panels down the front and pearl-style buttons. Balloon sleeves gather at the cuff, and a tiered ruffle finishes the hem.", "Wear it over trousers or a long skirt. It is airy, easy and comfortable through the day."],
    highlights: ["Lace front panels", "Pearl-style buttons", "Balloon sleeves with buttoned cuffs", "Tiered ruffle hem", "Relaxed, loose fit"],
    fabric: "Lightweight woven fabric with lace trim",
    gsm: 200, fit: "Loose, airy fit. Falls below the hip.", includes: "Tunic",
    care: "Gentle hand wash in cold water. Do not wring. Iron on low heat.",
    colours: [{ name: "White", hex: "#FFFFFF" }, { name: "Ivory", hex: "#F3EBDD" }, { name: "Blush", hex: "#E4C3C9" }],
    sizes: { S: 1, M: 2, L: 0, XL: 0 }
  },

  /* ===== MODEST ACTIVEWEAR ===== */
  {
    id: "sahra-active-set",
    category: "activewear",
    name: "Sahra Active Set",
    arabic: "سحر",
    description: "Burgundy tunic, wide-leg trousers and hijab for the gym and everyday wear.",
    price: 3490, discount: 10, badge: "New",
    images: ["images/sahra-active-set.jpg", "images/sahra-active-set-2.jpg", "images/sahra-active-set-3.jpg"], crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A matching modest activewear set in deep burgundy: a long tunic with thumbhole cuffs, wide-leg trousers and a hijab in the same colour.", "Soft stretch fabric moves with you in the gym, on a walk or at home. Full coverage without the heaviness."],
    highlights: ["Long tunic with thumbhole cuffs", "Side slits on the tunic", "Wide-leg trousers", "Matching hijab", "Soft, stretchy fabric"],
    fabric: "Soft stretch jersey",
    gsm: 280, fit: "Relaxed fit with room to move. Tunic falls below the hip.", includes: "Tunic, trousers and hijab",
    care: "Machine wash cold, inside out. Do not tumble dry on high heat.",
    colours: [{ name: "Burgundy", hex: "#6E1F32" }, { name: "Taupe", hex: "#8C7B6A" }, { name: "Black", hex: "#1b1b1b" }],
    sizes: { XS: 2, S: 5, M: 6, L: 4, XL: 1 }
  },
  {
    id: "layered-active-tunic",
    category: "activewear",
    name: "Layered Active Tunic",
    arabic: "طبقات",
    description: "Long-sleeve layered tunic with wide-leg trousers.",
    price: 3190, badge: "",
    images: ["images/layered-active-tunic.jpg", "images/layered-active-tunic-2.jpg", "images/layered-active-tunic-3.jpg"], crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A long-sleeve tunic with a layered short-sleeve look, paired with wide-leg black trousers. The high neck and long length keep you covered during training.", "Easy to wear from the gym to the street."],
    highlights: ["Layered sleeve design", "High neck", "Long-length tunic", "Wide-leg trousers", "Breathable fabric"],
    fabric: "Breathable stretch fabric",
    gsm: 250, fit: "Loose fit. Long tunic with wide-leg trousers.", includes: "Tunic and trousers",
    care: "Machine wash cold, inside out. Do not tumble dry on high heat.",
    colours: [{ name: "Taupe", hex: "#8C7B6A" }, { name: "Black", hex: "#1b1b1b" }, { name: "Sand", hex: "#D8C7A9" }],
    sizes: { S: 3, M: 0, L: 2, XL: 4, XXL: 1 }
  },

  /* ===== NEW ARTICLES (added from your photo set) ===== */
  {
    id: "dune-coord-set",
    category: "coords",
    name: "Dune Co-ord Set",
    arabic: "كثيب",
    description: "Relaxed tunic with a contrast-edged chest pocket and matching wide-leg trousers.",
    price: 3890, badge: "New",
    images: ["images/dune-coord-set-cream.jpg", "images/dune-coord-set-sand.jpg", "images/dune-coord-set-slate.jpg"],
    crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["An easy two-piece set in soft, matte fabric. The oversized tunic has a layered sleeve look, side slits and a contrast-edged pocket on the chest, paired with wide-leg trousers.", "Wear it for travel, errands or a relaxed day out. The loose cut keeps full coverage and moves with you."],
    highlights: ["Layered sleeve look", "Contrast-edged chest pocket", "Side slits for easy movement", "Wide-leg trousers", "Three colours"],
    fabric: "Soft stretch fabric",
    gsm: 260, fit: "Oversized, relaxed fit. Size down for a closer fit.", includes: "Tunic and trousers",
    care: "Gentle machine wash in cold water. Iron on low heat.",
    colours: [
      { name: "Cream", hex: "#EFE5D0", image: "images/dune-coord-set-cream.jpg", sizes: { XS: 2, S: 3, M: 4, L: 3, XL: 1 } },
      { name: "Sand", hex: "#C8B08F", image: "images/dune-coord-set-sand.jpg", sizes: { S: 2, M: 3, L: 0, XL: 2 } },
      { name: "Slate blue", hex: "#8795A5", image: "images/dune-coord-set-slate.jpg", sizes: { S: 1, M: 0, L: 0, XL: 0 } }
    ]
  },

  {
    id: "nile-coord-set",
    category: "coords",
    name: "Nile Co-ord Set",
    arabic: "النيل",
    description: "Long-sleeve round-neck tunic with straight-cut pleated trousers.",
    price: 3690, discount: 15, badge: "Bestseller",
    images: ["images/nile-coord-set-brown.jpg", "images/nile-coord-set-cream.jpg", "images/nile-coord-set-camel.jpg", "images/nile-coord-set-rose.jpg"],
    crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A clean, everyday set: a loose round-neck tunic with side slits and long sleeves, matched with straight, pleated trousers that fall to the floor.", "Choose it in a neutral for work and daily wear, or in dusty rose for something softer. The tone-on-tone look makes styling simple."],
    highlights: ["Round neck with long sleeves", "Side slits on the tunic", "Pleated straight-leg trousers", "Tone-on-tone set", "Four colours"],
    fabric: "Soft crepe-style fabric",
    gsm: 270, fit: "Loose tunic with straight-leg trousers. True to size.", includes: "Tunic and trousers",
    care: "Gentle machine wash in cold water. Iron on low heat.",
    colours: [
      { name: "Brown", hex: "#6B4330", image: "images/nile-coord-set-brown.jpg", sizes: { XS: 1, S: 3, M: 4, L: 3, XL: 2 } },
      { name: "Cream", hex: "#EFE6D2", image: "images/nile-coord-set-cream.jpg", sizes: { S: 2, M: 2, L: 3, XL: 1 } },
      { name: "Camel", hex: "#D2B08C", image: "images/nile-coord-set-camel.jpg", sizes: { S: 0, M: 1, L: 2, XL: 0 } },
      { name: "Dusty rose", hex: "#C79A93", image: "images/nile-coord-set-rose.jpg", sizes: { XS: 0, S: 2, M: 2, L: 1, XL: 0 } }
    ]
  },

  {
    id: "aswan-tunic-set",
    category: "coords",
    name: "Aswan Tunic Set",
    arabic: "أسوان",
    description: "Flared oversized tunic with wide-leg trousers in a soft, matching colour.",
    price: 3990, badge: "",
    images: ["images/aswan-tunic-set-navy.jpg", "images/aswan-tunic-set-brown.jpg", "images/aswan-tunic-set-pink.jpg", "images/aswan-tunic-set-white.jpg"],
    crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A relaxed two-piece with a flared, oversized tunic and wide-leg trousers. The shape is airy and easy to layer, with full coverage.", "It looks great with a crossbody bag and a plain hijab. Pick one colour for a clean look or mix two for contrast."],
    highlights: ["Flared oversized tunic", "Wide-leg trousers", "Roomy, comfortable fit", "Four colours"],
    fabric: "Soft, lightweight fabric",
    gsm: 250, fit: "Flared, oversized tunic with wide-leg trousers.", includes: "Tunic and trousers",
    care: "Gentle machine wash in cold water. Iron on low heat.",
    colours: [
      { name: "Navy", hex: "#1F2A4A", image: "images/aswan-tunic-set-navy.jpg", sizes: { S: 2, M: 3, L: 3, XL: 1 } },
      { name: "Brown", hex: "#6B4330", image: "images/aswan-tunic-set-brown.jpg", sizes: { S: 1, M: 2, L: 2, XL: 0 } },
      { name: "Blush pink", hex: "#F0B8C8", image: "images/aswan-tunic-set-pink.jpg", sizes: { S: 2, M: 2, L: 1, XL: 1 } },
      { name: "White", hex: "#FFFFFF", image: "images/aswan-tunic-set-white.jpg", sizes: { S: 0, M: 1, L: 2, XL: 2 } }
    ]
  },

  {
    id: "luxor-top-trouser-set",
    category: "coords",
    name: "Luxor Top and Trouser Set",
    arabic: "الأقصر",
    description: "Fitted ribbed top with high-rise cream wide-leg trousers.",
    price: 3590, badge: "",
    images: ["images/luxor-top-trouser-set-front.jpg", "images/luxor-top-trouser-set-back.jpg"],
    crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A soft blush long-sleeve top with a fitted shape, paired with wide-leg trousers in cream. Layer a long cardigan or abaya on top for extra coverage.", "Photographed from the front and the back, so you can see how the set falls."],
    highlights: ["Fitted long-sleeve top", "Wide-leg cream trousers", "Pairs well with a long layer", "Front and back views shown"],
    fabric: "Soft ribbed stretch top, light woven trousers",
    gsm: 240, fit: "Fitted top, relaxed wide-leg trousers.", includes: "Top and trousers",
    care: "Gentle machine wash in cold water. Iron on low heat.",
    colours: [
      { name: "Blush and cream", hex: "#E6B3BD", image: "images/luxor-top-trouser-set-front.jpg", sizes: { XS: 2, S: 4, M: 4, L: 2, XL: 1 } }
    ]
  },

  {
    id: "petra-asymmetric-set",
    category: "coords",
    name: "Petra Asymmetric Set",
    arabic: "البتراء",
    description: "Asymmetric fitted knit top with pleated wide-leg trousers.",
    price: 4190, badge: "New",
    images: ["images/petra-asymmetric-set-grey.jpg", "images/petra-asymmetric-set-green.jpg"],
    crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A slim, fitted long-sleeve top with an asymmetric hem and a row of small buttons, worn with generous pleated wide-leg trousers.", "The contrast between the fitted top and flowing trousers is flattering and polished. Available in charcoal and in sage with stone trousers."],
    highlights: ["Asymmetric hem", "Small button detail", "Pleated wide-leg trousers", "Two colourways"],
    fabric: "Knit top, woven trousers",
    gsm: 260, fit: "Slim top, generous wide-leg trousers.", includes: "Top and trousers",
    care: "Dry clean or gentle hand wash. Iron on low heat.",
    colours: [
      { name: "Charcoal", hex: "#55575C", image: "images/petra-asymmetric-set-grey.jpg", sizes: { XS: 1, S: 3, M: 3, L: 2, XL: 1 } },
      { name: "Sage and stone", hex: "#A5B08A", image: "images/petra-asymmetric-set-green.jpg", sizes: { S: 2, M: 2, L: 0, XL: 0 } }
    ]
  },

  {
    id: "giza-dungaree",
    category: "casual",
    name: "Giza Dungaree",
    arabic: "الجيزة",
    description: "Wide-leg stone-beige dungaree for easy layering.",
    price: 3290, badge: "",
    images: ["images/giza-dungaree-front.jpg", "images/giza-dungaree-back.jpg"],
    crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A wide-leg dungaree in soft stone beige with adjustable straps and roomy pockets. Layer it over a long-sleeve top in any colour.", "Shown from the front and from the back. Style it with a plain hijab for a modest, relaxed everyday look."],
    highlights: ["Wide-leg cut", "Adjustable straps", "Roomy pockets", "Layers over any long-sleeve top"],
    fabric: "Soft cotton-blend fabric",
    gsm: 280, fit: "Wide, relaxed cut with adjustable straps.", includes: "Dungaree (top shown separately)",
    care: "Machine wash cold. Iron on medium heat.",
    colours: [
      { name: "Stone beige", hex: "#D9C3A5", image: "images/giza-dungaree-front.jpg", sizes: { XS: 1, S: 3, M: 3, L: 2, XL: 1 } }
    ]
  },

  {
    id: "karnak-plaid-cape",
    category: "casual",
    name: "Karnak Plaid Cape",
    arabic: "الكرنك",
    description: "Brown check cape with a tie belt, worn over straight trousers.",
    price: 4590, badge: "",
    images: ["images/karnak-plaid-cape.jpg"],
    crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A warm brown check cape that drapes over the shoulders and ties at the waist for shape. It adds structure to a plain outfit.", "Wear it over a knit top and straight trousers on cool days."],
    highlights: ["Check pattern", "Tie belt at the waist", "Drapes over the shoulders", "Easy to layer"],
    fabric: "Woven check fabric",
    gsm: 300, fit: "Drapes over the shoulders and ties at the waist.", includes: "Cape with tie belt",
    care: "Dry clean recommended.",
    colours: [
      { name: "Brown check", hex: "#6B4A3A", image: "images/karnak-plaid-cape.jpg", sizes: { S: 2, M: 3, L: 2, XL: 1 } }
    ]
  },

  {
    id: "alexandria-vest-set",
    category: "casual",
    name: "Alexandria Vest Set",
    arabic: "الإسكندرية",
    description: "Grey knit vest over a white long-sleeve top with pleated wide-leg trousers.",
    price: 4290, badge: "",
    images: ["images/alexandria-vest-set.jpg", "images/alexandria-vest-set-2.jpg"],
    crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A smart layered look: a charcoal knit vest with button detail, worn over a crisp white long-sleeve top, with high-waist pleated wide-leg trousers.", "Photographed from the front and the back, with close-ups of the knit and the pleats."],
    highlights: ["Knit vest with button detail", "White long-sleeve top", "High-waist pleated trousers", "Front and back views"],
    fabric: "Knit vest, woven trousers",
    gsm: 260, fit: "Smart, layered fit with high-waist trousers.", includes: "Vest, long-sleeve top and trousers",
    care: "Hand wash the knit in cold water. Dry flat.",
    colours: [
      { name: "Charcoal grey", hex: "#5A5E66", image: "images/alexandria-vest-set.jpg", sizes: { XS: 1, S: 3, M: 3, L: 2, XL: 1 } }
    ]
  },

  {
    id: "layali-lace-set",
    category: "tunics",
    name: "Layali Lace Set",
    arabic: "ليالي",
    description: "Sheer embroidered overlay top with balloon sleeves and matching wide-leg trousers.",
    price: 5490, discount: 20, badge: "New",
    images: ["images/layali-lace-set-lavender.jpg", "images/layali-lace-set-cream.jpg"],
    crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A dressy two-piece for evenings and occasions: a flowing top with a sheer embroidered overlay and soft balloon sleeves, paired with matching wide-leg trousers.", "The beaded floral overlay catches the light without being heavy. Wear it for dinners, Eid visits and family events."],
    highlights: ["Embroidered sheer overlay", "Balloon sleeves", "Matching wide-leg trousers", "Two colours"],
    fabric: "Soft crepe with embroidered net overlay",
    gsm: 210, fit: "Flowing top with balloon sleeves, relaxed trousers.", includes: "Overlay top and trousers",
    care: "Dry clean recommended.",
    colours: [
      { name: "Lavender", hex: "#CBB8E0", image: "images/layali-lace-set-lavender.jpg", sizes: { S: 1, M: 2, L: 2, XL: 0 } },
      { name: "Cream", hex: "#F3E7CF", image: "images/layali-lace-set-cream.jpg", sizes: { S: 2, M: 3, L: 1, XL: 1 } }
    ]
  },

  {
    id: "siwa-button-set",
    category: "activewear",
    name: "Siwa Button Set",
    arabic: "سيوة",
    description: "High-neck top with side-snap wide-leg trousers.",
    price: 3490, badge: "",
    images: ["images/siwa-button-set-burgundy.jpg", "images/siwa-button-set-black.jpg", "images/siwa-button-set-ivory.jpg"],
    crop: false, madeToOrder: false, hidden: false, outOfStock: false,
    longDescription: ["A comfortable high-neck, long-sleeve top with wide-leg trousers finished with a row of snap buttons down each side. The buttons add detail and let you adjust the width of the leg.", "Good for gym warm-ups, walks and relaxed days at home."],
    highlights: ["High neck, long sleeves", "Side-snap trousers", "Wide-leg, easy fit", "Three colours"],
    fabric: "Soft stretch jersey",
    gsm: 270, fit: "Comfortable, wide-leg fit with snap-button sides.", includes: "Top and trousers",
    care: "Machine wash cold, inside out. Do not tumble dry on high heat.",
    colours: [
      { name: "Burgundy", hex: "#6E1F32", image: "images/siwa-button-set-burgundy.jpg", sizes: { XS: 2, S: 4, M: 4, L: 3, XL: 1 } },
      { name: "Black", hex: "#1b1b1b", image: "images/siwa-button-set-black.jpg", sizes: { S: 3, M: 3, L: 2, XL: 2 } },
      { name: "Ivory", hex: "#F3EBDD", image: "images/siwa-button-set-ivory.jpg", sizes: { S: 1, M: 0, L: 2, XL: 0 } }
    ]
  }
];
