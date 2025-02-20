import { BetterAuthPlugin } from "better-auth";

export const myPlugin = () => {
  return {
    id: "my-plugin",
    schema: {
      user: {
        fields: {
          age: {
            type: "number",
          },
          address: {
            type: "string",
          },
        },
      },
    },
  } satisfies BetterAuthPlugin;
};
