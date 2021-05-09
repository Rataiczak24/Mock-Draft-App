import React from 'react'

function Card(props) {

    const dragStart = e => {
        const target = e.target;

        e.dataTransfer.setData('card_id', target.id);

        /*
        setTimeout(() => {
            target.style.display = "none";
        }, 100);
        */
    }

    const dragOver = e => {
        e.stopPropagation();
    }

    return (
        <div
            id={props.id}
            onDragStart={dragStart}
            onDragOver={dragOver}
            className={props.className}
            draggable={props.draggable}
        >
            { props.children }
        </div>
    )
}

export default Card