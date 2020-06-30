# Migration `20200614214526-initial`

This migration has been generated by Kaiyu Hsu at 6/14/2020, 9:45:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

CREATE TYPE "ArticleType" AS ENUM ('LINK', 'VIDEO', 'POST');

CREATE TABLE "public"."User" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"displayName" text   ,"email" text  NOT NULL ,"googleId" text   ,"id" text  NOT NULL ,"password" text  NOT NULL ,"resetToken" text   ,"resetTokenExpiry" Decimal(65,30)   ,"role" "Role" NOT NULL DEFAULT 'USER',
    PRIMARY KEY ("id"))

CREATE TABLE "public"."PlaylistCategory" (
"createdByRole" "Role" NOT NULL DEFAULT 'USER',"description" text   ,"id" text  NOT NULL ,"name" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Playlist" (
"authorId" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text   ,"emoji" text   ,"id" text  NOT NULL ,"published" boolean  NOT NULL DEFAULT false,"thumbnail" text   ,"title" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."EnrolledPlayList" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"enrolleeId" text  NOT NULL ,"id" text  NOT NULL ,"playlistId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Article" (
"authorId" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"link" text   ,"playlistId" text  NOT NULL ,"title" text  NOT NULL ,"type" "ArticleType" NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."CompletedPlaylist" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"playlistId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."_PlaylistToPlaylistCategory" (
"A" text  NOT NULL ,"B" text  NOT NULL )

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "User.googleId" ON "public"."User"("googleId")

CREATE UNIQUE INDEX "_PlaylistToPlaylistCategory_AB_unique" ON "public"."_PlaylistToPlaylistCategory"("A","B")

CREATE  INDEX "_PlaylistToPlaylistCategory_B_index" ON "public"."_PlaylistToPlaylistCategory"("B")

ALTER TABLE "public"."Playlist" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."EnrolledPlayList" ADD FOREIGN KEY ("playlistId")REFERENCES "public"."Playlist"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."EnrolledPlayList" ADD FOREIGN KEY ("enrolleeId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Article" ADD FOREIGN KEY ("playlistId")REFERENCES "public"."Playlist"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Article" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."CompletedPlaylist" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."CompletedPlaylist" ADD FOREIGN KEY ("playlistId")REFERENCES "public"."Playlist"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_PlaylistToPlaylistCategory" ADD FOREIGN KEY ("A")REFERENCES "public"."Playlist"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_PlaylistToPlaylistCategory" ADD FOREIGN KEY ("B")REFERENCES "public"."PlaylistCategory"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200614214526-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,89 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator prisma_client {
+  provider = "prisma-client-js"
+}
+
+enum Role {
+  USER
+  ADMIN
+}
+
+model User {
+  id                String             @default(cuid()) @id
+  email             String             @unique
+  password          String
+  displayName       String?
+  googleId          String?            @unique
+  resetToken        String?
+  resetTokenExpiry  Float?
+  enrolledPlaylists EnrolledPlayList[]
+  role              Role               @default(USER)
+  createdAt         DateTime           @default(now())
+}
+
+model PlaylistCategory {
+  id            String     @default(cuid()) @id
+  name          String
+  description   String?
+  createdByRole Role       @default(USER)
+  playlists     Playlist[] @relation(references: [id])
+}
+
+model Playlist {
+  id          String             @default(cuid()) @id
+  published   Boolean            @default(false)
+  title       String
+  description String?
+  authorId    String
+  author      User               @relation(fields: [authorId], references: [id])
+  emoji       String?
+  thumbnail   String?
+  categories  PlaylistCategory[] @relation(references: [id])
+  articles    Article[]
+  createdAt   DateTime           @default(now())
+  updatedAt   DateTime           @updatedAt
+}
+
+model EnrolledPlayList {
+  id         String   @default(cuid()) @id
+  enrolleeId String
+  playlistId String
+  playlist   Playlist @relation(fields: [playlistId], references: [id])
+  enrollee   User     @relation(fields: [enrolleeId], references: [id])
+  createdAt  DateTime @default(now())
+  updatedAt  DateTime @updatedAt
+}
+
+enum ArticleType {
+  LINK
+  VIDEO
+  POST
+}
+
+model Article {
+  id          String      @default(cuid()) @id
+  title       String
+  link        String?
+  description String
+  authorId    String
+  playlistId  String
+  playlist    Playlist    @relation(fields: [playlistId], references: [id])
+  author      User        @relation(fields: [authorId], references: [id])
+  type        ArticleType
+  createdAt   DateTime    @default(now())
+  updatedAt   DateTime    @updatedAt
+}
+
+model CompletedPlaylist {
+  id          String   @default(cuid()) @id
+  userId      String
+  playlistId  String
+  completedBy User     @relation(fields: [userId], references: [id])
+  playlist    Playlist @relation(fields: [playlistId], references: [id])
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+}
```

