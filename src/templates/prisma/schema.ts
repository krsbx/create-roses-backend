export const user = {
  role: `enum Role {
  ADMIN
  USER
}`,
  model: `model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  password  String
  username  String    @unique
  role      Role      @default(USER)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}`,
};

export const file = {
  model: `model File {
  id            Int       @id @default(autoincrement())
  path          String
  filename      String
  extension     String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}`,
};
