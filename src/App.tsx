import { QueryClientProvider } from "@tanstack/react-query";
import Router from "./app/Router";
import { queryClient } from "./lib/queryClient";
import { AuthInitializer } from "./shared/AuthInitializer";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
