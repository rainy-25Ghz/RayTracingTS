export function clamp(val: number, min: number, max: number) {
  if (val <= max && val >= min) return val;
  if (val > max) return max;
  return min;
}
