/* eslint-disable @typescript-eslint/no-namespace */
/**
    * Data types stored in the database.
    * These datatypes will be converted into a drizzle schema when we
* move all local data to the database.
    * */
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace DB {
    export enum ProfileRole {
        TEACHER = "teacher",
        STUDENT = "student",
        ADMIN = "admin",
        PARENT = "parent",
    }
    export const profileRoles = Object.values(ProfileRole);

    export enum SpaceRole {
        TEACHER = "teacher",
        STUDENT = "student",
        ADMIN = "admin",
        PARENT = "parent",
        OWNER = "owner",
    }
    export const spaceRoles = Object.values(SpaceRole);

    export enum Role {
        USER = "user",
        ADMINISTRATOR = "administrator",
    }
    export const roles = Object.values(Role);

    export enum Plan {
        FREE = "free",
        PRO = "pro",
    }
    export const plans = Object.values(Plan);

    export enum Account {
        PERSONAL = "personal",
        COMPANY = "company",
    }
    export const accounts = Object.values(Account);

    export enum RoomStatus {
        PUBLISHED = "published",
        DRAFT = "draft",
        LIVE = "live",
    }
    export const roomStatuses = Object.values(RoomStatus);

    export enum SpaceVisibility {
        PUBLIC = "public",
        PRIVATE = "private",
    }
    export const spaceVisibility = Object.values(SpaceVisibility);

    export enum UploadType {
        IMAGE = "image",
        VIDEO = "video",
        SOUND = "sound",
    };
    export const uploadTypes = Object.values(UploadType);

    export enum CompanySize {
        INDEPENDENT = "independent",
        SMALL = "small",
        MEDIUM = "medium",
        LARGE = "large",
    }
    export const companySizes = Object.values(CompanySize);

    export interface Room {
        id: string;
        spaceId: string;
        ownerId: string;
        src: string;
        name: string;
        status: RoomStatus;
        modified: Date;
        blocks: number;
    }

    export interface Space {
        id: string;
        name: string;
        description: string;
        visibility: SpaceVisibility;
        owner: string; // user id
    }

    export interface Organization {
        id: string;
        name: string;
        email: string;
        size: CompanySize;
        city: string;
        streetNumber: string;
        postCode: string;
    }

    export enum SessionState {
        ACTIVE = "active",
        IDLE = "idle",
    }
    export interface Session {
        sessionId: string;
        user: User | null; 
        activePeriodExpiresAt: Date;
        idlePeriodExpiresAt: Date;
        state: SessionState;
        fresh: boolean;
    }

    export interface User {
        id: string;
        onboarded: boolean;
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        avatar: string;
        account: Role;
        spaces: number;
        accountType: Account;
        organizationId: string | null;
        plan: Plan;
    }

    export interface Administrator {
        id: string;
        organizationId: string;
    }

    export interface SpaceOnUser {
        id: string;
        spaceId: string;
        userId: string;
        role: SpaceRole
    }

    export interface Resource {
        id: string;
        name: string;
        category: string;
        favorite: boolean;
        shared: boolean;
        personal: boolean;
    }

    export interface Upload {
        id: string;
        ownerId: string;
        name: string;
        type: UploadType;
        filetype: string;
    }

    /**
    * A block saved to the database as a template for 
    * a new block in a room
    * */
    export interface BlockTemplate {
        id: string;
        ownerId: string;
        name: string;
        modified: Date;
        favorite: boolean;
    }

    export interface MathBlockTemplate {
        latex: string;
        id: string;
        lastUpdatedBy: string;
        createdBy?: string;
        parentId: string;
        checkMath?: boolean;
        computeArithmetic?: boolean;
        align?: "left" | "center" | "right";
    }
}

namespace Constants {
    export enum Pages {
        HOME = "",
        CREATE = "create",
        LIBRARY = "library",
        PLAYLISTS = "playlists",
    }
    export const pages = Object.values(Pages);
}

export {
    DB,
    Constants
}


