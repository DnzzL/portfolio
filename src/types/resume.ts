export interface ResumeData {
  basics: {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: {
      address: string;
      countryCode: string;
    };
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  work: Array<{
    name: string;
    position: string;
    startDate: string;
    endDate: string;
    summary: string;
    location: string;
    url: string;
  }>;
  education: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    name: string;
    level: string;
    keywords: string[];
  }>;
  projects: Array<{
    name: string;
    summary: string;
    url: string | null;
    startDate: string;
    endDate: string;
  }>;
  languages: Array<{
    language: string;
    fluency: string;
  }>;
}