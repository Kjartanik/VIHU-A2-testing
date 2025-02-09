import moment from "moment";
import { DATE_UNIT_TYPES } from "./constants";

export function getCurrentYear() {
  return moment().year();
}

export function add(date, number, type = DATE_UNIT_TYPES.DAYS) {
  return moment(date).add(number, type).toDate();
}

export function isWithinRange(date, from, to) {
  return moment(date).isBetween(from, to);
}

export function isDateBefore(date, compareDate) {
  return moment(date).isBefore(compareDate);
}

export function isSameDay(date, compareDate) {
  return moment(date).isSame(compareDate);
}
