/* eslint-disable @typescript-eslint/no-namespace */


namespace DB {
    export enum UploadType {
        IMAGE = "image",
        VIDEO = "video",
        SOUND = "sound",
    };
    export const uploadTypes = Object.values(UploadType);

    export interface Upload {
        id: string;
        ownerId: string;
        name: string;
        type: UploadType;
        filetype: string;
    }

    export enum Section {
        TEXT = "text",
        MATH = "math",
        IMAGE = "image",
        VIDEO = "video",
        AUDIO = "audio",
        TABLE = "table",
        MULTIPLE_CHOICE = "multiple_choice",
    }
    export const sections = Object.values(Section);

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
        UPLOADS = "uploads",
    }
    export const pages = Object.values(Pages);
}

export {
    DB,
    Constants
}


