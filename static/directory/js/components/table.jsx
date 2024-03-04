import { useState, useEffect } from "react";

export function Table({ data, updateSave }) {
    const [bodyData, setBodyData] = useState([]);
    const [isEditing, setIsEditing] = useState([]);

    useEffect(() => {
        if (data.data) {
            setBodyData(data.data);
            setIsEditing(Array(data.data.length).fill(false));
            console.log("hello!");
        }
    }, [data.data]);

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
        console.log(updatedArray);
        setIsEditing(updatedArray);
    };

    const handleChange = (e, index, head) => {
        setBodyData([...bodyData, (bodyData[index][head] = e.target.value)]);
        updateSave(false);
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {data.header.map((name, index) => (
                            <th key={`${index}-${name}`}>{name}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((item, index) => (
                        <tr key={index} id={index}>
                            {data.header.map((head) =>
                                isEditing[index] ? (
                                    <td
                                        key={`${index}-${head}-input`}
                                        className={"td-input"}
                                    >
                                        <input
                                            type="text"
                                            value={item[head]}
                                            onChange={(e) =>
                                                handleChange(e, index, head)
                                            }
                                        />
                                    </td>
                                ) : (
                                    <td key={`${index}-${head}`}>
                                        {item[head]}
                                    </td>
                                )
                            )}
                            <td key={`${index}-button`}>
                                <button
                                    onClick={(e) => handleClick(e)}
                                    data-row-id={index}
                                >
                                    {isEditing[index] ? "Done" : "Edit"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
