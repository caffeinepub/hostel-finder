import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
    latitude: number;
    isSponsored: boolean;
    imageUrls: Array<string>;
    name: string;
    description: string;
    amenities: Array<string>;
    longitude: number;
    address: string;
    ownerContact: string;
    category: string;
    roomCapacityDetails: RoomSharing;
}
export interface UpdateHostelInput {
    id: HostelId;
    isSponsored?: boolean;
    amenities: Array<string>;
    roomCapacityDetails: RoomSharing;
}
export interface backendInterface {
    addHostel(name: string, category: string, description: string, address: string, latitude: number, longitude: number, roomCapacityDetails: RoomSharing, imageUrls: Array<string>, ownerContact: string, amenities: Array<string>, isSponsored: boolean | null): Promise<Hostel>;
    getEarningsStats(): Promise<{
        visitorCount: bigint;
    }>;
    getHostel(hostelId: HostelId): Promise<Hostel>;
    getHostelsByCategory(category: string): Promise<Array<Hostel>>;
    getVisitorCount(): Promise<bigint>;
    listHostels(): Promise<Array<Hostel>>;
    recordVisit(): Promise<bigint>;
    updateHostel(updateInput: UpdateHostelInput): Promise<void>;
}
