import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/trpc";
import User from "./components/User";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <User />
    </QueryClientProvider>
  );
}

export default App;
