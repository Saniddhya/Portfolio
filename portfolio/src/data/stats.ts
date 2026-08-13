export interface Stat {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  hint: string;
}

/**
 * Animated hero stats. Tune the values to stay truthful — the counters
 * count up to `value` on scroll into view.
 */
export const stats: Stat[] = [
  {
    id: "projects",
    value: 8,
    suffix: "+",
    label: "Projects Delivered",
    hint: "From dashboards to full platforms",
  },
  {
    id: "years",
    value: 2,
    suffix: "+",
    label: "Years Experience",
    hint: "Across the entire stack",
  },
  {
    id: "satisfaction",
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    hint: "Built to ship, and to last",
  },
];
