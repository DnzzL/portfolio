import { Fragment } from 'react';

// Import config data
import resumeData from '../../config/resume.json';
import config from '../../config/config.json';

// Defensive destructuring
const { basics = {}, work = [], education = [], skills = [], projects = [], volunteer = [] } = resumeData || {};

// Robust formatter: returns "Present" when no date is supplied
const formatDate = (dateString) => {
  if (!dateString) return 'Present';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(date);
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

  if (years === 0 && months === 0) return '0mo';
  if (years === 0) return `${months}mo`;
  if (months === 0) return `${years}y`;
  return `${years}y ${months}mo`;
};

// Normalize skills: JSON Resume "skills" might be array of objects or strings
const normalizeSkills = (skillsInput) => {
  if (!Array.isArray(skillsInput)) return [];
  return skillsInput.map(s => {
    if (typeof s === 'string') return { name: s };
    if (s && typeof s === 'object') return { name: s.name || s.label || '', level: s.level };
    return { name: String(s) };
  }).filter(Boolean);
};

const ResumeMinimal = () => {
  const normalizedSkills = normalizeSkills(skills);
  const mainSkills = ['TypeScript', 'React.js', 'Vue.js', 'Node.js', 'LLM', 'Python', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Docker'];
  const techSkills = normalizedSkills.filter(s => mainSkills.includes(s.name));
  const otherSkills = normalizedSkills.filter(s => !mainSkills.includes(s.name));

  // Sort experiences: ongoing jobs (no endDate) first, then by startDate desc
  const workExperience = (Array.isArray(work) ? work.slice() : []).sort((a, b) => {
    const aOngoing = !a.endDate;
    const bOngoing = !b.endDate;
    if (aOngoing && !bOngoing) return -1;
    if (bOngoing && !aOngoing) return 1;
    return new Date(b.startDate || 0) - new Date(a.startDate || 0);
  }).map(job => ({
    ...job,
    duration: calculateDuration(job.startDate, job.endDate),
  }));

  const educationData = (Array.isArray(education) ? education : []).map(edu => ({
    ...edu,
    formattedDate: `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`,
  }));

  const projectData = (Array.isArray(projects) ? projects : []).map(project => ({
    ...project,
    formattedDate: `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`,
  }));

  const volunteerData = (Array.isArray(volunteer) ? volunteer : []).map(v => ({
    ...v,
    formattedDate: `${formatDate(v.startDate)} - ${formatDate(v.endDate)}`,
  }));

  const linkedInProfile = basics.profiles ? basics.profiles.find(p => /linkedin/i.test((p.network || '') + (p.url || ''))) : null;
  const githubProfile = basics.profiles ? basics.profiles.find(p => /github/i.test((p.network || '') + (p.url || ''))) : null;

  // Create basic JSON-LD for SEO / structured data (Person)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": basics.name || '',
    "email": basics.email ? `mailto:${basics.email}` : undefined,
    "jobTitle": basics.label || undefined,
    "sameAs": basics.profiles ? basics.profiles.map(p => p.url) : undefined
  };

  // Expose a safe, serialized version for client-side scripts (download button)
  const resumeForClient = JSON.stringify({ basics: basics || {}, work: work || [], education: education || [], skills: normalizedSkills || [], projects: projectData || [], volunteer: volunteerData || [] });

  

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
    <div className="container mx-auto px-5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="grid gap-5 md:grid-cols-[280px_1fr] md:gap-5 lg:gap-8" role="main">
        {/* Sidebar */}
        <aside className="card bg-white dark:bg-gray-900 rounded-lg p-3.5 border border-gray-200 dark:border-gray-800 shadow-sm print:hidden break-inside-avoid">
          <div className="hero flex gap-4 items-center">
            <div className="meta flex-1">
              <div className="flex">
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold leading-tight tracking-tight">{basics.name}</h1>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">{basics.label}</div>
                </div>
                {config.author?.avatar ? (
                  <div className="avatar w-21 h-21 rounded-lg overflow-hidden flex-shrink-0 ml-4">
                    <img 
                      src={config.author.avatar} 
                      alt={config.author.name || 'avatar'} 
                      className="w-full h-full object-cover"
                      width={160}
                      height={160}
                    />
                  </div>
                ) : null}
              </div>
              <div className="summary text-gray-500 dark:text-gray-400 text-sm mt-2.5">{basics.summary}</div>
            </div>
          </div>

          <hr className="my-3 border-gray-200 dark:border-gray-800" />

          <section aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Skills</h2>
            <div className="mt-2">
              {techSkills.length ? techSkills.map(s => (
                <span 
                  key={s.name} 
                  className="inline-block px-2.5 py-1.5 rounded-full text-xs mr-1.5 mb-1 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-300"
                >
                  {s.name}{s.level ? ` • ${s.level}` : ''}
                </span>
              )) : <div className="text-gray-500 dark:text-gray-400 text-sm">No core skills listed</div>}
            </div>

            {otherSkills.length > 0 && (
              <div className="mt-2.5">
                <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Other</h3>
                <div className="mt-1.5">
                  {otherSkills.map(s => (
                    <span 
                      key={s.name} 
                      className="inline-block px-2.5 py-1.5 rounded-full text-xs mr-1.5 mb-1 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-300"
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
            <h2 id="edu-heading" className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Education</h2>
            <div className="mt-2">
              {educationData.length ? educationData.map(edu => (
                <div key={edu.institution} className="mb-1.5">
                  <h3 className="m-0 text-sm">{edu.institution}</h3>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">{edu.area}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">{edu.formattedDate}</div>
                </div>
              )) : <div className="text-gray-500 dark:text-gray-400 text-sm">No formal education listed</div>}
            </div>
          </section>

          <hr className="my-3 border-gray-200 dark:border-gray-800" />

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Contact</h2>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {basics.email ? (<div>{basics.email}</div>) : null}
              {basics.phone ? (<div>{basics.phone}</div>) : null}
              {basics.location ? (<div>{basics.location.city}{basics.location.region ? `, ${basics.location.region}` : ''}</div>) : null}
              <div className="mt-1.5">
                {linkedInProfile ? (<div><a href={linkedInProfile.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">LinkedIn</a></div>) : null}
                {githubProfile ? (<div><a href={githubProfile.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">GitHub</a></div>) : null}
              </div>
            </div>
          </section>
        </aside>

        {/* Main column */}
        <main>
          {/* Compact contact header for print / small screens */}
          <header className="card bg-white dark:bg-gray-900 rounded-lg p-3.5 border border-gray-200 dark:border-gray-800 shadow-sm hidden print:block break-inside-avoid -mt-3">
            <div className="flex justify-between">
              <div>
                <h1 className="m-0 text-lg font-bold">{basics.name}</h1>
                <div className="text-gray-500 dark:text-gray-400 text-sm">{basics.label}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">{basics.email} {basics.phone ? `• ${basics.phone}` : ''}</div>
              </div>
              {config.author?.avatar ? (
                <div>
                  <img 
                    src={config.author.avatar} 
                    alt={config.author.name || 'avatar'} 
                    className="w-16 h-16 rounded-lg object-cover"
                    width={64}
                    height={64}
                  />
                </div>
              ) : null}
            </div>
          </header>

          {/* Experience */}
          <section className="card bg-white dark:bg-gray-900 rounded-lg p-3.5 border border-gray-200 dark:border-gray-800 shadow-sm mt-0 md:mt-0">
            <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-1">Professional Experience</h2>
            <div>
              {workExperience.map(job => (
                <article key={`${job.name}-${job.position}`} className="py-2.5 border-b border-dashed border-gray-200 dark:border-gray-800 last:border-0 last:pb-0 break-inside-avoid">
                  <div className="job-head flex justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-base">{job.position}</h3>
                      <div className="text-gray-500 dark:text-gray-400 text-sm">{job.name} {job.location ? `• ${job.location}` : ''}</div>
                    </div>
                    <div className="job-dates text-right min-w-[120px] text-gray-500 dark:text-gray-400 text-sm">
                      <div>{formatDate(job.startDate)} — {formatDate(job.endDate)}</div>
                      <div className="text-xs">{job.duration}</div>
                    </div>
                  </div>

                  <div className="job-summary mt-2 text-gray-500 dark:text-gray-400 text-sm">
                    {job.summary?.split("\n").map((line, index) => (
                      <Fragment key={index}>
                        {line}
                        <br />
                      </Fragment>
                    ))}
                  </div>

                  {job.highlights && job.highlights.length ? (
                    <ul className="job-highlights mt-2 pl-4 text-gray-700 dark:text-gray-300 text-sm list-disc">
                      {job.highlights.map((h, idx) => (<li key={idx} className="mb-1.5">{h}</li>))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          {/* Educations */}
          <section className="card bg-white dark:bg-gray-900 rounded-lg p-3.5 border border-gray-200 dark:border-gray-800 shadow-sm mt-3 hidden print:block break-inside-avoid">
            <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-1">Education</h2>
            <div>
              {educationData.map(e => (
                <div key={e.institution} className="edu-row">
                  <h3 className="m-0 text-sm">
                    {e.institution} 
                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">• {e.formattedDate}</span> 
                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">• {e.area}</span>
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          {projectData.length ? (
            <section className="card bg-white dark:bg-gray-900 rounded-lg p-3.5 border border-gray-200 dark:border-gray-800 shadow-sm mt-3 break-inside-avoid">
              <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-1">Projects</h2>
              <div>
                {projectData.map(p => (
                  <div key={p.name} className="project-row mb-2.5">
                    <h3 className="m-0 text-sm">
                      {p.name} 
                      <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">• {p.formattedDate}</span>
                    </h3>
                    {p.summary ? (<div className="text-gray-500 dark:text-gray-400 text-sm mt-1">{p.summary}</div>) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Volunteer */}
          {volunteerData.length ? (
            <section className="card bg-white dark:bg-gray-900 rounded-lg p-3.5 border border-gray-200 dark:border-gray-800 shadow-sm mt-3 break-inside-avoid">
              <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-1">Volunteer</h2>
              <div>
                {volunteerData.map(v => (
                  <div key={v.organization} className="vol-row mb-2.5">
                    <h3 className="m-0 text-sm">
                      {v.position || v.organization} 
                      <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">• {v.formattedDate}</span>
                    </h3>
                    {v.summary ? (<div className="text-gray-500 dark:text-gray-400 text-sm mt-1">{v.summary}</div>) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>

      <div className="controls flex gap-2.5 justify-center mt-3.5 print:hidden">
        <button 
          className="bg-purple-600 text-white px-3 py-2 rounded-md border-0 cursor-pointer font-semibold hover:bg-purple-700 transition-colors"
          onClick={handlePrint}
        >
          Print / Save PDF
        </button>
        <button
          className="bg-transparent text-purple-600 px-3 py-2 rounded-md border border-purple-100 dark:border-purple-900/30 cursor-pointer font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
          onClick={handleDownload}
        >
          Download JSON
        </button>
      </div>
    </div>
  );
};

export default ResumeMinimal;