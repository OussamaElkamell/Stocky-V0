export type ClientType = "b2b" | "b2c";
export type ClientStatus = "active" | "inactive";
export type ClientAccessLevel = "basic" | "premium" | "standard";

export interface Client {
    id: string,
    name: string,
    type: ClientType,
    contact: string,
    email: string,
    phone: string,
    status: ClientStatus,
    lastOrder: Date,
    totalOrders: number,
    totalSpent: string,
    accessLevel: ClientAccessLevel,
    catalogAccess: boolean,
}
