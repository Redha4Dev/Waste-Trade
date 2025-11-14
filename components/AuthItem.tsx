

import { user } from '@/lib/user';
import Logout from './Logout';
import Link from 'next/link';
import { Button } from './ui/button';

const AuthItem = async () => {
    const currentUser = await user();
  return (
    <div>
        {currentUser ? (
        <Logout />
      ) : (
        <Link href="/sign-in">
          <Button className="max-sm:hidden border-2 border-green-500" variant={'outline'}>Login</Button>
        </Link>
      )}
    </div>
  )
}

export default AuthItem