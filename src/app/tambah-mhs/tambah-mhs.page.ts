import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { DataMahasiswaService } from '../services/data-mahasiswa.service';

@Component({
  selector: 'app-tambah-mhs',
  templateUrl: './tambah-mhs.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    IonLabel,
    IonButtons,
    IonBackButton,
  ],
})
export class TambahMhsPage implements OnInit {
  nama: string = '';
  fakultas: string = '';
  jurusan: string = '';

  isEdit: boolean = false;
  mhsId: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataMahasiswaService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['isEdit']) {
        this.isEdit = true;
        this.mhsId = Number(params['id']);
        this.nama = params['nama'];
        this.fakultas = params['fakultas'];
        this.jurusan = params['jurusan'];
      }
    });
  }

  async simpan() {
    const data = {
      nama: this.nama,
      fakultas: this.fakultas,
      jurusan: this.jurusan,
    };

    if (this.isEdit) {
      await this.dataService.updateData(this.mhsId, data);
    } else {
      await this.dataService.tambahData(data);
    }
    this.router.navigate(['/home']);
  }
}
