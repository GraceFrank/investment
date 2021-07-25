export const INTEREST_RATES = {
  90: 15,
  180: 30,
  365: 45,
};
export function calculateAmountDue(duration, principal) {
  return (
    Number(principal)
    + Number(INTEREST_RATES[duration] / 100) * Number(principal)
  );
}

export function getDueDate(activationDate, duration) {
  const date = new Date(activationDate);
  date.setDate(date.getDate() + duration);
  return date;
}
