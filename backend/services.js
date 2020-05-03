import { UsersService } from "./services/users";
import { OrgsService } from "./services/org";
import { BulletinsService } from "./services/bulletins";

const services = [
  {
    name: "users",
    server: UsersService,
  },
  {
    name: "orgs",
    server: OrgsService,
  },
  {
    name: "bulletins",
    server: BulletinsService,
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
