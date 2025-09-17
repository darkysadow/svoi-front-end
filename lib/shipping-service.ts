// Shipping service for dynamic rate calculation and carrier integration
// Supports DHL, GLS, SEUR, and Correos Express as specified in technical requirements

interface ShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface ShippingRate {
  carrier: "DHL" | "GLS" | "SEUR" | "CORREOS"
  service: string
  price: number
  estimatedDays: string
  trackingUrl?: string
}

interface TrackingInfo {
  carrier: "DHL" | "GLS" | "SEUR" | "CORREOS" | "OTHER"
  trackingNumber: string
  status: "processing" | "shipped" | "in_transit" | "out_for_delivery" | "delivered" | "exception"
  estimatedDelivery?: string
  trackingUrl: string
  updates: Array<{
    date: string
    status: string
    location: string
    description: string
  }>
}

// Mock shipping rates - in production this would call real carrier APIs
const getShippingRates = async (address: ShippingAddress, weight = 1, value = 100): Promise<ShippingRate[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const isEU = ["ES", "FR", "DE", "IT", "NL", "BE", "AT", "PT"].includes(address.country)
  const isCIS = ["RU", "UA", "BY", "KZ", "UZ"].includes(address.country)

  const rates: ShippingRate[] = []

  if (isEU) {
    // EU shipping options
    rates.push(
      {
        carrier: "DHL",
        service: "DHL Express",
        price: 15.99,
        estimatedDays: "1-2 business days",
      },
      {
        carrier: "GLS",
        service: "GLS Standard",
        price: 8.99,
        estimatedDays: "3-5 business days",
      },
      {
        carrier: "SEUR",
        service: "SEUR 24H",
        price: 12.99,
        estimatedDays: "1-2 business days",
      },
    )

    if (address.country === "ES") {
      rates.push({
        carrier: "CORREOS",
        service: "Correos Express",
        price: 6.99,
        estimatedDays: "2-4 business days",
      })
    }
  } else if (isCIS) {
    // CIS shipping options
    rates.push({
      carrier: "DHL",
      service: "DHL Express International",
      price: 35.99,
      estimatedDays: "5-7 business days",
    })
  } else {
    // Rest of world
    rates.push({
      carrier: "DHL",
      service: "DHL Express Worldwide",
      price: 45.99,
      estimatedDays: "7-14 business days",
    })
  }

  return rates.sort((a, b) => a.price - b.price)
}

// Generate tracking URL based on carrier
const generateTrackingUrl = (carrier: string, trackingNumber: string): string => {
  const urls = {
    DHL: `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`,
    GLS: `https://gls-group.eu/EU/en/parcel-tracking?match=${trackingNumber}`,
    SEUR: `https://www.seur.com/livetracking/pages/seguimiento-online.do?faces-redirect=true&includeViewParams=true&numero_seguimiento=${trackingNumber}`,
    CORREOS: `https://www.correos.es/ss/Satellite/site/pagina-localizador_envios/busqueda-sidioma=es_ES?numero=${trackingNumber}`,
    OTHER: "#", // For custom tracking URLs
  }

  return urls[carrier as keyof typeof urls] || urls.OTHER
}

// Mock tracking data - in production this would call carrier APIs
const getTrackingInfo = async (trackingNumber: string, carrier: string): Promise<TrackingInfo> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const mockTracking: TrackingInfo = {
    carrier: carrier as any,
    trackingNumber,
    status: "in_transit",
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    trackingUrl: generateTrackingUrl(carrier, trackingNumber),
    updates: [
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: "Shipped",
        location: "Madrid, ES",
        description: "Package has been shipped from our warehouse",
      },
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: "In Transit",
        location: "Paris, FR",
        description: "Package is in transit to destination country",
      },
      {
        date: new Date().toISOString(),
        status: "Out for Delivery",
        location: "Berlin, DE",
        description: "Package is out for delivery",
      },
    ],
  }

  return mockTracking
}

export { getShippingRates, getTrackingInfo, generateTrackingUrl }
export type { ShippingAddress, ShippingRate, TrackingInfo }
