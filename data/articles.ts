export type ArticleCategory = "safety" | "legal" | "emotional" | "resources"

export interface Article {
  id: string
  title: string
  titleDiscreet: string
  category: ArticleCategory
  summary: string
  summaryDiscreet: string
  content: string
  readTime: number
  imageUrl?: string
}

export const articles: Article[] = [
  {
    id: "safety-plan",
    title: "Creating a Personal Safety Plan",
    titleDiscreet: "Creating a Personal Plan",
    category: "safety",
    summary: "Step-by-step guide to building a safety plan for yourself and your family.",
    summaryDiscreet: "Step-by-step guide to building a personal plan.",
    readTime: 5,
    content: `A safety plan is a personalized, practical plan that can help you avoid dangerous situations and know the best way to react when you are in danger.

**Step 1: Know the Signs**
Identify patterns of behavior that signal escalating danger. This could include increased arguments, threats, or controlling behavior.

**Step 2: Prepare Important Documents**
Keep copies of important documents like IDs, birth certificates, and financial records in a safe place outside your home, or with a trusted person.

**Step 3: Identify Safe Locations**
Know where you can go in an emergency. This could be a trusted friend's home, a family member, or a shelter. Keep addresses and phone numbers accessible.

**Step 4: Establish a Code Word**
Create a code word with trusted friends or family members. Use it when you need help but cannot speak freely.

**Step 5: Pack an Emergency Bag**
Keep a bag with essentials (clothing, medications, money, phone charger, documents) at a trusted location.

**Step 6: Know Your Contacts**
Keep emergency numbers memorized or saved in a discreet way on your phone.`,
  },
  {
    id: "legal-rights-kg",
    title: "Your Legal Rights in Kyrgyzstan",
    titleDiscreet: "Understanding Your Rights",
    category: "legal",
    summary: "Understanding the laws that protect women from domestic violence in the Kyrgyz Republic.",
    summaryDiscreet: "Understanding protective laws and regulations.",
    readTime: 7,
    content: `The Kyrgyz Republic has enacted several laws designed to protect individuals from domestic violence.

**The Law on Protection from Domestic Violence**
This law provides a legal framework for protecting victims, including provisions for protection orders and access to social services.

**Protection Orders**
You have the right to apply for a temporary protection order through the police, and a court protection order through the judicial system. These orders can prohibit an abuser from contacting you or coming near your home.

**Access to Services**
The law guarantees access to medical assistance, psychological support, legal aid, and temporary shelter for victims.

**Reporting and Documentation**
You can report incidents to the police. Medical records, photographs, and witness testimony can serve as evidence. Keep records of all incidents when safe to do so.

**Legal Representation**
Free legal aid is available through various NGOs and legal aid organizations. You have the right to legal representation in court.`,
  },
  {
    id: "emotional-recovery",
    title: "Beginning Your Healing Journey",
    titleDiscreet: "Starting a New Chapter",
    category: "emotional",
    summary: "Understanding trauma responses and taking the first steps toward emotional recovery.",
    summaryDiscreet: "Understanding personal responses and taking first steps forward.",
    readTime: 6,
    content: `Healing from trauma is a gradual process. There is no right or wrong way to feel, and recovery happens at its own pace.

**Understanding Your Reactions**
It is normal to experience a range of emotions including fear, anger, sadness, confusion, and numbness. These are natural responses to abnormal situations.

**Self-Care Basics**
Start with small, manageable steps:
- Try to maintain regular eating and sleeping patterns
- Engage in gentle physical activity when possible
- Practice deep breathing or grounding exercises
- Limit exposure to stressful content

**Seeking Support**
You do not have to face this alone. Consider reaching out to:
- A trusted friend or family member
- A professional counselor or therapist
- A support group for survivors
- A crisis helpline for immediate support

**Grounding Techniques**
When feeling overwhelmed, try the 5-4-3-2-1 technique: identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.`,
  },
  {
    id: "local-resources",
    title: "Support Resources in Kyrgyzstan",
    titleDiscreet: "Local Services Guide",
    category: "resources",
    summary: "A comprehensive guide to organizations and services available for women in Kyrgyzstan.",
    summaryDiscreet: "A comprehensive guide to available local services.",
    readTime: 4,
    content: `Kyrgyzstan has a growing network of organizations providing support services.

**Crisis Centers**
Several crisis centers operate throughout the country, offering emergency shelter, counseling, and legal assistance. Most services are free and confidential.

**Shelters**
Temporary shelters are available in major cities including Bishkek and Osh. They provide safe accommodation, food, and access to support services.

**Hotlines**
Multiple hotlines operate 24/7, providing confidential support in Kyrgyz and Russian. Calls are free from most networks.

**NGOs and Support Organizations**
Various non-governmental organizations provide specialized services including legal aid, psychological counseling, vocational training, and assistance with housing.

**Medical Services**
Hospitals and clinics are required to provide medical assistance to victims. You have the right to request documentation of injuries for legal purposes.`,
  },
]

export const articleCategoryLabels: Record<ArticleCategory, { label: string; labelDiscreet: string }> = {
  safety: { label: "Safety Planning", labelDiscreet: "Planning" },
  legal: { label: "Legal Rights", labelDiscreet: "Rights" },
  emotional: { label: "Emotional Health", labelDiscreet: "Wellbeing" },
  resources: { label: "Resources", labelDiscreet: "Services" },
}
