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
  lowStockAt: 3                      // shows "Few left" when total stock is this or less
};

/* HOW STOCK WORKS
   sizes: { S: 4, M: 0 }  -> number of pieces left in each size.
   0 = that size is greyed out. If every size is 0 the product shows "Sold out".
   madeToOrder: true      -> ignores stock; every size can be requested.
   badge: "New" / "Bestseller" / "" -> small tag on the photo.
   oldPrice: 9800 or null -> shows a struck-through price for sales.
   hidden: true           -> hides a product without deleting it.
   crop: true             -> zooms the photo in (use for photos with extra background). */

const PRODUCTS = [
  {
    id: "sahra-active-set",
    name: "Sahra Active Set",
    arabic: "سحر",
    description: "Burgundy tunic, wide-leg trousers and hijab for the gym and everyday wear.",
    price: 3490, oldPrice: null, badge: "New",
    image: "images/sahra-active-set.jpg", crop: false, madeToOrder: false, hidden: false,
    colours: [{ name: "Burgundy", hex: "#6E1F32" }, { name: "Taupe", hex: "#8C7B6A" }, { name: "Black", hex: "#1b1b1b" }],
    sizes: { XS: 2, S: 5, M: 6, L: 4, XL: 1 }
  },
  {
    id: "layered-active-tunic",
    name: "Layered Active Tunic",
    arabic: "طبقات",
    description: "Long-sleeve layered tunic with wide-leg trousers.",
    price: 3190, oldPrice: null, badge: "",
    image: "images/layered-active-tunic.jpg", crop: false, madeToOrder: false, hidden: false,
    colours: [{ name: "Taupe", hex: "#8C7B6A" }, { name: "Black", hex: "#1b1b1b" }, { name: "Sand", hex: "#D8C7A9" }],
    sizes: { S: 3, M: 0, L: 2, XL: 4, XXL: 1 }
  },
  {
    id: "noor-cape-abaya",
    name: "Noor Cape Abaya",
    arabic: "نور",
    description: "Ivory satin abaya with a draped cape, beaded yoke and embroidered hem.",
    price: 8900, oldPrice: 9800, badge: "Bestseller",
    image: "images/noor-cape-abaya.jpg", crop: false, madeToOrder: true, hidden: false,
    colours: [{ name: "Ivory", hex: "#F3EBDD" }, { name: "Champagne", hex: "#D9C29A" }, { name: "Sand", hex: "#C8B08A" }],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }
  },
  {
    id: "layla-lace-tunic",
    name: "Layla Lace Tunic",
    arabic: "ليلى",
    description: "Lace-trimmed tunic with pearl buttons and a ruffled hem.",
    price: 4200, oldPrice: null, badge: "",
    image: "images/layla-lace-tunic.jpg", crop: true, madeToOrder: false, hidden: false,
    colours: [{ name: "White", hex: "#FFFFFF" }, { name: "Ivory", hex: "#F3EBDD" }, { name: "Blush", hex: "#E4C3C9" }],
    sizes: { S: 1, M: 2, L: 0, XL: 0 }
  },
  {
    id: "rose-kaftan",
    name: "Rose Zardozi Kaftan",
    arabic: "وردة",
    description: "Dusty rose satin kaftan with bell sleeves and embroidered borders.",
    price: 7400, oldPrice: null, badge: "New",
    image: "images/rose-kaftan.jpg", crop: false, madeToOrder: true, hidden: false,
    colours: [{ name: "Dusty rose", hex: "#C99AAE" }, { name: "Burgundy", hex: "#6E1F32" }, { name: "Sage", hex: "#A5AD94" }],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 }
  }
];
