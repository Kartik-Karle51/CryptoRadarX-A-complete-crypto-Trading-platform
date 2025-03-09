import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React from 'react';
import Sidebar from './Sidebar';
import { AvatarFallback, Avatar, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate();
  const { auth } = useSelector(store => store);
  return (
    <div className='px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center'>
      <div className='flex items-center gap-3'>
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
              <DragHandleHorizontalIcon className="h-7 w-7" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 border-r-0 flex flex-col justify-center">
            <SheetHeader>
              <SheetTitle>
                <div className='text-3xl flex justify-center items-center gap-1'>
                  <Avatar className='mr-2 mt-4'>
                    <AvatarImage src='https://yourcryptolibrary.com/wp-content/uploads/2022/02/Binance-coin-logo-1024x1024.png' className='h-10 w-10' />
                  </Avatar>
                  <div className='mt-4 mr-6' >
                    <span className='font-bold text-orange-700'>Crypto</span>
                    <span>Radar</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>

        <p className='text-lg lg:text-base cursor-pointer hover:text-orange-600'onClick={() => navigate('/')} >Crypto Radar</p>
      </div>
      <div>
        <Avatar className="hover:cursor-pointer hover:text-orange-600" onClick={() => navigate('/profile')}>
          <AvatarFallback>
            {auth.user?.fullName?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>

        </Avatar>
      </div>
    </div>
  )
}

export default Navbar;
