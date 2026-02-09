import { useEffect, useState, useMemo } from 'react';

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

  const formatDate = (dateString) => {
    if (!dateString) return chosenLanguage === 'fr' ? 'Présent' : 'Present';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(chosenLanguage, { month: 'short', year: 'numeric' }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate) return '';
    const s = new Date(startDate);
    const e = endDate ? new Date(endDate) : new Date();
    let totalMonths = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
    if (e.getDate() < s.getDate()) totalMonths -= 1;
    if (totalMonths < 0) totalMonths = 0;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (years === 0 && months === 0) return '';
    let result = '';
    if (years > 0) result += `${years}y`;
    if (months > 0) result += `${months}m`;
    return result ? `(${result})` : '';
  };

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

  const { basics, work, education, skills, projects } = useMemo(() => {
    const data = resumeData || {};
    return {
      basics: data.basics || {},
      work: data.work || [],
      education: data.education || [],
      skills: data.skills || [],
      projects: data.projects || [],
    };
  }, [resumeData]);

  const normalizedSkills = useMemo(() => normalizeSkills(skills), [skills]);

  // Only top 4 most recent jobs for print
  const workExperience = useMemo(() => {
    const sorted = (Array.isArray(work) ? work.slice() : []).sort(
      (a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0)
    );
    return sorted.slice(0, 4).map((job) => ({
      ...job,
      duration: calculateDuration(job.startDate, job.endDate),
    }));
  }, [work]);

  const educationData = useMemo(() => {
    return (Array.isArray(education) ? education.slice(0, 2) : []).map((edu) => ({
      ...edu,
      formattedDate: `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`,
    }));
  }, [education]);

  const linkedInProfile = useMemo(
    () => (basics.profiles ? basics.profiles.find((p) => /linkedin/i.test((p.network || '') + (p.url || ''))) : null),
    [basics.profiles]
  );
  const githubProfile = useMemo(
    () => (basics.profiles ? basics.profiles.find((p) => /github/i.test((p.network || '') + (p.url || ''))) : null),
    [basics.profiles]
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const data = JSON.stringify(resumeData, null, 2);
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
    <>
      {/* Print Styles - Force backgrounds and colors */}
      <style>{`
        @media print {
          @page {
            margin: 0;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .resume-print {
            background: white !important;
            color: #1a1a2e !important;
            padding: 40px 50px !important;
            min-height: 100vh;
            box-sizing: border-box;
          }
          .resume-print * {
            color: #1a1a2e !important;
          }
          .resume-print .print-header {
            border-bottom: 2px solid #d69e2e !important;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .resume-print .print-name {
            font-size: 28px !important;
            font-weight: 600 !important;
            margin-bottom: 4px;
          }
          .resume-print .print-title {
            font-size: 14px !important;
            color: #4a5568 !important;
            margin-bottom: 8px;
          }
          .resume-print .print-contact {
            font-size: 11px !important;
            color: #718096 !important;
          }
          .resume-print .print-section-title {
            font-size: 11px !important;
            font-weight: 600 !important;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 8px;
            margin-top: 18px;
            color: #d69e2e !important;
          }
          .resume-print .print-job {
            margin-bottom: 12px;
          }
          .resume-print .print-job-title {
            font-size: 13px !important;
            font-weight: 600 !important;
            margin-bottom: 2px;
          }
          .resume-print .print-job-company {
            font-size: 11px !important;
            color: #4a5568 !important;
            margin-bottom: 2px;
          }
          .resume-print .print-job-date {
            font-size: 10px !important;
            color: #718096 !important;
            margin-bottom: 4px;
          }
          .resume-print .print-job-summary {
            font-size: 10px !important;
            line-height: 1.4 !important;
            color: #4a5568 !important;
          }
          .resume-print .print-skill {
            display: inline-block;
            font-size: 10px !important;
            margin-right: 12px;
            margin-bottom: 4px;
          }
          .resume-print .print-edu {
            font-size: 11px !important;
            margin-bottom: 4px;
          }
          .resume-print .print-edu-school {
            font-weight: 600 !important;
          }
          .resume-print .print-two-col {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 30px;
          }
        }
      `}</style>

      <div className="container mx-auto">
        {/* Header with language switcher */}
        <div className="mb-8 flex items-center justify-between print:hidden">
          <div>
            <span className="mb-2 block text-xs tracking-[0.2em] text-[#4a5568] uppercase">~/resume</span>
            <h1 className="text-3xl font-medium text-[#f7f7f5]">{basics.name}</h1>
            <p className="mt-1 text-[#718096]">{basics.label}</p>
          </div>
          <LanguageSwitcher onLanguageChange={(language) => setChosenLanguage(language)} />
        </div>

        {resumeData && (
          <>
            {/* Screen Layout */}
            <div className="grid gap-6 md:grid-cols-[280px_1fr] md:gap-8 print:hidden" role="main">
              {/* Sidebar */}
              <aside>
                <div className="mb-6 border border-[rgba(255,255,255,0.06)] bg-[#252540] p-6">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-medium text-[#f7f7f5]">{basics.name}</h2>
                      <p className="text-sm text-[#718096]">{basics.label}</p>
                    </div>
                    {config.author?.avatar ? (
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden border border-[rgba(255,255,255,0.1)]">
                        <img
                          src={config.author.avatar}
                          alt={config.author.name || 'avatar'}
                          className="h-full w-full object-cover"
                          width={64}
                          height={64}
                        />
                      </div>
                    ) : null}
                  </div>
                  <p className="text-sm text-[#718096]">{basics.summary}</p>
                </div>

                {/* Skills */}
                <div className="mb-6 border border-[rgba(255,255,255,0.06)] bg-[#252540] p-6">
                  <h2 className="mb-4 text-xs font-bold tracking-wider text-[#4a5568] uppercase">
                    {chosenLanguage === 'fr' ? 'Compétences' : 'Skills'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {normalizedSkills.slice(0, 12).map((s) => (
                      <span
                        key={s.name}
                        className="inline-block border border-[rgba(214,158,46,0.3)] bg-[rgba(214,158,46,0.1)] px-3 py-1.5 text-xs text-[#d69e2e]"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-6 border border-[rgba(255,255,255,0.06)] bg-[#252540] p-6">
                  <h2 className="mb-4 text-xs font-bold tracking-wider text-[#4a5568] uppercase">
                    {chosenLanguage === 'fr' ? 'Formations' : 'Education'}
                  </h2>
                  <div className="space-y-4">
                    {educationData.map((edu) => (
                      <div key={edu.institution}>
                        <h3 className="text-sm font-medium text-[#f7f7f5]">{edu.institution}</h3>
                        <div className="text-xs text-[#718096]">{edu.area}</div>
                        <div className="mt-1 text-xs text-[#4a5568]">{edu.formattedDate}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="border border-[rgba(255,255,255,0.06)] bg-[#252540] p-6">
                  <h2 className="mb-4 text-xs font-bold tracking-wider text-[#4a5568] uppercase">
                    {chosenLanguage === 'fr' ? 'Contact' : 'Contact'}
                  </h2>
                  <div className="space-y-1 text-sm text-[#718096]">
                    {basics.email ? <div>{basics.email}</div> : null}
                    {basics.location ? (
                      <div>
                        {basics.location.city}
                        {basics.location.region ? `, ${basics.location.region}` : ''}
                      </div>
                    ) : null}
                    <div className="mt-3 space-y-1">
                      {linkedInProfile ? (
                        <div>
                          <a
                            href={linkedInProfile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#d69e2e] transition-colors hover:text-[#ecc94b]"
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
                            className="text-[#d69e2e] transition-colors hover:text-[#ecc94b]"
                          >
                            GitHub
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main column */}
              <main>
                {/* Experience */}
                <section className="border border-[rgba(255,255,255,0.06)] bg-[#1a1a2e] p-6">
                  <h2 className="mb-6 text-xs font-bold tracking-wider text-[#4a5568] uppercase">
                    {chosenLanguage === 'fr' ? 'Expériences' : 'Experience'}
                  </h2>
                  <div className="space-y-6">
                    {workExperience.map((job) => (
                      <article
                        key={`${job.name}-${job.position}-${job.startDate}`}
                        className="border-b border-[rgba(255,255,255,0.06)] pb-6 last:border-0 last:pb-0"
                      >
                        <div className="mb-2 flex justify-between gap-4">
                          <div>
                            <h3 className="text-base font-medium text-[#f7f7f5]">{job.position}</h3>
                            <div className="text-sm text-[#718096]">
                              {job.name} {job.location ? `• ${job.location}` : ''}
                            </div>
                          </div>
                          <div className="text-right text-sm text-[#718096]">
                            <div>
                              {formatDate(job.startDate)} — {formatDate(job.endDate)}
                            </div>
                            <div className="text-xs text-[#4a5568]">{job.duration}</div>
                          </div>
                        </div>
                        <div className="text-sm leading-relaxed whitespace-pre-line text-[#718096]">{job.summary}</div>
                      </article>
                    ))}
                  </div>
                </section>
              </main>
            </div>

            {/* PRINT LAYOUT - Single Page Minimalist */}
            <div className="resume-print hidden print:block">
              {/* Header */}
              <header className="print-header">
                <h1 className="print-name">{basics.name}</h1>
                <div className="print-title">{basics.label}</div>
                <div className="print-contact">
                  {basics.email} • {basics.location?.city}
                  {basics.location?.region ? `, ${basics.location.region}` : ''}
                  {linkedInProfile ? ` • linkedin.com/in/${linkedInProfile.username || 'thomas-d-legrand'}` : ''}
                  {githubProfile ? ` • github.com/${githubProfile.username || 'dnzzl'}` : ''}
                </div>
              </header>

              <div className="print-two-col">
                <div>
                  {/* Experience */}
                  <section>
                    <h2 className="print-section-title">{chosenLanguage === 'fr' ? 'Expérience' : 'Experience'}</h2>
                    {workExperience.map((job) => (
                      <div key={`${job.name}-${job.position}`} className="print-job">
                        <div className="print-job-title">{job.position}</div>
                        <div className="print-job-company">
                          {job.name} {job.location ? `• ${job.location.split(',')[0]}` : ''}
                        </div>
                        <div className="print-job-date">
                          {formatDate(job.startDate)} — {formatDate(job.endDate)} {job.duration}
                        </div>
                        <div className="print-job-summary">
                          {job.summary?.substring(0, 120)}
                          {job.summary?.length > 120 ? '...' : ''}
                        </div>
                      </div>
                    ))}
                  </section>

                  {/* Education */}
                  <section>
                    <h2 className="print-section-title">{chosenLanguage === 'fr' ? 'Formation' : 'Education'}</h2>
                    {educationData.map((edu) => (
                      <div key={edu.institution} className="print-edu">
                        <span className="print-edu-school">{edu.institution}</span>
                        <span style={{ marginLeft: '8px', color: '#718096' }}>• {edu.formattedDate}</span>
                      </div>
                    ))}
                  </section>
                </div>

                <div>
                  {/* Skills */}
                  <section>
                    <h2 className="print-section-title">{chosenLanguage === 'fr' ? 'Compétences' : 'Skills'}</h2>
                    <div>
                      {normalizedSkills.slice(0, 20).map((s) => (
                        <div key={s.name} className="print-skill">
                          {s.name}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Summary */}
                  <section>
                    <h2 className="print-section-title">{chosenLanguage === 'fr' ? 'Profil' : 'Profile'}</h2>
                    <div style={{ fontSize: '10px', lineHeight: '1.4', color: '#4a5568' }}>{basics.summary}</div>
                  </section>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Action buttons */}
        <div className="mt-12 flex justify-center gap-4 print:hidden">
          <button
            className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.1)] px-6 py-3 text-sm tracking-[0.15em] text-[#f7f7f5] uppercase transition-colors duration-200 hover:border-[#d69e2e]"
            onClick={handlePrint}
          >
            <svg className="h-4 w-4 text-[#d69e2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            {chosenLanguage === 'fr' ? 'Imprimer / PDF' : 'Print / PDF'}
          </button>
          <button
            className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.1)] px-6 py-3 text-sm tracking-[0.15em] text-[#718096] uppercase transition-colors duration-200 hover:border-[#d69e2e] hover:text-[#f7f7f5]"
            onClick={handleDownload}
          >
            <svg className="h-4 w-4 text-[#d69e2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            JSON
          </button>
        </div>
      </div>
    </>
  );
};

export default ResumeMinimal;
