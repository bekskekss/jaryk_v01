export type ArticleCategory = "safety" | "legal" | "emotional" | "resources"

export interface Article {
  id: string
  title: string
  titleRu: string
  titleDiscreet: string
  titleDiscreetRu: string
  category: ArticleCategory
  summary: string
  summaryRu: string
  summaryDiscreet: string
  summaryDiscreetRu: string
  content: string
  contentRu: string
  readTime: number
  imageUrl?: string
}

export const articles: Article[] = [
  {
    id: "safety-plan",
    title: "What To Do in a Dangerous Situation: A Detailed Safety Algorithm",
    titleRu: "Что делать в ситуации угрозы: подробный алгоритм безопасности",
    titleDiscreet: "Safety Response Algorithm",
    titleDiscreetRu: "Алгоритм действий",
    category: "safety",
    summary: "A practical step-by-step response for urgent threat situations.",
    summaryRu: "Практический пошаговый алгоритм действий в ситуации угрозы.",
    summaryDiscreet: "A practical step-by-step response plan.",
    summaryDiscreetRu: "Краткий пошаговый план действий.",
    readTime: 5,
    content: `Dangerous situations can escalate quickly and unexpectedly. In such moments, having a prepared action plan reduces panic and helps maintain control.

First, regulate your breathing. Slowly inhale through your nose, hold for a few seconds, and exhale slowly. Even 20-30 seconds of controlled breathing can reduce anxiety and restore rational thinking.

Second, assess your surroundings. Look around: are there people nearby, well-lit areas, security cameras, open businesses? Identify the nearest safe exit. Your goal is to increase distance between yourself and the threat.

Third, move to a safe zone. This could be a store, pharmacy, cafe, entrance with a door intercom, or any public place. The presence of people and light significantly increases safety.

Fourth, use technology. If possible, send an SOS alert through the JARYK app or call trusted contacts. Even a short message with your location can make a critical difference.

Fifth, contact emergency services if the situation escalates. You have the right to protection. Asking for help is not weakness, it is a reasonable and strong decision.

Remember: your safety is the priority. Social pressure or fear of judgment should never prevent you from protecting yourself.`,
    contentRu: `Опасная ситуация может развиваться быстро и неожиданно. В такие моменты важно не только реагировать инстинктивно, но и иметь заранее продуманный план действий. Подготовка снижает риск паники и помогает сохранить контроль.

Первое — стабилизируйте дыхание. Медленно вдохните через нос, задержите дыхание на несколько секунд и медленно выдохните. Даже 20-30 секунд осознанного дыхания помогают снизить уровень тревоги и включить рациональное мышление.

Второе — оцените обстановку. Посмотрите вокруг: есть ли рядом люди, освещенные места, камеры наблюдения, открытые помещения? Определите ближайший безопасный выход. Ваша задача — увеличить дистанцию между собой и источником угрозы.

Третье — переместитесь в безопасную зону. Это может быть магазин, аптека, кафе, подъезд с домофоном, любое людное место. Чем больше свидетелей и света, тем выше уровень вашей безопасности.

Четвертое — используйте технологии. Если у вас есть возможность, отправьте сигнал SOS через приложение JARYK или позвоните доверенным контактам. Даже короткое сообщение с вашей геолокацией может сыграть решающую роль.

Пятое — обратитесь в экстренные службы, если ситуация выходит из-под контроля. Вы имеете право на защиту. Помощь — это не слабость, а разумный шаг.

Важно помнить: ваша безопасность — приоритет. Никакие социальные нормы или страх осуждения не должны мешать вам защищать себя.`,
  },
  {
    id: "legal-rights-kg",
    title: "Signs of Emotional Abuse: Expanded Explanation",
    titleRu: "Признаки психологического насилия: расширенное объяснение",
    titleDiscreet: "Recognizing Harmful Communication",
    titleDiscreetRu: "Признаки вредного давления",
    category: "emotional",
    summary: "How to identify emotional abuse and key red flags in relationships.",
    summaryRu: "Как распознать психологическое насилие и ключевые тревожные сигналы.",
    summaryDiscreet: "How to identify unhealthy communication patterns.",
    summaryDiscreetRu: "Как распознавать токсичные паттерны общения.",
    readTime: 6,
    content: `Emotional abuse leaves no visible scars, but its consequences can be deeper than physical pain. It destroys self-esteem, confidence, and a sense of safety.

One major sign is constant criticism. Regular humiliation, mockery, or devaluation is a serious warning sign.

Control is another indicator. Restricting communication, checking your phone, and forbidding meetings with friends creates dependency and isolation.

Guilt manipulation is common in abusive relationships. You may be made to feel responsible for someone else's emotions or behavior.

Gaslighting is a psychological tactic where someone makes you doubt your memory or perception of reality.

If you constantly feel anxious, afraid of making mistakes, or emotionally drained, this is a red flag.

Healthy relationships are based on respect, support, and freedom of choice. If these are missing, you deserve help and protection.`,
    contentRu: `Психологическое насилие не оставляет видимых следов, но его последствия могут быть глубже физической боли. Оно разрушает самооценку, уверенность и чувство безопасности.

Одним из ключевых признаков является постоянная критика. Если вас регулярно унижают, высмеивают или обесценивают — это тревожный сигнал.

Контроль — еще один признак. Ограничение общения, проверка телефона, запреты на встречи с друзьями создают зависимость и изоляцию.

Манипуляция чувством вины также характерна для абьюзивных отношений. Вас могут заставлять чувствовать ответственность за чужие эмоции и поведение.

Газлайтинг — форма психологического давления, при которой человек заставляет вас сомневаться в своей памяти или адекватности.

Если вы постоянно чувствуете тревогу, страх сделать «что-то не так», эмоциональное истощение — это повод задуматься.

Здоровые отношения основаны на уважении, поддержке и свободе выбора. Если этого нет — вы заслуживаете помощи и поддержки.`,
  },
  {
    id: "emotional-recovery",
    title: "How to Create a Personal Safety Plan",
    titleRu: "Как создать личный план безопасности",
    titleDiscreet: "Building a Personal Action Plan",
    titleDiscreetRu: "Личный план действий",
    category: "safety",
    summary: "A practical guide to preparing your safety plan in advance.",
    summaryRu: "Практическое руководство по подготовке личного плана безопасности.",
    summaryDiscreet: "A practical guide to preparing your personal plan.",
    summaryDiscreetRu: "Практическое руководство по личному плану.",
    readTime: 5,
    content: `A personal safety plan is a pre-prepared list of actions for potential danger. It is created in a calm state so that in a crisis you can act automatically.

Start by identifying trusted people: family members, friends, or colleagues who can respond quickly.

Create a code word or phrase. It should sound normal but signal a request for help.

Save important phone numbers for quick access and also write them down in case your phone battery dies.

Prepare copies of important documents and store them safely.

Plan alternative routes for commuting: home, work, and public places.

Review and update your plan regularly.

Preparation does not mean danger is inevitable. It means you value your safety.`,
    contentRu: `Личный план безопасности — это заранее подготовленный список действий на случай угрозы. Он создается в спокойной обстановке, чтобы в критической ситуации действовать автоматически.

Начните с определения доверенных людей. Это могут быть родственники, друзья или коллеги, которые готовы быстро отреагировать.

Придумайте кодовое слово или фразу. Оно должно выглядеть обычным, но означать просьбу о помощи.

Сохраните важные номера в быстром доступе. Запишите их также на бумаге на случай разрядки телефона.

Подготовьте копии документов и храните их в безопасном месте.

Продумайте альтернативные маршруты передвижения — домой, на работу, в общественные места.

Регулярно пересматривайте план и обновляйте контакты.

Подготовка не означает, что опасность неизбежна. Это означает, что вы цените свою безопасность.`,
  },
  {
    id: "local-resources",
    title: "Why Seeking Help Matters",
    titleRu: "Почему важно обращаться за помощью",
    titleDiscreet: "Why Support Matters",
    titleDiscreetRu: "Почему поддержка важна",
    category: "resources",
    summary: "Why early support improves safety and expands your options.",
    summaryRu: "Почему раннее обращение за поддержкой повышает безопасность.",
    summaryDiscreet: "Why timely support improves outcomes.",
    summaryDiscreetRu: "Почему своевременная поддержка важна.",
    readTime: 4,
    content: `Many people avoid seeking help due to fear of judgment, shame, or the belief that they must handle everything alone. However, isolation increases risk.

Support can take many forms: talking to a friend, consulting a psychologist, contacting a crisis center, or using the JARYK app.

Asking for help is an act of courage. It is a step toward regaining control of your life.

The earlier you share your situation, the more solutions become available.

Remember: you are not required to face difficult situations alone. Help exists, and you have the right to receive it.`,
    contentRu: `Многие люди не обращаются за помощью из-за страха осуждения, чувства стыда или убеждения, что «можно справиться самостоятельно». Однако изоляция усиливает риск.

Поддержка может быть разной: разговор с другом, консультация психолога, обращение в кризисный центр или использование приложения JARYK.

Обращение за помощью — это акт смелости. Это шаг к восстановлению контроля над своей жизнью.

Чем раньше вы делитесь своей ситуацией, тем больше вариантов решения появляется.

Помните: вы не обязаны проходить через сложные ситуации в одиночку. Помощь существует, и вы имеете право ее получить.`,
  },
]

export const articleCategoryLabels: Record<
  ArticleCategory,
  { label: string; labelRu: string; labelDiscreet: string; labelDiscreetRu: string }
> = {
  safety: {
    label: "Safety Planning",
    labelRu: "План безопасности",
    labelDiscreet: "Planning",
    labelDiscreetRu: "Планирование",
  },
  legal: {
    label: "Legal Rights",
    labelRu: "Правовая защита",
    labelDiscreet: "Rights",
    labelDiscreetRu: "Права",
  },
  emotional: {
    label: "Emotional Health",
    labelRu: "Эмоциональное здоровье",
    labelDiscreet: "Wellbeing",
    labelDiscreetRu: "Состояние",
  },
  resources: {
    label: "Resources",
    labelRu: "Ресурсы",
    labelDiscreet: "Services",
    labelDiscreetRu: "Сервисы",
  },
}
