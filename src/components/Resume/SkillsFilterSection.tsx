import { useState } from "react";
import SkillBox from "./SkillBox";
import Chip from "../ui/Chip";
import { techSkills } from "../../Data";
import { useLanguage } from "../../i18n/LanguageContext";
import type { TranslationKey } from "../../i18n/translations";
import type { SkillKind } from "../../types";

type FilterKind = SkillKind | "All";

interface FilterCategory {
  kind: FilterKind;
  labelKey: TranslationKey;
}

const filterCategories: FilterCategory[] = [
  { kind: "All", labelKey: "filter.all" },
  { kind: "Frontend", labelKey: "filter.frontend" },
  { kind: "Backend", labelKey: "filter.backend" },
  { kind: "Database", labelKey: "filter.database" },
  { kind: "AI", labelKey: "filter.ai" },
  { kind: "Other", labelKey: "filter.other" },
];

// Category display order when "All" is selected, so skills group by
// Frontend -> Backend -> Database -> AI -> Other rather than mixing.
const kindOrder: SkillKind[] = ["Frontend", "Backend", "Database", "AI", "Other"];
const kindRank = (kind: SkillKind): number => {
  const i = kindOrder.indexOf(kind);
  return i === -1 ? kindOrder.length : i;
};

const SkillsFilterSection = () => {
  const { t } = useLanguage();
  const [selectedKind, setSelectedKind] = useState<FilterKind>("All");

  const filteredSkills = (
    selectedKind !== "All"
      ? techSkills.filter((item) => item.kind === selectedKind)
      : techSkills
  )
    .slice()
    .sort(
      (a, b) =>
        kindRank(a.kind) - kindRank(b.kind) ||
        b.years - a.years ||
        b.projects - a.projects
    );

  return (
    <div className='mt-14'>
      <h3 className='font-display text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-2xl'>
        {t("resume.professionalSkills")}
      </h3>

      <p className='mt-1.5 max-w-[60ch] text-sm text-slate-500 dark:text-slate-400'>
        {t("resume.hoverHint")}
      </p>

      <div className='mt-5 flex flex-wrap gap-2'>
        {filterCategories.map((category, index) => (
          <Chip
            key={index}
            size='sm'
            tone={selectedKind === category.kind ? "solid" : "muted"}
            onClick={() => setSelectedKind(category.kind)}
            aria-pressed={selectedKind === category.kind}>
            {t(category.labelKey)}
          </Chip>
        ))}
      </div>

      <div className='mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3'>
        {filteredSkills.map((item, index) => (
          <SkillBox
            key={item.title}
            item={item}
            index={index}
            total={filteredSkills.length}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsFilterSection;
