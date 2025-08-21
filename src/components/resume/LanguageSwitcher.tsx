
import { languages } from '../../i18n/ui';

type Props = {
  onLanguageChange: (language: string) => void;
}

export default function LanguageSwitcher({ onLanguageChange }: Props) {

  return (
    <>
      <label htmlFor="language">Resume language:</label>
      <select id="language" onChange={(e) => onLanguageChange(e.target.value)}>
        {Object.entries(languages).map(([lang, label]) => (
          <option key={lang} value={lang}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
