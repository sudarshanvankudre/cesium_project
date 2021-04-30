-- CreateTable
CREATE TABLE "ConstructionSite" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "volume" DOUBLE PRECISION NOT NULL,
    "cost_per_cubic_meter" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "delivery_date" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Material" ADD FOREIGN KEY ("id") REFERENCES "ConstructionSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
