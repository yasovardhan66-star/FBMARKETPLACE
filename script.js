const listings = [
  { title: '2018 Honda Civic LX', category: 'Vehicles', location: 'Austin, TX', price: 14500, color: '#d7ecff' },
  { title: 'iPhone 14 Pro 128GB', category: 'Electronics', location: 'Seattle, WA', price: 700, color: '#ffe4f2' },
  { title: 'Wood Coffee Table', category: 'Furniture', location: 'Denver, CO', price: 120, color: '#fff0d9' },
  { title: 'Dyson V11 Vacuum', category: 'Home', location: 'Chicago, IL', price: 275, color: '#ece9ff' },
  { title: 'Gaming Monitor 27" 144Hz', category: 'Electronics', location: 'Portland, OR', price: 210, color: '#dbffeb' },
  { title: 'Road Bike - Trek FX 2', category: 'Vehicles', location: 'Phoenix, AZ', price: 450, color: '#e3f0ff' },
  { title: 'Leather Jacket - Medium', category: 'Fashion', location: 'Miami, FL', price: 85, color: '#fce7dc' },
  { title: 'Queen Bed Frame + Headboard', category: 'Furniture', location: 'Nashville, TN', price: 190, color: '#e7fff6' }
];

const grid = document.querySelector('#listingGrid');
const template = document.querySelector('#listingTemplate');
const searchInput = document.querySelector('#searchInput');
const categoryFilter = document.querySelector('#categoryFilter');
const maxPrice = document.querySelector('#maxPrice');
const resultCount = document.querySelector('#resultCount');
const resetFilters = document.querySelector('#resetFilters');

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function render(items) {
  grid.innerHTML = '';

  if (!items.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No listings match your filters.';
    grid.appendChild(empty);
    resultCount.textContent = '0 items';
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const node = template.content.cloneNode(true);
    node.querySelector('.card-image').style.background = `linear-gradient(140deg, ${item.color}, #ffffff)`;
    node.querySelector('.price').textContent = formatPrice(item.price);
    node.querySelector('.title').textContent = item.title;
    node.querySelector('.meta').textContent = `${item.category} • ${item.location}`;
    fragment.appendChild(node);
  });

  grid.appendChild(fragment);
  resultCount.textContent = `${items.length} item${items.length > 1 ? 's' : ''}`;
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const max = Number(maxPrice.value) || Number.POSITIVE_INFINITY;

  const filtered = listings.filter((item) => {
    const matchesText = !query || item.title.toLowerCase().includes(query) || item.location.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesPrice = item.price <= max;

    return matchesText && matchesCategory && matchesPrice;
  });

  render(filtered);
}

searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
maxPrice.addEventListener('input', applyFilters);

resetFilters.addEventListener('click', () => {
  searchInput.value = '';
  categoryFilter.value = 'all';
  maxPrice.value = '2000';
  applyFilters();
});

render(listings);
