import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number; // Ubah tipe sesuai dengan tipe ID pengguna Anda
        // Tambahkan properti lain yang relevan jika diperlukan
      };
    }
  }
}
