import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Text,
  Flex,
  Heading,
  theme,
  Box,
  Spinner,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  let getJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Dark?type=single');
      const data = await response.json();
      setJoke(data.joke);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getJoke();
  }, []);
  function refreshPage() {
    console.log('button pressed');
    window.location.reload(false);
  }
  return (
    <ChakraProvider theme={theme}>
      <Flex flexDirection={'column'}>
        <Flex justifyContent={'space-between'} m={5}>
          <Heading color={'teal'}>Jokes Not For Everyone</Heading>
          <Flex justifyContent={'flex-end'} m={5}>
            

            <ColorModeSwitcher color="teal" />
            
          </Flex>
        </Flex>
        <Flex h={'75vh'} justifyContent={'Center'} align={'Center'}>
          <Box w="100%" p={4} color="white">
            <Text fontSize={'4xl'} color={'teal'}>
              {loading ? <Spinner size={'xl'} /> : error ? error : joke}
            </Text>
          </Box>
        </Flex>
        <Flex justifyContent={'flex-center'} align={'Center'}>
          <Button size="lg" colorScheme={'teal'} onClick={refreshPage}>
            Next
          </Button>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
