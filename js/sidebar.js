const pages = [
    {
        title: "Introduction",
        file: "index.html"
    },
    {
        title: "Getting Started",
        file: "getting-started.html"
    },
    {
        title: "API Reference",
        file: "api.html"
    }
];

function buildSidebar() {
    const sidebar = document.getElementById("sidebar");

    let html = `
        <h2>Documentation</h2>
    `;

    const currentPage = window.location.pathname
        .split("/")
        .pop() || "index.html";

    pages.forEach(page => {
        const active = currentPage === page.file
            ? "active"
            : "";

        html += `
            <a href="${page.file}" class="${active}">
                ${page.title}
            </a>
        `;
    });

    sidebar.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", buildSidebar);
