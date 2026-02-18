import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class DataMahasiswaService {
  private KEY_MAHASISWA = 'data_mahasiswa_app';

  constructor() {}

  async getData() {
    const { value } = await Preferences.get({ key: this.KEY_MAHASISWA });
    return value ? JSON.parse(value) : [];
  }

  async tambahData(mahasiswaBaru: any) {
    const dataLama = await this.getData();
    mahasiswaBaru.id = Date.now();
    dataLama.push(mahasiswaBaru);
    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataLama),
    });
  }

  // FUNGSI HAPUS DATA
  async hapusData(id: any) {
    const dataLama = await this.getData();
    // Filter data untuk membuang ID yang dipilih
    const dataBaru = dataLama.filter((mhs: any) => mhs.id !== id);
    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataBaru),
    });
  }
}
