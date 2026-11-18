import { InvalidTransitionError, ValidationError } from "../core/errors.js";
import { DEFAULT_ORDER_TRANSITIONS, ORDER_STATES, type OrderState } from "./order-states.js";

export type OrderTransitionPolicy = Partial<{ [State in OrderState]: readonly OrderState[] }>;

export function canTransitionOrder(
  from: OrderState,
  to: OrderState,
  policy: OrderTransitionPolicy = {}
): boolean {
  return (policy[from] ?? DEFAULT_ORDER_TRANSITIONS[from]).includes(to);
}

export function transitionOrder(
  from: OrderState,
  to: OrderState,
  policy: OrderTransitionPolicy = {}
): OrderState {
  if (!ORDER_STATES.includes(from) || !ORDER_STATES.includes(to)) {
    throw new ValidationError("Unknown order state");
  }
  if (!canTransitionOrder(from, to, policy)) throw new InvalidTransitionError(from, to);
  return to;
}
