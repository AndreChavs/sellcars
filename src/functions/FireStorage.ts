import { FirebaseApp, initializeApp } from "firebase/app";
import { deleteObject, FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes, UploadMetadata } from "firebase/storage";
import firebaseConfig from "../../firebaseConfig";
import { v4 as uuidv4 } from 'uuid';

export class FireStorage {
  private app: FirebaseApp;
  private storage: FirebaseStorage;  
  private pasta:string;

  constructor(pasta:string){
    this.app = initializeApp(firebaseConfig);
    this.storage = getStorage(this.app);
    this.pasta = pasta;
  }
  
  private createUniqueFileName(fileDataName: string): string{
    const uniqueID = uuidv4();
    const fileExtension = fileDataName.split('.').pop()
    return `${uniqueID}.${fileExtension}`
  }
  private getMetadata(fileData: FileData):UploadMetadata{
    const metadata:UploadMetadata = {
      contentType: fileData.type,
      customMetadata:{
        name:fileData.name
      }      
    }
    return metadata
  }  
  private getBuffer(base64Data:string): Buffer{
    const base64DataWithoutHeader = base64Data.replace(/^data:image\/(png|jpeg);base64,/, '');
    return Buffer.from(base64DataWithoutHeader, 'base64')
  }

  public async UploadFile(base64Data:string, fileData:FileData){
    const fileName = this.createUniqueFileName(fileData.name);
    const storageRef = ref(this.storage, `${this.pasta}/${fileName}`);
    const buffer = this.getBuffer(base64Data)
    const metadata = this.getMetadata(fileData)
    try {
      const snapshot = await uploadBytes(storageRef, buffer, metadata);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error('Erro durante o upload da imagem:', error);
      throw error;
    }
  }

  public async DeleteFile(urlPath:string){
    const fileName = urlPath.split('%2F').pop()?.split('?').shift();
    const desertRef = ref(this.storage, `${this.pasta}/${fileName}`);
    try {
      await deleteObject(desertRef)
    } catch (error) {
      console.error('Erro ao Deletar a imagem do FireStore:', error);
      throw error;
    }
  }

  public async UpdateFile(urlPath:string, fileData: FileData, base64Data:string){
    const fileName = urlPath.split('%2F').pop()?.split('?').shift();
    const storageRef = ref(this.storage, `${this.pasta}/${fileName}`);
    const buffer = this.getBuffer(base64Data);
    const metadata = this.getMetadata(fileData)
    try {
      await this.DeleteFile(urlPath)
      const snapshot = await uploadBytes(storageRef, buffer, metadata);
      return getDownloadURL(snapshot.ref);      
    } catch (error) {
      console.error('Erro ao fazer o upload do arquivo no FireStore:', error);
      throw error;
    }
  }

}