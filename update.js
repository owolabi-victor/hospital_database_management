



// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navbarLinks = document.getElementById('navbar-links');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navbarLinks.classList.toggle('active');
        navbar.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbarLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navbarLinks.classList.remove('active');
            navbar.classList.remove('menu-open');
        }
    });

    // Close menu when clicking a link
    navbarLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbarLinks.classList.remove('active');
            navbar.classList.remove('menu-open');
        });
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navbarLinks.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navbarLinks.classList.remove('active');
          navbar.classList.remove('menu-open');
      }
    });
});


const formConfigs = {
  patients: [
    { id: "nameInput", label: "Name", type: "text" },
    { id: "dobInput", label: "Birth Date", type: "date" },
    {
      id: "genderInput",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { id: "addressInput", label: "Address", type: "text" },
  ],

  encounters: [
    { id: "dateInput", label: "Date", type: "date" },
    { id: "patientInput", label: "Patient", type: "text" },
    {
      id: "typeInput",
      label: "Type",
      type: "select",
      options: [
        "Common Cold",
        "Influenza",
        "Hypertension",
        "Diabetes Type 1",
        "Diabetes Type 2",
        "Asthma",
        "Bronchitis",
        "Pneumonia",
        "COVID-19",
        "Arthritis",
        "Depression",
        "Anxiety",
        "Heart Disease",
        "Stroke",
        "Cancer",
        "Allergies",
        "Migraine",
        "Gastritis",
        "UTI",
        "Other",
      ],
    },
    { id: "descriptionInput", label: "Description", type: "textarea" },
    { id: "costInput", label: "Cost", type: "number", step: "0.01" },
  ],

  procedures: [
    { id: "dateInput", label: "Date", type: "date" },
    { id: "patientInput", label: "Patient", type: "text" },
    { id: "descriptionInput", label: "Description", type: "text" },
    { id: "costInput", label: "Cost", type: "number", step: "0.01" },
  ],

  organization: [
    { id: "nameInput", label: "Name", type: "text" },
    { id: "addressInput", label: "Address", type: "text" },
    { id: "cityInput", label: "City", type: "text" },
    { id: "stateInput", label: "State", type: "text" },
    { id: "contactInput", label: "Contact", type: "text" },
  ],

  payers: [
    { id: "nameInput", label: "Name", type: "text" },
    { id: "addressInput", label: "Address", type: "text" },
    {
      id: "phoneInput",
      label: "Phone",
      type: "tel",
      pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
    },
  ],
};


function showAddForm(section) {
  const fields = formConfigs[section];
  if (!fields) {
    console.error(`No configuration found for section: ${section}`);
    return;
  }

  // Remove any existing modal first
  const existingModal = document.querySelector(".modal");
  if (existingModal) {
    existingModal.remove();
  }

  if (!document.querySelector('meta[name="viewport"]')) {
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(viewportMeta);
  }

  let fieldsHTML = "";
  fields.forEach((field) => {
    if (field.type === "select") {
      const options = field.options
        .map((opt) => `<option value="${opt}">${opt}</option>`)
        .join("");

      fieldsHTML += `
                <label>${field.label}: 
                    <select id="${field.id}" class="form-control">
                        <option value="">Select ${field.label}</option>
                        ${options}
                    </select>
                </label>`;
    } else if (field.type === "textarea") {
      fieldsHTML += `
                <label>${field.label}: 
                    <textarea id="${field.id}" class="form-control" rows="3"></textarea>
                </label>`;
    } else {
      const additionalAttrs =
        field.type === "number"
          ? `step="${field.step}" min="0"`
          : field.pattern
          ? `pattern="${field.pattern}"`
          : "";

      fieldsHTML += `
                <label>${field.label}: 
                    <input type="${field.type}" 
                           id="${field.id}" 
                           class="form-control"
                           ${additionalAttrs}>
                </label>`;
    }
  });

  const formHTML = `
        <div class="modal" id="addFormModal">
            <div class="modal-content">
                <h2>Add New ${
                  section.slice(0, 1).toUpperCase() + section.slice(1)
                }</h2>
                <form id="addForm" onsubmit="event.preventDefault(); addEntry('${section}');">
                    ${fieldsHTML}
                    <div class="button-group">
                        <button type="submit" class="btn-primary">Add</button>
                        <button type="button" onclick="closeModal()" class="btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", formHTML);

  // Add event listeners for modal behavior
  const modal = document.getElementById("addFormModal");

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Focus first input field
  setTimeout(() => {
    const firstInput = modal.querySelector("input, select, textarea");
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
}

// Add touch event handling for mobile devices
function initializeTouchEvents(modal) {
    let touchStart = null;
    let touchEnd = null;

    modal.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientY;
    }, false);

    modal.addEventListener('touchmove', (e) => {
        touchEnd = e.touches[0].clientY;
    }, false);

    modal.addEventListener('touchend', () => {
        if (touchStart && touchEnd && touchStart - touchEnd > 70) {
            // Swipe up detected
            closeModal();
        }
        touchStart = null;
        touchEnd = null;
    }, false);
}

function addEntry(section) {
  const fields = formConfigs[section];
  const values = {};
  let hasEmptyRequired = false;

  fields.forEach((field) => {
    const element = document.getElementById(field.id);
    const value = element.value.trim();
    values[field.id] = value;

    if (!value && !field.id.includes("description")) {
      hasEmptyRequired = true;
      element.classList.add("error");
    } else {
      element.classList.remove("error");
    }
  });

  if (hasEmptyRequired) {
    alert("Please fill all required fields.");
    return;
  }

   // Mobile-friendly confirmation for deletion
   if (window.innerWidth <= 768) {
    const confirmed = window.confirm('Are you sure you want to add this entry?');
    if (!confirmed) return;
}


  const tableBody = document.querySelector(`#${section}-table tbody`);
  if (!tableBody) {
    console.error(`Table for ${section} not found.`);
    return;
  }

  const cells = fields.map((field) => `<td>${values[field.id]}</td>`).join("");
  const newRow = `
        <tr>
            ${cells}
            <td>
                <button onclick="deleteEntry(this)" class="btn-delete">❌</button>
            </td>
        </tr>
    `;

  tableBody.insertAdjacentHTML("beforeend", newRow);
  closeModal();

  // Add a success message
  showNotification("Entry added successfully!");
}

function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.classList.add("modal-closing");
    setTimeout(() => {
      modal.remove();
    }, 300); // Match this with CSS animation duration
  }
}

function deleteEntry(button) {
  if (confirm("Are you sure you want to delete this entry?")) {
    button.closest("tr").remove();
    showNotification("Entry deleted successfully!");
  }
}

function showNotification(message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = `
        <div class="notification">
            ${message}
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    const notificationElement = document.querySelector(".notification");
    if (notificationElement) {
      notificationElement.classList.add("notification-hiding");
      setTimeout(() => {
        notificationElement.remove();
      }, 300);
    }
  }, 3000);
}

