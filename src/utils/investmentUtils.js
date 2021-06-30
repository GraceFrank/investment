const INTEREST_RATES = {
  90: 15 / 100,
  180: 30 / 100,
  365: 45 / 100,
};
export function calculateAmountDue(duration, principal) {
  return (
    Number(principal) + Number(INTEREST_RATES[duration]) * Number(principal)
  );
}

export function getDueDate(activationDate, duration) {
  const date = new Date(activationDate);
  date.setDate(date.getDate() + duration);
  return date;
}
