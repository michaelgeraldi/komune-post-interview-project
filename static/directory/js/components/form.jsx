import { getCookie } from "../utilities/cookie";

export function Form(props) {
    const handleChange = (e) => {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        props.updateFileName(e.target.files[0].name);

        fetch("/reader", {
            method: "POST",
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            mode: "same-origin",
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                props.updateData([]);
                setTimeout(() => props.updateData(data), 1);
            });
    };

    const formContainerStyle = props.fileName
        ? null
        : { flexDirection: "column", rowGap: "10px" };

    return (
        <div className="form-container" style={formContainerStyle}>
            <div className="title">
                <h1 style={{ fontSize: props.fileName ? "" : "40px" }}>
                    CSV to JSON Converter
                </h1>
            </div>
            <div>
                <form action="" className="form-box">
                    <input
                        type="file"
                        id="file-input"
                        name="file-input"
                        accept=".csv"
                        onChange={(e) => handleChange(e)}
                    />
                    {props.fileName ? (
                        <span className="file-name">{props.fileName}</span>
                    ) : null}
                    <label
                        htmlFor="file-input"
                        className="file-label animate-pulse"
                    >
                        Choose a File...
                    </label>
                </form>
            </div>
        </div>
    );
}
