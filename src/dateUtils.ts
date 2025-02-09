import moment, { MomentInput } from "moment";
import { DATE_UNIT_TYPES } from "./constants";

export function getCurrentYear(): number{
  return moment().year();
}

export function add(date: MomentInput, number: number, type: DATE_UNIT_TYPES = DATE_UNIT_TYPES.DAYS): Date {
  return moment(date).add(number, type).toDate();
}

export function isWithinRange(date: MomentInput, from: MomentInput, to: MomentInput): boolean {
  return moment(date).isBetween(from, to);
}

export function isDateBefore(date: MomentInput, compareDate: MomentInput): boolean {
  return moment(date).isBefore(compareDate);
}

export function isSameDay(date: MomentInput, compareDate: MomentInput): boolean {
  return moment(date).isSame(compareDate);
}
