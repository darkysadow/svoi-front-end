"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Edit, Save, X, MapPin, Phone, Mail, Calendar } from "lucide-react"

const countries = [
  { code: "US", name: "United States" },
  { code: "ES", name: "Spain" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "IT", name: "Italy" },
  { code: "CH", name: "Switzerland" },
]

export function ProfileSection() {
  const { state, updateUser } = useAuth()
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: state.user?.name || "",
    email: state.user?.email || "",
    phone: state.user?.phone || "",
    address: {
      street: state.user?.address?.street || "",
      city: state.user?.address?.city || "",
      state: state.user?.address?.state || "",
      zipCode: state.user?.address?.zipCode || "",
      country: state.user?.address?.country || "US",
    },
  })

  const handleSave = () => {
    updateUser({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: state.user?.name || "",
      email: state.user?.email || "",
      phone: state.user?.phone || "",
      address: {
        street: state.user?.address?.street || "",
        city: state.user?.address?.city || "",
        state: state.user?.address?.state || "",
        zipCode: state.user?.address?.zipCode || "",
        country: state.user?.address?.country || "US",
      },
    })
    setIsEditing(false)
  }

  const memberSince = state.user?.createdAt
    ? new Date(state.user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "Unknown"

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("account.profileInformation")}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{t("account.managePersonalInfo")}</p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                {t("account.editProfile")}
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  {t("actions.save")}
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  {t("actions.cancel")}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Account Status */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {t("account.activeMember")}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>
                  {t("account.memberSince")} {memberSince}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("account.personalInformation")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("account.fullName")}</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2">
                    <span>{state.user?.name || t("account.notProvided")}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("account.emailAddress")}</Label>
                <div className="flex items-center gap-2 p-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{state.user?.email}</span>
                  <Badge variant="outline" className="text-xs">
                    {t("account.verified")}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("account.phoneNumber")}</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{state.user?.phone || t("account.notProvided")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Address Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold">{t("account.addressInformation")}</h3>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">{t("account.streetAddress")}</Label>
                  <Input
                    id="street"
                    value={formData.address.street}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, street: e.target.value },
                      })
                    }
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">{t("account.city")}</Label>
                    <Input
                      id="city"
                      value={formData.address.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, city: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">{t("account.state")}</Label>
                    <Input
                      id="state"
                      value={formData.address.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, state: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">{t("account.zipCode")}</Label>
                    <Input
                      id="zipCode"
                      value={formData.address.zipCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, zipCode: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">{t("account.country")}</Label>
                  <Select
                    value={formData.address.country}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, country: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-muted/50 rounded-lg">
                {state.user?.address ? (
                  <div className="space-y-1 text-sm">
                    <p>{state.user.address.street}</p>
                    <p>
                      {state.user.address.city}, {state.user.address.state} {state.user.address.zipCode}
                    </p>
                    <p>{countries.find((c) => c.code === state.user?.address?.country)?.name}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">{t("account.noAddressProvided")}</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
