declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module 'mockjs';
declare module 'react-fittext';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
declare const REACT_MAPBOX_ACCESS_TOKEN: string;
declare const REACT_API_URL: string;
declare const REACT_EDITOR_KEY: string;
declare const REACT_CDN_URL: string;
declare module MapboxT {
  interface SearchConfig {
    language?: string;
    country?: string;
    types?: string;
    access_token: string;
  }
  export interface SearchResponse {
    type: string;
    features: Feature[];
    attribution: string;
  }

  export interface Feature {
    type: string;
    id: string;
    geometry: Geometry;
    properties: Properties;
  }

  export interface Geometry {
    type: string;
    coordinates: number[];
  }

  export interface Properties {
    mapbox_id: string;
    feature_type: string;
    full_address: string;
    name: string;
    name_preferred: string;
    coordinates: Coordinates;
    additional_feature_types: string[];
    place_formatted: string;
    bbox: number[];
    context: Context;
  }

  export interface Coordinates {
    longitude: number;
    latitude: number;
  }

  export interface Context {
    region: Region;
    country: Country;
    place: Place;
  }

  export interface Region {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
  }
  export interface Country {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
    country_code: string;
    country_code_alpha_3: string;
    translations: Translations2;
  }

  export interface Place {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
    translations: Translations3;
  }
}

declare module REQUEST_DEFIND {
  // COMMON
  export type GetListRequestParam = {
    page: number;
    limit: number;
  };
  export type CRUDRequestParam = {
    id: string;
  };
  // AUTH
  export type LoginRequestBody = {
    username: string;
    password: string;
  };
  export type GetUserRequestParam = {
    id: string;
  };
  // FILE
  export type GetAllImageRequestParam = {
    page?: number;
    limit?: number;
  };
  export type UploadFileRequestBody = {
    file: File;
  };
  export type CRUDPlaceRequestBody = Omit<SCHEMA.Place, 'id' | 'createdAt' | 'updatedAt'>;
  // user
  export type CRUDUserRequestBody = Omit<SCHEMA.User, 'id' | 'createdAt' | 'updatedAt'>;
}
// SCHEMA
declare module SCHEMA {
  export enum UserStatus {
    ACTIVE = 1,
    BLOCK = 2,
  }
  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }
  export interface File {
    createdAt: string;
    id: string;
    name: string;
    originalName: string;
    type: string;
    updatedAt: string;
  }
  export interface User {
    createdAt: string;
    id: string;
    role: number;
    status: UserStatus;
    updatedAt: string;
    username: string;
  }
  export interface Category {
    createdAt: string;
    description: string;
    id: string;
    name: string;
    slug: string;
    thumbnail: string;
    updatedAt: string;
  }
  export interface Place {
    categoryId: string;
    content: string;
    createdAt: string;
    description: string;
    id: string;
    lat: string;
    long: string;
    name: string;
    slug: string;
    thumbnail: string;
    updatedAt: string;
  }
}
