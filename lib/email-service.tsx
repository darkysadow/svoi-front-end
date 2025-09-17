// Email service for sending branded notifications
// This would integrate with actual email providers like SendGrid, Nodemailer, etc.

import {
  getOrderConfirmationEmail,
  getShippingNotificationEmail,
  getStatusUpdateEmail,
  getPostPurchaseUpsellEmail,
} from "./email-templates"

interface EmailData {
  orderId?: string
  customerName?: string
  customerEmail?: string
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
  language?: "ru" | "en"
}

// Mock email service - in production this would use actual email provider
class EmailService {
  private async sendEmail(to: string, subject: string, html: string) {
    // In production, integrate with:
    // - SendGrid: await sgMail.send({ to, subject, html })
    // - Nodemailer: await transporter.sendMail({ to, subject, html })
    // - Resend: await resend.emails.send({ to, subject, html })

    console.log(`[v0] Email sent to ${to}:`, { subject })
    console.log(`[v0] Email HTML preview:`, html.substring(0, 200) + "...")

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    return { success: true, messageId: `msg_${Date.now()}` }
  }

  async sendOrderConfirmation(data: EmailData) {
    if (!data.customerEmail) {
      throw new Error("Customer email is required")
    }

    const template = getOrderConfirmationEmail(data, data.language || "ru")

    return await this.sendEmail(data.customerEmail, template.subject, template.html)
  }

  async sendShippingNotification(data: EmailData) {
    if (!data.customerEmail || !data.trackingNumber) {
      throw new Error("Customer email and tracking number are required")
    }

    const template = getShippingNotificationEmail(data, data.language || "ru")

    return await this.sendEmail(data.customerEmail, template.subject, template.html)
  }

  async sendStatusUpdate(data: EmailData) {
    if (!data.customerEmail || !data.status) {
      throw new Error("Customer email and status are required")
    }

    const template = getStatusUpdateEmail(data, data.language || "ru")

    return await this.sendEmail(data.customerEmail, template.subject, template.html)
  }

  async sendPostPurchaseUpsell(data: EmailData) {
    if (!data.customerEmail) {
      throw new Error("Customer email is required")
    }

    const template = getPostPurchaseUpsellEmail(data, data.language || "ru")

    return await this.sendEmail(data.customerEmail, template.subject, template.html)
  }

  // Batch email sending for admin notifications
  async sendAdminNotification(orderData: EmailData) {
    const adminEmail = "admin@svoi.com"
    const subject = `New Order #${orderData.orderId} - $${orderData.total?.toFixed(2)}`

    const html = `
      <h2>New Order Received</h2>
      <p><strong>Order ID:</strong> #${orderData.orderId}</p>
      <p><strong>Customer:</strong> ${orderData.customerName} (${orderData.customerEmail})</p>
      <p><strong>Total:</strong> $${orderData.total?.toFixed(2)}</p>
      <p><strong>Items:</strong> ${orderData.items?.length || 0}</p>
      <p><strong>Date:</strong> ${orderData.orderDate}</p>
      <a href="/admin/orders/${orderData.orderId}">View Order Details</a>
    `

    return await this.sendEmail(adminEmail, subject, html)
  }
}

export const emailService = new EmailService()

// Helper functions for common email workflows
export const sendOrderWorkflow = async (orderData: EmailData) => {
  try {
    // Send order confirmation to customer
    await emailService.sendOrderConfirmation(orderData)

    // Send admin notification
    await emailService.sendAdminNotification(orderData)

    // Schedule post-purchase upsell (48 hours later)
    // In production, this would use a job queue like Bull or Agenda
    setTimeout(
      async () => {
        await emailService.sendPostPurchaseUpsell(orderData)
      },
      48 * 60 * 60 * 1000,
    ) // 48 hours

    return { success: true }
  } catch (error) {
    console.error("[v0] Email workflow failed:", error)
    return { success: false, error }
  }
}

export const sendShippingWorkflow = async (orderData: EmailData) => {
  try {
    // Send shipping notification
    await emailService.sendShippingNotification(orderData)

    // Update order status
    await emailService.sendStatusUpdate({
      ...orderData,
      status: "shipped",
    })

    return { success: true }
  } catch (error) {
    console.error("[v0] Shipping workflow failed:", error)
    return { success: false, error }
  }
}
