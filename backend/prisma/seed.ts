import { PrismaClient, Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

const parseToFloatOrNull = (value: string | undefined): number | null => {
  if (!value || value.trim() === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
};

async function main() {
  const datasetPath = path.join(__dirname, '../dataset/diem_thi_thpt_2024.csv');
  console.log(`Bắt đầu seed dữ liệu từ ${datasetPath}`);

  if (!fs.existsSync(datasetPath)) {
    console.error(`Không tìm thấy file dataset: ${datasetPath}`);
    process.exit(1);
  }

  const batchSize = 10000;
  let batch: Prisma.StudentCreateManyInput[] = [];
  let totalImported = 0;

  console.log(`Đang xoá dữ liệu cũ (nếu có)...`);
  await prisma.student.deleteMany({});
  console.log(`Xoá xong. Đang tiến hành import...`);

  await new Promise<void>((resolve, reject) => {
    const stream = fs.createReadStream(datasetPath).pipe(csv());

    stream.on('data', async (row) => {
      const record: Prisma.StudentCreateManyInput = {
        registrationNumber: row.sbd,
        mathScore: parseToFloatOrNull(row.toan),
        literatureScore: parseToFloatOrNull(row.ngu_van),
        foreignLanguageScore: parseToFloatOrNull(row.ngoai_ngu),
        physicsScore: parseToFloatOrNull(row.vat_li),
        chemistryScore: parseToFloatOrNull(row.hoa_hoc),
        biologyScore: parseToFloatOrNull(row.sinh_hoc),
        historyScore: parseToFloatOrNull(row.lich_su),
        geographyScore: parseToFloatOrNull(row.dia_li),
        civicEducationScore: parseToFloatOrNull(row.gdcd),
        foreignLanguageCode:
          row.ma_ngoai_ngu && row.ma_ngoai_ngu.trim() !== ''
            ? row.ma_ngoai_ngu.trim()
            : null,
      };

      batch.push(record);

      if (batch.length >= batchSize) {
        stream.pause();
        prisma.student
          .createMany({
            data: batch,
            skipDuplicates: true,
          })
          .then(() => {
            totalImported += batch.length;
            console.log(`Đã import ${totalImported} records...`);
            // Clear current batch
            batch.length = 0;
            stream.resume();
          })
          .catch((error) => {
            stream.destroy();
            reject(error);
          });
      }
    });

    stream.on('end', () => {
      if (batch.length > 0) {
        prisma.student
          .createMany({
            data: batch,
            skipDuplicates: true,
          })
          .then(() => {
            totalImported += batch.length;
            console.log(`Đã import ${totalImported} records...`);
            console.log('✅ Hoàn thành Seed Data!');
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        console.log('✅ Hoàn thành Seed Data!');
        resolve();
      }
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
