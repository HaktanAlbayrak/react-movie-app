import { SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log('success');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Box py='4' mb='2'>
      <Container maxW='container.xl'>
        <Flex justifyContent='space-between'>
          <Link to='/'>
            <Box
              fontSize={'2xl'}
              fontWeight={'bold'}
              color={'red'}
              letterSpacing={'widest'}
              fontFamily={'mono'}
            >
              HOMEFLEX
            </Box>
          </Link>

          {/* DESKTOP */}
          <Flex gap='4' alignItems='center'>
            <Link to='/'>Home</Link>
            <Link to='/movies'>Movies</Link>
            <Link to='/shows'>TV Shows</Link>
            <Link to='/search'>
              <SearchIcon fontSize='xl' />
            </Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg='red.500'
                    color='white'
                    size='sm'
                    name={user?.displayName}
                  />
                </MenuButton>
                <MenuList>
                  <Link to='/'>
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Avatar
                size='sm'
                bg='gray.800'
                as='button'
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
