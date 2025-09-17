// Email template system for SVOI™
// Branded email templates with underground streetwear aesthetic

interface EmailTemplateData {
  orderId?: string
  customerName?: string
  orderDate?: string
  items?: Array<{
    name: string
    color: string
    size: string
    quantity: number
    price: number
    image: string
  }>
  subtotal?: number
  tax?: number
  shipping?: number
  total?: number
  shippingAddress?: string
  trackingNumber?: string
  carrier?: string
  trackingUrl?: string
  status?: string
  supportEmail?: string
  supportTelegram?: string
  supportInstagram?: string
}

// Base email layout with Svoi branding
const getEmailLayout = (content: string, lang: "ru" | "en" = "ru") => {
  const brandName = "SVOI™"
  const tagline = lang === "ru" ? "Underground Streetwear" : "Underground Streetwear"

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Courier New', monospace; 
      background: #0a0a0a; 
      color: #ffffff; 
      line-height: 1.6;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: #111111; 
      border: 1px solid #333333;
    }
    .header { 
      background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); 
      padding: 30px 20px; 
      text-align: center; 
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter></defs><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.1"/></svg>');
    }
    .brand { 
      font-size: 32px; 
      font-weight: bold; 
      color: #000000; 
      text-shadow: 2px 2px 0px #ffffff;
      position: relative;
      z-index: 1;
    }
    .tagline { 
      font-size: 12px; 
      color: #000000; 
      margin-top: 5px;
      position: relative;
      z-index: 1;
    }
    .content { 
      padding: 30px 20px; 
    }
    .section { 
      margin-bottom: 30px; 
    }
    .section h2 { 
      color: #ff6b35; 
      font-size: 18px; 
      margin-bottom: 15px;
      text-transform: uppercase;
    }
    .order-item { 
      display: flex; 
      align-items: center; 
      padding: 15px 0; 
      border-bottom: 1px solid #333333;
    }
    .item-image { 
      width: 60px; 
      height: 60px; 
      background: #333333; 
      margin-right: 15px;
      border-radius: 4px;
    }
    .item-details { 
      flex: 1; 
    }
    .item-name { 
      font-weight: bold; 
      color: #ffffff; 
    }
    .item-variant { 
      font-size: 12px; 
      color: #999999; 
    }
    .item-price { 
      font-weight: bold; 
      color: #ff6b35; 
    }
    .total-row { 
      display: flex; 
      justify-content: space-between; 
      padding: 10px 0; 
      border-bottom: 1px solid #333333;
    }
    .total-final { 
      display: flex; 
      justify-content: space-between; 
      padding: 15px 0; 
      font-size: 18px; 
      font-weight: bold; 
      color: #ff6b35;
    }
    .button { 
      display: inline-block; 
      background: #ff6b35; 
      color: #000000; 
      padding: 12px 24px; 
      text-decoration: none; 
      border-radius: 4px; 
      font-weight: bold;
      margin: 10px 5px;
    }
    .button:hover { 
      background: #e55a2b; 
    }
    .footer { 
      background: #000000; 
      padding: 30px 20px; 
      text-align: center; 
      border-top: 1px solid #333333;
    }
    .social-links { 
      margin: 20px 0; 
    }
    .social-links a { 
      color: #ff6b35; 
      text-decoration: none; 
      margin: 0 10px;
    }
    .legal { 
      font-size: 11px; 
      color: #666666; 
      margin-top: 20px;
    }
    .glitch { 
      position: relative; 
      color: #ffffff;
    }
    .glitch::before { 
      content: attr(data-text); 
      position: absolute; 
      top: 0; 
      left: 2px; 
      color: #ff6b35; 
      z-index: -1;
    }
    .status-badge {
      display: inline-block;
      background: #333333;
      color: #ffffff;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      margin: 5px 0;
    }
    .status-shipped { background: #4ade80; color: #000000; }
    .status-delivered { background: #22c55e; color: #000000; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand glitch" data-text="${brandName}">${brandName}</div>
      <div class="tagline">${tagline}</div>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <div class="social-links">
        <a href="https://t.me/svoi_support">Telegram</a>
        <a href="https://instagram.com/svoi_brand">Instagram</a>
        <a href="mailto:support@svoi.com">Email</a>
      </div>
      <div class="legal">
        © 2024 ${brandName}. All rights reserved.<br>
        Underground streetwear for the digital generation.
      </div>
    </div>
  </div>
</body>
</html>
  `
}

// Order confirmation email template
export const getOrderConfirmationEmail = (data: EmailTemplateData, lang: "ru" | "en" = "ru") => {
  const copy = {
    ru: {
      subject: `SVOI™: Мамонтизация подтверждена #${data.orderId}`,
      title: "🔥 Твой сет ушёл в продакшн!",
      subtitle: "💳 Мамонтизация завершена. Спасибо!",
      orderDetails: "Детали заказа",
      orderNumber: "Номер заказа",
      orderDate: "Дата заказа",
      items: "Товары",
      shippingAddress: "Адрес доставки",
      orderSummary: "Итого по заказу",
      subtotal: "Подытог",
      tax: "Налог",
      shipping: "Доставка",
      total: "Итого",
      nextSteps: "Что дальше?",
      processing: "Мы подготовим твой заказ к отправке в течение 1-2 рабочих дней.",
      tracking: "Как только заказ будет отправлен, ты получишь трек-номер на email.",
      support: "Вопросы? Пиши в Telegram или Instagram.",
      viewOrder: "Посмотреть заказ",
      shopMore: "🧭 К каталогу",
    },
    en: {
      subject: `SVOI™: Mammonization confirmed #${data.orderId}`,
      title: "🔥 Your set went to production!",
      subtitle: "💳 Mammonization completed. Thanks!",
      orderDetails: "Order Details",
      orderNumber: "Order Number",
      orderDate: "Order Date",
      items: "Items",
      shippingAddress: "Shipping Address",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      tax: "Tax",
      shipping: "Shipping",
      total: "Total",
      nextSteps: "What's next?",
      processing: "We'll prepare your order for shipment within 1-2 business days.",
      tracking: "Once shipped, you'll receive tracking info via email.",
      support: "Questions? Hit us up on Telegram or Instagram.",
      viewOrder: "View Order",
      shopMore: "🧭 To Catalog",
    },
  }

  const t = copy[lang]

  const itemsHtml =
    data.items
      ?.map(
        (item) => `
    <div class="order-item">
      <div class="item-image"></div>
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-variant">${item.color} • ${item.size} • ${lang === "ru" ? "Кол-во" : "Qty"}: ${item.quantity}</div>
      </div>
      <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `,
      )
      .join("") || ""

  const content = `
    <div class="section">
      <h1 style="color: #ff6b35; font-size: 24px; margin-bottom: 10px;">${t.title}</h1>
      <p style="color: #999999; font-size: 16px;">${t.subtitle}</p>
    </div>

    <div class="section">
      <h2>${t.orderDetails}</h2>
      <div class="total-row">
        <span>${t.orderNumber}:</span>
        <span style="font-family: monospace;">#${data.orderId}</span>
      </div>
      <div class="total-row">
        <span>${t.orderDate}:</span>
        <span>${data.orderDate}</span>
      </div>
    </div>

    <div class="section">
      <h2>${t.items}</h2>
      ${itemsHtml}
    </div>

    ${
      data.shippingAddress
        ? `
    <div class="section">
      <h2>${t.shippingAddress}</h2>
      <p style="color: #cccccc;">${data.shippingAddress}</p>
    </div>
    `
        : ""
    }

    <div class="section">
      <h2>${t.orderSummary}</h2>
      <div class="total-row">
        <span>${t.subtotal}:</span>
        <span>$${data.subtotal?.toFixed(2)}</span>
      </div>
      ${
        data.tax
          ? `
      <div class="total-row">
        <span>${t.tax}:</span>
        <span>$${data.tax.toFixed(2)}</span>
      </div>
      `
          : ""
      }
      <div class="total-row">
        <span>${t.shipping}:</span>
        <span>${data.shipping === 0 ? (lang === "ru" ? "Бесплатно" : "Free") : `$${data.shipping?.toFixed(2)}`}</span>
      </div>
      <div class="total-final">
        <span>${t.total}:</span>
        <span>$${data.total?.toFixed(2)}</span>
      </div>
    </div>

    <div class="section">
      <h2>${t.nextSteps}</h2>
      <p style="color: #cccccc; margin-bottom: 15px;">${t.processing}</p>
      <p style="color: #cccccc; margin-bottom: 15px;">${t.tracking}</p>
      <p style="color: #cccccc;">${t.support}</p>
    </div>

    <div class="section" style="text-align: center;">
      <a href="/account/orders" class="button">${t.viewOrder}</a>
      <a href="/catalog" class="button">${t.shopMore}</a>
    </div>
  `

  return {
    subject: t.subject,
    html: getEmailLayout(content, lang),
  }
}

// Shipping notification email template
export const getShippingNotificationEmail = (data: EmailTemplateData, lang: "ru" | "en" = "ru") => {
  const copy = {
    ru: {
      subject: `SVOI™: Твой дроп уже в пути 🚚 #${data.orderId}`,
      title: "🚚 Твой сет отправлен!",
      subtitle: "Дроп уже в пути к тебе",
      shipped: "Отправлено",
      tracking: "Отслеживание",
      carrier: "Служба доставки",
      trackingNumber: "Трек-номер",
      estimatedDelivery: "Ожидаемая доставка",
      trackPackage: "Отследить посылку",
      orderDetails: "Детали заказа",
      support: "Вопросы по доставке? Пиши нам!",
    },
    en: {
      subject: `SVOI™: Your drop is on the way 🚚 #${data.orderId}`,
      title: "🚚 Your set has shipped!",
      subtitle: "Drop is on its way to you",
      shipped: "Shipped",
      tracking: "Tracking",
      carrier: "Carrier",
      trackingNumber: "Tracking Number",
      estimatedDelivery: "Estimated Delivery",
      trackPackage: "Track Package",
      orderDetails: "Order Details",
      support: "Questions about delivery? Hit us up!",
    },
  }

  const t = copy[lang]

  const content = `
    <div class="section">
      <h1 style="color: #ff6b35; font-size: 24px; margin-bottom: 10px;">${t.title}</h1>
      <p style="color: #999999; font-size: 16px;">${t.subtitle}</p>
      <div class="status-badge status-shipped">${t.shipped}</div>
    </div>

    <div class="section">
      <h2>${t.tracking}</h2>
      <div class="total-row">
        <span>${t.carrier}:</span>
        <span>${data.carrier}</span>
      </div>
      <div class="total-row">
        <span>${t.trackingNumber}:</span>
        <span style="font-family: monospace;">${data.trackingNumber}</span>
      </div>
      <div class="total-row">
        <span>${t.estimatedDelivery}:</span>
        <span>3-7 ${lang === "ru" ? "рабочих дней" : "business days"}</span>
      </div>
    </div>

    <div class="section" style="text-align: center;">
      <a href="${data.trackingUrl}" class="button">${t.trackPackage}</a>
      <a href="/account/orders" class="button">${t.orderDetails}</a>
    </div>

    <div class="section">
      <p style="color: #cccccc; text-align: center;">${t.support}</p>
    </div>
  `

  return {
    subject: t.subject,
    html: getEmailLayout(content, lang),
  }
}

// Order status update email template
export const getStatusUpdateEmail = (data: EmailTemplateData, lang: "ru" | "en" = "ru") => {
  const copy = {
    ru: {
      subject: `SVOI™: Твой сет обновлён #${data.orderId}`,
      title: "📦 Обновление заказа",
      subtitle: "Статус твоего дропа изменился",
      newStatus: "Новый статус",
      orderNumber: "Номер заказа",
      viewOrder: "Посмотреть заказ",
      support: "Нужна помощь? Мы на связи!",
    },
    en: {
      subject: `SVOI™: Your set was updated #${data.orderId}`,
      title: "📦 Order Update",
      subtitle: "Your drop status has changed",
      newStatus: "New Status",
      orderNumber: "Order Number",
      viewOrder: "View Order",
      support: "Need help? We're here!",
    },
  }

  const t = copy[lang]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return `<div class="status-badge">${lang === "ru" ? "⏳ Обработка" : "⏳ Processing"}</div>`
      case "shipped":
        return `<div class="status-badge status-shipped">${lang === "ru" ? "🚚 Отправлено" : "🚚 Shipped"}</div>`
      case "delivered":
        return `<div class="status-badge status-delivered">${lang === "ru" ? "✅ Доставлено" : "✅ Delivered"}</div>`
      default:
        return `<div class="status-badge">${status}</div>`
    }
  }

  const content = `
    <div class="section">
      <h1 style="color: #ff6b35; font-size: 24px; margin-bottom: 10px;">${t.title}</h1>
      <p style="color: #999999; font-size: 16px;">${t.subtitle}</p>
    </div>

    <div class="section">
      <div class="total-row">
        <span>${t.orderNumber}:</span>
        <span style="font-family: monospace;">#${data.orderId}</span>
      </div>
      <div class="total-row">
        <span>${t.newStatus}:</span>
        <span>${getStatusBadge(data.status || "")}</span>
      </div>
    </div>

    <div class="section" style="text-align: center;">
      <a href="/account/orders" class="button">${t.viewOrder}</a>
    </div>

    <div class="section">
      <p style="color: #cccccc; text-align: center;">${t.support}</p>
    </div>
  `

  return {
    subject: t.subject,
    html: getEmailLayout(content, lang),
  }
}

// Post-purchase upsell email template (optional)
export const getPostPurchaseUpsellEmail = (data: EmailTemplateData, lang: "ru" | "en" = "ru") => {
  const copy = {
    ru: {
      subject: `SVOI™: +1 к сету? 48 часов на апгрейд`,
      title: "🔥 Заверши коллекцию",
      subtitle: "Эксклюзивное предложение только для тебя",
      limited: "Ограниченное предложение",
      expires: "Действует 48 часов",
      discount: "Скидка 15% на следующий дроп",
      shopNow: "⚡ Забрать дроп",
      noThanks: "Не сейчас",
    },
    en: {
      subject: `SVOI™: +1 for your set? 48h to upgrade`,
      title: "🔥 Complete the collection",
      subtitle: "Exclusive offer just for you",
      limited: "Limited offer",
      expires: "Valid for 48 hours",
      discount: "15% off your next drop",
      shopNow: "⚡ Grab the drop",
      noThanks: "Not now",
    },
  }

  const t = copy[lang]

  const content = `
    <div class="section">
      <h1 style="color: #ff6b35; font-size: 24px; margin-bottom: 10px;">${t.title}</h1>
      <p style="color: #999999; font-size: 16px;">${t.subtitle}</p>
      <div class="status-badge" style="background: #ff6b35; color: #000000;">${t.limited}</div>
    </div>

    <div class="section" style="text-align: center; background: #1a1a1a; padding: 20px; border-radius: 8px;">
      <h3 style="color: #ff6b35; margin-bottom: 10px;">${t.discount}</h3>
      <p style="color: #cccccc; margin-bottom: 15px;">${t.expires}</p>
      <div style="font-size: 32px; font-weight: bold; color: #ffffff; font-family: monospace;">15%</div>
    </div>

    <div class="section" style="text-align: center;">
      <a href="/catalog?discount=COMPLETE15" class="button">${t.shopNow}</a>
      <br>
      <a href="#" style="color: #666666; text-decoration: none; font-size: 12px; margin-top: 10px; display: inline-block;">${t.noThanks}</a>
    </div>
  `

  return {
    subject: t.subject,
    html: getEmailLayout(content, lang),
  }
}
