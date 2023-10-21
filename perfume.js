class Perfume {
    constructor(volume, price, manufacturer, imageName, perfumeName) {
        this.volume = volume;
        this.price = price;
        this.manufacturer = manufacturer;
        this.imageName = imageName;
        this.perfumeName = perfumeName;
    }
}

const perfumes = [
    new Perfume(30, 9037, "Dior", "dior1", "Poison"),
    new Perfume(200, 13355, "Chanel", "chanel1", "No. 5"),
    new Perfume(50, 3616, "Dior", "dior", "Miss Dior"),
    new Perfume(35, 2014, "Givenchy", "givenchy", "L'internit"),
    new Perfume(100, 16091, "Tom Ford", "tomford", "Tom Ford Lost Cherry"),
    new Perfume(90, 3461, "Y Saint Laurent", "blackopium_", "Black Opium")
];


const perfumeList = document.getElementById("perfumeList");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const totalPerfumesSpan = document.getElementById("totalPerfumes");
const plusIcon = document.querySelector(".plus-icon");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const perfumeForm = document.getElementById("perfume-form");
const perfumeImageInput = document.getElementById("perfumeImage");


perfumeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const perfumeName = document.getElementById("perfumeName").value;
    const manufacturer = document.getElementById("manufacturer").value;
    const price = parseFloat(document.getElementById("price").value);
    const volume = parseFloat(document.getElementById("volume").value);
    const perfumeImage = document.getElementById("perfumeImage").files[0];
    const imageName = perfumeImage.name.split('.')[0];
    const newPerfume = new Perfume(volume, price, manufacturer, imageName, perfumeName);
    perfumes.push(newPerfume);
    displayPerfumes(newPerfume);
    modal.style.display = "none";
});


plusIcon.addEventListener("click", () => {
    modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

let perfumeImages = {};

function displayPerfumes() {
    perfumeList.innerHTML = "";
    const searchTerm = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;

    const filteredPerfumes = perfumes.filter(perfume => perfume.manufacturer.toLowerCase().includes(searchTerm));
    const sortedPerfumes = filteredPerfumes.sort((a, b) => (sortBy === "price" ? a.price - b.price : a.volume - b.volume));

    let totalPerfumes = 0;

    sortedPerfumes.forEach(perfume => {
        const li = document.createElement("li");

        const perfumeName = document.createElement("div");
        perfumeName.textContent = perfume.perfumeName;
        perfumeName.classList.add("perfume-name");
        li.appendChild(perfumeName);

        const img = document.createElement("img");
        img.src = `Fotoes/${perfume.imageName}.jpg`;
        img.alt = perfume.perfumeName;
        li.appendChild(img);

        const priceText = document.createElement("div");
        priceText.innerHTML = `<em>Ціна:</em> ${perfume.price} грн`;
        priceText.classList.add("price");
        li.appendChild(priceText);

        const volumeText = document.createElement("div");
        volumeText.innerHTML = `<em>Об'єм:</em> ${perfume.volume}мл`;
        volumeText.classList.add("volume");
        li.appendChild(volumeText);

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            openEditModal(perfume);
        });
        li.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        li.appendChild(deleteButton);

        perfumeList.appendChild(li);

        totalPerfumes++;
    });
    totalPerfumesSpan.textContent = totalPerfumes;
}

searchInput.addEventListener("input", displayPerfumes);
sortSelect.addEventListener("change", displayPerfumes);

displayPerfumes();

function openEditModal(perfume) {
    const editModal = document.getElementById("editModal");
    const editForm = document.getElementById("edit-form");
    const editPerfumeName = document.getElementById("edit-perfumeName");
    const editManufacturer = document.getElementById("edit-manufacturer");
    const editPrice = document.getElementById("edit-price");
    const editVolume = document.getElementById("edit-volume");
    const closeEditModal = document.getElementById("close-edit-modal");

    editPerfumeName.value = perfume.perfumeName;
    editManufacturer.value = perfume.manufacturer;
    editPrice.value = perfume.price;
    editVolume.value = perfume.volume;

    editModal.style.display = "block";

    closeEditModal.addEventListener("click", () => {
        const editModal = document.getElementById("editModal");
        editModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        const editModal = document.getElementById("editModal");
        if (event.target === editModal) {
            editModal.style.display = "none";
        }
    });
    editForm.addEventListener("submit", function (event) {
        event.preventDefault();

        perfume.perfumeName = editPerfumeName.value;
        perfume.manufacturer = editManufacturer.value;
        perfume.price = parseFloat(editPrice.value);
        perfume.volume = parseFloat(editVolume.value);

        displayPerfumes();
        editModal.style.display = "none";
    });

}
