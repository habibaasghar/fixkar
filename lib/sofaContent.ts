import type { SofaIntent } from "./sofaCluster";
import { coreIntent } from "./sofaContentCore";
import { leatherIntent, upholsteryIntent } from "./sofaContentSpecialty";
import { officeIntent, restaurantIntent, hotelIntent } from "./sofaContentCommercial";

export const sofaIntents: SofaIntent[] = [
  coreIntent,
  leatherIntent,
  upholsteryIntent,
  officeIntent,
  restaurantIntent,
  hotelIntent,
];

export function getSofaIntent(slug: string): SofaIntent | undefined {
  return sofaIntents.find((i) => i.slug === slug);
}
