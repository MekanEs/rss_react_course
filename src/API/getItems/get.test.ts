import { describe, expect, it } from 'vitest';
import { getItems } from './getItems';
import { waitFor } from '@testing-library/react';
import getPerson from './getPerson';

describe('getItems', () => {
  it('test getItems', () => {
    waitFor(async () => {
      const response = await getItems('', 1, 1);
      expect(response.total).toBeTruthy();
      expect(response.items).toBeTruthy();
    });
  });
  it('test getPerson', () => {
    waitFor(async () => {
      const response = await getPerson('');
      expect(response).toBe(null);
    });
  });
});
