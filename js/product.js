// products.js
// Get the elements
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const products = [
    {
        id: 1,
        name: "Station de travail Pro X1",
        category: "hardware",
        price: 2499,
        availability: "instock",
        description: "Station de travail haute performance pour professionnels",
        specs: ["Intel i9", "64GB RAM", "2TB SSD", "RTX 4080"],
        image: "images/development.png"
    },
    {
        id: 2,
        name: "Suite Gestion Enterprise",
        category: "software",
        price: 1299,
        availability: "instock",
        description: "Solution complète de gestion d'entreprise",
        specs: ["Gestion stocks", "Comptabilité", "RH", "CRM"],
        image: "images/design.png"
    },
    // ... autres produits
];


// Update price value when slider moves
priceRange.addEventListener('input', function() {
    priceValue.textContent = this.value + ' €';
});

// Optional: Set initial value
priceValue.textContent = priceRange.value + ' €';

class ProductCatalog {
    constructor() {
        this.filters = {
            categories: new Set(),
            maxPrice: 10000,
            availability: 'all'
        };
        this.init();
    }

    init() {
        this.renderProducts(products);
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Écouteurs pour les filtres de catégorie
        document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateCategoryFilters());
        });

        // Écouteur pour le filtre de prix
        document.getElementById('priceRange').addEventListener('input', (e) => {
            document.getElementById('priceValue').textContent = `${e.target.value} €`;
            this.filters.maxPrice = parseInt(e.target.value);
            this.applyFilters();
        });

        // Écouteurs pour les filtres de disponibilité
        document.querySelectorAll('input[name="availability"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.filters.availability = e.target.value;
                this.applyFilters();
            });
        });

        // Réinitialisation des filtres
        document.getElementById('resetFilters').addEventListener('click', () => this.resetFilters());
    }

    updateCategoryFilters() {
        this.filters.categories.clear();
        document.querySelectorAll('.filter-group input[type="checkbox"]:checked').forEach(checkbox => {
            this.filters.categories.add(checkbox.value);
        });
        this.applyFilters();
    }

    applyFilters() {
        const filteredProducts = products.filter(product => {
            const categoryMatch = this.filters.categories.size === 0 || 
                                this.filters.categories.has(product.category);
            const priceMatch = product.price <= this.filters.maxPrice;
            const availabilityMatch = this.filters.availability === 'all' || 
                                    product.availability === this.filters.availability;

            return categoryMatch && priceMatch && availabilityMatch;
        });

        this.renderProducts(filteredProducts);
    }

    renderProducts(productsToRender) {
        const container = document.getElementById('productsContainer');
        container.innerHTML = productsToRender.map(product => `
            <div class="product-card animate-fade-in">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price} €</p>
                    <p>${product.description}</p>
                    <ul>
                        ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
                    </ul>
                    <button class="btn">Demander un devis</button>
                </div>
            </div>
        `).join('');
    }

    resetFilters() {
        // Réinitialisation des checkboxes
        document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Réinitialisation du range de prix
        const priceRange = document.getElementById('priceRange');
        priceRange.value = 10000;
        document.getElementById('priceValue').textContent = "10000 €";

        // Réinitialisation de la disponibilité
        document.querySelector('input[name="availability"][value="all"]').checked = true;

        // Réinitialisation des filtres et affichage
        this.filters = {
            categories: new Set(),
            maxPrice: 10000,
            availability: 'all'
        };
        this.renderProducts(products);
    }
}

// Initialisation du catalogue
document.addEventListener('DOMContentLoaded', () => {
    new ProductCatalog();
});