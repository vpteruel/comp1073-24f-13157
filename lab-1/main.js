const subcategories = {
    fruits: ["🍎 Apple", "🍊 Tangerine", "🍋 Lemon", "🍒 Cherries", "🍇 Grapes", "🍉 Watermelon", "🍓 Strawberry", "🍑 Peach", "🍈 Melon", "🍌 Banana", "🍐 Pear", "🍍 Pineapple"],
    vegetables: ["🥕 Carrot", "🥒 Cucumber", "🥦 Broccoli", "🥔 Potato", "🍅 Tomato", "🫑 Bell Pepper"],
    dairy: ["🥛 Milk", "🥚 Egg", "🍞 Bread", "🥞 Pancakes", "🥯 Bagel"]
};

function populateSubcategories() {
    const categorySelect = document.getElementById("category");
    const subcategorySelect = document.getElementById("subcategory");
    const selectedCategory = categorySelect.value;

    // clear previous subcategories
    subcategorySelect.innerHTML = '<option value="">Select a subcategory</option>';

    if (selectedCategory) {
        const options = subcategories[selectedCategory];
        options.forEach(subcategory => {
            const optionElement = document.createElement("option");
            optionElement.value = subcategory.toLowerCase();
            optionElement.textContent = subcategory;
            subcategorySelect.appendChild(optionElement);
        });
    }
}