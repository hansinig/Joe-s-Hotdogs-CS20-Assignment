// Joe's Hotdog Stand - Task 1 JavaScript

// Display menu in alert
alert("Welcome to Joe's Hotdog Stand!\n\n" +
      "MENU:\n" +
      "• Hot Dogs: $5.25 each\n" +
      "• French Fries: $3.75 each\n" +
      "• Drinks: $2.50 each\n\n" +
      "SPECIALS:\n" +
      "• Joe's Meal Deal: $10.00 (1 hot dog, 1 fries, 1 drink)\n" +
      "• 10% discount on orders of $30 or more!");

// Constants for prices
const HOTDOG_PRICE = 5.25;
const FRIES_PRICE = 3.75;
const DRINK_PRICE = 2.50;
const MEAL_DEAL_PRICE = 10.00;
const TAX_RATE = 0.0625;
const DISCOUNT_THRESHOLD = 30.00;
const DISCOUNT_RATE = 0.10;

// Get order quantities from user
let numDogs = parseInt(prompt("How many hot dogs would you like?") || "0");
let numFries = parseInt(prompt("How many orders of french fries would you like?") || "0");
let numSoda = parseInt(prompt("How many drinks would you like?") || "0");

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
if (numDogs > 0 && numFries > 0 && numSoda > 0) {
    mealDeals = numDogs < numFries ? (numDogs < numSoda ? numDogs : numSoda) : (numFries < numSoda ? numFries : numSoda);
}

// Adjust quantities for meal deals
let regularDogs = numDogs - mealDeals;
let regularFries = numFries - mealDeals;
let regularSoda = numSoda - mealDeals;

// Calculate costs
let dogCost = regularDogs * HOTDOG_PRICE;
let friesCost = regularFries * FRIES_PRICE;
let sodaCost = regularSoda * DRINK_PRICE;
let mealDealCost = mealDeals * MEAL_DEAL_PRICE;

// Calculate subtotal
let subtotal = dogCost + friesCost + sodaCost + mealDealCost;

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

if (mealDeals > 0) {
    displayHTML += '<div class="item-line"><span>' + mealDeals + ' x Joe\'s Meal Deal @ $' + showMoney(MEAL_DEAL_PRICE) + '</span><span>$' + showMoney(mealDealCost) + '</span></div>';
}

if (regularDogs > 0) {
    displayHTML += '<div class="item-line"><span>' + regularDogs + ' x Hot Dog @ $' + showMoney(HOTDOG_PRICE) + '</span><span>$' + showMoney(dogCost) + '</span></div>';
}

if (regularFries > 0) {
    displayHTML += '<div class="item-line"><span>' + regularFries + ' x French Fries @ $' + showMoney(FRIES_PRICE) + '</span><span>$' + showMoney(friesCost) + '</span></div>';
}

if (regularSoda > 0) {
    displayHTML += '<div class="item-line"><span>' + regularSoda + ' x Drink @ $' + showMoney(DRINK_PRICE) + '</span><span>$' + showMoney(sodaCost) + '</span></div>';
}

let subtotalBeforeDiscount = dogCost + friesCost + sodaCost + mealDealCost;
displayHTML += '<div class="subtotal-line"><span>Subtotal (before discount):</span><span>$' + showMoney(subtotalBeforeDiscount) + '</span></div>';

if (discountAmount > 0) {
    displayHTML += '<div class="discount-line"><span>10% Discount:</span><span>-$' + showMoney(discountAmount) + '</span></div>';
    displayHTML += '<div class="subtotal-line"><span>Subtotal (after discount):</span><span>$' + showMoney(subtotal) + '</span></div>';
}

displayHTML += '<div class="tax-line"><span>Tax (6.25%):</span><span>$' + showMoney(taxAmount) + '</span></div>';
displayHTML += '<div class="total-line"><span>TOTAL:</span><span>$' + showMoney(finalTotal) + '</span></div>';

document.getElementById('orderDisplay').innerHTML = displayHTML;
