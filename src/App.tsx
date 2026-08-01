import { QueryClientProvider } from "@tanstack/react-query";
import Router from "./app/Router";
import { queryClient } from "./lib/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
