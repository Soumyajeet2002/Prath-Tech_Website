export interface FeatureItem {
  text: string;
  icon?: string;
}

export interface ChatOption {
  label: string;
  value: string;
  nextNode: string;
  icon?: string;
}

export interface ChatNode {
  id: string;
  type: "message" | "form" | "slots" | "end";

  // Split message into structured sections
  intro?: string;
  features?: FeatureItem[];
  body?: string;
  followUp?: string;
  message?: string;

  options?: ChatOption[];
  formType?: "lead" | "support" | "booking";
  metadata?: Record<string, unknown>;
}

export const chatFlow: Record<string, ChatNode> = {
  // =====================================================
  // LEVEL 0 – WELCOME & PRIMARY MENU
  // =====================================================

  welcome: {
    id: "welcome",
    type: "message",
    message:
      "Welcome to Prath Technologies!\nWe help organizations grow with ERP, School Management Systems, HRMS & Custom Software Solutions.\n\nHow can we help you today?",
    options: [
      {
        label: "Explore Our Products",
        value: "products",
        nextNode: "products_menu",
        icon: "Boxes",
      },
      {
        label: "IT Services & Custom Development",
        value: "services",
        nextNode: "it_services",
        icon: "Code",
      },
      {
        label: "Request a Demo / Consultation",
        value: "demo",
        nextNode: "discussion_type",
        icon: "Calendar",
      },
      {
        label: "Pricing & Licensing",
        value: "pricing",
        nextNode: "pricing_intro",
        icon: "IndianRupee",
      },
      {
        label: "Support / Existing Customer",
        value: "support",
        nextNode: "support_intro",
        icon: "Headphones",
      },
      {
        label: "About Prath Technologies",
        value: "about",
        nextNode: "about_company",
        icon: "Building2",
      },
    ],
  },

  // =====================================================
  // LEVEL 1 – PRODUCTS MENU
  // =====================================================

  products_menu: {
    id: "products_menu",
    type: "message",
    message: "Please select the product you are interested in:",
    options: [
      {
        label: "ERP Solution",
        value: "erp",
        nextNode: "erp_intro",
        icon: "Factory",
      },
      {
        label: "Society Management System (SMS)",
        value: "sms",
        nextNode: "sms_intro",
        icon: "Building",
      },
      {
        label: "HRMS (Customizable)",
        value: "hrms",
        nextNode: "hrms_intro",
        icon: "Users",
      },
      {
        label: "Multiple Products / Not Sure",
        value: "multi",
        nextNode: "discussion_type",
        icon: "HelpCircle",
      },
    ],
  },

  // =====================================================
  // ERP FLOW
  // =====================================================

  erp_intro: {
    id: "erp_intro",
    type: "message",
    intro: "Our ERP Solution helps organizations manage following:",
    features: [
      { text: "Finance & Accounting", icon: "BookOpen" },
      { text: "HR & Payroll", icon: "Users" },
      { text: "Project Management", icon: "Briefcase" },
      { text: "Asset Management", icon: "Package" },
      { text: "Procurement & Inventory", icon: "ShoppingCart" },
      { text: "GST & Compliance", icon: "FileText" },
      { text: "Reports & Dashboards", icon: "BarChart3" },
    ],
    followUp: "What would you like to know?",
    options: [
      {
        label: "ERP Features",
        value: "features",
        nextNode: "erp_features",
        icon: "CheckSquare",
      },
      {
        label: "Industries We Serve",
        value: "industries",
        nextNode: "erp_industries",
        icon: "Factory",
      },
      {
        label: "Deployment Options",
        value: "deploy",
        nextNode: "erp_deployment",
        icon: "Cloud",
      },
      {
        label: "ERP Pricing",
        value: "pricing",
        nextNode: "pricing_intro",
        icon: "IndianRupee",
      },
      {
        label: "Request ERP Demo",
        value: "demo",
        nextNode: "discussion_type",
        icon: "Calendar",
      },
      {
        label: "Talk to ERP Expert",
        value: "expert",
        nextNode: "discussion_type",
        icon: "User",
      },
    ],
  },

  erp_features: {
    id: "erp_features",
    type: "message",
    intro: "ERP includes the following modules:",
    features: [
      { text: "Finance & Accounting", icon: "BookOpen" },
      { text: "HR & Payroll", icon: "Users" },
      { text: "Project Management", icon: "Briefcase" },
      { text: "Asset Management", icon: "Package" },
      { text: "Procurement & Inventory", icon: "ShoppingCart" },
      { text: "GST & Compliance", icon: "FileText" },
      { text: "Reports & Dashboards", icon: "BarChart3" },
    ],
    followUp:
      "Our ERP is **Highly Customizable** based on your industry, workflows and reporting needs.",
    options: [
      {
        label: "Industries We Serve",
        value: "erp_industries",
        nextNode: "erp_industries",
        icon: "Factory",
      },
      {
        label: "Request ERP Demo",
        value: "erp_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to ERP Menu",
        value: "back_erp",
        nextNode: "erp_intro",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  erp_industries: {
    id: "erp_industries",
    type: "message",
    message: "We proudly serve the following industries:",
    features: [
      { text: "Manufacturing", icon: "Factory" },
      { text: "Construction & Infrastructure", icon: "Building2" },
      { text: "Government & PSU", icon: "Landmark" },
      { text: "Education Institutions", icon: "GraduationCap" },
      { text: "Healthcare", icon: "HeartPulse" },
      { text: "Service-based Companies", icon: "Briefcase" },
    ],
    options: [
      {
        label: "Deployment Options",
        value: "erp_deployment",
        nextNode: "erp_deployment",
        icon: "Cloud",
      },
      {
        label: "Request ERP Demo",
        value: "erp_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to ERP Menu",
        value: "back_erp",
        nextNode: "erp_intro",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  erp_deployment: {
    id: "erp_deployment",
    type: "message",
    intro: "Deployment options available:",
    features: [
      { text: "Cloud (AWS / Azure)", icon: "Cloud" },
      { text: "On-Premise", icon: "Server" },
      { text: "Hybrid", icon: "Shuffle" },
    ],
    followUp:
      "Our team will recommend the best option based on your infrastructure and security requirements.",
    options: [
      {
        label: "ERP Pricing",
        value: "erp_pricing",
        nextNode: "erp_pricing",
        icon: "DollarSign",
      },
      {
        label: "Request ERP Demo",
        value: "erp_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to ERP Menu",
        value: "back_erp",
        nextNode: "erp_intro",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  erp_pricing: {
    id: "erp_pricing",
    type: "message",
    intro: "ERP pricing depends on:",
    features: [
      { text: "Number of Users", icon: "Users" },
      { text: "Modules Selected", icon: "Package" },
      { text: "Deployment Type", icon: "Cloud" },
      { text: "Customization Level", icon: "Settings" },
    ],
    followUp:
      "We offer competitive pricing tailored to your organization size.",
    options: [
      {
        label: "Get Estimated Pricing",
        value: "get_pricing",
        nextNode: "lead_capture",
        icon: "ClipboardList",
      },
      {
        label: "Talk to Sales",
        value: "talk_sales",
        nextNode: "lead_capture",
        icon: "Briefcase",
      },
      {
        label: "Request Proposal",
        value: "request_proposal",
        nextNode: "lead_capture",
        icon: "FileText",
      },
      {
        label: "Back to ERP Menu",
        value: "back_erp",
        nextNode: "erp_intro",
        icon: "ArrowLeft",
      },
    ],
  },

  // =====================================================
  // SMS FLOW
  // =====================================================

  sms_intro: {
    id: "sms_intro",
    type: "message",
    message:
      "Our Society Management System simplifies housing society & apartment management by digitizing operations, communication, accounting, and security.",
    options: [
      {
        label: "SMS Features",
        value: "features",
        nextNode: "sms_features",
        icon: "CheckSquare",
      },
      {
        label: "User Roles",
        value: "roles",
        nextNode: "sms_roles",
        icon: "Users",
      },
      {
        label: "Mobile App & Security Gate App",
        value: "mobile",
        nextNode: "sms_mobile",
        icon: "Smartphone",
      },
      {
        label: "Deployment & Integrations",
        value: "deploy",
        nextNode: "sms_deployment",
        icon: "Cloud",
      },
      {
        label: "Pricing",
        value: "pricing",
        nextNode: "pricing_intro",
        icon: "IndianRupee",
      },
      {
        label: "Request Demo",
        value: "demo",
        nextNode: "discussion_type",
        icon: "Calendar",
      },
      {
        label: "Talk to SMS Expert",
        value: "expert",
        nextNode: "discussion_type",
        icon: "User",
      },
    ],
  },

  sms_features: {
    id: "sms_features",
    type: "message",
    message: "SMS includes:",
    features: [
      { text: "Resident & Flat Management", icon: "Home" },
      { text: "Maintenance Billing & Collection", icon: "Receipt" },
      { text: "Accounting & Ledger Management", icon: "BookOpen" },
      { text: "Complaint / Ticket Management", icon: "Ticket" },
      { text: "Visitor & Gate Pass Management", icon: "ShieldCheck" },
      { text: "Security Guard Mobile App", icon: "Smartphone" },
      { text: "Parking & Asset Management", icon: "Car" },
      { text: "Notices, Announcements & Polls", icon: "Megaphone" },
      { text: "Reports & Audit Logs", icon: "BarChart3" },
    ],
    options: [
      {
        label: "User Roles",
        value: "sms_roles",
        nextNode: "sms_roles",
        icon: "Users",
      },
      {
        label: "Request Demo",
        value: "sms_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to SMS Menu",
        value: "back_sms",
        nextNode: "sms_intro",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  sms_roles: {
    id: "sms_roles",
    type: "message",
    message: "Supported user roles:",
    features: [
      { text: "Society Admin", icon: "UserCog" },
      { text: "Accounts Manager", icon: "Wallet" },
      { text: "Residents / Owners", icon: "Home" },
      { text: "Security Guards", icon: "Shield" },
      { text: "Vendors / Service Providers", icon: "Tool" },
    ],
    options: [
      {
        label: "Mobile App & Security Gate App",
        value: "sms_mobile",
        nextNode: "sms_mobile",
        icon: "Smartphone",
      },
      {
        label: "Request Demo",
        value: "sms_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to SMS Menu",
        value: "back_sms",
        nextNode: "sms_intro",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  sms_mobile: {
    id: "sms_mobile",
    type: "message",
    message: "SMS includes mobile apps for:",
    features: [
      { text: "Residents (Android / iOS)", icon: "Smartphone" },
      { text: "Security Guards (Gate App)", icon: "ShieldCheck" },
      { text: "Admin Web Panel", icon: "Monitor" },
      { text: "Visitor Entry & Exit Management", icon: "DoorOpen" },
      { text: "Delivery & Cab Tracking", icon: "LocateFixed" },
      { text: "Emergency Alerts", icon: "AlertTriangle" },
      { text: "Guard Shift logging", icon: "Clock" },
    ],
    options: [
      {
        label: "Deployment & Integrations",
        value: "sms_deployment",
        nextNode: "sms_deployment",
        icon: "Cloud",
      },
      {
        label: "Request Demo",
        value: "sms_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to SMS Menu",
        value: "back_sms",
        nextNode: "sms_intro",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  sms_deployment: {
    id: "sms_deployment",
    type: "message",
    message: "Deployment Options:",
    features: [
      { text: "Cloud-based", icon: "Cloud" },
      { text: "On-Premise", icon: "Server" },
      { text: "Hybrid", icon: "Shuffle" },
      { text: "Payment Gateways", icon: "CreditCard" },
      { text: "SMS / WhatsApp", icon: "MessageSquare" },
      { text: "CCTV & Boom Barriers", icon: "Camera" },
      { text: "Accounting Systems", icon: "Calculator" },
    ],
    options: [
      {
        label: "Pricing",
        value: "sms_pricing",
        nextNode: "sms_pricing",
        icon: "DollarSign",
      },
      {
        label: "Request Demo",
        value: "sms_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to SMS Menu",
        value: "back_sms",
        nextNode: "sms_intro",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  sms_pricing: {
    id: "sms_pricing",
    type: "message",
    message: "SMS pricing depends on:",
    features: [
      { text: "Number of Flats", icon: "Home" },
      { text: "Modules Required", icon: "Package" },
      { text: "Mobile App Customization", icon: "Smartphone" },
    ],
    options: [
      {
        label: "Get Estimated Pricing",
        value: "get_pricing",
        nextNode: "lead_capture",
        icon: "ClipboardList",
      },
      {
        label: "Talk to Sales",
        value: "talk_sales",
        nextNode: "lead_capture",
        icon: "Briefcase",
      },
      {
        label: "Request Proposal",
        value: "request_proposal",
        nextNode: "lead_capture",
        icon: "FileText",
      },
      {
        label: "Back to SMS Menu",
        value: "back_sms",
        nextNode: "sms_intro",
        icon: "ArrowLeft",
      },
    ],
  },

  // =====================================================
  // HRMS FLOW
  // =====================================================

  hrms_intro: {
    id: "hrms_intro",
    type: "message",
    message:
      "Our Customizable HRMS adapts to your organization’s policies and workflows.",
    options: [
      {
        label: "HRMS Modules",
        value: "hrms_modules",
        nextNode: "hrms_modules",
        icon: "Settings",
      },
      {
        label: "Customization Options",
        value: "hrms_customization",
        nextNode: "hrms_customization",
        icon: "Wrench",
      },
      {
        label: "Integrations",
        value: "hrms_integrations",
        nextNode: "hrms_integrations",
        icon: "Link",
      },
      {
        label: "Pricing",
        value: "hrms_pricing",
        nextNode: "hrms_pricing",
        icon: "DollarSign",
      },
      {
        label: "Book HRMS Demo",
        value: "hrms_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
    ],
  },

  hrms_modules: {
    id: "hrms_modules",
    type: "message",
    message: "Our HRMS includes the following modules:",
    features: [
      { text: "Employee Master", icon: "User" },
      { text: "Attendance & Leave", icon: "CalendarCheck" },
      { text: "Payroll", icon: "Banknote" },
      { text: "Performance Management", icon: "TrendingUp" },
      { text: "Recruitment", icon: "UserPlus" },
      { text: "Asset Allocation", icon: "Package" },
      { text: "Compliance & Reports", icon: "FileText" },
    ],
    options: [
      {
        label: "Customization Options",
        value: "hrms_customization",
        nextNode: "hrms_customization",
        icon: "Wrench",
      },
      {
        label: "Book HRMS Demo",
        value: "hrms_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to HRMS Menu",
        value: "back_hrms",
        nextNode: "hrms_intro",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  hrms_integrations: {
    id: "hrms_integrations",
    type: "message",
    message: "HRMS integrates with:",
    features: [
      { text: "Biometric Devices", icon: "Fingerprint" },
      { text: "ERP Systems", icon: "Factory" },
      { text: "Accounting Software", icon: "Calculator" },
      { text: "Third-party APIs", icon: "Link" },
    ],
    options: [
      {
        label: "Pricing",
        value: "hrms_pricing",
        nextNode: "hrms_pricing",
        icon: "DollarSign",
      },
      {
        label: "Book HRMS Demo",
        value: "hrms_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to HRMS Menu",
        value: "back_hrms",
        nextNode: "hrms_intro",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  hrms_customization: {
    id: "hrms_customization",
    type: "message",
    intro: "Our HRMS is **Fully Customizable** to match your organization's:",
    features: [
      { text: "Leave Policies", icon: "CalendarCheck" },
      { text: "Salary Structures", icon: "Banknote" },
      { text: "Performance KPIs", icon: "TrendingUp" },
      { text: "Approval Workflows", icon: "Shuffle" },
      { text: "Custom Reports", icon: "FileText" },
    ],
    followUp: "Our team will configure the system to your exact requirements.",
    options: [
      {
        label: "Integrations",
        value: "hrms_integrations",
        nextNode: "hrms_integrations",
        icon: "Link",
      },
      {
        label: "Book HRMS Demo",
        value: "hrms_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to HRMS Menu",
        value: "back_hrms",
        nextNode: "hrms_intro",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  hrms_pricing: {
    id: "hrms_pricing",
    type: "message",
    message: "HRMS pricing depends on:",
    features: [
      { text: "Number of Employees", icon: "Users" },
      { text: "Modules Required", icon: "Package" },
      { text: "Customization Level", icon: "Settings" },
      { text: "Deployment Type", icon: "Cloud" },
    ],
    options: [
      {
        label: "Get Estimated Pricing",
        value: "get_pricing",
        nextNode: "lead_capture",
        icon: "ClipboardList",
      },
      {
        label: "Talk to Sales",
        value: "talk_sales",
        nextNode: "lead_capture",
        icon: "Briefcase",
      },
      {
        label: "Request Proposal",
        value: "request_proposal",
        nextNode: "lead_capture",
        icon: "FileText",
      },
      {
        label: "Back to HRMS Menu",
        value: "back_hrms",
        nextNode: "hrms_intro",
        icon: "ArrowLeft",
      },
    ],
  },

  // =====================================================
  // IT SERVICES
  // =====================================================

  it_services: {
    id: "it_services",
    type: "message",
    message: "We offer end-to-end IT services tailored to your business needs:",
    options: [
      {
        label: "Custom Software Development",
        value: "custom_software",
        nextNode: "custom_software",
        icon: "Code",
      },
      {
        label: "Web & Mobile App Development",
        value: "web_mobile",
        nextNode: "web_mobile",
        icon: "Smartphone",
      },
      {
        label: "UI/UX Design",
        value: "uiux",
        nextNode: "uiux",
        icon: "Palette",
      },
      {
        label: "Cloud & DevOps",
        value: "cloud_devops",
        nextNode: "cloud_devops",
        icon: "Cloud",
      },
      {
        label: "Maintenance & Support",
        value: "maintenance",
        nextNode: "maintenance",
        icon: "Wrench",
      },
    ],
  },

  custom_software: {
    id: "custom_software",
    type: "message",
    message:
      "We design and build **secure, scalable & future-ready applications** tailored to your business needs.\n\nFrom idea to deployment – we handle the complete development lifecycle.",
    options: [
      {
        label: "Request Consultation",
        value: "request_consultation",
        nextNode: "discussion_type",
        icon: "Calendar",
      },
      {
        label: "Talk to Sales",
        value: "talk_sales",
        nextNode: "lead_capture",
        icon: "Briefcase",
      },
      {
        label: "Back to IT Services",
        value: "back_it",
        nextNode: "it_services",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  web_mobile: {
    id: "web_mobile",
    type: "message",
    message: "We build high-performance:",
    features: [
      { text: "Web Applications", icon: "Globe" },
      { text: "Mobile Applications", icon: "Smartphone" },
      { text: "Progressive Web Apps", icon: "Puzzle" },
      { text: "REST APIs & Microservices", icon: "Server" },
    ],
    options: [
      {
        label: "Request Consultation",
        value: "request_consultation",
        nextNode: "discussion_type",
        icon: "Calendar",
      },
      {
        label: "Talk to Sales",
        value: "talk_sales",
        nextNode: "lead_capture",
        icon: "Briefcase",
      },
      {
        label: "Back to IT Services",
        value: "back_it",
        nextNode: "it_services",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  uiux: {
    id: "uiux",
    type: "message",
    message: "Our **UI/UX Design** services include:",
    features: [
      { text: "User Research", icon: "User" },
      { text: "Wireframing", icon: "Pencil" },
      { text: "Prototyping", icon: "Layers" },
      { text: "Visual Design", icon: "Palette" },
    ],
    options: [
      {
        label: "Request Consultation",
        value: "request_consultation",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to IT Services",
        value: "back_it",
        nextNode: "it_services",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  cloud_devops: {
    id: "cloud_devops",
    type: "message",
    message: "Our **Cloud & DevOps** services:",
    features: [
      { text: "AWS / Azure / GCP Setup", icon: "Cloud" },
      { text: "CI/CD Pipeline Implementation", icon: "GitBranch" },
      { text: "Docker & Kubernetes", icon: "Box" },
      { text: "Monitoring & Logging", icon: "BarChart3" },
      { text: "Security & Compliance", icon: "ShieldCheck" },
    ],
    options: [
      {
        label: "Request Consultation",
        value: "request_consultation",
        nextNode: "discussion_type",
        icon: "Calendar",
      },
      {
        label: "Back to IT Services",
        value: "back_it",
        nextNode: "it_services",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  maintenance: {
    id: "maintenance",
    type: "message",
    message: "Our **Maintenance & Support** plans include:",
    features: [
      { text: "Bug Fixes & Patches", icon: "Wrench" },
      { text: "Regular Updates", icon: "RefreshCw" },
      { text: "Performance Monitoring", icon: "BarChart3" },
      { text: "Dedicated Support Team", icon: "Headphones" },
      { text: "SLA-based Response Times", icon: "Clock" },
    ],
    options: [
      {
        label: "Request Consultation",
        value: "request_consultation",
        nextNode: "discussion_type",
        icon: "Calendar",
      },
      {
        label: "Back to IT Services",
        value: "back_it",
        nextNode: "it_services",
        icon: "ArrowLeft",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  // =====================================================
  // MULTIPLE PRODUCTS
  // =====================================================

  multiple_products: {
    id: "multiple_products",
    type: "message",
    message:
      "No problem! Our team can help you understand which combination of products best fits your needs.\n\nLet's connect you with our solutions expert.",
    options: [
      {
        label: "Schedule a Discussion",
        value: "schedule",
        nextNode: "discussion_type",
        icon: "Calendar",
      },
      {
        label: "Talk to an Expert",
        value: "expert",
        nextNode: "lead_capture",
        icon: "Briefcase",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  // =====================================================
  // PRICING FLOW
  // =====================================================

  pricing_intro: {
    id: "pricing_intro",
    type: "message",
    message:
      "Our pricing depends on modules, users & customization.\n\nHow would you like to proceed?",
    options: [
      {
        label: "Get Estimated Pricing",
        value: "estimate",
        nextNode: "pricing_form",
        icon: "Calculator",
      },
      {
        label: "Talk to Sales",
        value: "sales",
        nextNode: "discussion_type",
        icon: "User",
      },
      {
        label: "Request Proposal",
        value: "proposal",
        nextNode: "pricing_form",
        icon: "FileText",
      },
    ],
  },

  pricing_form: {
    id: "pricing_form",
    type: "form",
    message: "To share accurate pricing, please provide your details.",
    formType: "lead",
  },

  // =====================================================
  // DEMO / CONSULTATION FLOW
  // =====================================================

  discussion_type: {
    id: "discussion_type",
    type: "message",
    message: "Let’s schedule a discussion with our expert.",
    options: [
      {
        label: "Product Demo",
        value: "demo",
        nextNode: "slot_selection",
        icon: "Presentation",
      },
      {
        label: "Requirement Discussion",
        value: "req",
        nextNode: "slot_selection",
        icon: "MessageSquare",
      },
      {
        label: "Pricing Consultation",
        value: "pricing",
        nextNode: "slot_selection",
        icon: "IndianRupee",
      },
      {
        label: "Technical Discussion",
        value: "tech",
        nextNode: "slot_selection",
        icon: "Cpu",
      },
    ],
  },

  slot_selection: {
    id: "slot_selection",
    type: "slots",
    message:
      "Available Time Slots (IST):\n10:00 – 10:30 AM\n11:30 – 12:00 PM\n2:00 – 2:30 PM\n4:00 – 4:30 PM",
  },

  booking_confirmed: {
    id: "booking_confirmed",
    type: "end",
    message:
      "Your meeting is scheduled!\nDate: {{Date}}\nTime: {{Time}}\nExpert: {{Sales/Product Team}}\nWe’ll connect via Google Meet or Phone Call.",
  },

  // =====================================================
  // LEAD CAPTURE
  // =====================================================

  lead_capture: {
    id: "lead_capture",
    type: "form",
    formType: "lead",
    message:
      "To share accurate pricing and connect you with the right expert, please help us with a few details:",
  },

  lead_captured: {
    id: "lead_captured",
    type: "message",
    message:
      "**Thank you!**\n\nOur team will reach out to you within **24 business hours**.\n\nMeanwhile, feel free to explore more about our products.",
    options: [
      {
        label: "Schedule a Meeting",
        value: "schedule",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Back to Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  // =====================================================
  // SUPPORT FLOW
  // =====================================================

  support_intro: {
    id: "support_intro",
    type: "message",
    message:
      "We're here to help our existing customers!\n\nWhat do you need assistance with?",
    options: [
      {
        label: "Raise Support Ticket",
        value: "ticket",
        nextNode: "support_form",
        icon: "Ticket",
      },
      {
        label: "Product Issue",
        value: "issue",
        nextNode: "support_form",
        icon: "AlertCircle",
      },
      {
        label: "Billing Query",
        value: "billing",
        nextNode: "support_form",
        icon: "Receipt",
      },
      {
        label: "Talk to Support Executive",
        value: "talk",
        nextNode: "support_form",
        icon: "Headphones",
      },
    ],
  },

  support_form: {
    id: "support_form",
    type: "form",
    message: "Please describe your issue and provide contact details.",
    formType: "support",
  },

  ticket_raised: {
    id: "ticket_raised",
    type: "end",
    intro: "Support Ticket Raised!",
    features: [
      { text: "Ticket Number: {{ticket_number}}", icon: "Ticket" },
      { text: "Response Time: 4 Business Hours", icon: "Clock" },
    ],
    followUp: "You'll receive updates on your registered email.",
    options: [
      {
        label: "Back to Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },

  // =====================================================
  // ABOUT COMPANY
  // =====================================================

  about_company: {
    id: "about_company",
    type: "message",
    message:
      "Prath Technologies Pvt. Ltd. is an IT solutions provider delivering enterprise-grade software, SaaS products & custom digital platforms for Indian and global clients.",
    options: [
      {
        label: "Explore Products",
        value: "explore_products",
        nextNode: "products_menu",
        icon: "Package",
      },
      {
        label: "Request a Demo",
        value: "request_demo",
        nextNode: "demo_type",
        icon: "Calendar",
      },
      {
        label: "Contact Us",
        value: "contact",
        nextNode: "lead_capture",
        icon: "Briefcase",
      },
      {
        label: "Main Menu",
        value: "main_menu",
        nextNode: "welcome",
        icon: "Home",
      },
    ],
  },
};
