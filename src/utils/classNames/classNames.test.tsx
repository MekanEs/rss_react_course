import { describe, expect, it } from 'vitest';
import { classNames } from '..';

describe('classNames works right', () => {
  it('works', () => {
    expect(classNames('class', { cond: true }, ['additional'])).toBe(
      'class additional cond'
    );
  });
  it('conditional not returned', () => {
    expect(classNames('class', { cond: false }, ['additional'])).toBe(
      'class additional'
    );
  });
});
