export interface MatchResult {
  analysis_id: number;
  ai_match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
  feedback: string[];
}
