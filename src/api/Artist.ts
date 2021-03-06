import axios, { AxiosResponse } from "axios";
import { defined } from "../helpers";
import Album, { IAlbum } from "./Album";

interface IArtistImages {
  banner?: File;
  avatar?: File;
}
export interface IArtist {
  id?: string;
  name: string;
  genres: string[];
  banner: string;
  avatar: string;
}

export default class Artist {
  private _id?: string | undefined;
  private _name: string = "";
  private _genres: string[] = [];
  private _banner: string = "";
  private _avatar: string = "";

  constructor({ id, name, genres, banner, avatar }: IArtist) {
    this.id = id;
    this.name = name;
    this.genres = genres;
    this.banner = banner;
    this.avatar = avatar;
  }

  private values({ id, name, genres, banner, avatar }: IArtist) {
    this.name = name;
    this.avatar = avatar;
    this.banner = banner;
    this.genres = genres;
    this.id = id;
  }

  /**
   * get all artists
   */

  public static async getAll(): Promise<Artist[]> {
    try {
      const response: AxiosResponse<{ artists: IArtist[] }> = await axios.get(
        "http://localhost:5000/api/v1/artist"
      );
      return response.data.artists.map((artist) => new Artist(artist));
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

  /**
   * new
   */
  public static async create(artist: IArtist): Promise<Artist> {
    try {
      const response: AxiosResponse<IArtist> = await axios.post(
        "http://localhost:5000/api/v1/artist",
        artist
      );
      return new Artist({ ...response.data });
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

  /**
   * Get artist by id
   */
  public static async getById(artistId: string): Promise<Artist> {
    try {
      const response: AxiosResponse<{ artist: IArtist }> = await axios.get(
        `http://localhost:5000/api/v1/artist/${artistId}`
      );
      // console.log("Just got artist: ", response.data);
      const { id, name, genres, banner, avatar } = response.data.artist;
      return new Artist({ id, name, genres, banner, avatar });
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

  /**
   * addAlbum
   */
  public async addAlbum({
    name,
    genres,
    albumArtFile,
    release_date,
    album_type,
  }: IAlbum): Promise<Album> {
    try {
      if (this.id === undefined) throw Error("No artist selected");
      const form = new FormData();

      if (defined(albumArtFile)) {
        albumArtFile && form.append("album_art", albumArtFile);
      }
      form.append("name", name);
      form.append("album_type", album_type);
      genres.forEach((genre) => {
        form.append("genres", genre);
      });
      form.append(
        "release_date",
        release_date !== null ? release_date.toString() : ""
      );

      const response: AxiosResponse<IAlbum> = await axios.post(
        `http://localhost:5000/api/v1/artist/${this.id}/album`,
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

  /**
   * addImages
   */
  public async addImages({ avatar, banner }: IArtistImages): Promise<Artist> {
    try {
      if (this.id === undefined) throw Error("No artist selected");
      const form = new FormData();
      if (defined(avatar) || defined(banner)) {
        avatar && form.append("avatar", avatar);
        banner && form.append("banner", banner);
      }
      const response = await axios.put(
        `http://localhost:5000/api/v1/artist/${this.id}/images`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // this.values({ ...response.data });
      console.log(response.data);
      return this;
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

  public get banner(): string {
    return this._banner;
  }
  public set banner(value: string) {
    this._banner = value;
  }
  public get avatar(): string {
    return this._avatar;
  }
  public set avatar(value: string) {
    this._avatar = value;
  }
  public get genres(): string[] {
    return this._genres;
  }
  public set genres(value: string[]) {
    this._genres = value;
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
}
