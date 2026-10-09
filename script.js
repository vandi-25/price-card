function createButton({ label, onClick, className = "btn" }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  if (onClick) button.addEventListener("click", onClick);
  return button;
}

function createPriceCard({
  title,
  price,
  period = "/month",
  features = [],
  buttonLabel = "Start Trial",
  onSelect,
}) {
  const card = document.createElement("article");
  card.className = "pricing";

  const heading = document.createElement("h2");
  heading.className = "title";
  heading.textContent = title;

  const priceEl = document.createElement("p");
  priceEl.className = "price";
  priceEl.textContent = `${price} ${period}`;

  const list = document.createElement("ul");
  list.className = "features";

  features.forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    list.appendChild(item);
  });

  const button = createButton({
    label: buttonLabel,
    onClick: () => onSelect && onSelect(title),
  });

  card.append(heading, priceEl, list, button);
  return card;
}

function renderPlans(container, plans, onPlanSelect) {
  container.innerHTML = "";

  plans.forEach((plan) => {
    const card = createPriceCard({
      ...plan,
      onSelect: onPlanSelect,
    });

    container.appendChild(card);
  });
}

const plans = [
  {
    title: "Basic Plan",
    price: "$9.99",
    features: ["1 GB Storage", "Basic Support", "All Core Features"],
  },
  {
    title: "Pro Plan",
    price: "$19.99",
    features: ["50 GB Storage", "Priority Support", "All Core Features", "Team Sharing"],
  },
  {
    title: "Premium Plan",
    price: "$29.99",
    buttonLabel: "Get Premium",
    features: ["500 GB Storage", "24/7 Support", "All Core Features", "Team Sharing", "Advanced Analytics"],
  },
];

const container = document.getElementById("plans");
const status = document.getElementById("status");

renderPlans(container, plans, (name) => {
  status.textContent = `You selected the ${name}.`;
});
