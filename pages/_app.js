import '../src/app/custom-styles.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './AuthContext'; // Update import statement
import { SidebarProvider } from './context/SidebarContext';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider> {/* Wrap the component with AuthProvider */}
      {/* <SidebarProvider> */}
        <Component {...pageProps} />
      {/* </SidebarProvider> */}
    </AuthProvider>
  );
}

export default MyApp;
