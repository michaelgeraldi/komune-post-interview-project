export function Table({ data }) {
    if (data.length === 0) {
        return null;
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <TableHeader data={data} />
                </thead>
                <tbody>
                    <TableBody data={data} />
                </tbody>
            </table>
        </div>
    );
}

export function TableHeader({ data }) {
    const keys = Object.keys(data[0]);

    return (
        <tr>
            {keys.map((header, index) => (
                <th key={`${index}-${header}`}>{header}</th>
            ))}
        </tr>
    );
}

export function TableBody({ data }) {
    return (
        <>
            {data.map((book) => (
                <tr key={book["id"]}>
                    <th>{book["isbn"]}</th>
                    <th>{book["title"]}</th>
                    <th>{book["author"]}</th>
                    <th>{book["publisher"]}</th>
                    <th>{book["price"]}</th>
                    <th>{book["tel"]}</th>
                </tr>
            ))}
        </>
    );
}
