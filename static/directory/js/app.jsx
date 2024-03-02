import { Form } from "./components/form";
import { Table } from "./components/table";
import { Save } from "./components/save";
import { useState } from "react";

export function App() {
    const [data, setData] = useState([]);

    return (
        <div className="parent-container">
            <Form updateData={setData} />
            <Table data={data} />
            <Save data={data} />
        </div>
    );
}
