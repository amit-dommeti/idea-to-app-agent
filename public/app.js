const form = document.querySelector("#idea-form");
const ideaInput = document.querySelector("#idea-input");
const submitButton = document.querySelector("#submit-button");
const emptyState = document.querySelector("#empty-state");
const loadingState = document.querySelector("#loading-state");
const errorState = document.querySelector("#error-state");
const results = document.querySelector("#results");

const fields = {
  productSummary: document.querySelector("#product-summary"),
  targetUser: document.querySelector("#target-user"),
  whyNow: document.querySelector("#why-now"),
  mvpFeatures: document.querySelector("#mvp-features"),
  techStack: document.querySelector("#tech-stack"),
  buildPlan: document.querySelector("#build-plan"),
  headline: document.querySelector("#headline"),
  cta: document.querySelector("#cta")
};

function setVisibility({ showEmpty, showLoading, showError, showResults }) {
  emptyState.classList.toggle("hidden", !showEmpty);
  loadingState.classList.toggle("hidden", !showLoading);
  errorState.classList.toggle("hidden", !showError);
  results.classList.toggle("hidden", !showResults);
}

function renderList(element, items) {
  element.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function renderResult(data) {
  fields.productSummary.textContent = data.productSummary;
  fields.targetUser.textContent = data.targetUser;
  fields.whyNow.textContent = data.whyNow;
  fields.headline.textContent = data.landingPageHeadline;
  fields.cta.textContent = data.callToAction;

  renderList(fields.mvpFeatures, data.mvpFeatures);
  renderList(fields.techStack, data.techStack);
  renderList(fields.buildPlan, data.sevenDayBuildPlan);
}

function renderError(message) {
  errorState.textContent = message;
}

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    ideaInput.value = button.dataset.prompt;
    ideaInput.focus();
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const idea = ideaInput.value.trim();

  if (!idea) {
    renderError("Add a rough app idea first.");
    setVisibility({
      showEmpty: false,
      showLoading: false,
      showError: true,
      showResults: false
    });
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Generating...";
  setVisibility({
    showEmpty: false,
    showLoading: true,
    showError: false,
    showResults: false
  });

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idea })
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Something went wrong.");
    }

    renderResult(payload);
    setVisibility({
      showEmpty: false,
      showLoading: false,
      showError: false,
      showResults: true
    });
  } catch (error) {
    renderError(error.message || "Unable to generate a plan right now.");
    setVisibility({
      showEmpty: false,
      showLoading: false,
      showError: true,
      showResults: false
    });
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Generate app plan";
  }
});
