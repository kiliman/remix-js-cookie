import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import Cookies from "js-cookie";
import cookie from "cookie";
import { useLoaderData } from "@remix-run/react/dist/components";
import { useRevalidator } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader({ request }: LoaderFunctionArgs) {
  const cookies = cookie.parse(request.headers.get("cookie") ?? "");
  return json({ cookies });
}
export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();
  const setTheme = (theme: string) => {
    Cookies.set("theme", theme);
    console.log("setting theme", document.cookie);
    revalidate();
  };
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <button
        className="bg-gray-900 text-white px-2 py-1 rounded"
        onClick={() => setTheme("dark")}
      >
        Dark Theme
      </button>
      <button
        className="bg-gray-300 text-gray-900 px-2 py-1 rounded"
        onClick={() => setTheme("light")}
      >
        Light Theme
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
