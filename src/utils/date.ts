import { format } from "date-fns";

export const toDateString = (date: string | Date): string => {
  return format(new Date(date), "yyyy-MM-dd");
};
