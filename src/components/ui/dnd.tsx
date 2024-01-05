'use client'
import React, { createContext, useContext } from 'react';
import { useDroppable, useDraggable, type DraggableAttributes } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '~/lib/utils';
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

export interface DroppableProps
    extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean,
    id: string,
}


/**
* headless droppable component
* Renders as a div by default.
*   @attribute {boolean} data-is-over allows styling the component when a draggable passes over
*   @attribute {boolean} data-is-dragging allows styling the component when being dragged
*   @param {boolean} props.asChild allows the component to be rendered as its first child
**/
export function Droppable(props: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });

    const Comp = props.asChild ? Slot : "div";

    return (
        <Comp
            ref={setNodeRef}
            data-state={isOver ? "is-over" : "is-idle"}
            className={props.className}
        >
            {props.children}
        </Comp>
    );
}

export interface DraggableProps
    extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean,
    id: string,
    data?: any,
}


/**
* headless draggable component drags without requiring a handle
* Renders as a div by default.
*   @attribute {boolean} data-is-over allows styling the component when a draggable passes over
*   @attribute {boolean} data-is-dragging allows styling the component when being dragged
*   @param {boolean} props.asChild allows the component to be rendered as its first child
**/
export function Draggable(props: DraggableProps) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
        data: props.data,
    });

    const Comp = props.asChild ? Slot : "div";

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <Comp
            ref={setNodeRef}
            style={style}
            className={props.className}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </Comp>
    );
}

export interface DraggableWithHandleProps
    extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean,
    id: string,
    data?: any,
}


type DraggableWithHandleContextType = {
    listeners: SyntheticListenerMap | undefined;
    attributes: DraggableAttributes | undefined
}

const DraggableContext = createContext<DraggableWithHandleContextType | null>(null);

/**
* headless draggable component *that will not drag without a handle* 
* It should therefore be used with DraggableHandle.
* Renders as a div by default.
*   @attribute {boolean} data-is-over allows styling the component when a draggable passes over
*   @attribute {boolean} data-is-dragging allows styling the component when being dragged
*   @param {boolean} props.asChild allows the component to be rendered as its first child
**/
export function DraggableWithHandle(props: DraggableWithHandleProps) {

    const { attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging
    } = useDraggable({
        id: props.id,
        data: props.data,
    });

    const Comp = props.asChild ? Slot : "div";

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <DraggableContext.Provider value={{
            attributes,
            listeners,
        }}>
            <Comp
                ref={setNodeRef}
                style={style}
                className={props.className}
                data-state={isDragging ? "is-dragging" : "idle"}
            >
                {props.children}
            </Comp>
        </DraggableContext.Provider>
    );
}

export interface DraggableHandleProps
    extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean,
    id: string,
    data?: any,
}

/**
* headless draggable handle component renders as a div by default.
* DraggableHandle must be used with DraggableWithHandle as the parent component.
*   @attribute {boolean} data-is-over allows styling the component when a draggable passes over
*   @attribute {boolean} data-is-dragging allows styling the component when being dragged
*   @param {boolean} props.asChild allows the component to be rendered as its first child
**/
export function DraggableHandle(props: DraggableHandleProps) {

    const {
        listeners,
        attributes,
    } = useContext(DraggableContext) ?? {} as DraggableWithHandleContextType;

    const Comp = props.asChild ? Slot : "div";

    return (
        <Comp
            className={cn("cursor-grab active:cursor-grabbing", props.className)}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </Comp>
    );
}



export interface SortableItemProps
    extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean,
    id: string,
    data?: any,
}

/**
* headless sortable item component
* renders as a div by default
* must be used with SortableContext as the parent component
*   @attribute {boolean} data-is-over allows styling the component when a draggable passes over
*   @attribute {boolean} data-is-dragging allows styling the component when being dragged
*   @param {boolean} props.asChild allows the component to be rendered as its first child
**/
export function SortableItem(props: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        isOver
    } = useSortable({
        id: props.id,
        data: props.data,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
    };

    const Comp = props.asChild ? Slot : "div";

    return (
        <Comp
            ref={setNodeRef}
            style={style}
            data-is-dragging={isDragging}
            data-is-over={isOver}
            className={cn("relative", props.className)}
            {...attributes}
            {...listeners}
        >
            {props.children}
        </Comp>
    );
}

