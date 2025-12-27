-- CreateTable
CREATE TABLE "UserHighScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameMode" TEXT NOT NULL,
    "highScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserHighScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserHighScore_gameMode_highScore_idx" ON "UserHighScore"("gameMode", "highScore" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "UserHighScore_userId_gameMode_key" ON "UserHighScore"("userId", "gameMode");

-- AddForeignKey
ALTER TABLE "UserHighScore" ADD CONSTRAINT "UserHighScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
