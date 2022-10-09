import { useCallback, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";

function LocaleSelect() {
  const { setLanguage, language } = useTranslate();

  const options = {
    lang: useMemo(
      () => [
        { value: "ru", title: "Русский" },
        { value: "en", title: "English" },
      ],
      []
    ),
  };

  const onSelect = useCallback(
    (e: any) => {
      setLanguage(e.target.value);
    },
    [setLanguage]
  );

  return (
    <select className="Select" onChange={onSelect} value={language}>
      {options.lang.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

export const Header = () => {
  const lang = useTranslate().lang();

  return (
    <header style={{ display: "flex", padding: 20, width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "inherit", textAlign: "center" }}>
        <div>
          {lang.header.brandName} - {BRAND_NAME}
        </div>
        <div>
          {lang.header.version} - {VERSION}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{lang.header.title}</div>
          <LocaleSelect />
        </div>
      </div>
    </header>
  );
};
