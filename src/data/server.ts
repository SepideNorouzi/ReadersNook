import { setupServer } from "msw/node";
import { handlers } from "./handlers";
// When the code tries to make an HTTP request, intercept it and give it a fake response.

export const server = setupServer(...handlers);
