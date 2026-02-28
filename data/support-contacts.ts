export type ContactCategory = "emergency" | "hotline" | "legal" | "psychological"

export interface SupportContact {
  id: string
  name: string
  nameRu?: string
  nameDiscreet: string
  category: ContactCategory
  phone: string
  description: string
  descriptionDiscreet: string
  available: string
  availableRu?: string
  location?: string
}

export const supportContacts: SupportContact[] = [
  {
    id: "emergency-112",
    name: "Emergency Services",
    nameRu: "Экстренные службы",
    nameDiscreet: "General Services",
    category: "emergency",
    phone: "112",
    description: "National emergency number for immediate danger",
    descriptionDiscreet: "National general services line",
    available: "24/7",
    availableRu: "Круглосуточно",
  },
  {
    id: "hotline-crisis",
    name: "Crisis Support Hotline",
    nameRu: "Кризисная линия поддержки",
    nameDiscreet: "Support Line",
    category: "hotline",
    phone: "+996 312 654 321",
    description: "Confidential crisis support for women facing violence",
    descriptionDiscreet: "Confidential support line",
    available: "24/7",
    availableRu: "Круглосуточно",
  },
  {
    id: "hotline-womens-center",
    name: "Women's Support Center",
    nameRu: "Женский центр поддержки",
    nameDiscreet: "Community Center",
    category: "hotline",
    phone: "+996 312 987 654",
    description: "Free counseling and temporary shelter referrals",
    descriptionDiscreet: "Community assistance center",
    available: "Mon-Fri, 9:00-18:00",
    availableRu: "Пн-Пт, 9:00-18:00",
  },
  {
    id: "legal-aid",
    name: "Legal Aid Foundation",
    nameDiscreet: "Advisory Services",
    category: "legal",
    phone: "+996 312 123 456",
    description: "Free legal consultations and court representation",
    descriptionDiscreet: "Professional advisory services",
    available: "Mon-Fri, 9:00-17:00",
    availableRu: "Пн-Пт, 9:00-17:00",
    location: "Bishkek",
  },
  {
    id: "legal-rights",
    name: "Rights Protection Center",
    nameDiscreet: "Civic Center",
    category: "legal",
    phone: "+996 312 456 789",
    description: "Protection orders and legal advocacy",
    descriptionDiscreet: "Civic assistance center",
    available: "Mon-Sat, 10:00-18:00",
    availableRu: "Пн-Сб, 10:00-18:00",
    location: "Bishkek",
  },
  {
    id: "psych-support",
    name: "Psychological Support Center",
    nameDiscreet: "Wellness Center",
    category: "psychological",
    phone: "+996 312 321 654",
    description: "Free psychological counseling and trauma support",
    descriptionDiscreet: "Wellness and wellbeing services",
    available: "Mon-Fri, 9:00-17:00",
    availableRu: "Пн-Пт, 9:00-17:00",
    location: "Bishkek",
  },
  {
    id: "psych-helpline",
    name: "Mental Health Helpline",
    nameDiscreet: "Health Line",
    category: "psychological",
    phone: "+996 312 789 012",
    description: "Anonymous mental health support and referrals",
    descriptionDiscreet: "General health support line",
    available: "24/7",
    availableRu: "Круглосуточно",
  },
]

export const categoryLabels: Record<ContactCategory, { label: string; labelDiscreet: string }> = {
  emergency: { label: "Emergency", labelDiscreet: "Urgent" },
  hotline: { label: "Hotlines", labelDiscreet: "Support Lines" },
  legal: { label: "Legal Aid", labelDiscreet: "Advisory" },
  psychological: { label: "Psychological", labelDiscreet: "Wellness" },
}
