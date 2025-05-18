import { Autocomplete } from "@/components/Autocomplete";
import Pers from "@/components/Pers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-accent to-background p-4 md:p-8">
      <Card className="w-full max-w-2xl shadow-lg border-opacity-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl md:text-3xl font-sans text-center text-primary">
            Product Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Autocomplete />
        </CardContent>
      </Card>
      <Pers></Pers>
      <footer className="mt-8 text-center font-sans  text-sweet text-sm text-muted-foreground">
        <p className="mt-1">Built with React, TypeScript, and Tailwind CSS</p>
        <p className="mt-1">Made with Passion</p>
      </footer>
    </div>
  );
};

export default Index;
