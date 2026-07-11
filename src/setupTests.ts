// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// jsdom has no IntersectionObserver, but framer-motion's `whileInView`
// (InViewAnimation, SkillBox) and react-intersection-observer's `useInView`
// (InViewAnimation, NumberTicker) both require one to even mount — without
// this they throw "IntersectionObserver is not defined" during render, not
// just skip the animation. A no-op stub is enough since tests don't assert
// on scroll-triggered reveal state, only on the content those components wrap.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
