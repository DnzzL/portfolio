import { Fragment, useEffect, useState, useMemo } from 'react';

// Import config data
import frenchResume from '../../config/resume.json';
import englishResume from '../../config/resume.en.json';
import config from '../../config/config.json';
import LanguageSwitcher from './LanguageSwitcher';

const ResumeMinimal = () => {
  const resumeMap = {
    fr: frenchResume,
    en: englishResume,
  };
  const [chosenLanguage, setChosenLanguage] = useState(config.site.lang);
  const [resumeData, setResumeData] = useState(resumeMap[chosenLanguage]);

  useEffect(() => {
    const newResumeData = resumeMap[chosenLanguage];
    setResumeData(newResumeData);
  }, [chosenLanguage]);

  // Robust formatter: returns "Present" when no date is supplied
  const formatDate = (dateString) => {
    if (!dateString) return chosenLanguage === 'fr' ? 'Présent' : 'Present';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(chosenLanguage, { month: 'short', year: 'numeric' }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Exact months/years difference (no 30-day approximation)
  const calculateDuration = (startDate, endDate) => {
    if (!startDate) return '';
    const s = new Date(startDate);
    const e = endDate ? new Date(endDate) : new Date();

    // Calculate total months between dates
    let totalMonths = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
    // If day of month in end is earlier than start, subtract one month
    if (e.getDate() < s.getDate()) totalMonths -= 1;
    if (totalMonths < 0) totalMonths = 0;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0 && months === 0) return '0 mois';

    let result = '';
    if (years > 0) {
      result += `${years} an${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (result !== '') {
        result += ' et ';
      }
      result += `${months} mois`;
    }

    return result;
  };

  // Normalize skills: JSON Resume "skills" might be array of objects or strings
  const normalizeSkills = (skillsInput) => {
    if (!Array.isArray(skillsInput)) return [];
    return skillsInput
      .map((s) => {
        if (typeof s === 'string') return { name: s };
        if (s && typeof s === 'object') return { name: s.name || s.label || '', level: s.level };
        return { name: String(s) };
      })
      .filter(Boolean);
  };

  const { basics, work, education, skills, projects, volunteer } = useMemo(() => {
    const data = resumeData || {};
    return {
      basics: data.basics || {},
      work: data.work || [],
      education: data.education || [],
      skills: data.skills || [],
      projects: data.projects || [],
      volunteer: data.volunteer || [],
    };
  }, [resumeData]);

  const normalizedSkills = useMemo(() => normalizeSkills(skills), [skills]);
  const mainSkills = [
    'TypeScript',
    'React.js',
    'Vue.js',
    'Node.js',
    'LLM',
    'Python',
    'MongoDB',
    'PostgreSQL',
    'GraphQL',
    'Docker',
  ];
  const techSkills = useMemo(() => normalizedSkills.filter((s) => mainSkills.includes(s.name)), [normalizedSkills]);
  const otherSkills = useMemo(() => normalizedSkills.filter((s) => !mainSkills.includes(s.name)), [normalizedSkills]);

  // Sort experiences: ongoing jobs (no endDate) first, then by startDate desc
  const workExperience = useMemo(
    () =>
      (Array.isArray(work) ? work.slice() : [])
        .sort((a, b) => {
          const aOngoing = !a.endDate;
          const bOngoing = !b.endDate;
          if (aOngoing && !bOngoing) return -1;
          if (bOngoing && !aOngoing) return 1;
          return new Date(b.startDate || 0) - new Date(a.startDate || 0);
        })
        .map((job) => ({
          ...job,
          duration: calculateDuration(job.startDate, job.endDate),
        })),
    [work]
  );

  const educationData = useMemo(
    () =>
      (Array.isArray(education) ? education : []).map((edu) => ({
        ...edu,
        formattedDate: `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`,
      })),
    [education]
  );

  const projectData = useMemo(
    () =>
      (Array.isArray(projects) ? projects : []).map((project) => ({
        ...project,
        formattedDate: `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`,
      })),
    [projects]
  );

  const volunteerData = useMemo(
    () =>
      (Array.isArray(volunteer) ? volunteer : []).map((v) => ({
        ...v,
        formattedDate: `${formatDate(v.startDate)} - ${formatDate(v.endDate)}`,
      })),
    [volunteer]
  );

  const linkedInProfile = useMemo(
    () => (basics.profiles ? basics.profiles.find((p) => /linkedin/i.test((p.network || '') + (p.url || ''))) : null),
    [basics.profiles]
  );
  const githubProfile = useMemo(
    () => (basics.profiles ? basics.profiles.find((p) => /github/i.test((p.network || '') + (p.url || ''))) : null),
    [basics.profiles]
  );

  // Expose a safe, serialized version for client-side scripts (download button)
  const resumeForClient = useMemo(
    () =>
      JSON.stringify({
        basics: basics || {},
        work: work || [],
        education: education || [],
        skills: normalizedSkills || [],
        projects: projectData || [],
        volunteer: volunteerData || [],
      }),
    [basics, work, education, normalizedSkills, projectData, volunteerData]
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const data = JSON.stringify(JSON.parse(resumeForClient), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (basics.name || 'resume').toLowerCase().replace(/\s+/g, '-') + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-5 -my-6">
      <div className="mb-4">
        <LanguageSwitcher onLanguageChange={(language) => setChosenLanguage(language)} />
      </div>

      {resumeData && (
        <div className="grid gap-5 md:grid-cols-[280px_1fr] md:gap-5 lg:gap-8 print:-my-14" role="main">
          {/* Sidebar */}
          <aside className="card break-inside-avoid rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm dark:border-gray-800 dark:bg-gray-900 print:hidden print:border-0 print:shadow-none">
            <div className="hero flex items-center gap-4">
              <div className="meta flex-1">
                <div className="flex">
                  <div className="flex flex-col">
                    <h1 className="text-xl leading-tight font-bold tracking-tight">{basics.name}</h1>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{basics.label}</div>
                  </div>
                  {config.author?.avatar ? (
                    <div className="avatar ml-4 h-21 w-21 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={config.author.avatar}
                        alt={config.author.name || 'avatar'}
                        className="h-full w-full object-cover"
                        width={160}
                        height={160}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="summary mt-2.5 text-sm text-gray-500 dark:text-gray-400">{basics.summary}</div>
              </div>
            </div>

            <hr className="my-3 border-gray-200 dark:border-gray-800" />

            <section aria-labelledby="skills-heading">
              <h2
                id="skills-heading"
                className="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400"
              >
                Compétences
              </h2>
              <div className="mt-2">
                {techSkills.length ? (
                  techSkills.map((s) => (
                    <span
                      key={s.name}
                      className="mr-1.5 mb-1 inline-block rounded-full border border-purple-100 bg-purple-50 px-2.5 py-1.5 text-xs text-purple-700 dark:border-purple-900/30 dark:bg-purple-900/20 dark:text-purple-300"
                    >
                      {s.name}
                      {s.level ? ` • ${s.level}` : ''}
                    </span>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">No core skills listed</div>
                )}
              </div>

              {otherSkills.length > 0 && (
                <div className="mt-2.5">
                  <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Autres
                  </h3>
                  <div className="mt-1.5">
                    {otherSkills.map((s) => (
                      <span
                        key={s.name}
                        className="mr-1.5 mb-1 inline-block rounded-full border border-purple-100 bg-purple-50 px-2.5 py-1.5 text-xs text-purple-700 dark:border-purple-900/30 dark:bg-purple-900/20 dark:text-purple-300"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <hr className="my-3 border-gray-200 dark:border-gray-800" />

            <section aria-labelledby="edu-heading">
              <h2
                id="edu-heading"
                className="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400"
              >
                Formations
              </h2>
              <div className="mt-2">
                {educationData.length ? (
                  educationData.map((edu) => (
                    <div key={edu.institution} className="mb-1.5">
                      <h3 className="m-0 text-sm">{edu.institution}</h3>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{edu.area}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{edu.formattedDate}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">No formal education listed</div>
                )}
              </div>
            </section>

            <hr className="my-3 border-gray-200 dark:border-gray-800" />

            <section aria-labelledby="contact-heading">
              <h2
                id="contact-heading"
                className="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400"
              >
                Contact
              </h2>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {basics.email ? <div>{basics.email}</div> : null}
                {basics.phone ? <div>{basics.phone}</div> : null}
                {basics.location ? (
                  <div>
                    {basics.location.city}
                    {basics.location.region ? `, ${basics.location.region}` : ''}
                  </div>
                ) : null}
                <div className="mt-1.5">
                  {linkedInProfile ? (
                    <div>
                      <a
                        href={linkedInProfile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline dark:text-purple-400"
                      >
                        LinkedIn
                      </a>
                    </div>
                  ) : null}
                  {githubProfile ? (
                    <div>
                      <a
                        href={githubProfile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline dark:text-purple-400"
                      >
                        GitHub
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </aside>

          {/* Main column */}
          <main>
            {/* Compact contact header for print / small screens */}
            <header className="card -mt-3 hidden break-inside-avoid rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm dark:border-gray-800 dark:bg-gray-900 print:block print:border-0 print:shadow-none">
              <div className="grid grid-cols-12 items-start">
                <div className="col-span-9">
                  <h1 className="m-0 text-lg font-bold">
                    {basics.name} <span>- {basics.label}</span>
                  </h1>
                  <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    {basics.location.city} - {basics.email}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{basics.summary}</div>
                </div>
                {config.author?.avatar ? (
                  <div className="col-span-3 flex justify-end print:mt-1">
                    <img
                      src={config.author.avatar}
                      alt={config.author.name || 'avatar'}
                      className="h-24 w-24 rounded-lg object-cover"
                      width={80}
                      height={80}
                    />
                  </div>
                ) : null}
              </div>
            </header>

            {/* Experience */}
            <section className="card -mt-2 rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm md:mt-0 dark:border-gray-800 dark:bg-gray-900 print:border-0 print:shadow-none">
              <h2 className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Expériences
              </h2>
              <div>
                {workExperience.map((job) => (
                  <article
                    key={`${job.name}-${job.position}-${job.startDate}`}
                    className="break-inside-avoid border-b border-dashed border-gray-200 py-2.5 last:border-0 last:pb-0 dark:border-gray-800"
                  >
                    <div className="job-head flex justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold">{job.position}</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {job.name} {job.location ? `• ${job.location}` : ''}
                        </div>
                      </div>
                      <div className="job-dates min-w-[120px] text-right text-sm text-gray-500 dark:text-gray-400">
                        <div>
                          {formatDate(job.startDate)} — {formatDate(job.endDate)}
                        </div>
                        <div className="text-xs">{job.duration}</div>
                      </div>
                    </div>

                    <div className="job-summary mt-2 text-justify text-sm text-gray-500 dark:text-gray-400 print:text-xs">
                      {job.summary?.split('\\n').map((line, index) => (
                        <Fragment key={index}>
                          {line}
                          <br />
                        </Fragment>
                      ))}
                    </div>

                    {job.highlights && job.highlights.length ? (
                      <ul className="job-highlights mt-2 list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        {job.highlights.map((h, idx) => (
                          <li key={idx} className="mb-1.5">
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            {/* Educations */}
            <section className="card mt-3 hidden break-inside-avoid rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm dark:border-gray-800 dark:bg-gray-900 print:-mt-2 print:block print:border-0 print:shadow-none">
              <h2 className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Formations
              </h2>
              <div>
                {educationData.map((e) => (
                  <div key={e.institution} className="edu-row">
                    <h3 className="m-0 text-sm">
                      {e.institution}
                      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">• {e.formattedDate}</span>
                      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">• {e.area}</span>
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Volunteer */}
            {volunteerData.length ? (
              <section className="card mt-3 break-inside-avoid rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm dark:border-gray-800 dark:bg-gray-900 print:-mt-2 print:border-0 print:shadow-none">
                <h2 className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Bénévolat
                </h2>
                <div>
                  {volunteerData.map((v) => (
                    <div key={v.organization} className="vol-row mb-2.5">
                      <h3 className="m-0 text-sm">
                        {v.position} @ {v.organization}
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">• {v.formattedDate}</span>
                      </h3>
                      <div className="mt-2 text-justify text-sm text-gray-500 dark:text-gray-400 print:text-xs">
                        {v.summary?.split('\\n').map((line, index) => (
                          <Fragment key={index}>
                            {line}
                            <br />
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Projects */}
            {projectData.length ? (
              <section className="card mt-3 rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm dark:border-gray-800 dark:bg-gray-900 print:-mt-2 print:border-0 print:shadow-none">
                <h2 className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Projets
                </h2>
                <div>
                  {projectData.map((p) => (
                    <div key={p.name} className="break-inside-avoid">
                      <h3 className="m-0 text-justify text-sm">
                        {p.name}
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">• {p.formattedDate}</span>:{' '}
                        <span className="ml-1 text-gray-500 dark:text-gray-400 print:text-xs">{p.summary}</span>
                      </h3>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </main>
        </div>
      )}

      <div className="controls mt-3.5 flex justify-center gap-2.5 print:hidden">
        <button
          className="cursor-pointer rounded-md border-0 bg-purple-600 px-3 py-2 font-semibold text-white transition-colors hover:bg-purple-700"
          onClick={handlePrint}
        >
          Print / Save PDF
        </button>
        <button
          className="cursor-pointer rounded-md border border-purple-100 bg-transparent px-3 py-2 font-semibold text-purple-600 transition-colors hover:bg-purple-50 dark:border-purple-900/30 dark:hover:bg-purple-900/20"
          onClick={handleDownload}
        >
          Download JSON
        </button>
      </div>
    </div>
  );
};

export default ResumeMinimal;
