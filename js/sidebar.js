const sidebarPages = [
    {
        title: "Home",
        file: "index.html"
    },

    {
        title: "C++",
        children: [
            {
                title: "Placeholder",
                file: "placeholder.html"
            },
            {
                title: "Placeholder",
                file: "placeholder.html"
            }
        ]
    },

    {
        title: "Bash",
        children: [
            {
                title: "Placeholder",
                file: "placeholder.html"
            },
            {
                title: "Placeholder",
                file: "placeholder.html"
            }
        ]
    },

    {
        title: "Git",
        children: [
            {
                title: "Placeholder",
                file: "placeholder.html"
            },
            {
                title: "Placeholder",
                file: "placeholder.html"
            }
        ]
    },
    {
        title: "Robot Code (WPILib)",
        children: [
            {
                title: "Placeholder",
                file: "placeholder.html"
            },
            {
                title: "Placeholder",
                file: "placeholder.html"
            }
        ]
    },
    {
        title: "WPILib Documentation",
        file: "https://github.wpilib.org/allwpilib/docs/release/cpp/index.html"
];


function getCurrentPage() {
    return window.location.pathname.split("/").pop() || "index.html";
}


function buildSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    const currentPage = getCurrentPage();

    sidebar.innerHTML = `
        <div class="sidebar-header">
            <h2>Robotics Vault</h2>
        </div>

        <div class="sidebar-search">
            <input
                type="text"
                id="sidebar-search"
                placeholder="Search the vault..."
                autocomplete="off"
            >
        </div>

        <nav id="sidebar-nav"></nav>
    `;

    renderNavigation(currentPage);

    const search = document.getElementById("sidebar-search");

    search.addEventListener("input", () => {
        renderNavigation(currentPage, search.value);
    });
}


function renderNavigation(currentPage, searchQuery = "") {
    const nav = document.getElementById("sidebar-nav");

    if (!nav) return;

    const query = searchQuery.toLowerCase().trim();

    let html = "";

    sidebarPages.forEach((section, sectionIndex) => {

        // Regular page
        if (!section.children) {

            if (
                query &&
                !section.title.toLowerCase().includes(query)
            ) {
                return;
            }

            const active =
                currentPage === section.file
                    ? "active"
                    : "";

            html += `
                <a
                    class="sidebar-link ${active}"
                    href="${section.file}"
                >
                    ${section.title}
                </a>
            `;

            return;
        }


        // Section with children
        const matchingChildren = section.children.filter(child => {
            return (
                !query ||
                section.title.toLowerCase().includes(query) ||
                child.title.toLowerCase().includes(query)
            );
        });

        if (matchingChildren.length === 0) {
            return;
        }


        const containsCurrentPage = section.children.some(
            child => child.file === currentPage
        );

        const sectionId = `sidebar-section-${sectionIndex}`;

        html += `
            <div class="sidebar-section">

                <button
                    class="sidebar-section-button"
                    onclick="toggleSidebarSection('${sectionId}')"
                >
                    <span>${section.title}</span>

                    <span
                        class="sidebar-arrow ${
                            containsCurrentPage ? "open" : ""
                        }"
                    >
                        ›
                    </span>
                </button>

                <div
                    id="${sectionId}"
                    class="sidebar-children ${
                        containsCurrentPage || query ? "open" : ""
                    }"
                >
        `;


        matchingChildren.forEach(child => {

            const active =
                currentPage === child.file
                    ? "active"
                    : "";

            html += `
                <a
                    class="sidebar-link sidebar-child ${active}"
                    href="${child.file}"
                >
                    ${child.title}
                </a>
            `;
        });


        html += `
                </div>
            </div>
        `;
    });


    if (!html) {
        html = `
            <div class="no-results">
                No results found.
            </div>
        `;
    }

    nav.innerHTML = html;
}


function toggleSidebarSection(id) {
    const section = document.getElementById(id);

    if (!section) return;

    section.classList.toggle("open");

    const button = section.previousElementSibling;

    if (button) {
        const arrow = button.querySelector(".sidebar-arrow");

        if (arrow) {
            arrow.classList.toggle("open");
        }
    }
}


document.addEventListener("DOMContentLoaded", buildSidebar);
