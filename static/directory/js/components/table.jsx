import { useState, useEffect } from "react";

export function Table(props) {
    const [isEditing, setIsEditing] = useState([]);
    const data = props.data;

    if (data.length === 0) {
        return null;
    }

    const header = data.header.map((headerName, index) => (
        <th key={`${index}-${headerName}`}>{headerName}</th>
    ));

    const rows = data.data.map((currentObject, index) => (
        <Row
            key={index}
            index={index}
            data={data}
            currentObject={currentObject}
            updateData={props.updateData}
            updateSave={props.updateSave}
        />
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

export function Row(props) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <tr id={props.index}>
            {props.data.header.map((headerName) => (
                <RowData
                    key={`${props.index}-${headerName}`}
                    isEditing={isEditing}
                    data={props.data}
                    currentObject={props.currentObject}
                    index={props.index}
                    headerName={headerName}
                    updateData={props.updateData}
                    updateSave={props.updateSave}
                />
            ))}
            <RowButton
                key={`${props.index}-button`}
                handleClick={() => setIsEditing(!isEditing)}
                isEditing={isEditing}
                index={props.index}
            />
        </tr>
    );
}

export function RowData(props) {
    const handleChange = (e, index, headerName) => {
        const updatedDataArray = props.data.data.map((rowItem, rowIndex) => {
            if (rowIndex === index) {
                return { ...rowItem, [headerName]: e.target.value };
            } else {
                return rowItem;
            }
        });
        props.updateData({ ...props.data, data: updatedDataArray });
        props.updateSave(false);
    };

    if (props.isEditing) {
        return (
            <td className={"td-input"}>
                <input
                    type="text"
                    value={props.currentObject[props.headerName]}
                    onChange={(e) =>
                        handleChange(e, props.index, props.headerName)
                    }
                />
            </td>
        );
    }

    return <td>{props.currentObject[props.headerName]}</td>;
}

export function RowButton(props) {
    return (
        <td>
            <button
                onClick={props.handleClick}
                data-row-id={props.index}
                style={{
                    backgroundColor: props.isEditing
                        ? "rgb(52, 199, 89)"
                        : "rgb(255, 149, 0)",
                }}
            >
                {props.isEditing ? "Done" : "Edit"}
            </button>
        </td>
    );
}
