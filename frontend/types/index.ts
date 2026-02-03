export interface MatchResult {
  analysis_id: number;
  ai_match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
  feedback: string[];
}

export interface JobAnalysis {
  id: number;
  match_percentage: number;
  matched_keywords: string[];
  missing_keywords: string[];
  feedback: string[];
  created_at: string;
}
