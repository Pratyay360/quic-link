import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <Alert variant="destructive" className="mb-4">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>404</AlertTitle>
            <AlertDescription>Page Not Found</AlertDescription>
          </Alert>
          <CardTitle className="text-2xl font-bold">Oops! Lost your way?</CardTitle>
        </CardHeader>
        
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button asChild>
            <a href="/">
              Go to Homepage
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
