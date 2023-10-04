class Perfume {
    constructor(volume, price, manufacturer, imageName, perfumeName) {
        this.volume = volume;
        this.price = price;
        this.manufacturer = manufacturer;
        this.imageName = imageName
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


        perfumeList.appendChild(li);

        totalPerfumes++;
    });

    totalPerfumesSpan.textContent = totalPerfumes;
}

searchInput.addEventListener("input", displayPerfumes);
sortSelect.addEventListener("change", displayPerfumes);

displayPerfumes(); 
