import { createFileRoute } from '@tanstack/react-router'
import Fuse from 'fuse.js'
import { useState, useTransition } from 'react'
import { ChevronDown, ChevronRight } from 'react-swm-icon-pack'
import Newscreen from 'react-swm-icon-pack/dist/Icons/Newscreen.js'
import { PageCard, PageHeader } from '../components/page'
import {
  experienceSections,
  getAllCvExperienceRecords,
  getAllCvSkills,
  languages,
} from '../data/cv'
import type { FuseResult } from 'fuse.js'
import type { ReactNode } from 'react'
import type {
  CvEmployerSection,
  CvExperience,
  CvExperienceRecord,
} from '../data/cv'

export const Route = createFileRoute('/product/cv')({
  component: CvPage,
})

type ExperienceSort = 'newest' | 'oldest'

type EmployerSectionProps = {
  heading: string
  summary: string
  href?: string
  items: Array<CvExperience>
  highlightMap: Map<CvExperience, ExperienceHighlights>
  showDivider?: boolean
}

type HighlightIndices = Array<[number, number]>

type ExperienceHighlights = {
  role: HighlightIndices
  company: HighlightIndices
  periodLabel: HighlightIndices
  summary: HighlightIndices
  description: Map<number, HighlightIndices>
  skills: Map<number, HighlightIndices>
}

type SearchResultMap = Map<CvExperience, ExperienceHighlights>

const allExperienceRecords = getAllCvExperienceRecords()

const experienceSearch = new Fuse(allExperienceRecords, {
  threshold: 0.3,
  ignoreLocation: true,
  ignoreFieldNorm: true,
  includeMatches: true,
  minMatchCharLength: 2,
  keys: [
    { name: 'experience.summary', weight: 0.3 },
    { name: 'experience.description', weight: 0.3 },
    { name: 'employerSummary', weight: 0.15 },
    { name: 'experience.skills', weight: 0.1 },
    { name: 'experience.role', weight: 0.06 },
    { name: 'experience.company', weight: 0.04 },
    { name: 'employerHeading', weight: 0.03 },
    { name: 'experience.period.label', weight: 0.02 },
  ],
})

function normalizeIndices(indices: ReadonlyArray<readonly [number, number]>) {
  if (indices.length === 0) {
    return []
  }

  const sorted = [...indices].sort((left, right) => left[0] - right[0])
  const merged: Array<[number, number]> = [[sorted[0][0], sorted[0][1]]]

  for (const [start, end] of sorted.slice(1)) {
    const previous = merged[merged.length - 1]

    if (start <= previous[1] + 1) {
      previous[1] = Math.max(previous[1], end)
      continue
    }

    merged.push([start, end])
  }

  return merged
}

function createEmptyHighlights(): ExperienceHighlights {
  return {
    role: [],
    company: [],
    periodLabel: [],
    summary: [],
    description: new Map(),
    skills: new Map(),
  }
}

function mergeHighlightLists(
  current: HighlightIndices,
  next: ReadonlyArray<readonly [number, number]>,
) {
  return normalizeIndices([...current, ...next])
}

function renderHighlightedText(
  value: string,
  indices: HighlightIndices,
  keyPrefix: string,
) {
  if (indices.length === 0) {
    return value
  }

  const parts: Array<ReactNode> = []
  let cursor = 0

  indices.forEach(([start, end], index) => {
    if (cursor < start) {
      parts.push(value.slice(cursor, start))
    }

    parts.push(
      <mark
        key={`${keyPrefix}-${start}-${end}-${index}`}
        className="rounded-sm bg-light_bronze-300/20 px-0.5 text-light_bronze-200"
      >
        {value.slice(start, end + 1)}
      </mark>,
    )

    cursor = end + 1
  })

  if (cursor < value.length) {
    parts.push(value.slice(cursor))
  }

  return parts
}

function getPeriodSortValue(
  period: CvExperience['period'],
  direction: ExperienceSort,
) {
  if (period.end) {
    return period.end.getTime()
  }

  return direction === 'newest'
    ? Number.POSITIVE_INFINITY
    : Number.NEGATIVE_INFINITY
}

function sortExperiences(
  items: Array<CvExperience>,
  direction: ExperienceSort,
) {
  return [...items].sort((left, right) => {
    const primary =
      getPeriodSortValue(right.period, direction) -
      getPeriodSortValue(left.period, direction)

    if (direction === 'oldest') {
      const oldestPrimary =
        getPeriodSortValue(left.period, direction) -
        getPeriodSortValue(right.period, direction)

      if (oldestPrimary !== 0) {
        return oldestPrimary
      }

      return left.period.start.getTime() - right.period.start.getTime()
    }

    if (primary !== 0) {
      return primary
    }

    return right.period.start.getTime() - left.period.start.getTime()
  })
}

function filterAndSortSections(
  sections: Array<CvEmployerSection>,
  matchingExperiences: SearchResultMap | null,
  selectedSkill: string,
  sortDirection: ExperienceSort,
) {
  return sections
    .map((section) => ({
      ...section,
      items: sortExperiences(
        section.items.filter((item) => {
          const matchesSearch = matchingExperiences
            ? matchingExperiences.has(item)
            : true
          const matchesSkill = selectedSkill
            ? item.skills.includes(selectedSkill)
            : true

          return matchesSearch && matchesSkill
        }),
        sortDirection,
      ),
    }))
    .filter((section) => section.items.length > 0)
}

function getMatchingExperiences(searchTerm: string) {
  const normalizedSearchTerm = searchTerm.trim()

  if (!normalizedSearchTerm) {
    return null
  }

  const matches: SearchResultMap = new Map()

  experienceSearch
    .search(normalizedSearchTerm)
    .forEach((result: FuseResult<CvExperienceRecord>) => {
      const existingHighlights =
        matches.get(result.item.experience) ?? createEmptyHighlights()

      result.matches?.forEach((match) => {
        if (match.key === 'experience.role') {
          existingHighlights.role = mergeHighlightLists(
            existingHighlights.role,
            match.indices,
          )
        }

        if (match.key === 'experience.company') {
          existingHighlights.company = mergeHighlightLists(
            existingHighlights.company,
            match.indices,
          )
        }

        if (match.key === 'experience.period.label') {
          existingHighlights.periodLabel = mergeHighlightLists(
            existingHighlights.periodLabel,
            match.indices,
          )
        }

        if (match.key === 'experience.summary') {
          existingHighlights.summary = mergeHighlightLists(
            existingHighlights.summary,
            match.indices,
          )
        }

        if (match.key === 'experience.description') {
          const descriptionIndex =
            typeof match.refIndex === 'number' ? match.refIndex : 0
          const currentHighlights =
            existingHighlights.description.get(descriptionIndex) ?? []

          existingHighlights.description.set(
            descriptionIndex,
            mergeHighlightLists(currentHighlights, match.indices),
          )
        }

        if (match.key === 'experience.skills') {
          const skillIndex =
            typeof match.refIndex === 'number' ? match.refIndex : 0
          const currentHighlights =
            existingHighlights.skills.get(skillIndex) ?? []

          existingHighlights.skills.set(
            skillIndex,
            mergeHighlightLists(currentHighlights, match.indices),
          )
        }
      })

      matches.set(result.item.experience, existingHighlights)
    })

  return matches
}

function ExperienceToolbar({
  searchInputValue,
  searchTerm,
  selectedSkill,
  sortDirection,
  skills,
  totalMatches,
  isFiltering,
  onSearchChange,
  onSkillChange,
  onSortChange,
}: {
  searchInputValue: string
  searchTerm: string
  selectedSkill: string
  sortDirection: ExperienceSort
  skills: Array<string>
  totalMatches: number
  isFiltering: boolean
  onSearchChange: (value: string) => void
  onSkillChange: (value: string) => void
  onSortChange: (value: ExperienceSort) => void
}) {
  return (
    <div className="rounded-[2rem] border border-tea_green-700/60 bg-tea_green-800/40 p-5">
      <div className="flex flex-wrap-reverse items-start justify-between gap-3 sm:flex-nowrap">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-tea_green-300">
            Experience toolbar
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-tea_green-200">
            Ready for more filters. Right now you can search all experience
            text, filter by skill, and sort the experience list by date.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-light_bronze-300">
            {totalMatches} matches
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-tea_green-300">
            {isFiltering ? 'Updating...' : 'Ready'}
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 sm:col-span-3">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-tea_green-300">
            Search experience
          </span>
          <input
            type="search"
            value={searchInputValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search company, role, summary, skills, or descriptions"
            className="w-full rounded-2xl border border-tea_green-700/60 bg-tea_green-900 px-4 py-3 text-base text-tea_green-100 outline-none transition placeholder:text-tea_green-400 focus:border-light_bronze-300"
          />
          <p className="text-xs leading-relaxed text-tea_green-300">
            {searchTerm
              ? `Searching for "${searchTerm}".`
              : 'Search runs across all text inside each experience entry.'}
          </p>
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-tea_green-300">
            Filter by skill
          </span>
          <select
            value={selectedSkill}
            onChange={(event) => onSkillChange(event.target.value)}
            className="w-full rounded-2xl border border-tea_green-700/60 bg-tea_green-900 px-4 py-3 text-base text-tea_green-100 outline-none transition focus:border-light_bronze-300"
          >
            <option value="">All skills</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-tea_green-300">
            Sort by
          </span>
          <select
            value={sortDirection}
            onChange={(event) =>
              onSortChange(event.target.value as ExperienceSort)
            }
            className="w-full rounded-2xl border border-tea_green-700/60 bg-tea_green-900 px-4 py-3 text-base text-tea_green-100 outline-none transition focus:border-light_bronze-300"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
    </div>
  )
}

function EmployerSection({
  heading,
  summary,
  href,
  items,
  highlightMap,
  showDivider,
}: EmployerSectionProps) {
  return (
    <details open className="collapsible-section py-2">
      <summary className="cursor-pointer list-none">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="text-2xl font-semibold text-light_bronze-300">
              {heading}
            </h2>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${heading} website`}
                className="inline-flex items-center justify-center text-tea_green-300 transition hover:text-light_bronze-300"
                onClick={(event) => event.stopPropagation()}
              >
                <Newscreen className="h-4 w-4" color="currentColor" />
              </a>
            ) : null}
          </div>
          <span className="collapsible-indicator text-light_bronze-300">
            <ChevronRight
              className="collapsible-icon-closed h-5 w-5"
              color="currentColor"
            />
            <ChevronDown
              className="collapsible-icon-open h-5 w-5"
              color="currentColor"
            />
          </span>
        </div>
      </summary>
      <div className="mt-5 space-y-4">
        <p className="max-w-3xl text-base leading-relaxed text-tea_green-200">
          {summary}
        </p>
        <div className="space-y-4">
          {items.map((item) => {
            const highlights = highlightMap.get(item) ?? createEmptyHighlights()

            return (
              <article
                key={`${heading}-${item.company}-${item.period.label}`}
                className="rounded-3xl border border-tea_green-700/60 bg-tea_green-800/70 p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-tea_green-300">
                      {renderHighlightedText(
                        item.role,
                        highlights.role,
                        `${item.company}-role`,
                      )}
                    </p>
                    <div className="mt-2">
                      <h3 className="text-3xl font-semibold text-light_bronze-300">
                        {renderHighlightedText(
                          item.company,
                          highlights.company,
                          `${item.company}-company`,
                        )}
                        {item.href ? ' ' : null}
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${item.role} link`}
                            className="inline-flex translate-y-[-0.08em] align-baseline text-tea_green-300 transition hover:text-light_bronze-300"
                          >
                            <Newscreen
                              className="ml-1 inline h-4 w-4"
                              color="currentColor"
                            />
                          </a>
                        ) : null}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-tea_green-300">
                    {renderHighlightedText(
                      item.period.label,
                      highlights.periodLabel,
                      `${item.company}-period`,
                    )}
                  </p>
                </div>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-tea_green-200">
                  {renderHighlightedText(
                    item.summary,
                    highlights.summary,
                    `${item.company}-summary`,
                  )}
                </p>
                <ul className="mt-4 space-y-2 text-base leading-relaxed text-tea_green-200">
                  {item.description.map((entry, index) => (
                    <li key={entry}>
                      {renderHighlightedText(
                        entry,
                        highlights.description.get(index) ?? [],
                        `${item.company}-description-${index}`,
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.skills.map((skill, index) => (
                    <span
                      key={skill}
                      className="rounded-full border border-tea_green-700/60 bg-tea_green-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-tea_green-300"
                    >
                      {renderHighlightedText(
                        skill,
                        highlights.skills.get(index) ?? [],
                        `${item.company}-skill-${index}`,
                      )}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
      {showDivider ? (
        <div className="mt-8 border-t border-tea_green-700/60" />
      ) : null}
    </details>
  )
}

function CvPage() {
  const palette = 'teaGreen' as const
  const [searchInputValue, setSearchInputValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')
  const [sortDirection, setSortDirection] = useState<ExperienceSort>('newest')
  const [isFiltering, startTransition] = useTransition()
  const skills = getAllCvSkills()
  const searchResults = getMatchingExperiences(searchTerm)
  const filteredSections = filterAndSortSections(
    experienceSections,
    searchResults,
    selectedSkill,
    sortDirection,
  )
  const visibleExperienceCount = filteredSections.reduce(
    (count, section) => count + section.items.length,
    0,
  )

  function handleSearchChange(value: string) {
    setSearchInputValue(value)
    startTransition(() => {
      setSearchTerm(value)
    })
  }

  function handleSkillChange(value: string) {
    startTransition(() => {
      setSelectedSkill(value)
    })
  }

  function handleSortChange(value: ExperienceSort) {
    startTransition(() => {
      setSortDirection(value)
    })
  }

  return (
    <>
      <PageHeader
        palette={palette}
        title="Frontend‑focused fullstack developer"
        description="Master’s degree from Chalmers in High Performance Computer Systems. Production experience across banking, analytics, public services, and mobile products, with a consistent focus on frontend architecture, maintainability, and performance."
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <PageCard palette={palette} title="What Stands Out">
          Frontend-led fullstack work, strong component and system design
          instincts, and repeated ownership of frontend direction in small
          teams.
        </PageCard>
        <PageCard palette={palette} title="How Sabine Works">
          Clear abstractions, purposeful tooling, reliable documentation, and a
          bias toward maintainable structure over short-lived hacks.
        </PageCard>
        <PageCard palette={palette} title="Performance & Quality">
          Proven experience improving performance, including a 90% reduction in
          input latency for a large-scale component according to the CV profile.
        </PageCard>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <PageCard palette={palette} title="Special Knowledge">
          <ul className="space-y-2">
            <li>Fullstack development with React and Next</li>
            <li>App development with React Native</li>
            <li>Design systems and component structure</li>
          </ul>
        </PageCard>
        <PageCard palette={palette} title="Languages">
          <div className="space-y-4">
            {languages.map((language) => (
              <p key={language.label}>
                {language.label}: {language.value}
              </p>
            ))}
          </div>
        </PageCard>
      </section>

      <details
        open
        className="collapsible-section rounded-[2rem] border border-tea_green-700/60 bg-tea_green-800/40 px-6 py-5"
      >
        <summary className="cursor-pointer list-none">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-tea_green-300">
              Skills
            </p>
            <span className="collapsible-indicator text-tea_green-300">
              <ChevronRight
                className="collapsible-icon-closed h-5 w-5"
                color="currentColor"
              />
              <ChevronDown
                className="collapsible-icon-open h-5 w-5"
                color="currentColor"
              />
            </span>
          </div>
        </summary>
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-tea_green-700/60 bg-tea_green-900 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-tea_green-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </details>

      <section className="space-y-4">
        <ExperienceToolbar
          searchInputValue={searchInputValue}
          searchTerm={searchTerm}
          selectedSkill={selectedSkill}
          sortDirection={sortDirection}
          skills={skills}
          totalMatches={visibleExperienceCount}
          isFiltering={isFiltering}
          onSearchChange={handleSearchChange}
          onSkillChange={handleSkillChange}
          onSortChange={handleSortChange}
        />
        {filteredSections.length > 0 ? (
          filteredSections.map((section, index) => (
            <EmployerSection
              key={section.heading}
              heading={section.heading}
              summary={section.summary}
              href={section.href}
              items={section.items}
              highlightMap={searchResults ?? new Map()}
              showDivider={index < filteredSections.length - 1}
            />
          ))
        ) : (
          <PageCard palette={palette} title="No matching experience">
            No experience entries match the selected filter yet.
          </PageCard>
        )}
      </section>
    </>
  )
}
