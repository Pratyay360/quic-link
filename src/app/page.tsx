import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default async function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b flex flex-col justify-center items-center p-6 dark:bg-slate-800 bg-slate-100">
        <main className="max-w-4xl w-full text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-50">
            QuickLink: Simple URL Shortener and Text Sharer
          </h1>
          <p className="text-xl text-gray-600 mb-12 dark:text-gray-200">
            A self-hostable solution for easily sharing links and text on social
            media and chats
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Card className="w-64 hover:shadow-lg transition-shadow duration-300 border-violet-600 dark:border-amber-500 dark:bg-gray-700 bg-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Shorten URL
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Create compact links instantly
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/shorturl" className="w-full">
                  <Button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="w-64 hover:shadow-lg transition-shadow duration-300 border-violet-600 dark:bg-gray-700 dark:border-amber-500 bg-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Share Text
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Share text snippets effortlessly
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/sharetext" className="w-full">
                  <Button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
