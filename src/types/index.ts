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

    export interface Block {
        id: string;
        ownerId: string;
        modified: Date;
    }
    export type Blocks = string[];

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

    export interface SectionData {
        id: string;
        ownerId: string;
        modified: Date;
        type: Section;
    }
    export type BlockSections = Map<string, string[]>

    export interface TextSection {
        text: string;
        id: string;
        lastUpdatedBy: string;
        createdBy?: string;
        parentId: string;
        align?: "left" | "center" | "right";
    }
    export type TextSectionData = Map<string, TextSection>;

    export interface ImageSection {
        url: string;
        id: string;
        lastUpdatedBy: string;
        createdBy?: string;
        parentId: string;
        align?: "left" | "center" | "right";
    }
    export type ImageSectionData = Map<string, ImageSection>;

    export interface VideoSection {
        url: string;
        id: string;
        lastUpdatedBy: string;
        createdBy?: string;
        parentId: string;
        align?: "left" | "center" | "right";
    }
    export type VideoSectionData = Map<string, VideoSection>;

    export interface MathSection {
        id: string;
        lastUpdatedBy: string;
        createdBy?: string;
        parentId: string;
        checkMath?: boolean;
        computeArithmetic?: boolean;
    }
    export type MathSectionData = Map<string, MathSection>;
    export type MathSections = Map<string, string[]>;

    export interface Mathfield {
        latex: string;
        align?: "left" | "center" | "right";
    }
    export type Mathfields = Map<string, string[]>;
    export type MathfieldData = Map<string, Mathfield>;

    export interface AudioSection {
        url: string;
        id: string;
        lastUpdatedBy: string;
        createdBy?: string;
        parentId: string;
        align?: "left" | "center" | "right";
    }
    export type AudioSectionData = Map<string, AudioSection>;

    export interface TableSection {
        data: string[][];
        id: string;
        lastUpdatedBy: string;
        createdBy?: string;
        parentId: string;
        align?: "left" | "center" | "right";
    }
    export type TableSectionData = Map<string, TableSection>;

    export interface MultipleChoiceSection {
        choices: string[];
        id: string;
        lastUpdatedBy: string;
        createdBy?: string;
        parentId: string;
        align?: "left" | "center" | "right";
    }
    export type MultipleChoiceSectionData = Map<string, MultipleChoiceSection>;
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


