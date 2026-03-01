import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type HostelId = bigint;
export interface RoomSharing {
    sharing1: bigint;
    sharing2: bigint;
    sharing3: bigint;
    sharing4: bigint;
    sharing5: bigint;
    price1: bigint;
    price2: bigint;
    price3: bigint;
    price4: bigint;
    price5: bigint;
}
export interface Hostel {
    id: HostelId;
    name: string;
    description: string;
    address: string;
    ownerContact: string;
    category: Category;
    imageBlobs: Array<ExternalBlob>;
    roomCapacityDetails: RoomSharing;
}
export interface UpdateHostelInput {
    id: HostelId;
    roomCapacityDetails: RoomSharing;
}
export enum Category {
    boys = "boys",
    coLiving = "coLiving",
    girls = "girls"
}
export interface backendInterface {
    addHostel(name: string, category: Category, description: string, address: string, roomCapacityDetails: RoomSharing, imageBlobs: Array<ExternalBlob>, ownerContact: string): Promise<Hostel>;
    getHostel(hostelId: HostelId): Promise<Hostel>;
    listHostels(): Promise<Array<Hostel>>;
    listHostelsByCategory(category: Category): Promise<Array<Hostel>>;
    updateHostel(updateInput: UpdateHostelInput): Promise<void>;
}
