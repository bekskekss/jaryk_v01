/**
 * Centralized label mapping for Discreet Mode.
 * Maps sensitive labels to neutral alternatives.
 */

export const discreetLabels: Record<string, string> = {
  // Navigation
  "Home": "Home",
  "SOS": "Quick Action",
  "Help Centers": "Locations",
  "AI Chat": "Assistant",
  "Educational Hub": "Library",
  "Hub": "Library",
  "Profile": "Account",
  "Settings": "Preferences",

  // App identity
  "JARYK": "Notes",
  "Jaryk": "Notes",

  // SOS flow
  "Emergency SOS": "Quick Action",
  "Send Emergency Alert": "Send Notification",
  "Alert Sent": "Notification Sent",
  "Emergency Contacts": "Saved Contacts",
  "Your trusted contacts will be notified": "Your contacts will be notified",

  // Help Centers
  "Crisis Center": "Support Center",
  "Shelter": "Housing",
  "Counseling": "Wellness",
  "Legal Aid": "Advisory",

  // Articles / Hub
  "Safety Planning": "Planning",
  "Legal Rights": "Rights",
  "Emotional Health": "Wellbeing",
  "Resources": "Services",

  // Contacts
  "Emergency": "Urgent",
  "Hotlines": "Support Lines",
  "Psychological": "Wellness",

  // Welcome
  "You are not alone": "Welcome",
  "Get immediate help": "Get started",
  "Support & Resources": "Information & Services",
}

/**
 * Returns the discreet version of a label if discreet mode is active,
 * otherwise returns the original label.
 */
export function getLabel(label: string, isDiscreet: boolean): string {
  if (!isDiscreet) return label
  return discreetLabels[label] ?? label
}
