import "server-only";

const MOCK_USERS = [
  { id: 1, name: "Artem", email: "artem@gmail.com" },
  { id: 2, name: "Arina", email: "arina@gmail.com" },
  { id: 3, name: "Nikita", email: "nikita@gmail.com" },
  { id: 4, name: "Dmitry", email: "dima@gmail.com" },
];

const db_delay = 150;

export const db = {
  query: {
    users: {
      findMany: async () => {
        await new Promise((resolve) => setTimeout(resolve, db_delay));
        return MOCK_USERS;
      },
    },
  },
};
