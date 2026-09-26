export interface Project {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  imageAlt: string;
  date: string;
  /** Short context pills, e.g. "iOS · Apple Watch". */
  tags?: string[];
  status?: "live" | "coming-soon";
  stack?: string[];
}
