import axios, { AxiosResponse } from "axios";
import { defined } from "../helpers";
import Song, { ISong } from "./Song";

export interface IAlbum {
  id?: string;
  name: string;
  genres: string[];
  albumArt: string;
  albumArtFile?: Blob;
}

export default class Album {
  private _id?: string | undefined;
  private _name: string = "";
  private _genres: string[] = [];
  private _albumArt: string = "";

  constructor({ id, name, genres, albumArt: art }: IAlbum) {
    this.id = id;
    this.name = name;
    this.genres = genres;
    this.albumArt = art;
  }

  /**
   * Create a new album
   */
  public static async create({
    name,
    genres,
    albumArtFile,
  }: IAlbum): Promise<Album> {
    try {
      const form = new FormData();

      if (defined(albumArtFile)) {
        albumArtFile && form.append("album_art", albumArtFile);
      }
      form.append("name", name);
      form.append("genres", JSON.stringify(genres));

      const response: AxiosResponse<IAlbum> = await axios.post(
        "http://localhost:3000/api/v1/album",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return new Album({ ...response.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error: ", error);
        throw error;
      } else {
        console.error("Uknown error: ", error);
        throw error;
      }
    }
  }

  public async addSong(song: ISong): Promise<Song> {
    try {
      if (this.id === undefined) throw Error("No album selected");
      const response: AxiosResponse<ISong> = await axios.post(
        `http://localhost:3000/api/v1/album/${this.id}/song`,
        song
      );
      return new Song({ ...response.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error: ", error);
        throw error;
      } else {
        console.error("Uknown error: ", error);
        throw error;
      }
    }
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
  public get genres(): string[] {
    return this._genres;
  }
  public set genres(value: string[]) {
    this._genres = value;
  }
  public get albumArt(): string {
    return this._albumArt;
  }
  public set albumArt(value: string) {
    this._albumArt = value;
  }
}
