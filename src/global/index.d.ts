export declare global {
  type FileData = {
    name: string;    
    type: string;    
  }

  interface DataGridState{
    id?: string;  
    image: {
      base64:string;
      fileData: FileData ;
    } | string;
    imageMobile: {
      base64:string;
      fileData: FileData;
    } | string;
    button: boolean;
    textButton: string;
    paragraph: string;
  }

  interface DataGridCar {
    id: string;
    image: {
      base64:string;
      fileData: FileData;
    } | string;
    categoria: string;
    modelo: string;
    marca: string;
    ano: string;
  }
  interface DataGridCarFormData {
    image: {
      base64:string;
      fileData: FileData;
    } | string;
    categoria: string;
    modelo: string;
    marca: string;
    ano: string;
  }

} 
