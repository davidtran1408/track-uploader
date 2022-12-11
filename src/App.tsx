import Uploader from "./uploader";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Uploader
        jwt="AAAA"
        genres={[]}
        tags={[]}
        uploadEndpoint="https://cc-api.com/api/uploader"
      />
    </ChakraProvider>
  );
}

export default App;
