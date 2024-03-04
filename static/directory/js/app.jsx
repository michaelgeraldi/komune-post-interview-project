import { Form } from "./components/form";
import { Table } from "./components/table";
import { Save } from "./components/save";
import { useEffect, useState } from "react";

export function App() {
    const [data, setData] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        setIsSaved(false);
        console.log(data);
    }, [data]);

    return (
        <div className="parent-container">
            <Form
                updateData={setData}
                fileName={fileName}
                updateFileName={setFileName}
            />
            <Table data={data} updateSave={setIsSaved} updateData={setData} />
            <Save
                data={data}
                saved={isSaved}
                updateSave={setIsSaved}
                fileName={fileName}
            />
        </div>
    );
}
