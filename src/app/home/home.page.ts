import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, create } from 'ionicons/icons';
import { DataMahasiswaService } from '../services/data-mahasiswa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon,
  ],
})
export class HomePage {
  dataMahasiswa: any[] = [];

  constructor(
    private dataService: DataMahasiswaService,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
    private router: Router,
  ) {
    addIcons({ add, trash, create });
  }

  async ionViewWillEnter() {
    await this.loadData();
  }

  async loadData() {
    this.dataMahasiswa = await this.dataService.getData();
    this.cdr.detectChanges();
  }

  // Navigasi ke form dengan membawa data
  editMahasiswa(mhs: any) {
    this.router.navigate(['/tambah-mhs'], {
      queryParams: {
        id: mhs.id,
        nama: mhs.nama,
        fakultas: mhs.fakultas,
        jurusan: mhs.jurusan,
        isEdit: true,
      },
    });
  }

  async hapusMahasiswa(id: any) {
    const alert = await this.alertController.create({
      header: 'Hapus Data',
      message: 'Apakah Anda yakin ingin menghapus data ini?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          handler: async () => {
            await this.dataService.hapusData(id);
            this.loadData();
          },
        },
      ],
    });
    await alert.present();
  }
}
