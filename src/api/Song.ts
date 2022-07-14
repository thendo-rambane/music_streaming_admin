import axios, { AxiosResponse } from "axios";
import React from "react";
import Album, { IAlbum } from "./Album";

type ISongTypes = string | number | File | Blob | null | IAlbum | undefined;

export interface ISong {
  [index: string]: ISongTypes;
  id?: string;
  name: string;
  track_number: number;
  href: string;
  file?: File | Blob;
  album: IAlbum | null;
}
export default class Song {
  private _id: string | undefined;
  private _name: string;
  private _href: string;
  private _track_number: number;
  private _album: Album | null = null;
  constructor({ id, name, href, track_number: trackNumber, album }: ISong) {
    this._id = id;
    this._name = name;
    this._href = href;
    this._track_number = trackNumber;
    if (album) this._album = new Album(album);
  }

  /**
   * Delete the song from the database
   */
  public async delete(): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(
        `http://localhost:5000/api/v1/track/${this._id}`
      );
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
   * Given a song id Delete the song from the database
   */
  public static async delete(id: string): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(
        `http://localhost:5000/api/v1/track/${id}`
      );
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
  public get href(): string {
    return this._href;
  }
  public set href(value: string) {
    this._href = value;
  }
  public get track_number(): number {
    return this._track_number;
  }
  public set track_number(value: number) {
    this._track_number = value;
  }
  public get album(): Album | null {
    return this._album;
  }
  public set album(value: Album | null) {
    this._album = value;
  }
}
