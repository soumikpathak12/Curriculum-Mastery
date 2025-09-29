-- CreateTable
CREATE TABLE "public"."NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LessonProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "public"."NewsletterSubscriber"("email");

-- CreateIndex
CREATE INDEX "LessonProgress_userId_idx" ON "public"."LessonProgress"("userId");

-- CreateIndex
CREATE INDEX "LessonProgress_lessonId_idx" ON "public"."LessonProgress"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_userId_lessonId_key" ON "public"."LessonProgress"("userId", "lessonId");

-- AddForeignKey
ALTER TABLE "public"."LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "public"."Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
