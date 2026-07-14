-- CreateTable
CREATE TABLE "students" (
    "registration_number" TEXT NOT NULL,
    "math_score" DOUBLE PRECISION,
    "literature_score" DOUBLE PRECISION,
    "foreign_language_score" DOUBLE PRECISION,
    "physics_score" DOUBLE PRECISION,
    "chemistry_score" DOUBLE PRECISION,
    "biology_score" DOUBLE PRECISION,
    "history_score" DOUBLE PRECISION,
    "geography_score" DOUBLE PRECISION,
    "civic_education_score" DOUBLE PRECISION,
    "foreign_language_code" TEXT,

    CONSTRAINT "students_pkey" PRIMARY KEY ("registration_number")
);
