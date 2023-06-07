import { Injectable } from '@angular/core';
import {
  Storage,
  UploadTask,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  uploadProfilePhoto(file: File, userId: string): UploadTask {
    const filePath = `${userId}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    return uploadBytesResumable(fileRef, file);
  }
}
