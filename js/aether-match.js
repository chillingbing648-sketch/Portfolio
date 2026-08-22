/**
 * js/aether-match.js
 * AETHER — Deterministic Portfolio Role Matching Engine
 *
 * This module does NOT use an LLM.
 * It does NOT infer qualifications.
 * It only compares verified portfolio data against
 * explicitly defined role requirements.
 */

function normalize(value = '') {
    return String(value)
        .toLowerCase()
        .replace(/[^\w\s.+#-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function safeArray(value) {
    return Array.isArray(value) ? value : [];
}

function flattenSkills(skills) {
    return safeArray(skills)
        .flatMap(category =>
            safeArray(category.items).map(skill => ({
                name: String(skill.name || ''),
                normalized: normalize(skill.name)
            }))
        );
}

function getProjectSearchText(project) {
    const study = project.caseStudy || {};

    return normalize([
        project.title,
        project.description,
        ...safeArray(project.tech),
        ...safeArray(study.stack),
        study.story,
        study.problem,
        study.architecture,
        study.challenges,
        study.impact,
        study.lessons
    ].join(' '));
}

function getExperienceSearchText(experience) {
    return normalize(
        safeArray(experience)
            .map(item => [
                item.title,
                item.organization,
                item.description,
                ...safeArray(item.chips)
            ].join(' '))
            .join(' ')
    );
}

function matchSkills(role, skills) {
    const portfolioSkills = flattenSkills(skills);

    const matched = [];
    const missing = [];

    for (const required of safeArray(role.skills)) {
        const requiredNormalized = normalize(required);

        const found = portfolioSkills.find(skill =>
            skill.normalized === requiredNormalized
        );

        if (found) {
            matched.push(found.name);
        } else {
            missing.push(required);
        }
    }

    return {
        matched,
        missing,
        total: safeArray(role.skills).length
    };
}

function matchProjects(role, projects) {
    const signals = safeArray(role.projectSignals)
        .map(normalize)
        .filter(Boolean);

    if (!signals.length) {
        return [];
    }

    return safeArray(projects)
        .map(project => {
            const searchable = getProjectSearchText(project);

            const matchedSignals = signals.filter(signal =>
                searchable.includes(signal)
            );

            return {
                project,
                score: matchedSignals.length,
                signals: matchedSignals
            };
        })
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}

function matchExperience(role, experience) {
    const signals = safeArray(role.experienceSignals)
        .map(normalize)
        .filter(Boolean);

    if (!signals.length) {
        return {
            score: 0,
            matches: []
        };
    }

    const results = [];

    for (const item of safeArray(experience)) {
        const searchable = normalize([
            item.title,
            item.organization,
            item.description,
            ...safeArray(item.chips)
        ].join(' '));

        const matches = signals.filter(signal =>
            searchable.includes(signal)
        );

        if (matches.length) {
            results.push({
                item,
                matches
            });
        }
    }

    return {
        score: results.reduce(
            (total, item) => total + item.matches.length,
            0
        ),
        matches: results
    };
}

function calculateScore(
    skillResult,
    projectResults,
    experienceResult
) {
    /*
     * Skill evidence = 50%
     * Project evidence = 35%
     * Experience evidence = 15%
     */

    const skillScore =
        skillResult.total > 0
            ? skillResult.matched.length /
              skillResult.total
            : 0;

    const projectScore =
        projectResults.length > 0
            ? Math.min(
                projectResults.reduce(
                    (total, item) =>
                        total + item.score,
                    0
                ) / 5,
                1
            )
            : 0;

    const experienceScore =
        Math.min(
            experienceResult.score / 5,
            1
        );

    const final =
        (
            skillScore * 0.50 +
            projectScore * 0.35 +
            experienceScore * 0.15
        ) * 100;

    return Math.round(
        Math.max(
            0,
            Math.min(100, final)
        )
    );
}

export function calculateRoleMatch(
    role,
    portfolio
) {
    if (!role || !portfolio) {
        return null;
    }

    const skillResult = matchSkills(
        role,
        portfolio.skills
    );

    const projectResults = matchProjects(
        role,
        portfolio.projects
    );

    const experienceResult = matchExperience(
        role,
        portfolio.experience
    );

    const score = calculateScore(
        skillResult,
        projectResults,
        experienceResult
    );

    return {
        score,

        matchedSkills:
            skillResult.matched,

        missingSkills:
            skillResult.missing,

        matchingProjects:
            projectResults.map(result => ({
                title: result.project.title,
                signals: result.signals
            })),

        experienceEvidence:
            experienceResult.matches.map(result => ({
                title: result.item.title,
                organization:
                    result.item.organization,
                signals: result.matches
            }))
    };
}