import { AccountLayout } from "@/components/account/account-layout"
import { OrderHistory } from "@/components/account/order-history"

export default function OrdersPage() {
  return (
    <AccountLayout>
      <OrderHistory />
    </AccountLayout>
  )
}
