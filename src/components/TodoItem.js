import React, { useEffect, useState, useRef } from 'react'

const TodoItem = (props) => {

    const [editItem, setEditItem] = useState(props.item)
    const [editing, setEditing] = useState("")

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
    }, [])

    const refEditing = useRef(null)

    const handleClickOutside = (e) => {
        if (!refEditing?.current?.contains(e.target)) {
            setEditing("");
        }
    }

    useEffect(() => {
        setEditItem(props.item);
    }, [props.itemList]);

    function handleChange(e) {
        setEditItem(e.target.value);
    }
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            const newTodos = props.itemList;
            newTodos[props.index] = { "item": editItem, "done": newTodos[props.index].done };
            props.setItemList(newTodos);
            localStorage.setItem("itemList", JSON.stringify(newTodos))
            setEditing("");
        }
    }
    function handleClick(e) {
        if (props.itemList[props.index].done) {
            props.setDoneCount(props.doneCount - 1)
            localStorage.setItem("doneCount", props.doneCount - 1)
        }
        const newTodos = props.itemList.slice(0, props.index).concat(props.itemList.slice(props.index + 1))
        props.setItemList([...newTodos]);
        localStorage.setItem("itemList", JSON.stringify([...newTodos]))
        if (newTodos.length > props.index)
            setEditItem(newTodos[props.index].item);
        let allDoneTemp = true;
        if (!newTodos.length)
            allDoneTemp = false;
        else
            newTodos.map((obj, i) => {
                if (obj.done == false) {
                    allDoneTemp = false;
                }
            })

        props.setAllDone(allDoneTemp)
        localStorage.setItem("allDone", allDoneTemp)
    }
    function handleDoubleClick(e) {
        setEditing("editing");
    }
    function handleCheckboxClick(e) {
        const newTodos = props.itemList
        newTodos[props.index].done = !newTodos[props.index].done
        props.setItemList([...newTodos])
        localStorage.setItem("itemList", JSON.stringify([...newTodos]))
        let allDoneTemp = true;
        newTodos.map((obj, i) => {
            if (obj.done == false) {
                allDoneTemp = false
            }
        })
        props.setAllDone(allDoneTemp)
        localStorage.setItem("allDone", allDoneTemp)
        if (newTodos[props.index].done) {
            props.setDoneCount(props.doneCount + 1)
            localStorage.setItem("doneCount", props.doneCount + 1)
        }
        else {
            props.setDoneCount(props.doneCount - 1)
            localStorage.setItem("doneCount", props.doneCount - 1)
        }
    }
    return (
        <li className={props.itemList[props.index].done ? editing + " done" : editing + ""}>
            <div className="view" onDoubleClick={handleDoubleClick}>
                <input className="toggle" onChange={handleCheckboxClick} type="checkbox"
                    checked={props.itemList[props.index].done}
                />
                <label
                >{editItem}</label>
                <a className="destroy" onClick={handleClick} ></a>
            </div>
            <input className="edit" type="text" value={editItem}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                ref={refEditing}
            />
        </li>

    )
}
export default TodoItem