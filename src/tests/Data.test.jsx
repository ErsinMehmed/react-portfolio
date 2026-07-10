import {
  socialLinks,
  techSkills,
  certifications,
  experiences,
  educations,
} from "../Data";
import { translations } from "../i18n/translations";

// Every string a component feeds into t() must resolve to a real entry that
// carries BOTH languages. A missing entry silently renders the raw key on the
// page (e.g. "skillDesc.html"), which is the "dead data" class of bug we care
// about, so assert resolution instead of trusting it.
const resolvesInBothLanguages = (key) => {
  const entry = translations[key];
  return (
    !!entry &&
    typeof entry.en === "string" &&
    entry.en.length > 0 &&
    typeof entry.bg === "string" &&
    entry.bg.length > 0
  );
};

const PERIOD = /^\d{2}\.\d{4} - (\d{2}\.\d{4}|Present)$/;

describe("techSkills", () => {
  const KINDS = ["Frontend", "Backend", "Database", "AI", "Other"];

  test("every skill has a known category, positive metrics and a resolvable description", () => {
    techSkills.forEach((skill) => {
      expect(KINDS).toContain(skill.kind);
      expect(Number.isInteger(skill.years)).toBe(true);
      expect(skill.years).toBeGreaterThan(0);
      expect(Number.isInteger(skill.projects)).toBe(true);
      expect(skill.projects).toBeGreaterThan(0);
      expect(resolvesInBothLanguages(skill.description)).toBe(true);
    });
  });

  test("every bullet in a skill's items list resolves in both languages", () => {
    techSkills
      .filter((skill) => skill.items)
      .forEach((skill) =>
        skill.items.forEach((item) =>
          expect(resolvesInBothLanguages(item)).toBe(true)
        )
      );
  });

  test("skill titles are unique", () => {
    const titles = techSkills.map((s) => s.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

describe("certifications", () => {
  const CATEGORIES = [
    "Award",
    "Certificate",
    "Course",
    "Scientific publication",
    "Sport achievements",
  ];

  test("every entry falls into a known category so it can't be dropped from the page", () => {
    certifications.forEach((cert) => {
      const kind = cert.kind || cert.kindEn || "Certificate";
      expect(CATEGORIES).toContain(kind);
    });
  });

  test("every description resolves in both languages", () => {
    certifications.forEach((cert) =>
      expect(resolvesInBothLanguages(cert.description)).toBe(true)
    );
  });

  test("every present link is a secure, absolute URL", () => {
    certifications
      .filter((cert) => cert.link)
      .forEach((cert) => expect(cert.link).toMatch(/^https:\/\//));
  });
});

describe("socialLinks", () => {
  test("each link is a secure URL with a label and an icon", () => {
    expect(socialLinks.length).toBeGreaterThan(0);
    socialLinks.forEach((link) => {
      expect(link.href).toMatch(/^https:\/\//);
      expect(typeof link.label).toBe("string");
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.icon).toBeTruthy();
    });
  });

  test("labels are unique (no duplicate accounts)", () => {
    const labels = socialLinks.map((l) => l.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});

describe("timeline periods", () => {
  test("every experience and education period matches MM.YYYY - MM.YYYY|Present", () => {
    [...experiences, ...educations].forEach((item) =>
      expect(item.period).toMatch(PERIOD)
    );
  });
});
