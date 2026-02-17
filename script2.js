// Joe's Hotdog Stand - Task 2 JavaScript (with associative arrays)

// Display menu in alert
alert("Welcome to Joe's Hotdog Stand!\n\n" +
      "MENU:\n" +
      "• Hot Dogs: $5.25 each\n" +
      "• French Fries: $3.75 each\n" +
      "• Drinks: $2.50 each\n\n" +
      "SPECIALS:\n" +
      "• Joe's Meal Deal: $10.00 (1 hot dog, 1 fries, 1 drink)\n" +
      "• 10% discount on orders of $30 or more!");

// Associative array for item names and prices
const itemPrices = {
    "Hot Dog": 5.25,
    "French Fries": 3.75,
    "Drink": 2.50
};

// Associative array for item quantities
const itemQuantities = {};

// Constants for specials and tax
const MEAL_DEAL_PRICE = 10.00;
const TAX_RATE = 0.0625;
const DISCOUNT_THRESHOLD = 30.00;
const DISCOUNT_RATE = 0.10;

// Use loop to request quantity of each item
for (let itemName in itemPrices) {
    let quantity = parseInt(prompt("How many " + itemName + "(s) would you like?") || "0");
    itemQuantities[itemName] = quantity;
}

// Function to format money to exactly 2 decimal places
function showMoney(amount) {
    // Multiply by 100, round, then divide by 100
    let cents = parseInt(amount * 100 + 0.5);
    let dollars = parseInt(cents / 100);
    let remainder = cents % 100;
    
    // Format remainder to always show 2 digits
    let centsStr = remainder.toString();
    if (remainder < 10) {
        centsStr = "0" + centsStr;
    }
    
    return dollars + "." + centsStr;
}

// Calculate meal deals
let mealDeals = 0;
let minQty = itemQuantities["Hot Dog"];
if (itemQuantities["French Fries"] < minQty) minQty = itemQuantities["French Fries"];
if (itemQuantities["Drink"] < minQty) minQty = itemQuantities["Drink"];

if (minQty > 0) {
    mealDeals = minQty;
}

// Create arrays for adjusted quantities and costs
const adjustedQuantities = {};
const itemCosts = {};

// Adjust quantities for meal deals and calculate costs
for (let itemName in itemPrices) {
    adjustedQuantities[itemName] = itemQuantities[itemName] - mealDeals;
    itemCosts[itemName] = adjustedQuantities[itemName] * itemPrices[itemName];
}

// Calculate meal deal cost
let mealDealCost = mealDeals * MEAL_DEAL_PRICE;

// Calculate subtotal
let subtotal = mealDealCost;
for (let itemName in itemCosts) {
    subtotal = subtotal + itemCosts[itemName];
}

// Store subtotal before discount
let subtotalBeforeDiscount = subtotal;

// Apply discount if applicable
let discountAmount = 0;
if (subtotal >= DISCOUNT_THRESHOLD) {
    discountAmount = subtotal * DISCOUNT_RATE;
    subtotal = subtotal - discountAmount;
}

// Calculate tax and final total
let taxAmount = subtotal * TAX_RATE;
let finalTotal = subtotal + taxAmount;

// Build display HTML
let displayHTML = "<h2>Your Order</h2>";

// Display meal deals first
if (mealDeals > 0) {
    displayHTML += '<div class="item-line"><span>' + mealDeals + ' x Joe\'s Meal Deal @ $' + showMoney(MEAL_DEAL_PRICE) + '</span><span>$' + showMoney(mealDealCost) + '</span></div>';
}

// Display individual items
for (let itemName in itemPrices) {
    if (adjustedQuantities[itemName] > 0) {
        displayHTML += '<div class="item-line"><span>' + adjustedQuantities[itemName] + ' x ' + itemName + ' @ $' + showMoney(itemPrices[itemName]) + '</span><span>$' + showMoney(itemCosts[itemName]) + '</span></div>';
    }
}

displayHTML += '<div class="subtotal-line"><span>Subtotal (before discount):</span><span>$' + showMoney(subtotalBeforeDiscount) + '</span></div>';

if (discountAmount > 0) {
    displayHTML += '<div class="discount-line"><span>10% Discount:</span><span>-$' + showMoney(discountAmount) + '</span></div>';
    displayHTML += '<div class="subtotal-line"><span>Subtotal (after discount):</span><span>$' + showMoney(subtotal) + '</span></div>';
}

displayHTML += '<div class="tax-line"><span>Tax (6.25%):</span><span>$' + showMoney(taxAmount) + '</span></div>';
displayHTML += '<div class="total-line"><span>TOTAL:</span><span>$' + showMoney(finalTotal) + '</span></div>';

document.getElementById('orderDisplay').innerHTML = displayHTML;
