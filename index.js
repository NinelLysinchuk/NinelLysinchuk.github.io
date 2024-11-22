class CRMApp {
  constructor(oOptions) {
    this.customers = [];
    this.totalEntries = oOptions.totalEntries;
    this.entriesPerPage = oOptions.entriesPerPage;
    this.totalPages = Math.ceil(this.totalEntries / this.entriesPerPage);
    this.currentPage = 1;

    this.firstNames = ["John", "Mary", "Alex", "Emma", "Robert", "Olivia", "William", "Sophia", "James", "Lily"];
    this.lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Martinez", "Davis", "Rodriguez", "Martinez"];
    this.countries = ["USA", "Canada", "UK", "Germany", "France", "Italy", "Australia", "Spain", "Brazil", "Japan"];

    this.tableBody = document.querySelector("#customer-table tbody");
    this.paginationContainer = document.getElementById("pagination");
    this.dataInfo = document.querySelector("#data-info");

    this.init();
  }

  init() {
    const aCustomers = this.generateCustomers();
    this.updateUI(aCustomers);
  }

  generateCustomers() {
    for (let i = 0; i < this.totalEntries; i++) {
      const name = `${this.firstNames[i % this.firstNames.length]} ${this.lastNames[i % this.lastNames.length]}`;
      const company = `Company ${i + 1}`;
      const phone = `+1234567${i}`;
      const email = `${this.firstNames[i % this.firstNames.length].toLowerCase()}.${this.lastNames[i % this.lastNames.length].toLowerCase()}@example.com`;
      const country = this.countries[i % this.countries.length];
      const status = i % 2 === 0 ? "Active" : "Inactive";

      this.customers.push({ name, company, phone, email, country, status });
    }
  }

  updateUI() {
    this.renderTable(this.currentPage);
    this.createPagination();
  }

  renderTable(page) {
    this.tableBody.innerHTML = "";
    const start = (page - 1) * this.entriesPerPage;
    const end = start + this.entriesPerPage;

    const pageCustomers = this.customers.slice(start, end);
    pageCustomers.forEach((customer) => {
      const row = this.createTableRow(customer);
      this.tableBody.appendChild(row);
    });

    this.dataInfo.textContent = `Showing data ${start + 1} to ${end} of ${this.totalEntries} entries`;
  }

  createTableRow(customer) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${customer.name}</td>
      <td>${customer.company}</td>
      <td>${customer.phone}</td>
      <td>${customer.email}</td>
      <td>${customer.country}</td>
      <td>
        <button class="customer__status ${
          customer.status === "Active" ? "customer__status--active" : "customer__status--inactive"
        }">
          ${customer.status}
        </button>
      </td>
    `;
    return row;
  }

  createPagination() {
    this.paginationContainer.innerHTML = "";

    this.paginationContainer.appendChild(
      this.createNavButton("<", this.currentPage > 1, () => this.changePage(this.currentPage - 1))
    );

    this.addPaginationButtons();

    this.paginationContainer.appendChild(
      this.createNavButton(">", this.currentPage < this.totalPages, () => this.changePage(this.currentPage + 1))
    );
  }

  addPaginationButtons() {
    if (this.currentPage > 1) this.addPageButton(this.currentPage - 1);
    this.addPageButton(this.currentPage, true);
    if (this.currentPage < this.totalPages) this.addPageButton(this.currentPage + 1);
    if (this.currentPage + 1 < this.totalPages) this.addPageButton(this.currentPage + 2);

    if (this.currentPage + 2 < this.totalPages - 1) {
      this.paginationContainer.appendChild(this.createDots());
      this.addPageButton(this.totalPages);
    }
  }

  createNavButton(label, isEnabled, onClick) {
    const button = document.createElement("button");
    button.textContent = label;
    button.classList.add("footer__nav-button");
    button.disabled = !isEnabled;
    button.addEventListener("click", onClick);
    return button;
  }

  addPageButton(page, isActive = false) {
    const button = document.createElement("button");
    button.textContent = page;
    button.classList.add("footer__page-button");
    if (isActive) button.classList.add("footer__page-button--active");
    button.addEventListener("click", () => this.changePage(page));
    this.paginationContainer.appendChild(button);
  }

  createDots() {
    const dots = document.createElement("span");
    dots.textContent = "...";
    dots.classList.add("pagination__dots");
    return dots;
  }

  changePage(page) {
    this.currentPage = page;
    this.updateUI();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let oSettings = {
  totalEntries 	: 320
  ,entriesPerPage : 8
  };
  new CRMApp(oSettings);

})