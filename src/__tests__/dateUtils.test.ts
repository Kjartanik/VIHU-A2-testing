import { describe, it, expect } from "vitest";
import {
  getCurrentYear,
  add,
  isWithinRange,
  isDateBefore,
  isSameDay,
} from "../dateUtils";
import { DATE_UNIT_TYPES } from "../constants";

describe("Date Utils", () => {
  describe("getCurrentYear", () => {
    it("should return the current year", () => {
      const currentYear = new Date().getFullYear();
      expect(getCurrentYear()).toEqual(currentYear);
    });
  });

  describe("add", () => {
    it("should add seconds correctly", () => {
      const initialDate = new Date("2000-01-01T00:00:00Z");
      const updatedDate = add(initialDate, 10, DATE_UNIT_TYPES.SECONDS);
      expect(updatedDate.toISOString()).toEqual("2000-01-01T00:00:10.000Z");
    });

    it("should add minutes correctly", () => {
      const initialDate = new Date("2000-01-01T00:00:00Z");
      const updatedDate = add(initialDate, 11, DATE_UNIT_TYPES.MINUTES);
      expect(updatedDate.toISOString()).toEqual("2000-01-01T00:11:00.000Z");
    });

    it("should add days correctly", () => {
      const initialDate = new Date("2000-01-01T00:00:00Z");
      const updatedDate = add(initialDate, 12, DATE_UNIT_TYPES.DAYS);
      expect(updatedDate.toISOString()).toEqual("2000-01-13T00:00:00.000Z");
    });

    it("should add months correctly", () => {
      const initialDate = new Date("2000-01-01T00:00:00Z");
      const updatedDate = add(initialDate, 1, DATE_UNIT_TYPES.MONTHS);
      expect(updatedDate.toISOString()).toEqual("2000-02-01T00:00:00.000Z");
    });

    it("should add years correctly", () => {
      const initialDate = new Date("2000-01-01T00:00:00Z");
      const updatedDate = add(initialDate, 1, DATE_UNIT_TYPES.YEARS);
      expect(updatedDate.toISOString()).toEqual("2001-01-01T00:00:00.000Z");
    });

    it("should add days by default", () => {
      const initialDate = new Date("2000-01-01T00:00:00Z");
      const updatedDate = add(initialDate, 12);
      expect(updatedDate.toISOString()).toEqual("2000-01-13T00:00:00.000Z");
    });

    it("should work with negative numbers", () => {
      const initialDate = new Date("2000-01-13T00:00:00Z");
      const updatedDate = add(initialDate, -12, DATE_UNIT_TYPES.DAYS);
      expect(updatedDate.toISOString()).toEqual("2000-01-01T00:00:00.000Z");
    });
  });

  describe("isWithinRange", () => {
    it("should return true when the date is between 'from' and 'to'", () => {
      const date = new Date("2000-01-10T00:00:00Z");
      const from = new Date("2000-01-05T00:00:00Z");
      const to = new Date("2000-01-15T00:00:00Z");
      expect(isWithinRange(date, from, to)).toBe(true);
    });

    it("should return false when the date is equal to 'from'", () => {
      const date = new Date("2000-01-05T00:00:00Z");
      const from = new Date("2000-01-05T00:00:00Z");
      const to = new Date("2000-01-15T00:00:00Z");
      expect(isWithinRange(date, from, to)).toBe(false);
    });

    it("should return false when the date is equal to 'to'", () => {
      const date = new Date("2000-01-15T00:00:00Z");
      const from = new Date("2000-01-05T00:00:00Z");
      const to = new Date("2000-01-15T00:00:00Z");
      expect(isWithinRange(date, from, to)).toBe(false);
    });

    it("should return false when the date is outside the range", () => {
      const date = new Date("2000-01-20T00:00:00Z");
      const from = new Date("2000-01-05T00:00:00Z");
      const to = new Date("2000-01-15T00:00:00Z");
      expect(isWithinRange(date, from, to)).toBe(false);
    });
  });

  describe("isDateBefore", () => {
    it("should return true if date is before compareDate", () => {
      const date = new Date("2000-01-01T00:00:00Z");
      const compareDate = new Date("2000-01-02T00:00:00Z");
      expect(isDateBefore(date, compareDate)).toBe(true);
    });

    it("should return false if date is equal to compareDate", () => {
      const date = new Date("2000-01-01T00:00:00Z");
      const compareDate = new Date("2000-01-01T00:00:00Z");
      expect(isDateBefore(date, compareDate)).toBe(false);
    });

    it("should return false if date is after compareDate", () => {
      const date = new Date("2000-01-03T00:00:00Z");
      const compareDate = new Date("2000-01-02T00:00:00Z");
      expect(isDateBefore(date, compareDate)).toBe(false);
    });
  });

  describe("isSameDay", () => {
    it("should return true if the dates are exactly the same", () => {
      const date = new Date("2000-01-01T00:00:00Z");
      const compareDate = new Date("2000-01-01T00:00:00Z");
      expect(isSameDay(date, compareDate)).toBe(true);
    });

    it("should return false if the dates are on different days", () => {
      const date = new Date("2000-01-01T23:59:59Z");
      const compareDate = new Date("2000-01-02T00:00:00Z");
      expect(isSameDay(date, compareDate)).toBe(false);
    });

    it("should return false if the dates are on the same calendar day but different times", () => {
      const date = new Date("2000-01-01T01:00:00Z");
      const compareDate = new Date("2000-01-01T23:00:00Z");
      expect(isSameDay(date, compareDate)).toBe(false);
    });
  });
});
