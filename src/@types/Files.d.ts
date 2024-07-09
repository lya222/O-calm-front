export interface IFiles {
  file: File;
  upload_preset: string;
}

export interface IPictureDownload {
  url: string;
  name: string;
  extension: string;
  isloading: boolean;
  isDownload: boolean;
}
