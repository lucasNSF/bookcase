import { Injectable } from '@angular/core';
import {
  Storage,
  UploadTask,
  deleteObject,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { User } from 'src/app/models/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  uploadProfilePhoto(file: File, user: Partial<User>): UploadTask {
    const filePath = `${user?.id}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    return uploadBytesResumable(fileRef, file);
  }

  deleteCurrentProfilePhoto(
    file: File | string,
    userId: string
  ): Promise<void> {
    const fileImage = typeof file === 'string' ? file : file.name;
    const filePath = `${userId}/${fileImage}`;
    const fileRef = ref(this.storage, filePath);
    return deleteObject(fileRef);
  }
}
