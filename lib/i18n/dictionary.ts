export type Locale = 'en' | 'vi'

export const locales: Locale[] = ['en', 'vi']
export const defaultLocale: Locale = 'en'

export interface TechCategory {
  id: string
  comment: string
  tag: string
  theme: 'cloud' | 'devops' | 'observability' | 'ai'
  items: string[]
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  dateRange: string
  gpa: string
  honors: string[]
}

export interface ExperienceItemData {
  title: string
  companyLocation: string
  dateRange: string
  bullets: string[]
}

export interface EducationData {
  institution: string
  degree: string
  period: string
  major: string
  gpa: string
  graduating: string
  progressLabel: string
  progressCurrent: string
  certsTitle: string
  certsSubHeader: string
  certs: Array<{
    name: string
    year: string
    note?: string
  }>
  cloudTrainingNote?: string
}

export const dictionaries = {
  en: {
    blogTitle: 'RETRO DEVELOPER BLOG [WIN98 EDITION]',
    blogSubtitle: 'Technical articles on Next.js App Router, React Server Components, and Cloud Systems.',
    backToExplorer: 'Back to Explorer',
    searchPlaceholder: 'Search articles, tags, descriptions...',
    allCollections: 'All',
    allTags: 'All',
    systemStatus: 'System status: Online',
    articlesIndexed: 'article(s) indexed',
    readTimeSuffix: 'min read',
    notepadTitle: 'Notepad',
    utf8Label: 'UTF-8',
    markdownLabel: 'Markdown',
    tableOfContents: 'Table of Contents',
    notTranslatedNotice: '⚠️ Article is not yet translated into Vietnamese. Showing English version below.',
    navHome: 'Home',
    navAbout: 'About',
    navGithub: 'GitHub',
    views: 'views',
    // ponytail: localized profile & about metadata
    profileTitle: 'User Profile - [Bui Thanh Nghia (Arti) - profile.exe]',
    profileUserLabel: 'USER: BUI THANH NGHIA (ARTI)',
    profileName: 'Bui Thanh Nghia',
    profileNickname: '(Arti)',
    profileRole: 'Software Engineering & CloudOps / DevOps Engineer',
    profileStatus: 'STATUS: ACTIVE_SEEKER',
    sectionAbout: '01. ABOUT',
    sectionSkills: '02. TECH STACK',
    sectionProjects: '03. PROJECTS',
    sectionExperience: '04. EXPERIENCE',
    sectionEducation: '05. EDUCATION & CERTS',
    aboutParagraphs: [
      "Hello and welcome to my personal blog! I built this cozy space purely out of a vibe coding session so I'd have somewhere to share random, slightly unhinged tech musings and pass on whatever knowledge I've picked up along the way. Because of that, things written by me (or co-authored with an AI) might occasionally contain quirks or slip-ups. Feel free to read, test things out yourself, and roast or \"backseat code\" my mistakes in the comments — feedback is always warmly appreciated! 🥹",
      "Alright, formal intro time! I'm Bui Thanh Nghia, though I go by the handle Arti. I'm a fresh Software Engineering graduate from the CMU-standard program at Duy Tan University (born in 2004).",
      "My obsession with tech sparked back in childhood, mesmerized by arcade cabinets at the supermarket, until primary school when I finally got my hands on my very first ancient Windows 7 PC. Growing up alongside that clunky machine made picking software engineering for my studies and future career a total no-brainer.",
      "After 4+ years of university grind, various projects, and company internships, my core passions still orbit around AI and Infrastructure Plumbing. These two playgrounds let me tinker and build creatively — whether that's crafting CI/CD pipelines and Terraform recipes for cloud deployments (mostly living on AWS for now), or messing around with local AI models via Ollama and OpenRouter while my PC fans audibly gasp for oxygen.",
      "That curiosity keeps driving me deeper. On the infrastructure side, I'm itching to dive further into Linux internals and bash scripting wizardry. On the AI side, I want to explore deeper into LLMs and machine learning. Not just slapping a generic API call behind a text box and calling it a \"revolutionary chatbot\" like in my early projects, but aiming for something genuinely interactive with real personality — very much inspired by the VTuber Neuro-sama. My ultimate long-term dream is to pull a Vedal and engineer my own complete, charming digital brainchild.",
      "I hope you have the best time reading these posts! I promise to put genuine care and craftsmanship into writing every piece so your reading experience stays top-tier, without overusing AI to the point where everything turns into generic AI slop. 🙏🙏🙏🙏🙏",
    ],
    techCategories: [
      {
        id: 'cloud',
        comment: 'Cloud Platform',
        theme: 'cloud',
        items: [
          'AWS EC2',
          'S3',
          'RDS',
          'DynamoDB',
          'VPC',
          'IAM',
          'KMS',
          'Lambda',
          'ECR',
          'Amazon Bedrock',
        ],
      },
      {
        id: 'devops',
        comment: 'DevOps & Automation',
        theme: 'devops',
        items: [
          'Terraform (IaC)',
          'Docker',
          'Kubernetes (K8s/EKS)',
          'Helm',
          'GitOps (ArgoCD)',
          'GitHub Actions',
          'Argo Rollouts (Canary)',
        ],
      },
      {
        id: 'observability',
        comment: 'Observability & Security',
        theme: 'observability',
        items: [
          'OpenTelemetry',
          'Prometheus / Grafana',
          'SLO / Burn-rate Alerts',
          'AWS CloudWatch',
          'CloudTrail',
          'OPA / Gatekeeper',
          'Trivy + Cosign',
          'External Secrets',
          'Cost Guard (Lambda + EventBridge)',
        ],
      },
      {
        id: 'ai',
        comment: 'AI Development',
        theme: 'ai',
        items: [
          'Python',
          'JavaScript / TypeScript',
          'Java',
          'Ollama',
          'OpenRouter',
          'PostgreSQL',
        ],
      },
    ] as TechCategory[],
    experiences: [
      {
        title: 'CloudOps / DevOps Intern',
        companyLocation: 'Xbrain, Da Nang, Vietnam',
        dateRange: 'Apr 2026 – Jul 2026',
        bullets: [
          'Completed hands-on CloudOps training focused on AWS infrastructure, cloud architecture, and operational best practices.',
          'Built and deployed containerized applications on Kubernetes using GitOps workflows with Argo CD and GitHub Actions.',
          'Provisioned cloud resources using Terraform and practiced Infrastructure as Code (IaC) principles for repeatable deployments.',
          'Implemented monitoring and observability using Prometheus and Grafana to monitor application health and infrastructure metrics.',
        ],
      },
      {
        title: 'Graduation Internship Program — Team Lead',
        companyLocation: 'Kaopiz Holdings Joint Stock Company, Da Nang, Vietnam',
        dateRange: 'Sep 2025 – Dec 2025',
        bullets: [
          'Designed and implemented RESTful APIs supporting parking management and geospatial features using Node.js and PostgreSQL.',
          'Modeled relational database schemas with PostgreSQL for parking, route, and user management services.',
          'Led a 4-member Agile/Scrum team, coordinating sprint planning, task allocation, and technical discussions throughout development.',
          'Collaborated with mentors through architecture discussions and code reviews to improve implementation quality and maintainability.',
        ],
      },
    ] as ExperienceItemData[],
    educationData: {
      institution: 'Duy Tan University (CMU-based program)',
      degree: 'Bachelor of Science in Software Engineering',
      period: '2022 – 2026',
      major: 'Software Engineering',
      gpa: '3.93 / 4.0',
      graduating: '2026 (Completed)',
      progressLabel: 'progress',
      progressCurrent: 'Y4 •',
      certsTitle: 'Certifications & Honors',
      certs: [
        { name: 'Excellence Scholarship (Years 1, 2, 3)', year: '2023 – 2025' },
        { name: 'TOEIC 950 / 990', year: '2025' },
        { name: 'Encouragement Prize, Student Research Conference', year: '2025' },
        { name: 'Cloud Training: XBrain × AWS Accelerator', year: '2026', note: 'see ~/ops_log' },
      ],
      cloudTrainingNote: 'cloud training: XBrain × AWS Accelerator • see ~/ops_log',
    } as EducationData,
    sourceCodeBtn: '>> SOURCE CODE',
    experienceDetailsShow: '[ + SHOW_DETAILS ]',
    experienceDetailsHide: '[ - HIDE_DETAILS ]',
  },
  vi: {
    blogTitle: 'RETRO DEVELOPER BLOG [PHIÊN BẢN WIN98]',
    blogSubtitle: 'Bài viết kỹ thuật về Next.js App Router, React Server Components và Cloud Systems.',
    backToExplorer: 'Quay lại Explorer',
    searchPlaceholder: 'Tìm kiếm bài viết, thẻ, mô tả...',
    allCollections: 'Tất cả',
    allTags: 'Tất cả',
    systemStatus: 'Trạng thái hệ thống: Trực tuyến',
    articlesIndexed: 'bài viết đã chỉ mục',
    readTimeSuffix: 'phút đọc',
    notepadTitle: 'Notepad',
    utf8Label: 'UTF-8',
    markdownLabel: 'Markdown',
    tableOfContents: 'Mục mục bài viết',
    notTranslatedNotice: '⚠️ Bài viết chưa có bản dịch tiếng Việt. Đang hiển thị bản gốc tiếng Anh bên dưới.',
    navHome: 'Trang chủ',
    navAbout: 'Giới thiệu',
    navGithub: 'GitHub',
    views: 'lượt xem',
    // ponytail: localized profile & about metadata
    profileTitle: 'Hồ sơ người dùng - [Bùi Thành Nghĩa (Arti) - profile.exe]',
    profileUserLabel: 'NGƯỜI DÙNG: BÙI THÀNH NGHĨA (ARTI)',
    profileName: 'Bùi Thành Nghĩa',
    profileNickname: '(Arti)',
    profileRole: 'Kỹ sư Kỹ thuật Phần mềm & CloudOps / DevOps',
    profileStatus: 'TRẠNG THÁI: TÌM KIẾM CƠ HỘI',
    sectionAbout: '01. GIỚI THIỆU',
    sectionSkills: '02. TECH STACK',
    sectionProjects: '03. DỰ ÁN',
    sectionExperience: '04. KINH NGHIỆM',
    sectionEducation: '05. HỌC VẤN & CHỨNG CHỈ',
    aboutParagraphs: [
      'Xin chào những độc giả đã đến với blog cá nhân của mình, đây là một trang mình lập ra bằng việc vibe code nhằm chỉ để ngồi viết mấy cái blog xàm xí cũng như mong muốn chia sẻ kiến thức mà mình biết đến với cho mọi người, nên vì vậy những thứ mình hoặc do AI viết có thể có nhiều sai sót nên mong mọi người có thể vừa đọc vừa tự trải nghiệm để có thể góp ý hoặc "sửa lưng" giúp cho mình nhé. Mình cảm ơn mọi người rất nhiều. 🥹',
      'Được rồi bây giờ mình xin được phép giới thiệu. Mình là Bùi Thành Nghĩa, bút danh là Arti. Mình là cử nhân khoa Kỹ thuật Phần mềm CMU thuộc trường Đại học Duy Tân (sinh năm 2004).',
      'Đam mê của mình với ngành IT này xuất phát từ những ngày còn bé khi mình có những đam mê với những bộ máy game thùng ngoài siêu thị cho đến khi năm cấp 1 được trực tiếp sở hữu một bộ PC win 7 cổ đại đầu tiên, sau một thời gian dài lớn lên thì mình đã quyết định chọn ngành phần mềm này để bắt đầu việc học và phát triển sự nghiệp của mình từ đây.',
      'Sau hơn 4 năm học tập dưới mái trường Duy Tân thì mình cũng đã trải qua nhiều dự án và cả thực tập ở công ty thì đam mê của mình vẫn xoay quanh AI và triển khai hạ tầng hệ thống. Đây là 2 mảng mà nó cho phép mình được nghịch ngợm và sáng tạo, từ việc viết các dòng lệnh CI/CD, Terraform cho việc triển khai các dự án lên nền tảng Cloud mà với mình thì hiện giờ đang chỉ có AWS là chính hay ngồi vọc các model AI rồi dung các phần mềm trung gian như Ollama hay OpenRouter về để nghịch dù rằng máy cũng thở oxi khá nhiều khi chạy.',
      'Sự tò mò của mình thì vẫn xoay quanh về hạ tầng và trí tuệ nhân tạo, tuy vậy mình vẫn muốn đào sâu hơn nữa như là về Linux và bash script. Còn về mảng AI thì mình vẫn muốn đào sâu hơn về LLM và ML. Không đơn thuần là gọi một API rồi gắn mác chatbot như các project khi xưa mình làm nữa mà mục tiêu dài hạn mình hướng tới là một AI tương tác thực thụ, có cá tính riêng như Vtuber Neuro-sama, mình mong muốn có thể giống như Vedal tự tạo ra cho mình một đứa con tinh thần hoàn thiện như vậy.',
      'Mong các độc giả của mình có trải nghiệm tốt nhất khi đọc các bài viết của mình nhé, mình sẽ cố gắng tham gia trong giai đoạn viết blog một cách chỉnh chu nhất có thể để đảm bảo trải nghiệm của mọi người là trên hết mà không lạm dụng quá nhiều AI để rồi mọi bài viết đều trở thành AI slop. 🙏🙏🙏🙏🙏',
    ],
    techCategories: [
      {
        id: 'cloud',
        comment: 'Cloud Platform',
        theme: 'cloud',
        items: [
          'AWS EC2',
          'S3',
          'RDS',
          'DynamoDB',
          'VPC',
          'IAM',
          'KMS',
          'Lambda',
          'ECR',
          'Amazon Bedrock',
        ],
      },
      {
        id: 'devops',
        comment: 'DevOps & Automation',
        theme: 'devops',
        items: [
          'Terraform (IaC)',
          'Docker',
          'Kubernetes (K8s/EKS)',
          'Helm',
          'GitOps (ArgoCD)',
          'GitHub Actions',
          'Argo Rollouts (Canary)',
        ],
      },
      {
        id: 'observability',
        comment: 'Observability & Security',
        theme: 'observability',
        items: [
          'OpenTelemetry',
          'Prometheus / Grafana',
          'SLO / Burn-rate Alerts',
          'AWS CloudWatch',
          'CloudTrail',
          'OPA / Gatekeeper',
          'Trivy + Cosign',
          'External Secrets',
          'Cost Guard (Lambda + EventBridge)',
        ],
      },
      {
        id: 'ai',
        comment: 'AI Development',
        theme: 'ai',
        items: [
          'Python',
          'JavaScript / TypeScript',
          'Java',
          'Ollama',
          'OpenRouter',
          'PostgreSQL',
        ],
      },
    ] as TechCategory[],
    experiences: [
      {
        title: 'CloudOps / DevOps Intern',
        companyLocation: 'Xbrain, Đà Nẵng, Việt Nam',
        dateRange: 'Tháng 4/2026 – Tháng 7/2026',
        bullets: [
          'Hoàn thành chương trình đào tạo CloudOps chuyên sâu về hạ tầng AWS, kiến trúc đám mây và thực hành vận hành tối ưu.',
          'Xây dựng và triển khai ứng dụng container hóa trên Kubernetes bằng quy trình GitOps với Argo CD và GitHub Actions.',
          'Khởi tạo và quản lý tài nguyên đám mây với Terraform, áp dụng nguyên lý Infrastructure as Code (IaC) cho các đợt triển khai lặp lại chuẩn xác.',
          'Thiết lập hệ thống giám sát và khả năng quan sát (observability) với Prometheus và Grafana để theo dõi sức khỏe ứng dụng và tài nguyên hạ tầng.',
        ],
      },
      {
        title: 'Thực tập Tốt nghiệp — Trưởng nhóm (Team Lead)',
        companyLocation: 'Kaopiz Holdings Joint Stock Company, Đà Nẵng, Việt Nam',
        dateRange: 'Tháng 9/2025 – Tháng 12/2025',
        bullets: [
          'Thiết kế và phát triển hệ thống RESTful API cho bài toán quản lý bãi đỗ xe và tính năng dữ liệu không gian địa lý sử dụng Node.js & PostgreSQL.',
          'Thiết kế mô hình cơ sở dữ liệu quan hệ với PostgreSQL cho các dịch vụ quản lý bãi xe, lộ trình và người dùng.',
          'Dẫn dắt đội ngũ 4 thành viên theo mô hình Agile/Scrum, điều phối Sprint Planning, phân bổ công việc và thảo luận kỹ thuật trong suốt dự án.',
          'Trao đổi cùng các Mentor qua các buổi thảo luận kiến trúc hệ thống và code review để nâng cao chất lượng mã nguồn và tính dễ bảo trì.',
        ],
      },
    ] as ExperienceItemData[],
    educationData: {
      institution: 'Đại học Duy Tân (Chương trình chuẩn CMU)',
      degree: 'Cử nhân Kỹ thuật Phần mềm',
      period: '2022 – 2026',
      major: 'Kỹ thuật Phần mềm',
      gpa: '3.93 / 4.0',
      graduating: '2026 (Đã tốt nghiệp)',
      progressLabel: 'tiến độ',
      progressCurrent: 'Năm 4 •',
      certsTitle: 'Chứng chỉ & Danh hiệu',
      certs: [
        { name: 'Học bổng Xuất sắc (Năm 1, 2, 3)', year: '2023 – 2025' },
        { name: 'TOEIC 950 / 990', year: '2026' },
        { name: 'Giải Khuyến khích, NCKH Sinh viên', year: '2026' },
        { name: 'Đào tạo Cloud: XBrain × AWS Accelerator', year: '2026', note: 'xem ~/ops_log' },
      ],
    } as EducationData,
    sourceCodeBtn: '>> MÃ NGUỒN',
    experienceDetailsShow: '[ + XEM_CHI_TIẾT ]',
    experienceDetailsHide: '[ - THU_GỌN ]',
  },
}

export function getDictionary(locale: string) {
  return dictionaries[(locale as Locale) || defaultLocale] ?? dictionaries.en
}
