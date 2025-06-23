import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Home, AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl text-white">Page Not Found</CardTitle>
          <CardDescription className="text-slate-400">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link to="/">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;