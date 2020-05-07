import { UsersService } from "./services/users";
import { OrgsService } from "./services/org";
import { BulletinsService } from "./services/bulletins";
import { PostingsService } from "./services/postings";

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
  {
    name: "postings",
    server: PostingsService,
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
