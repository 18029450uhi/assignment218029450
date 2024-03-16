export function calculatePercentage(value, total) {
  if (typeof value !== "number" || typeof total !== "number" || total === 0) {
    return "Invalid input. Please provide valid numeric values and ensure the total is not zero.";
  }

  const percentage = (value / total) * 100;
  return percentage.toFixed(2) + "%";
}
