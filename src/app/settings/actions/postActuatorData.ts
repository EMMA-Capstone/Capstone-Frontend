import Cookies from "js-cookie";

export default async function postActuatorData(eventName: string) {
  const token = Cookies.get("Authorization") || "";
  const cleanedToken = token.startsWith("Bearer ") ? token.slice(7) : token;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/compost-bin/event`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cleanedToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventName }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to post actuator event");
  return response.json();
}
