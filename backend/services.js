import { UsersService } from "./services/users";

const services = [
  {
    name: "users",
    server: UsersService,
  },
];

export const serviceList = (port) => {
  return services.map(({ name }) => ({
    name,
    url: `http://localhost:${port}/${name}`,
  }));
};

export const applyMiddlewareToServices = (app) => {
  services.forEach(({ name, server }) => {
    server.applyMiddleware({ app, cors: false, path: `/${name}` });
  });
};
