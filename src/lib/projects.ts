export interface Project {
  title: string;
  client: string;
  industry: string;
  image: string;
  metric: string;
  metricValue: string;
  problem: string;
  solution: string;
  results: string[];
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "AI Email Automation",
    client: "Scalling School, Finland",
    industry: "Education / Online Business",
    image: "/images/project-gmail.png",
    metric: "Hours saved daily",
    metricValue: "3+",
    problem:
      "Spending hours manually reading, categorizing, and replying to emails. Important messages were getting buried.",
    solution:
      "Built an n8n workflow with AI email classification, knowledge base integration, conversation history tracking, and automated draft generation that sounds human.",
    results: [
      "Inbox fully organized automatically",
      "Human-sounding drafts ready to review and send",
      "Hours of daily email work eliminated",
    ],
    tags: ["n8n", "AI Classification", "Email Automation"],
  },
  {
    title: "Intelligent Quote System",
    client: "HVAC Company, Finland",
    industry: "HVAC / Manufacturing",
    image: "/images/project-outlook.png",
    metric: "Employee workload replaced",
    metricValue: "1",
    problem:
      "Complex email handling with attachments (images, PDFs, Excel, Word), pricing calculations, and parts catalog lookups taking up one full employee's time.",
    solution:
      "Designed a production n8n workflow handling multi-format attachments, custom pricing rules, parts catalog integration, calculation tools, and full conversation history.",
    results: [
      "Effectively replaced one employee's workload",
      "Handles complex attachments automatically",
      "Running in production, processing daily",
    ],
    tags: ["n8n", "Document Processing", "Production System"],
  },
  // Add more projects below — first 4 show on homepage, all show on /projects
];
