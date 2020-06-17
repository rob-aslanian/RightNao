const MONTHS: Array<any> = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" }
];

let Years = (function() {
  let currentYear = new Date().getFullYear(),
    years: Array<number> = [];

  for (let i = currentYear; i >= 1960; i--) {
    years.push(i);
  }

  return years;
})();

let Days = (function() {
  let days: Array<number> = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
})();

let ExperienceYears = (function() {
  let currentYear = new Date().getFullYear() + 30,
    years: Array<number> = [];

  for (let i = currentYear; i >= 1960; i--) {
    years.push(i);
  }

  return years;
})();

export { MONTHS, Years, Days, ExperienceYears  };
