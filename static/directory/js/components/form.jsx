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
                props.updateData(data);
                console.log(data);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted!");
    };

    return (
        <div className="form-container" onSubmit={(e) => handleSubmit(e)}>
            <div className="title">
                <h1>CSV to JSON Converter</h1>
            </div>
            <div>
                <form action="" className="form-box">
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept=".csv"
                        onChange={(e) => handleChange(e)}
                    />
                    <span className="file-name">{props.fileName}</span>
                    <label htmlFor="file" className="file-label">
                        Choose a File...
                    </label>
                </form>
            </div>
        </div>
    );
}

function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }

    return cookieValue;
}
