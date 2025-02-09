import { getYear, add as dateFnsAdd, isWithinInterval, isBefore, isAfter, isEqual } from "date-fns";
import { DATE_UNIT_TYPES } from "./constants";

// Define a type alias similar to MomentInput for consistency
type DateInput = Date | string | number;

export function getCurrentYear(): number {
  const date = new Date();
  return getYear(date);
}

export function add(date: Date, number: number, type: DATE_UNIT_TYPES = DATE_UNIT_TYPES.DAYS): Date {
  const duration: { [key in DATE_UNIT_TYPES]?: number } = {};
  duration[type] = number;
  return dateFnsAdd(new Date(date), duration);
}

export function isWithinRange(date: Date, from: Date, to: Date): boolean {
  return isAfter(new Date(date), new Date(from)) && isBefore(new Date(date), new Date(to));
}

export function isDateBefore(date: Date, compareDate: Date): boolean {
  return isBefore(new Date(date), new Date(compareDate));
}

export function isSameDay(date: Date, compareDate: Date): boolean {
  return isEqual(new Date(date), new Date(compareDate));
}
