
import { Autocomplete } from "@/components/Autocomplete";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-accent to-background p-4 md:p-8">
      <Card className="w-full max-w-2xl shadow-lg border-opacity-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl md:text-3xl text-center text-primary">Product Search</CardTitle>
        </CardHeader>
        <CardContent>
          <Autocomplete />
        </CardContent>
      </Card>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Software Engineering Intern Assignment</p>
        <p className="mt-1">Built with React, TypeScript, and Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default Index;
