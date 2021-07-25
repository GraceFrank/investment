export function getApprovalText({
  amountPaid,
  itemPrice,
  startDate,
  endDate,
  duration,
  asset,
  vendor,
}) {
  return `Thank you for choosing abudanza!! Your payment of ${amountPaid} Naira to  Abudanza for Asset Finance plan to get ${asset} from ${vendor} has been confirmed.  at the end of ${duration} days with
    start date from ${startDate} to ${endDate} with total
    Item cost of ${itemPrice} Naira has been approved.\n
    Kindly find attached your certificate of funding.`;
}

export function getDeclineText({
  amountPaid,
  itemPrice,
  asset,
  vendor,
  reason,
}) {
  return `Thank you for choosing abudanza. Your payment of ${amountPaid} Naira to  Abudanza for Asset Finance plan to get ${asset} from ${vendor} has been Declined. with with total
      Item cost of ${itemPrice} Naira has been Declined. Decline Reason: ${reason}`;
}
