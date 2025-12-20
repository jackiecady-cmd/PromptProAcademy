export async function createCheckoutSession(data: {
  email: string;
  firstName: string;
  lastName: string;
  productType: string;
  amount: number;
}) {
  const response = await fetch("/api/checkout/create-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create checkout session");
  }

  return response.json();
}

export async function getUserOrders(email: string) {
  const response = await fetch(`/api/orders/${encodeURIComponent(email)}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

export async function getUserReports(userId: string) {
  const response = await fetch(`/api/reports/user/${userId}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  return response.json();
}
