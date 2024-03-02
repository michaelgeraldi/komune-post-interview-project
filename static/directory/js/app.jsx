import { Form } from "./components/form";
import { Table } from "./components/table";
import { Save } from "./components/save";
import { useEffect, useState } from "react";

export function App() {
    const [data, setData] = useState([]);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(false);
    }, [data])

    return (
        <div className="parent-container">
            <Form updateData={setData} />
            <Table data={data} />
            <Save data={data} saved={isSaved} updateSave={setIsSaved} />
        </div>
    );
}
