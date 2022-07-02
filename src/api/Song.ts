export interface ISong {
  id?: string;
  name: string;
  trackNumber: number;
  url: string;
}
export default class Song {
  private _id: string | undefined;
  private _name: string;
  private _url: string;
  private _trackNumber: number;
  constructor({ id, name, url, trackNumber }: ISong) {
    this._id = id;
    this._name = name;
    this._url = url;
    this._trackNumber = trackNumber;
  }
  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get url(): string {
    return this._url;
  }
  public set url(value: string) {
    this._url = value;
  }
  public get trackNumber(): number {
    return this._trackNumber;
  }
  public set trackNumber(value: number) {
    this._trackNumber = value;
  }
}
