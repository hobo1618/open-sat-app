'use client'
import { DB } from "~/types"

import React, { useState } from 'react';

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Draggable,
    DraggableHandle,
    DraggableWithHandle,
    Droppable,
    SortableItem
} from "@ui/index";

import { DragHandleDots1Icon } from "@radix-ui/react-icons"

export function MathSection() {
    const [items, setItems] = useState([1, 2, 3]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <Card className='bg-info-2'>
                    {items.map(id =>
                        <SortableItem key={id} id={id}>
                            <Card className='bg-pink-500 data-[state=is-dragging]:bg-pink-200'>
                                <CardContent>
                                    sortable {id}
                                </CardContent>
                            </Card>
                        </SortableItem>
                    )}
                </Card>
            </SortableContext>
        </DndContext>
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}

