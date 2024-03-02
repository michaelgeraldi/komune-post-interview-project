import { useState } from "react";

export function Save({ data }) {
    const [saved, isSaved] = useState(false);

    if (data.length === 0) {
        return null;
    }

    return (
        <div className="save-container">
            <div>
                <button disabled={saved} onClick={() => isSaved(true)}>
                    Simpan
                </button>
            </div>
            <div>
                <a href="/download" download="books.json">
                    <button disabled={!saved}>Unduh Data</button>
                </a>
            </div>
        </div>
    );
}
