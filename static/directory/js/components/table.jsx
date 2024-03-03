export function Table({ data }) {
    if (data.length === 0) {
        return null;
    }

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
                        <tr key={`${index}-${item[data.header[0]]}`}>
                            {data.header.map((head) => (
                                <td key={`${index}-${head}`}>{item[head]}</td>
                            ))}
                            <td>
                                <button>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
