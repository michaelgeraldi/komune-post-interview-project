import { useState, useEffect } from "react";

export function Table(props) {
    const [bodyData, setBodyData] = useState([]);
    const [isEditing, setIsEditing] = useState([]);
    const data = props.data;

    useEffect(() => {
        if (data.data) {
            setBodyData(data.data);
            setIsEditing(Array(data.data.length).fill(false));
        }
    }, [data]);

    if (data.length === 0) {
        return null;
    }

    const handleClick = (e) => {
        const id = e.target.dataset["rowId"];
        const updatedArray = isEditing.map((value, index) => {
            if (index != id) {
                return value;
            } else {
                return !value;
            }
        });
        setIsEditing(updatedArray);
    };

    const header = data.header.map((headerName, index) => (
        <th key={`${index}-${headerName}`}>{headerName}</th>
    ));

    const rows = data.data.map((item, index) => (
        <tr key={index} id={index}>
            {data.header.map((headerName) => (
                <RowData
                    key={`${index}-${headerName}`}
                    isEditing={isEditing}
                    item={item}
                    index={index}
                    headerName={headerName}
                    bodyData={bodyData}
                    updateBodyData={setBodyData}
                    updateSave={props.updateSave}
                />
            ))}
            <RowButton
                key={`${index}-button`}
                handleClick={handleClick}
                isEditing={isEditing}
                index={index}
            />
        </tr>
    ));

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {header}
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export function RowData(props) {
    const handleChange = (e, index, headerName) => {
        /*         props.updateBodyData([
            ...props.bodyData,
            (props.bodyData[index][headerName] = e.target.value),
        ]); */

        props.updateBodyData(
            props.bodyData.map((data, currentIndex) => {
                if (currentIndex === index) {
                    return { ...data, [headerName]: e.target.value };
                } else {
                    return data;
                }
            })
        );
        props.updateSave(false);
    };

    if (props.isEditing[props.index]) {
        return (
            <td className={"td-input"}>
                <input
                    type="text"
                    value={props.item[props.headerName]}
                    onChange={(e) =>
                        handleChange(e, props.index, props.headerName)
                    }
                />
            </td>
        );
    }

    return <td>{props.item[props.headerName]}</td>;
}

export function RowButton(props) {
    return (
        <td>
            <button
                onClick={(e) => props.handleClick(e)}
                data-row-id={props.index}
                style={{
                    backgroundColor: props.isEditing[props.index]
                        ? "rgb(52, 199, 89)"
                        : "rgb(255, 149, 0)",
                }}
            >
                {props.isEditing[props.index] ? "Done" : "Edit"}
            </button>
        </td>
    );
}
