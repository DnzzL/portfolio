import { languages } from '../../i18n/ui';

type Props = {
  onLanguageChange: (language: string) => void;
};

export default function LanguageSwitcher({ onLanguageChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="language" className="text-xs tracking-[0.1em] text-[#4a5568] uppercase">
        Language
      </label>
      <select
        id="language"
        onChange={(e) => onLanguageChange(e.target.value)}
        className="cursor-pointer border border-[rgba(255,255,255,0.1)] bg-[#252540] px-3 py-2 text-sm text-[#f7f7f5] focus:border-[#d69e2e] focus:outline-none"
      >
        {Object.entries(languages).map(([lang, label]) => (
          <option key={lang} value={lang} className="bg-[#252540]">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
