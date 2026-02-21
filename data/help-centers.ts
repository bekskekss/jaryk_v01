export interface HelpCenter {
  id: string
  name: string
  nameDiscreet: string
  address: string
  phone: string
  type: "shelter" | "legal" | "counseling" | "crisis"
  description: string
  descriptionDiscreet: string
  hours: string
  lat: number
  lng: number
}

export const helpCenters: HelpCenter[] = [
  {
    id: "center-1",
    name: "Women's Crisis Center",
    nameDiscreet: "Community Center",
    address: "123 Chuy Avenue, Bishkek",
    phone: "+996 312 111 222",
    type: "crisis",
    description: "24/7 crisis support, emergency shelter, and referral services",
    descriptionDiscreet: "24/7 support and referral services",
    hours: "24/7",
    lat: 42.874,
    lng: 74.589,
  },
  {
    id: "center-2",
    name: "Legal Aid for Women",
    nameDiscreet: "Legal Advisory Office",
    address: "45 Manas Street, Bishkek",
    phone: "+996 312 333 444",
    type: "legal",
    description: "Free legal consultations and court representation for domestic violence cases",
    descriptionDiscreet: "Free legal consultations and representation",
    hours: "Mon-Fri, 9:00-17:00",
    lat: 42.876,
    lng: 74.594,
  },
  {
    id: "center-3",
    name: "Safe Haven Shelter",
    nameDiscreet: "Temporary Housing",
    address: "78 Toktogul Street, Bishkek",
    phone: "+996 312 555 666",
    type: "shelter",
    description: "Temporary shelter with meals, counseling, and vocational training",
    descriptionDiscreet: "Temporary accommodation with support services",
    hours: "24/7",
    lat: 42.870,
    lng: 74.600,
  },
  {
    id: "center-4",
    name: "Psychological Support Center",
    nameDiscreet: "Wellness Center",
    address: "12 Ibraimov Street, Bishkek",
    phone: "+996 312 777 888",
    type: "counseling",
    description: "Individual and group therapy for trauma survivors",
    descriptionDiscreet: "Individual and group wellness sessions",
    hours: "Mon-Sat, 10:00-18:00",
    lat: 42.878,
    lng: 74.585,
  },
]

export const centerTypeLabels: Record<HelpCenter["type"], { label: string; labelDiscreet: string }> = {
  crisis: { label: "Crisis Center", labelDiscreet: "Support Center" },
  shelter: { label: "Shelter", labelDiscreet: "Housing" },
  legal: { label: "Legal Aid", labelDiscreet: "Advisory" },
  counseling: { label: "Counseling", labelDiscreet: "Wellness" },
}
