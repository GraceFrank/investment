export function getInvestmentApprovalText({
  amountPaid,
  amountDue,
  startDate,
  endDate,
  duration,
}) {
  return `Thank you for choosing abudanza!! Your payment of ${amountPaid} Naira to investment  plan to get ${amountDue} at the end of ${duration} days  has been confirmed.
      start date from ${startDate} to ${endDate} with total
      Item cost of ${amountDue} Naira has been approved.\n
      Kindly find attached your certificate of funding.`;
}

export function getInvestmentDeclineText({ amountPaid, amountDue, reason }) {
  return `Thank you for choosing abudanza. Your payment of ${amountPaid} Naira to  to investment  plan to get ${amountDue}  has been Declined. with with total
        Item cost of ${amountDue} Naira has been Declined. Decline Reason: ${reason}`;
}
