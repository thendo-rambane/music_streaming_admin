import axios, { AxiosResponse } from "axios";
import { defined } from "../helpers";
import Artist, { IArtist } from "./Artist";
import Song, { ISong } from "./Song";

export interface IAlbum {
  id?: string;
  name: string;
  genres: string[];
  album_art: string;
  albumArtFile?: Blob;
  release_date: Date | null;
  artist_id?: string;
  artists: IArtist[];
  album_type: string;
  tracks: ISong[];
}

export default class Album {
  private _id?: string | undefined;
  private _name: string = "";
  private _genres: string[] = [];
  private _albumArt: string = "";
  private _released: Date | null = null;
  private _albumType: string = "album";
  private _artists: Artist[] = [];
  private _songs: Song[] = [];
  public get songs(): Song[] {
    return this._songs;
  }
  public set songs(value: Song[]) {
    this._songs = value;
  }
  public get artists(): Artist[] {
    return this._artists;
  }
  public set artists(value: Artist[]) {
    this._artists = value;
  }

  public get album_type(): string {
    return this._albumType;
  }
  public set album_type(value: string) {
    this._albumType = value;
  }

  constructor({
    id,
    name,
    genres,
    album_art,
    release_date: released,
    album_type,
    artists,
    tracks: songs,
  }: IAlbum) {
    this.id = id;
    this.name = name;
    this.genres = genres;
    this.album_art = album_art;
    this.released_date = released;
    this.album_type = album_type;
    this.songs = songs.map((song) => new Song(song));
    this.artists = artists.map((artist: IArtist) => new Artist(artist));
  }

  /**
   * Get album by id
   */
  public static async getById(id: string): Promise<Album> {
    try {
      const response: AxiosResponse<{ album: IAlbum }> = await axios.get(
        `http://localhost:5000/api/v1/album/${id}`
      );
      return new Album({ ...response.data.album });
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
   * get all albums
   */
  public static async getAll(): Promise<Album[]> {
    try {
      const response: AxiosResponse<{ albums: IAlbum[] }> = await axios.get(
        `http://localhost:5000/api/v1/album`
      );
      console.log(response.data);
      return response.data.albums.map((album: IAlbum) => new Album(album));
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
   * Create a new album
   */
  public static async create({
    name,
    genres,
    albumArtFile,
    release_date,
    artist_id,
  }: IAlbum): Promise<Album> {
    if (artist_id === null) {
      console.error("Artist ID is null");
      throw new Error("Artist ID is null");
    }
    try {
      const form = new FormData();

      if (defined(albumArtFile)) {
        albumArtFile && form.append("album_art", albumArtFile);
      }
      form.append("name", name);
      form.append("genres", JSON.stringify(genres));
      form.append("release_date", JSON.stringify(release_date));

      const response: AxiosResponse<IAlbum> = await axios.post(
        `http://localhost:5000/api/v1/artist/${artist_id}/album`,
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
      const form = new FormData();

      if (defined(song.file)) {
        song.file && form.append("song", song.file);
      }
      form.append("name", song.name);
      form.append("track_number", song.track_number.toString());

      const response: AxiosResponse<ISong> = await axios.post(
        `http://localhost:5000/api/v1/album/${this.id}/song`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
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
  public get album_art(): string {
    return this._albumArt;
  }
  public set album_art(value: string) {
    this._albumArt = value;
  }
  public get released_date(): Date | null {
    return this._released;
  }
  public set released_date(value: Date | null) {
    this._released = value;
  }
}
