import {
  SKELETON_SKILL_COUNT,
  SKELETON_PROJECT_COUNTS,
} from "../components/Loading";
import { techSkills, projects } from "../Data";

// The loading skeleton hardcodes its item counts on purpose: it lives in the
// entry chunk and must not import Data.ts onto the critical path. These tests
// keep those constants honest, so the skeleton always matches the real grid it
// stands in for. If a count drifts, update the constant in Loading.tsx.

test("skill skeleton count matches the number of tech skills", () => {
  expect(SKELETON_SKILL_COUNT).toBe(techSkills.length);
});

test("project skeleton counts match professional + personal projects", () => {
  expect(SKELETON_PROJECT_COUNTS.professional).toBe(
    projects.professional.length
  );
  expect(SKELETON_PROJECT_COUNTS.personal).toBe(projects.personal.length);
});
