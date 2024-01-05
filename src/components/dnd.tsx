'use client'
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
    Draggable,
    DraggableHandle,
    DraggableWithHandle,
    Droppable,
    SortableItem
} from "@ui/index";

import DotsSix from "@svg/regular/dots-six.svg"

export default function Page() {
    return (
        <div className='flex flex-col gap-4'>
            <Card>
                <IntroExample />
            </Card>
            <Card>
                <MultipleContainers />
            </Card>
            <Card>
                <WithHandleExample />
            </Card>
            <Card>
                <SortableExample />
            </Card>
        </div>
    )
}

function IntroExample() {
    const [isDropped, setIsDropped] = useState(false);
    const draggableMarkup = (
        <Draggable id="container">Drag me</Draggable>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {!isDropped ? draggableMarkup : null}
            <Droppable id="droppable">
                {isDropped ? draggableMarkup : 'Drop here'}
            </Droppable>
        </DndContext>
    );

    function handleDragEnd(event) {
        if (event.over && event.over.id === 'droppable') {
            setIsDropped(true);
        }
    }
}


function MultipleContainers() {
    const containers = ['A', 'B', 'C'];
    const [parent, setParent] = useState(null);
    const draggableMarkup = (
        <Draggable id="draggable">
            <Card variant="info">
                Drag me
            </Card>
        </Draggable>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}

            {containers.map((id) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <Droppable className='p-4 border bg-white data-[state=is-over]:bg-pink-100' key={id} id={id}>
                    {parent === id ? draggableMarkup : 'Drop here'}
                </Droppable>
            ))}
        </DndContext>
    );

    function handleDragEnd(event) {
        const { over } = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }
};


function DraggableComponent() {
    return (
        <DraggableWithHandle id="draggable" >
            <Card variant="info" className='flex gap-4 items-center'>
                <DraggableHandle id="draggable">
                    <Button format="outline" variant="danger" items="icon">
                        <DotsSix />
                    </Button>
                </DraggableHandle>
                Drag me
            </Card>
        </DraggableWithHandle>
    )
}

function WithHandleExample() {
    const containers = ['A', 'B', 'C'];
    const [parent, setParent] = useState(null);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? <DraggableComponent /> : null}

            {containers.map((id) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <Droppable className='p-4 border bg-white data-[state=is-over]:bg-pink-100' key={id} id={id}>
                    {parent === id ? <DraggableComponent /> : 'Drop here'}
                </Droppable>
            ))}
        </DndContext>
    );

    function handleDragEnd(event) {
        const { over } = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }
};


function SortableExample() {
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
                <Card className='bg-info-2 max-w-min'>
                    {items.map(id =>
                        <SortableItem key={id} id={id}>
                            <Card className='w-48 bg-pink-500 data-[state=is-dragging]:bg-pink-200'>sortable {id}</Card>
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


