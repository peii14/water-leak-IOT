-- CreateTable
CREATE TABLE "_multiple_keywords" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_multiple_keywords_AB_unique" ON "_multiple_keywords"("A", "B");

-- CreateIndex
CREATE INDEX "_multiple_keywords_B_index" ON "_multiple_keywords"("B");

-- AddForeignKey
ALTER TABLE "_multiple_keywords" ADD CONSTRAINT "_multiple_keywords_A_fkey" FOREIGN KEY ("A") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_multiple_keywords" ADD CONSTRAINT "_multiple_keywords_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
