import { describe, it, expect } from 'vitest';
import { createSlug } from '../store/selectors/places';

describe('createSlug', () => {
  it('should create slug from simple name', () => {
    const placeName = 'Paris';
    const expectedSlug = 'paris';
    const result = createSlug(placeName);
    expect(result).toBe(expectedSlug);
  });

  it('should create slug from name with accents', () => {
    const placeName = 'Montréal';
    const expectedSlug = 'montreal';
    const result = createSlug(placeName);
    expect(result).toBe(expectedSlug);
  });

  it('should create slug from name with special characters', () => {
    const placeName = 'New York!';
    const expectedSlug = 'new-york';
    const result = createSlug(placeName);
    expect(result).toBe(expectedSlug);
  });

  it('should create slug from name with spaces', () => {
    const placeName = 'San Francisco Bay';
    const expectedSlug = 'san-francisco-bay';
    const result = createSlug(placeName);
    expect(result).toBe(expectedSlug);
  });

  it('should create slug from name with mixed characters', () => {
    const placeName = "L'Hôtel";
    const expectedSlug = 'lhotel';
    const result = createSlug(placeName);
    expect(result).toBe(expectedSlug);
  });

  it('should create slug from empty name', () => {
    const placeName = '';
    const expectedSlug = '';
    const result = createSlug(placeName);
    expect(result).toBe(expectedSlug);
  });
});

// const placeTest1: Places = {
//   id: 1,
//   name: 'Toulouse',
//   gps_location_latitude: '23',
//   gps_location_longitude: '24',
//   user_id: 1,
//   journey: ['à gauche', 'à droite'],
//   slug: 'toulouse',
//   description: 'La description de Toulouse',
//   picture: [],
// };

// const placeTest2: Places = {
//   id: 2,
//   name: 'Nantes',
//   gps_location_latitude: '23',
//   gps_location_longitude: '24',
//   user_id: 2,
//   journey: ['à gauche', 'à droite'],
//   slug: 'nantes',
//   description: 'La description de Nantes',
//   picture: [],
// };
