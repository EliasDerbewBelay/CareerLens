SKILLS = [
    "python", "django", "react", "javascript", "html", "css",
    "tailwind", "rest", "api", "postgresql", "mysql",
    "docker", "aws", "git", "linux"
]

def generate_feedback(matched_skills, missing_skills, match_percentage):
    feedback = []

    if match_percentage >= 70:
        feedback.append(
            "Your resume is a strong match for this role. Focus on refining project descriptions."
        )
    elif match_percentage >= 40:
        feedback.append(
            "Your resume partially matches this role. Adding missing skills will significantly improve your chances."
        )
    else:
        feedback.append(
            "Your resume has low alignment with this role. Consider restructuring it to match job requirements."
        )

    if missing_skills:
        feedback.append(
            f"Consider adding or emphasizing these skills: {', '.join(missing_skills)}."
        )

    if matched_skills:
        feedback.append(
            f"Strong areas detected: {', '.join(matched_skills)}. Highlight them more clearly in your projects section."
        )

    return feedback
