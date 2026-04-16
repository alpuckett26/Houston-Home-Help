export const brand = {
  name: "Houston Home Help",
  shortName: "HHH",
  tagline:
    "Companion visits, check-ins, errands, respite sitting, and household support for Houston families."
};

export const serviceTypes = [
  "Companion visits",
  "Check-in visits",
  "Respite sitting",
  "Light housekeeping",
  "Laundry help",
  "Simple meal prep",
  "Errands and shopping",
  "Transportation accompaniment",
  "Social engagement",
  "Family updates"
] as const;

export const requestStatuses = [
  "new",
  "contacted",
  "reviewing",
  "matched",
  "scheduled",
  "completed",
  "closed"
] as const;
