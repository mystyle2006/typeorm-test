import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entities/photo";
import { User } from "./entities/user";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 9999,
  username: "root",
  password: "1111",
  database: "typeorm-test",
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: [Photo, User],
  subscribers: [],
  migrations: [],
});

const generateMock = async () => {
  /* mock User A */
  const userA = new User();
  userA.userName = "UserA";

  const userAPhoto1 = new Photo();
  userAPhoto1.name = "Me and Bears";
  userAPhoto1.description = "I am near polar bears";
  userAPhoto1.filename = "photo-with-bears.jpg";
  userAPhoto1.views = 1;
  userAPhoto1.isPublished = true;

  const userAPhoto2 = new Photo();
  userAPhoto2.name = "Me and a dock";
  userAPhoto2.description = "I am a lovely dock";
  userAPhoto2.filename = "photo-with-dock.jpg";
  userAPhoto2.views = 3;
  userAPhoto2.isPublished = true;

  userA.photos = [userAPhoto1, userAPhoto2];

  await AppDataSource.manager.save(userA);

  /* mock User B */
  const userB = new User();
  userB.userName = "UserA";

  const userBPhoto1 = new Photo();
  userBPhoto1.name = "Me and Bears";
  userBPhoto1.description = "I am near polar bears";
  userBPhoto1.filename = "photo-with-bears.jpg";
  userBPhoto1.views = 1;
  userBPhoto1.isPublished = true;

  const userBPhoto2 = new Photo();
  userBPhoto2.name = "Me and a dock";
  userBPhoto2.description = "I am a lovely dock";
  userBPhoto2.filename = "photo-with-dock.jpg";
  userBPhoto2.views = 3;
  userBPhoto2.isPublished = true;

  userB.photos = [userBPhoto1, userBPhoto2];

  await AppDataSource.manager.save(userB);

  /* mock User C */
  const userC = new User();
  userC.userName = "UserC";

  const userCPhoto1 = new Photo();
  userCPhoto1.name = "Me and Bears";
  userCPhoto1.description = "I am near polar bears";
  userCPhoto1.filename = "photo-with-bears.jpg";
  userCPhoto1.views = 1;
  userCPhoto1.isPublished = true;

  const userCPhoto2 = new Photo();
  userCPhoto2.name = "Me and a dock";
  userCPhoto2.description = "I am a lovely dock";
  userCPhoto2.filename = "photo-with-dock.jpg";
  userCPhoto2.views = 3;
  userCPhoto2.isPublished = true;

  userC.photos = [userCPhoto1, userCPhoto2];

  await AppDataSource.manager.save(userC);
};

const getUsers = async () => {
  console.info('------------------------ 조회 시작');
  const user = await AppDataSource.manager.find(User, {
    select: {
      id: true,
      userName: true,
      photos: { description: true, views: true }
    }, relations: ['photos'], take: 2, skip: 1
  });
  console.log(user);
};

AppDataSource.initialize()
  .then(async () => {
    await generateMock();
    await getUsers();
  })
  .catch((error) => console.log(error));